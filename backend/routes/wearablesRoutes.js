const express = require("express");
const routes = express.Router();
const puppeteer = require('puppeteer');

routes.get("/wearables", getWearables);

async function getWearables(req, res) {
    let { address } = req.query;
    if (address) {
        if (/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            let wearables = await download(address);
            return res.status(200).json({ wearables: wearables });
        }
        return res.status(400).send({ err: "your address is not an ethereum wallet" });
    }
    return res.status(400).send({ err: "parameter 'address' is required" });
}

async function download(address) {
	try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
            'upgrade-insecure-requests': '1',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,en;q=0.8'
        });
        await page.setJavaScriptEnabled(true);
        await page.goto('https://market.decentraland.org/accounts/' + address + '?assetType=nft&section=wearables&vendor=decentraland&page=1&sortBy=newest&onlyOnSale=false&viewAsGuest=false');
        await page.waitForXPath("//div[@class='AssetImage']");
        let wearables = await page.evaluate(() => {
        	let cards = Array.from(document.querySelectorAll("div.cards > a"));
        	let result = cards.map(item => {
        		let values = item.href.split('/');
        		let top = item.querySelector("img.image");
        		let title = item.querySelector("div.title");
        		let network = item.querySelector("div.card-meta");
        		let rarity = item.querySelector("div.WearableTags > div > span");
        		let type = item.querySelector("div.WearableTags > div.icon");
        		return {
        			tokenId: values[values.length - 1],
        			contract: values[values.length - 3],
        			title: title.innerText,
        			image: top.src,
        			url: item.href,
        			network: network.innerText,
        			rarity: rarity.innerText,
        			type: type.title
        		};
        	});
        	return result;
        });
        await browser.close();
        return wearables;
    } catch (e) {
        console.log("> error when extrancting data from etherscan:", e);
        return [];
    }
}

exports.wearablesRoutes = routes;