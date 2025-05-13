const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 4000;

// Common headers to simulate a real browser
const defaultHeaders = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Upgrade-Insecure-Requests": "1",
  "Cache-Control": "max-age=0",
};

app.get("/proxy", async (req, res) => {
  const { vin } = req.query;
  const targetURL = `https://carcheck.by/en/auto/${vin}`;

  try {
    // Send the request to the external site with headers to simulate a real browser
    const response = await axios.get(targetURL, { headers: defaultHeaders });

    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error fetching data from target:", error);
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.get("/proxyCaptchaId", async (req, res) => {
  const targetURL = `https://minjust.gov.by/directions/enforcement/debtors/`;

  try {
    // Send the request to the external site with headers to simulate a real browser
    const response = await axios.get(targetURL, { headers: defaultHeaders });
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error fetching data from target:", error);
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
