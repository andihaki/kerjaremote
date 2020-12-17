const axios = require('axios').default;

const options = (keyword) => ({
  method: 'GET',
  url: 'https://kodebaik.auth0.com/api/v2/users',
  params: {
    q: `nickname:*${keyword}*`,
    connection: 'kerjaremote',
    search_engine: 'v3',
  },
  headers: {
    authorization:
      `Bearer ${process.env.AUTH0_TOKEN}`,
  },
});
module.exports = async (req, res) => {
  const { keyword } = req.body;
  console.log({ keyword });
  axios.request(options(keyword)).then((response) => {
    // console.log(response.data);
    res.status(200).json(response.data);
  }).catch((error) => {
    console.error(error);
    res.status(200).json({ error });
  });
};
