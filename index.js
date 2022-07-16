const express = require("express")
const bodyParser = require("body-parser")

const fetch = require('node-fetch')

const { Err, NotImplementedError } = require('./exceptions')

const app = express()
const Assets = {
    "TON": 1,
    "SCALE": 4,
    "BOLT": 5,
    "TEGRO": 6,
    "SCAM": 7
}

app.use(bodyParser.json())

class RocketApi {
    constructor(access_token, options) {
        if (!access_token) {
            throw new NotImplementedError("Access token is not specified")
        }

        this.options = options ? options : {}
        this.access_token = access_token
        this.onTransferCallback = null
        this.baseUrl = this.options.testnet ? 'https://dev-pay.ton-rocket.com' : 'https://pay.ton-rocket.com'
        this.headers = {
            "Content-Type": "application/json",
            "Rocket-Pay-Key": this.access_token
        }
    }

    async request(method, path, data) {
        let req = await fetch(`${this.baseUrl}/${path}`, {
            method: method,
            headers: this.headers,
            body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : undefined
        })
        let res = await req.json()
        if (!res.success && res.message) {
            if (res.errors) {
                throw new Error(`${res.message}: ${JSON.stringify(res.errors)}`)
            } else {
                throw new Error(res.message)
            }
        }

        return res
    }

    async getAppInfo() {
        return await this.request('GET', 'app/info')
    }

    async transfer({
        id,
        currency = "TONCOIN",
        amount,
        transferId = "12345",
        description = ""
    }) {
        return await this.request('POST', 'app/transfer', {
            "tgUserId": id,
            "currency": currency,
            "amount": amount,
            "transferId": transferId,
            "description": description
        })
    }

    async withdrawal({
        address,
        currency = "TONCOIN",
        amount,
        withdrawalId = "12345",
        comment = ""
    }) {
        return await this.request('POST', 'app/withdrawal', {
            "address": address,
            "currency": currency,
            "amount": amount,
            "withdrawalId": withdrawalId,
            "comment": comment
        })
    }

    async createCheque({
        chequePerUser,
        usersNumber,
        refProgram,
        password = "",
        description = "",
        sendNotifications = false,
        enableCaptcha = true,
        telegramResourcesIds
    }) {
        return await this.request('POST', 'multi-cheques', {
            "chequePerUser": chequePerUser,
            "usersNumber": usersNumber,
            "refProgram": refProgram,
            "password": password,
            "description": description,
            "sendNotifications": sendNotifications,
            "enableCaptcha": enableCaptcha,
            "telegramResourcesIds": telegramResourcesIds
        })
    }

    async getCheques() {
        return await this.request('GET', 'multi-cheques')
    }

    async getCheque({
        id
    }) {
        return await this.request('GET', `multi-cheques/${id}`)
    }

    async editCheque({
        id,
        password,
        description = "",
        sendNotifications = false,
        enableCaptcha = true,
        telegramResourcesIds
    }) {
        return await this.request('PUT', `multi-cheques/${id}`, {
            "chequePerUser": chequePerUser,
            "usersNumber": usersNumber,
            "refProgram": refProgram,
            "password": password,
            "description": description,
            "sendNotifications": sendNotifications,
            "enableCaptcha": enableCaptcha,
            "telegramResourcesIds": telegramResourcesIds
        })
    }

    async deleteCheque({
        id
    }) {
        return await this.request('DELETE', `multi-cheques/${id}`)
    }

    async createInvoice({
        amount,
        description = "",
        hiddenMessage = "",
        callbackUrl = "",
        payload = "",
        expiredIn = 0
    }) {
        return await this.request('POST', 'tg-invoices', {
            "amount": amount,
            "description": description,
            "hiddenMessage": hiddenMessage,
            "callbackUrl": callbackUrl,
            "payload": payload,
            "expiredIn": expiredIn
        })
    }

    async getInvoices() {
        return await this.request('GET', 'tg-invoices')
    }

    async getInvoice({
        id
    }) {
        return await this.request('GET', `tg-invoices/${id}`)
    }

    async deleteInvoice({
        id
    }) {
        return await this.request('DELETE', `tg-invoices/${id}`)
    }

    async getCoins() {
        return await this.request('GET', 'coins')
    }

    async getCurrencies({
        coinFrom,
        coinTo
    }) {
        return await this.request('GET', 'currencies/rate?coinFrom=' + coinFrom + '&coinTo=' + coinTo)
    }

    async start(options) {
        if (!options) {
            throw new NotImplementedError("options is not specified")
        }
        if (!options.port) {
            throw new NotImplementedError("port is not specified")
        }
        if (!options.path) {
            throw new NotImplementedError("path is not specified")
        }

        app.post(options.path, (req, res) => {
            if (typeof this.onTransferCallback == 'function') {
                this.onTransferCallback(req.body)
            }
            res.send('ok')
        })
        app.listen(options.port)
    }

    async onTransfer(callback) {
        if (typeof callback != 'function') {
            throw new Err("callback is not a function")
        }
        this.onTransferCallback = callback
    }
}

module.exports = {
    RocketApi,
    Assets
}