/* eslint-disable no-unused-vars */
import React from 'react';
import './stylesheet/main.scss';

const endpoints = {
  countries: 'https://free.currconv.com/api/v7/countries?apiKey={API+KEY}',
  currencies: 'https://free.currconv.com/api/v7/currencies?apiKey={API+KEY}',
  singleConversion: {
    short: 'https://free.currconv.com/api/v7/convert?apiKey={API+KEY}&q=USD_PHP&compact=ultra',
    long: 'https://free.currconv.com/api/v7/convert?apiKey={API+KEY}&q=USD_PHP&compact=y',
  },
  apiKey: '11b90974ae4a42482dbc',
  publicEndpoint: 'https://free.currconv.com/api/v7/countries?apiKey=do-not-use',
};

export default () => <div>Hello World</div>;
