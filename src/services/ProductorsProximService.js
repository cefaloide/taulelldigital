import axios from "axios";

const BASE_API_URL =
  "https://analisi.transparenciacatalunya.cat/resource/xmyy-7xqi.json";

export const productorsProximService = {
  getAll,
};

async function getAll() {
  const population = await axios
    .get(`${BASE_API_URL}`)
    .then((response) => response.data)
    .catch((error) => {
      const errorMsg = "Error getting data";
      console.log(errorMsg);
      return errorMsg;
    });

  return population;
}
