const priceFinder = require("../prices/price-helper");

module.exports = async function (price1, price2) {
  const ETH_Price = await ethereumPrice(price1, price2);

  const { ETHEQ1, ETHEQ2 } = convertToETH(price1, price2, ETH_Price);
  const goddogPerPair = calculatePerPair(ETHEQ1, ETHEQ2);
  const arbOpportunity = calculateArbOpportunity(goddogPerPair);
  const lowerTick = calculateLowerTick(arbOpportunity);
  const upperTick = lowerTick * 3;

  return {
    ETHEQ1,
    ETHEQ2,
    goddogPerPair,
    arbOpportunity,
    lowerTick,
    upperTick,
  };
};

async function ethereumPrice(price1, price2) {
  const ethPrice = await priceFinder(
    "0x42161084d0672e1d3F26a9B53E653bE2084ff19C",
  );

  return ethPrice;
}

function convertToETH(price1, price2, ETH_Price) {
  return { ETHEQ1: ETH_Price / price1, ETHEQ2: ETH_Price / price2 };
}

function calculatePerPair(ETHEQ1, ETHEQ2) {
  return ETHEQ1 / ETHEQ2;
}

function calculateArbOpportunity(pricePerPair) {
  return pricePerPair * 0.958;
}

function calculateLowerTick(arbOpportunityPrice) {
  const percentReduction = arbOpportunityPrice * 0.042;

  return arbOpportunityPrice - percentReduction;
}
