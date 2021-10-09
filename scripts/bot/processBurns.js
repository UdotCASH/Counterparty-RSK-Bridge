const SmartXCP = require('./../smartXCP/SmartXCP');

async function processBurns(smartXCP) {
  let burns = await SmartXCP.getBurns(smartXCP);
  for (burn of burns) {
    console.log(burn);
    console.log(burn[0]);
    console.log(burn[1]);
    console.log(burn[2]);
    console.log(burn[3]);

    //createXCPSend()
  }
}

module.exports = processBurns;
