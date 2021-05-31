import { utils } from "ethers";
import Head from "next/head";
import { FormEvent, useState } from "react";
import styles from "../styles/Home.module.css";
import getTokenURI from "../utils/getTokenURI";

// https://stackoverflow.com/questions/20169217/how-to-write-isnumber-in-javascript
const isNumber = function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
};

const Home: React.FC = () => {
  const [address, setAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenUri, setTokenUri] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!utils.isAddress(address)) {
      console.log("???");
      return alert("Address is not valid");
    }

    if (!isNumber(Number(tokenId))) {
      return alert("TokenID must be a number");
    }
    const res = await getTokenURI(address, tokenId);
    setTokenUri(res);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Check Token Metadata</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Get ERC721 Metadata</h1>
        <p>
          Paste the Token Address and TokenID, we'll fetch the TokenURI for you
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Address">
            Address
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label htmlFor="TokenId">
            TokenID
            <input
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </label>
          <button type="submit">Find out</button>
        </form>
        {tokenUri && (
          <div>
            <h3>Result:</h3>
            <pre>{tokenUri}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
