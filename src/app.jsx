/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Header, Divider, Segment, Dropdown, Label, Grid, Form, Message, Button, Icon } from 'semantic-ui-react';
import axios from 'axios'

export default () => {
  const [currencies, setCurrencies] = useState([]);

  const [state, setState] = useState({
    from: {
      id: '',
      name: '',
    },
    to: {
      id: '',  
      name: '',
    },
    amount: 1,
    rate: null,
    conversion: null,
  });

  const getConversionRate = async () => {
    try {
      const { data } = await axios.get(`https://free.currconv.com/api/v7/convert?apiKey=11b90974ae4a42482dbc&q=${from.id}_${to.id}&compact=ultra`);
      const rate = Object.values(data)[0];
      setState({ ...state, rate });
      return rate;
    }
    catch (err) {
      return err;
    }
  }

  const convertCurrency = async () => {
    const rate = await getConversionRate();
    const { amount } = state;
    const conversion = (amount * rate).toFixed(3);
    setState({ ...state, conversion });
  }

  useEffect(() => {
    axios.get('https://free.currconv.com/api/v7/countries?apiKey=11b90974ae4a42482dbc')
      .then(res => {
        const formattedCurrencies = Object
          .values(res.data.results)
          .map(item => {
            const symbol = item.currencySymbol || '';
            return {
              key: item.id,
              value: `${item.currencyId}: ${item.currencyName} - ${symbol}`,
              flag: item.id.toLowerCase(),
              text: `${item.currencyId}: ${item.currencyName} - ${symbol}`
            }
          });
          setCurrencies(formattedCurrencies);
      })
      .catch(err => err);
  }, []);

  const onInputChange = (_event, { name, value }) => {
    _event.preventDefault();
    if (name) {
      switch (name) {
        case 'amount':
          const newValue = parseInt(value);
          return setState({ ...state, amount: newValue });

        case 'from':
        case 'to':
          const [id, newName] = value.split(': ');
          return setState({ ...state, [name]: { id, name: newName } });
      }
    }
  }

  const { from, to, amount, conversion } = state;

  return (
    <Container text>
      <Header as="h1" style={{ marginTop: '15px' }}>Currency Converter</Header>
      <Divider />
      <Segment color='teal'>
        <Grid columns={2} stackable>
          <Divider vertical />
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Form>
                <Header as="h4">From:</Header>
                <Dropdown search fluid selection labeled options={currencies} placeholder='Select a currency' name='from' onChange={onInputChange}></Dropdown>
                <Header as="h4">To:</Header>
                <Dropdown search fluid selection labeled options={currencies} placeholder='Select a currency' name='to' onChange={onInputChange}></Dropdown>
                <Header as="h4">Amount</Header>
                <Form.Input labelPosition='right' type='text' name='amount' placeholder='Amount' onChange={onInputChange}>
                  <input type="number" />
                  <Label>.00</Label>
                </Form.Input>
              </Form>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Message>
                <Message.Header>{conversion && (`${amount} ${from.name} equals ${conversion} ${to.name} `)}</Message.Header>
              </Message>
              <Button onClick={convertCurrency} color="teal" style={{ margin: '5px' }}>Convert currency</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
};
