require("dotenv").config()

const PushAPI = require("@pushprotocol/restapi")
const ethers = require("ethers")


const signer = new ethers.Wallet(process.env.PUSH_DELEGATE_KEY);

const getNotificationInput = (eventType) => {

}


const sendNotification = async(
    recipient,
    
) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `[SDK-TEST] notification TITLE:`,
        body: `[sdk-test] notification BODY`
      },
      payload: {
        title: `[sdk-test] payload title`,
        body: `sample msg body`,
        cta: '',
        img: ''
      },
      expiry: 0,
      recipients: 'eip155:1:0xa9aa5CA3acE7252121D35711db0d7b8ECAca6B1E', // recipient address
      channel: 'eip155:1:0xa5090e5819BBA73d1921d6678B199E6949e7ac3a', // your channel address
      env: 'prod'
    });
    
    // apiResponse?.status === 204, if sent successfully!
    console.log('API repsonse: ', apiResponse);
  } catch (err) {
    console.error('Error: ', err);
  }
}

sendNotification();