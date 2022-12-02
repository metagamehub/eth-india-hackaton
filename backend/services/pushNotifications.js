require('dotenv').config()

const PushAPI = require('@pushprotocol/restapi')
const ethers = require('ethers')

const signer = new ethers.Wallet(process.env.PUSH_DELEGATE_KEY)

const getNotificationInput = (eventType) => {}

const notificationTypes = {
    point: {
        notification: { title: '', body: '' },
        payload: { title: '', body: '' },
    },
    badge: {
        notification: { title: '', body: '' },
        payload: { title: '', body: '' },
    },
    event: {
        notification: { title: '', body: '' },
        payload: { title: '', body: '' },
    },
}

const sendNotification = async (
    notificationType,
    recipient,
    imageUrl,
    titleSuffix,
    bodySuffix,
    expiryMinutesLeft
) => {
    let { notification, payload } = notificationTypes[notificationType]
    payload.img = imageUrl
    payload.title += titleSuffix
    payload.body += bodySuffix
    payload.cta =process.env.MLM_URL
    let expiry
    if(expiryMinutesLeft)
     expiry = Date.now() / 1000 + expiryMinutesLeft * 60
    const type = recipient ? 3 : 1
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type, // target
            identityType: 2, // direct payload
            notification,
            payload,
            expiry,
            recipients: `eip155:1:${recipient}`, // recipient address
            channel: `eip155:1:${process.env.PUSH_CHANNEL_ADDRESS}`, // your channel address
            env: 'prod',
        })

        // apiResponse?.status === 204, if sent successfully!
        console.log('API repsonse: ', apiResponse)
    } catch (err) {
        console.error('Error: ', err)
    }
}

sendNotification()
