const axios = require('axios');
const { BTC_URL } = require('./apiDetails');

async function broadcastSignedTransaction(signedTxHex) {
  const body = {
    jsonrpc: '1.0',
    id: 'curltest',
    method: 'sendrawtransaction',
    params: [signedTxHex],
  };
  try {
    const response = await axios({
      method: 'post',
      url: BTC_URL,
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    const { data, status } = response;
    if (status !== 200) {
      throw new Error();
    }
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = broadcastSignedTransaction;
