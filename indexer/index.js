//const collectionStoreABI = require('./contracts-abi/collectionStore').abi;
require('dotenv').config();

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.RPC_NODE_ADDRESS));
const contracts = JSON.parse(process.env.CONTRACTS_OBJECT);
console.log("!", contracts.length)

async function subscribeToEvents(contractAddress, topics, startingBlock, tag){
    web3.eth.subscribe('logs',{
        fromBlock: startingBlock,
        address: contractAddress,
        topics
    }, (error, result) => {
        if (error)
            console.error(error);
            console.log(result);
    }).on("connected",(subscriptionId)=> {
        console.log("Suscribed to "+tag, subscriptionId);
    })
    .on("data",(log) => {
        //console.log(new Date().toISOString() +" update on "+tag, log);
        //should be an array that we traverse
        const finalPayload = obtainPayloadFromLogData(contractAddress, topics, log);
        console.log(new Date().toISOString() +" update on "+tag, finalPayload[0].rewardData);
        //store on database using tag
    });
}

function parseMarketplaceTxData(data){
    let rewards = [];
    const parsedData =web3.eth.abi.decodeParameters(['tuple(address,uint256[],uint256[],address[])[]'], data);   
    const dataElement = parsedData[0][0];
    for (let index = 0; index < dataElement[3].length; index++) {
        rewards.push({walletAddress: dataElement[3][index], reward: dataElement[2][index]? dataElement[2][index]: 0 });
    }
    return rewards;
}

function parseFactoryTxData(topic, data){
    return data
}

function obtainPayloadFromLogData(address, topics, log){
    let payments = [];
    let payload = JSON.parse(JSON.stringify(log));
    let rewardStructure = [];
    switch (address) {
        case contracts['marketplace'].contractAddress:
            rewardStructure.push(parseMarketplaceTxData(payload.data));
            break;
        case contracts['factory'].contractAddress:
            rewardStructure.push(parseFactoryTxData(topics[0], payload.data));
            break;
        default:
            break;
    }

    rewardStructure.forEach(element => {
       payments.push({...payload, rewardData: element});
    });

    return payments;
}

async function run(){
    for (const key in contracts) {
        if (Object.hasOwnProperty.call(contracts, key)) {
            const element = contracts[key];
            const { contractAddress, topics, startingBlock, tag} = element;
            await subscribeToEvents(contractAddress, topics, startingBlock, tag);
        }
    }
}

run();
