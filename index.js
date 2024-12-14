const readLine = require("node:readline");
const priceFinder = require("./prices/price-helper");
const think = require("./calculator/price-calc");
const goddogPair_CA = "0x25E2DAe20f0b251a4cCF5AC1ff04C9A24E7c0140";

const r1 = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

getSecondPair();

async function getSecondPair() {
  r1.question(
    "Enter the address of the token you would like to pair (must be an ethereum contract): ",
    async (address) => {
      const isCAValid = validateContractAddress(address);

      if (isCAValid) {
        const price1 = await priceFinder(goddogPair_CA);
        const price2 = await priceFinder(address);

        const results = await think(price1, price2);
        outputResults(results);
      } else {
        getSecondPair();
      }
    },
  );
}

function outputResults(results) {
  console.log("1 eth equivalent of $goddog: ", results.ETHEQ1);
  console.log("1 eth equivalent of your selected tokenn: ", results.ETHEQ2);
  console.log("Goddog per your selected token: ", results.goddogPerPair);
  console.log(
    "The currentPrice being 0.958 for arbitrage: ",
    results.arbOpportunity,
  );
  console.log("Lower Tick: ", results.lowerTick);
  console.log("Upper tick: ", results.upperTick);
}

function validateContractAddress(address) {
  if (address.length === 42) {
    if (address.substring(0, 2) === "0x") {
      return true;
    }
    return false;
  } else {
    return false;
  }
}
