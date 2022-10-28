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
        console.log(new Date().toISOString() +" update on "+tag, log);
        //store on database using tag
    });
}


async function run(){
    contracts.forEach(async (element) => {
        const { contractAddress, topics, startingBlock, tag} = element;
        await subscribeToEvents(contractAddress, topics, startingBlock, tag);
    });
}

run();
