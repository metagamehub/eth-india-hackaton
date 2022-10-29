const express = require("express");
const routes = express.Router();
const fs = require('fs');
const path = require('path');
const { NFTStorage, File } = require('nft.storage');
const mime = require('mime');
const { filesFromPath } = require("files-from-path");
const axios = require('axios');


async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

async function storeNFT(imagePath, name, description) {
    const image = await fileFromPath(imagePath)

    const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY })

    return nftstorage.store({
        image,
        name,
        description,
    })
}

async function storeDirectory() {
    // you'll probably want more sophisticated argument parsing in a real app
    /*if (process.argv.length !== 3) {
        console.error(`usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`)
    }*/
    const directoryPath = "./badges/"
    const files = filesFromPath(directoryPath, {
        pathPrefix: path.resolve(directoryPath), // see the note about pathPrefix below
        hidden: true, // use the default of false if you want to ignore files that start with '.'
    })

    const storage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY })

    console.log(`storing file(s) from ${path}`)
    const cid = await storage.storeDirectory(files)
    console.log({ cid })

    const status = await storage.status(cid)
    console.log(status)
}

routes.get("/ipfs/pin", async (req, res) => {
    //let result = await storeNFT("./routes/voter.png", "The Voter", "Vote for 1 proposal on the DAO governance portal");
    let result = await storeDirectory();
    res.send(result);
});

routes.get("/ipfs/getPins", async (req, res) => {

    //Modify this as the number of badges increase, in this case each badge token id is a number from 1 to 5
    let badget_n = 5;

    let arr_res = [];
    
    for (let index = 1; index <= badget_n; index++) {
        let response = await axios.get(`https://bafybeib2qys4m44jfxhaztjopgp7qsdtr7l7zapqyncukg2f7hybldinya.ipfs.nftstorage.link/${index}`);
        arr_res.push(response.data);
    }
    
    res.send(arr_res);
})

exports.ipfsRoutes = routes;