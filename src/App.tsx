import { useEffect, useState } from 'react';
import Web3 from 'web3';
import './index.css';

const App = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <header className="w-full bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">ElixrEscrow</h1>
        <div>
          <p>Account: {account ? account : "Not Connected"}</p>
        </div>
      </header>
      <main className="flex flex-col items-center mt-10 w-full px-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Create Transaction</h2>
          <form className="flex flex-col space-y-4">
            <input 
              type="text" 
              placeholder="Seller Address" 
              className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input 
              type="text" 
              placeholder="Amount in ETH" 
              className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button 
              type="button" 
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 rounded-lg"
            >
              Create Transaction
            </button>
          </form>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-10">
          <h2 className="text-2xl font-semibold mb-4">Confirm Delivery</h2>
          <form className="flex flex-col space-y-4">
            <input 
              type="text" 
              placeholder="Transaction ID" 
              className="px-4 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button 
              type="button" 
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 rounded-lg"
            >
              Confirm Delivery
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default App;
