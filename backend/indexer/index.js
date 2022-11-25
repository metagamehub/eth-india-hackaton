require("dotenv").config();
const creatorABI = require("./contracts-abi/creator").abi;
const databaseController = require("../controller/controller");
const Web3 = require("web3");
const Web3WsProvider = require("web3-providers-ws");

const options = {
	clientConfig: {
		maxReceivedFrameSize: 100000000, //3555167
		maxReceivedMessageSize: 100000000,
	},
	// reconnect: {
	// 	auto: true,
	// 	delay: 5000, // ms
	// 	maxAttempts: 5,
	// 	onTimeout: false,
	// },
};

const ws = new Web3WsProvider(process.env.RPC_NODE_ADDRESS, options);

const web3 = new Web3(ws);

const contracts = JSON.parse(process.env.CONTRACTS_OBJECT);

async function subscribeToEvents(contractAddress, topics, startingBlock, tag) {
	web3.eth
		.subscribe(
			"logs",
			{
				fromBlock: startingBlock,
				address: contractAddress,
				topics,
			},
			(error, result) => {
				if (error) console.error(error);
				//console.log(result);
			}
		)
		.on("connected", (subscriptionId) => {
			//console.log("Suscribed to "+tag, subscriptionId);
		})
		.on("data", async (log) => {
			//should be an array that we traverse
			const finalPayload = await obtainPayloadFromLogData(contractAddress, topics, log);
			// console.log(">> final payload:",finalPayload)

			// finalPayload.forEach( (element) => {
			// 	console.log(new Date().toISOString() + " update on " + tag);
			// 	console.log(element.rewardData);
			// });

			for (element of finalPayload) {
				console.log(new Date().toISOString() + " update on " + tag);
				console.log(element.rewardData);
				if (Array.isArray(element.rewardData))
					await databaseController.createSelfFromIndexer(element.rewardData);
				else 
					await databaseController.createSelfFromIndexer([element.rewardData]);
			}
		});
}

function parseMarketplaceTxData(data, hash, lIndex) {
	let rewards = [];
	const parsedData = web3.eth.abi.decodeParameters(
		["tuple(address,uint256[],uint256[],address[])[]"],
		data
	);
	const dataElement = parsedData[0][0];
	for (let index = 0; index < dataElement[3].length; index++) {
		rewards.push({
			walletAddress: dataElement[3][index],
			reward: dataElement[2][index],
			eventType: "purchase",
			event_id: "purchase-" + hash + "-" + lIndex + "-" + index,
		});
	}
	return rewards;
}

async function parseFactoryTxData(topic, hash, lIndex) {
	try {
		const collectionAddress = web3.eth.abi.decodeParameters(["address"], topic);
		const collection = new web3.eth.Contract(creatorABI, collectionAddress[0]);
		const walletAddress = await collection.methods.creator().call();
		return {
			walletAddress,
			reward: 0,
			eventType: "deployedCollection",
			event_id: "deployedCollection-" + hash + "-" + lIndex,
		};
	} catch (error) {
		console.log(error);
		return {
			walletAddress: "0x0000000000000000000000000000000000000000",
			reward: 0,
			eventType: "deployedCollection",
		};
	}
}

async function obtainPayloadFromLogData(address, topics, log) {
	let payments = [];
	let payload = JSON.parse(JSON.stringify(log));
	let rewardStructure = [];
	switch (address) {
		case contracts["marketplace"].contractAddress:
			rewardStructure.push(parseMarketplaceTxData(payload.data, log.transactionHash, log.logIndex));
			break;
		case contracts["factory"].contractAddress:
			rewardStructure.push(await parseFactoryTxData(log.topics[1], log.transactionHash, log.logIndex));
			break;
		default:
			break;
	}

	rewardStructure.forEach((element) => {
		payments.push({ ...payload, rewardData: element });
	});

	return payments;
}

async function run() {
	const startingBlock = await web3.eth.getBlockNumber() - process.env.BLOCKS_BEFORE;
	for (const key in contracts) {
		if (Object.hasOwnProperty.call(contracts, key)) {
			const element = contracts[key];
			const { contractAddress, topics, tag } = element;
			await subscribeToEvents(contractAddress, topics, startingBlock, tag);
		}
	}
}

module.exports = {
	run,
};
