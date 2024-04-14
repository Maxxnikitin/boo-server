import express from "express";
import cors from "cors";
import axios from "axios";
import { Connection } from "@solana/web3.js";

const SOLANA_URL = "https://api.mainnet-beta.solana.com";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.post("/api/transaction", async (req, res) => {
  const connection = new Connection(req.body?.solanaUrl ?? SOLANA_URL);

  try {
    const blockhash = (await connection.getLatestBlockhash()).blockhash;
    const minRent = await connection.getMinimumBalanceForRentExemption(0);

    res.status(200).json({ blockhash, minRent });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/api/balance", async (req, res) => {
  try {
    const { data } = await axios.post(req.body?.solanaUrl ?? SOLANA_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: ["5xULTU6LW3ywDaikVB5a1tsFrtL6tv6gc4mEjhXzkNZX"],
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(222, error);
    res.status(400).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server started, port: ${port}`);
});
