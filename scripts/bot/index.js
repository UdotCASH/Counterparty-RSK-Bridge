const processSends = require('./processSends');
const processBurns = require('./processBurns');
const SmartXCP = require('./../smartXCP/SmartXCP');

const smartXCP = new SmartXCP().smartXCP;
const pauseConf = process.env.RUN_PAUSE_IN_SECONDS;
const DEFAULT_PAUSE = 300;
const pause =
  typeof pauseConf === 'string' ? parseInt(pauseConf) : DEFAULT_PAUSE;

function timeout(s) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

async function run() {
  let runNumber = 1;
  while (runNumber) {
    console.log('Run Number ', runNumber);
    await processSends(smartXCP);
    await processBurns(smartXCP);
    await timeout(pause);
    runNumber++;
  }
}

module.exports = {
  run,
  processSends,
  processBurns,
};
