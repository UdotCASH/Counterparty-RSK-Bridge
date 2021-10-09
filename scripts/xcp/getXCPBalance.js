const axios = require('axios');
const { XCP_API_PASSWORD, XCP_API_URL, XCP_API_USER } = require('./apiDetails');

async function getXCPBalance(address) {
  const body = {
    jsonrpc: '2.0',
    id: 0,
    method: 'get_balances',
    params: {
      filters: [
        {
          field: 'address',
          op: '==',
          value: address,
        },
        {
          field: 'asset',
          op: '==',
          value: 'XCP',
        },
      ],
      filterop: 'and',
    },
  };
  try {
    const response = await axios({
      method: 'post',
      url: XCP_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: JSON.stringify(body),
      auth: {
        username: XCP_API_USER,
        password: XCP_API_PASSWORD,
      },
    });
    const { data, status } = response;
    if (status !== 200) {
      throw new Error();
    }
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

module.exports = getXCPBalance;
