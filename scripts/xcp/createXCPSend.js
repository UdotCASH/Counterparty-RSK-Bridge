const axios = require('axios');
const { XCP_API_PASSWORD, XCP_API_URL, XCP_API_USER } = require('./apiDetails');

async function createXCPSend(source, destination, quantity, memo, fee) {
  const body = {
    jsonrpc: '2.0',
    id: 0,
    method: 'create_send',
    params: {
      source,
      destination,
      asset: 'XCP',
      quantity,
      allow_unconfirmed_inputs: true,
    },
  };
  if (typeof memo === 'string') {
    body.params.memo = memo;
  }
  if (typeof fee === 'number') {
    body.params.fee = fee;
  }
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
    const { result } = data;
    const unsignedHex = result;
    return unsignedHex;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = createXCPSend;
