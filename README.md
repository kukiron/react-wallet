# react-wallet 💰

[![CircleCI](https://circleci.com/gh/kukiron/react-wallet/tree/master.svg?style=svg)](https://circleci.com/gh/kukiron/react-wallet/tree/master)

## Demo

Deployed to heroku - [react-wallet](https://react-wallet-kukiron.herokuapp.com/)

## Getting started

If you have node & npm installed you can clone the repo & get started.

```shell
> git clone https://github.com/kukiron/react-wallet.git
> cd react-wallet
> npm i && npm start
```

The app will be available on `localhost:3000`

## Technologies used

- Material UI React: To give the app cool material design look
- Redux: Best state management solution for react app
- Redux Persist: Persists state data in the browser & gives more realistic user experience without a back-end
- Prettier: For code styling. Integrates well with VSCode
- JEST, ESLint: Testing & linting

## Development details

### Redux store

```js
store: {
  total: { balance: Number, currency: String },
  currencies: [
    { balance: Number, currency: String, createdAt?: String },
  ],
  history: [
    {
      id: String,
      date: String,
      description?: String,
      amount: Number,
      currency: String,
    },
  ],
}
```

### Actions

Following actions are responsible for app functionalities when dispatched -

- `updateTotalBalance`
- `addCurrency`
- `exchangeCurrency`
- `deleteCurrency`
- `createRecord` (creates a new transaction record)
- `deleteRecord` (deletes a transaction record)
- `deleteHistory`
- `resetState` (resets app to default state)
