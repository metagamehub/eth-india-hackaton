const express = require("express");
const axios = require('axios')
const routes = express.Router();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

routes.get("/wearables", getWearables);

async function getWearables(req, res) {
    let { address } = req.query;
    if (address) {
        if (/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            findWearablesList(address).then(async ids => {
                let wearables = [], buffer = [];
                for (let id of ids) {
                    buffer.push(id.urn);
                    if (buffer.length == 50) {
                        wearables = wearables.concat(await getWearablesData(buffer));
                        buffer = [];
                    }
                }
                if (buffer.length > 0)
                    wearables = wearables.concat(await getWearablesData(buffer));
                for (let wearable of wearables)
                    for (let id of ids)
                        if (wearable.id === id.urn)
                            wearable.amount = id.amount;
                return res.status(200).json({ wearables: wearables });
            }).catch(err => {
                return res.status(400).send({ err: "Warables couldn't be found, an error ocurred with the Decentraland's API" });
            });
        } else
            return res.status(400).send({ err: "your address is not an ethereum wallet" });
    } else
        return res.status(400).send({ err: "parameter 'address' is required" });
}

async function findWearablesList(address, attemps) {
    return new Promise(async (resolve, reject) => {
        let url = "https://peer.decentraland.org/lambdas/collections/wearables-by-owner/" + address;
        await axios.get(url, { headers: {
            'Content-Type': 'application/json'
        }}).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
}

async function getWearablesData(itemIds) {
    let wearables = undefined;
    while (!wearables) wearables = await getWearablesDataById(itemIds);
    return wearables;
}

async function getWearablesDataById(itemIds) {
    return new Promise(async (resolve, reject) => {
        let url = "https://peer.decentraland.org/lambdas/collections/wearables";
        for (let i = 0; i < itemIds.length; i++)
            url += ((i > 0) ? '&' : '?') + 'wearableId=' + itemIds[i];
        await axios.get(url, { headers: {
            'Content-Type': 'application/json'
        }}).then(response => {
            resolve(response.data.wearables);
        }).catch(err => {
            resolve(undefined);
        });
    });
}

exports.wearablesRoutes = routes;