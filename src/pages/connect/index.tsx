import { useState, useEffect } from 'react';
import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";

declare global {
  interface Window {
    ethereum: any;
  }
}

const connect = async () => {
// async function connect () {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const walletAddress = accounts[0];
      return walletAddress;
    } catch (error) {
      console.error('Error connecting to account:', error);
    }
  } else {
    console.log('MetaMask is not installed');
  }
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [walletAddress, setWalletAddress] = useState('');

  return (
    <div
      className={`h-full flex flex-col before:from-white after:from-sky-200 py-2 ${inter.className}`}
    >
      <Header />
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="grid gap-4">
          <Image
            src="https://images.ctfassets.net/9sy2a0egs6zh/4zJfzJbG3kTDSk5Wo4RJI1/1b363263141cf629b28155e2625b56c9/mm-logo.svg"
            alt="MetaMask"
            width={320}
            height={140}
            priority
          />
          <button
			className="bg-black text-white p-4 rounded-lg"
			onClick={
				async () => {
					const address = await connect();
					setWalletAddress(address);
				}
			}
		  >
            Connect to MetaMask
          </button>
		  <p>walletAddress: {walletAddress}</p>
        </div>
      </div>
    </div>
  );
}
