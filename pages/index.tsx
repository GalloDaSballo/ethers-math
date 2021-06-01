import ethers, { BigNumber } from "ethers";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const ONE_REN_BTC = BigNumber.from("100000000");
const BTC_USD = BigNumber.from("3691396868687");
const ONE_ETH = BigNumber.from("1000000000000000000");

const collateralDecimal = ONE_ETH; // 18 decimals
const collateralPriceDecimal = 1; // 1 USD

const minRatio = BigNumber.from("110");
const ratioBuff = BigNumber.from("200");
const ratioBuffMax = BigNumber.from("10000");

const getLatestCollateralPrice = () => {
  return BTC_USD.mul(collateralPriceDecimal).div(1e8); // Hardcode ratio for USD, hardcoded ratio for decimals
};

const collateralValue = (collateralAmt) => {
  const collateralPrice = getLatestCollateralPrice();
  return collateralAmt
    .mul(collateralPrice)
    .mul(ONE_ETH)
    .div(collateralDecimal)
    .div(collateralPriceDecimal); // debtToken in 1e18 decimal
};

const getBufferedMinRatio = (multiplier) => {
  return minRatio.mul(multiplier).add(ratioBuff).div(100);
};

// if borrow is true (for addCollateralAndBorrow): return (maxDebt - currentDebt) if positive value, otherwise return 0
// if borrow is false (for repayAndRedeemCollateral): return (currentDebt - maxDebt) if positive value, otherwise return 0
const calculateDebtFor = (collateralAmt) => {
  const maxDebt = collateralValue(collateralAmt)
    .mul(ratioBuffMax)
    .div(getBufferedMinRatio(ratioBuffMax));
  return maxDebt;
};

const Home: React.FC = () => {
  const debt = calculateDebtFor(ONE_REN_BTC);
  console.log("debt", debt.toString());
  console.log(BTC_USD.div(debt).toString());
  return (
    <div className={styles.container}>
      <Head>
        <title>Check Token Metadata</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Ethers Math</h1>
      </main>
    </div>
  );
};

export default Home;
