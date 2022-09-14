import React, {useState} from 'react';
import {splitByNewLine} from '../utils/utils';

const RegisterForAirdrop = ({}) => {
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [tokenDecimals, setTokenDecimals] = useState();
  const [tokenTotalSupply, setTokenTotalSupply] = useState();
  const [merkleTreeData, setMerkleTreeData] = useState([]);

  const handleOnChangeTokenName = (e) => {
    setTokenName({tokenName: e.target.value});
  }

  const handleOnChangeTokenSymbol = (e) => {
    setTokenSymbol({tokenSymbol: e.target.value});
  }

  const handleOnChangeTokenDecimals = (e) => {
    setTokenDecimals({tokenDecimals: e.target.value});
  }

  const handleOnChangeTokenTotalSupply = (e) => {
    setTokenTotalSupply({tokenTotalSupply: e.target.value});
  }

  const handleOnChangeMerkleTreeData = (e) => {
    const merkleTreeDataArray = splitByNewLine(e.target.value);
    setMerkleTreeData({merkleTreeData: merkleTreeDataArray});
  }

  const createAirdrop = (e) => {
    e.preventDefault();
    console.log(tokenName);
    console.log(tokenSymbol);
    console.log(tokenDecimals);
    console.log(tokenTotalSupply);
    console.log(merkleTreeData);

    const metadata = {
      spec: "ft-1.0.0",
      name: tokenName,
      symbol: tokenSymbol,
      decimals: tokenDecimals
    };

    console.log(metadata);

    contract.createAirdrop()
      .then(async () => {return contract.createAirdrop();})
      .then()
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  return (
    <main>
      <h1>
        Airdrop
      </h1>
      <form onSubmit={createAirdrop} className="change">
        <label>Name:</label>
        <div>
          <input
            autoComplete="off"
            defaultValue={tokenName}
            id="tokenNameInput"
            onChange={handleOnChangeTokenName}
          />
        </div>
        <label>Symbol:</label>
        <div>
          <input
            autoComplete="off"
            defaultValue={tokenSymbol}
            id="tokenSymbolInput"
            onChange={handleOnChangeTokenSymbol}
          />
        </div>
        <label>Decimals:</label>
        <div>
          <input
            autoComplete="off"
            defaultValue={tokenDecimals}
            id="tokenDecimalsInput"
            onChange={handleOnChangeTokenDecimals}
          />
        </div>
        <label>Total supply:</label>
        <div>
          <input
            autoComplete="off"
            defaultValue={tokenTotalSupply}
            id="tokenTotalSupply"
            onChange={handleOnChangeTokenTotalSupply}
          />
        </div>
        <label>Airdrop accounts and amount:</label>
        <div>
          <textarea
            autoComplete="off"
            defaultValue={merkleTreeData}
            id="merkleTreeData"
            onChange={handleOnChangeMerkleTreeData}
          />
        </div>
        <button>
          <span>Create airdrop</span>
          <div className="loader"></div>
        </button>
      </form>
    </main>
  );
}

export default RegisterForAirdrop;