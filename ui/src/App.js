import {useEffect, useState} from "react";
import {ethers} from "ethers";
import EthBridgeArtifact from "./contracts/EthBridge.sol/EthBridge.json";
import WTokenArtifact from "./contracts/WToken.sol/WToken.json";

import './App.css';

const EthBridge_address = "0x96c3D51639eac49a647B511B8C7cB0cCaA744845";

function App() {

  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [ethBridgeContract, setEthBridgeContract] = useState(undefined);
  const [wtokenContract, setWTokenContract] = useState(undefined);
  const [amount, setAmount] = useState(0);

  const isConnected = () => (signer !== undefined)

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    signer.getAddress()
      .then(address => {
        setSignerAddress(address)
      })

    return signer
  }

  const connect = () => {
    getSigner(provider)
      .then(signer => {
        setSigner(signer)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(amount)
    lock(amount);
  }

  const handleAmount = (event) => {
    setAmount(event.target.value);
  }

  const lock = async(amount) => {

    signer.sendTransaction({
      to: ethBridgeContract.address,
      value: amount
    })
    
  }

  useEffect(()=> {
    const init = async() => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider)

      const ethBridgeContract = await new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", EthBridgeArtifact.abi) 
      setEthBridgeContract(ethBridgeContract);

      const wtokenContract = await new ethers.Contract("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", WTokenArtifact.abi)
      setWTokenContract(wtokenContract);
    }
    init();
  }, []);
  
  return (
    <div className="App">
      <>
      <h1>Hello World</h1>

      {isConnected() ? 
      (
        <div>
          <p>Welcome {signerAddress}</p>
            <form onSubmit={handleSubmit}>
              <label >Lock</label>
                <input
                  placeholder="lock amount"
                  value={amount}
                  onChange={handleAmount}
                />
                <button type="submit">Lock</button>
            </form>
        </div>
      ):
      (
        <div>
          <p>You are not connected</p>
            <button onClick={connect}>Connect Metamask</button>
        </div>
      )}
      
      <input placeholder="Claim Amount">
      </input>
      <button>Claim</button>

      </>
    </div>
  );
}

export default App;
