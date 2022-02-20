import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import NoFTs from "../../artifacts/contracts/mynft.sol/NoFTs.json";
import WalletBalance from "../components/WalletBalance.jsx";
import NFTImage from "../components/NFTImage.jsx";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, NoFTs.abi, signer);

function Home() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <NFTImage
              tokenId={i}
              getCount={getCount}
              contract={contract}
              signer={signer}
              ethers={ethers}
            />
          </div>
        ))}
    </div>
  );
}

export default Home;
