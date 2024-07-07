# react-wallet 💰

[![CircleCI](https://circleci.com/gh/kukiron/react-wallet/tree/master.svg?style=svg)](https://circleci.com/gh/kukiron/react-wallet/tree/master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f93a04a9-fe06-4773-ae95-0f366d90bb9e/deploy-status)](https://app.netlify.com/sites/react-wallet-kukiron/deploys)

## Demo

Deployed to Netlify - [react-wallet](https://react-wallet-kukiron.netlify.app/)

## Getting started

If you have node & npm installed you can clone the repo & get started.

```shell
> git clone https://github.com/kukiron/react-wallet.git
> cd react-wallet
> npm i && npm start
```

The app will be available on `localhost:3000`

## Technologies used

- Material UI React: To give the app a cool material design look
- Redux: Best state management solution for react app
- Redux Persist: Persists state data in the browser & gives a more realistic user experience without a back-end
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
      amount: Number,
      currency: String,
      description: String,
    },
  ],
}
```

### Actions

Following actions are responsible for the functionalities in the app (in `src/redux/actions/index.js`) -

- `updateTotalBalance`
- `addCurrency`
- `exchangeCurrency`
- `deleteCurrency`
- `createRecord` (creates a new transaction record)
- `deleteRecord` (deletes a transaction record)
- `deleteHistory`
- `resetState` (resets app to default state)
