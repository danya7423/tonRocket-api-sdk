# SDK для работы с TON Rocket

## ⚙️ Установка

```shell
npm install tonrocket-api-sdk --save
```

## 🔐 Авторизация

Как получить токен написано [тут](https://pay.ton-rocket.com/api/).

```javascript
const { RocketApi, Assets } = require('tonrocket-api-sdk')

const api = new RocketApi('токен')
```

Вы так же можете использовать [testnet](https://t.me/ton_rocket_test_bot)
```javascript
const api = new RocketApi('токен', {
    testnet: true
})
```
## ⬇️ Навигация

#### 🚀 [Методы](#методы)
##### [- getAppInfo](#getappinfo)
##### [- transfer](#transfer)
##### [- withdrawal](#withdrawal)

##### [- createCheque](#createcheque)
##### [- getCheques](#getcheques)
##### [- getCheque](#getcheque)
##### [- editCheque](#editcheque)
##### [- deleteCheque](#deletecheque)

##### [- createInvoice](#createinvoice)
##### [- getInvoices](#getinvoices)
##### [- getInvoice](#getinvoice)
##### [- deleteInvoice](#deleteinvoice)

##### [- getCoins](#getcoins)
##### [- getCurrencies](#getcurrencies)

#### 🌴 [Константы](#константы)
##### [- Assets](#assets)
## 🚀 Методы

Параметры отмеченные знаком * являются обзательными

### getAppInfo 
[Документация](https://pay.ton-rocket.com/api/#/app/AppsController_getAppInfo)
| Параметр | Информация |
|---------|-------------|
| Не принимает параметров |

Пример:
```javascript
const appInfo = await api.getAppInfo()
```

### transfer 
[Документация](https://pay.ton-rocket.com/api/#/app/AppsController_transfer)
| Параметр | Информация |
|---------|-------------|
| tgUserId* | ID получателя перевода |
| amount* | Сумма перевода |
| currency | Валюта перевода. По умолчанию: "TONCOIN" |
| transferId | По умолчанию: "12345" |
| description | По умолчанию: "" |

Пример:
```javascript
const transfer = await api.transfer({
  "tgUserId": 87209764,
  "currency": "TONCOIN",
  "amount": 1.23,
  "transferId": "abc-def",
  "description": "You are awesome!"
})
```

### withdrawal
[Документация](https://pay.ton-rocket.com/api/#/app/AppsController_withdrawal)
| Параметр | Информация |
|---------|-------------|
| address* | TON кошелек, на который нужно отправить монеты |
| amount* | Сумма перевода |
| currency | Валюта для вывода. По умолчанию: "TONCOIN" |
| withdrawalId | По умолчанию: "12345" |
| comment | По умолчанию: "" |

Пример:
```javascript
const withdrawal = await api.withdrawal({
  "address": "EQB1cmpxb3R-YLA3HLDV01Rx6OHpMQA_7MOglhqL2CwJx_dz",
  "currency": "TONCOIN",
  "amount": 1.23,
  "withdrawalId": "abc-def",
  "comment": "You are awesome!"
})
```

### createCheque
[Документация](https://pay.ton-rocket.com/api/#/multi-cheques/ChequesController_createCheque)
Все параметры как в документации

Пример:
```javascript
const cheque = await api.createCheque({
  "chequePerUser": 0.005,
  "usersNumber": 100,
  "refProgram": 50,
  "password": "pwd",
  "description": "This cheque is the best",
  "sendNotifications": true,
  "enableCaptcha": true,
  "telegramResourcesIds": [
    "-1001799549067"
  ]
})
```

### getCheques
[Документация](https://pay.ton-rocket.com/api/#/multi-cheques/ChequesController_getCheques)
| Параметр | Информация |
|---------|-------------|
| Не принимает параметров |

Пример:
```javascript
const cheques = await api.getCheques()
```

### getCheque
[Документация](https://pay.ton-rocket.com/api/#/multi-cheques/ChequesController_getCheque)
| Параметр | Информация |
|---------|-------------|
| id* | ID чека |

Пример:
```javascript
const cheques = await api.getCheque({
  id: 1234
})
```

### editCheque
[Документация](https://pay.ton-rocket.com/api/#/multi-cheques/ChequesController_editCheque)
| Параметр | Информация |
|---------|-------------|
| id* | ID чека |
| Всё остальное как в документации |

Пример:
```javascript
const cheque = await api.editCheque({
  "id": 1234
  "password": "pwd",
  "description": "This cheque is the best",
  "sendNotifications": true,
  "enableCaptcha": true,
  "telegramResourcesIds": [
    "-1001799549067"
  ]
})
```

### deleteCheque
[Документация](https://pay.ton-rocket.com/api/#/multi-cheques/ChequesController_deleteCheque)
| Параметр | Информация |
|---------|-------------|
| id* | ID чека |

Пример:
```javascript
const cheque = await api.deleteCheque({
  id: 1234
})
```

### createInvoice
[Документация](https://pay.ton-rocket.com/api/#/tg-invoices/InvoicesController_createInvoice)
Все параметры как в документации

Пример:
```javascript
const invoice = await api.createInvoice({
  "amount": 1.23,
  "description": "best thing in the world, 1 item",
  "hiddenMessage": "thank you",
  "callbackUrl": "https://t.me/ton_rocket",
  "payload": "some custom payload I want to see in webhook or when I request invoice",
  "expiredIn": 10
})
```

### getInvoices
[Документация](https://pay.ton-rocket.com/api/#/tg-invoices/InvoicesController_getInvoices)
| Параметр | Информация |
|---------|-------------|
| Не принимает параметров |

Пример:
```javascript
const invoices= await api.getInvoices()
```

### getInvoice
[Документация](https://pay.ton-rocket.com/api/#/tg-invoices/InvoicesController_getInvoice)
| Параметр | Информация |
|---------|-------------|
| id* | ID счёта |

Пример:
```javascript
const invoice = await api.getInvoice({
  id: 1234
})
```

### deleteInvoice
[Документация](https://pay.ton-rocket.com/api/#/tg-invoices/InvoicesController_deleteInvoice)
| Параметр | Информация |
|---------|-------------|
| id* | ID счёта |

Пример:
```javascript
const invoice = await api.deleteInvoice({
  id: 1234
})
```

### getCoins
[Документация](https://pay.ton-rocket.com/api/#/coins/CoinsController_get)
| Параметр | Информация |
|---------|-------------|
| Не принимает параметров |

Пример:
```javascript
const coins = await api.getCoins()
```

### getCurrencies
[Документация](https://pay.ton-rocket.com/api/#/currencies/CurrenciesController_getRates)
| Параметр | Информация |
|---------|-------------|
| coinFrom* | ID токена |
| coinTo* | ID токена |

Пример:
```javascript
const currencies = await api.getCurrencies({
  coinFrom: Assets.TON,
  coinTo: Assets.SCALE
})
```

## 🌴 Константы
### Assets
| Константа | Значение |
|---------|-------------|
| Assets.TON | 1 |
| Assets.SCALE | 4 |
| Assets.BOLT | 5 |
| Assets.TEGRO | 6 |
| Assets.SCAM | 7 |