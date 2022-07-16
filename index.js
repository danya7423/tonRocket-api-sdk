const fetch = require('node-fetch')

const Assets = {
    "TON": 1,
    "SCALE": 4,
    "BOLT": 5,
    "TEGRO": 6,
    "SCAM": 7
}

class RocketApi {
    constructor(access_token, options) {
        if (!access_token) {
            throw new Error('access_token is required')
        }

        this.options = options ? options : {}
        this.access_token = access_token
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
        return await req.json()
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
}

module.exports = {
    RocketApi,
    Assets
}