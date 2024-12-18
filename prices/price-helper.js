const axios = require("axios");
module.exports = async function (address) {
  try {
    const request = await axios.get(
      "https://api.dexscreener.com/latest/dex/tokens/" + address
    );
    const { data } = request;

    let { priceUsd } = data.pairs[0];
    priceUsd = Number(priceUsd);
    console.log("price", { priceUsd });
    return priceUsd;
  } catch (error) {
    console.log(error);
  }
};
