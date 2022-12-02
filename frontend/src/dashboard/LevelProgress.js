import React, { useEffect, useState,useRef } from "react";
import { useProvider,useAccount } from 'wagmi'
import { getBalance as getMLPBalance, getLevel as getMLPLevel } from "../services/MLPContractService";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const LevelProgress = ({ progress }) => {
	
	const provider= useProvider();
	const [balance, setBalance] = useState();
	const [level, setLevel] = useState();
	const mounted = useRef(true);
	const account = useAccount()

	const Parentdiv = {
		height: "12px",
		width: "100%",
		backgroundColor: "#292929",
		borderRadius: 5,
	};

	const Childdiv = {
		height: "100%",
		width: `100%`,
		borderRadius: 5,
		textAlign: "right",
	};

	const progresstext = {
		padding: 10,
		fontWeight: 900,
	};

	useEffect(() => {
		const claimTokens = async () => {
			await axios
				.post(
					process.env.REACT_APP_WALLETCONNECT_BACKEND_URL +
						"/db/claimTokens?walletAddress=" +
						localStorage.getItem("address")
				)
				.then(async (res) => {
					let poinsMinted;
					if(typeof res.data === 'number')
						poinsMinted=res.data
					else
						poinsMinted=0
			        !mounted.current && toast.custom((t) => (
						<div
							className={`${
								t.visible ? "animate-enter" : "animate-leave"
							} text-white max-w-md w-full bg-grey rounded-lg pointer-events-auto flex ring-1 ring-white`}
						>
							<div className="flex-1 w-0 px-2">
								<div className="flex items-center">
									<h2 className='text-md'>
										EXP
									</h2>
									<div className="ml-3 flex-1">
										<p className="text-sm font-medium">
											Points!
										</p>
										<p className="mt-1 text-sm">
											You have earned {poinsMinted} points and they are currently being minted.
										</p>
									</div>                
								</div>
							</div>
							<div className="flex border-l border-white">
								<button
									onClick={() => toast.dismiss(t.id)}
									className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
								>
									Close
								</button>
							</div>
						</div>
					))
           
                    setBalance(await getMLPBalance(account.address, provider));
					setLevel(await getMLPLevel(account.address, provider))
				});
		};
		const getBalance = async () => {
			console.log(">> bringing points");
			setBalance(await getMLPBalance(account.address, provider));
		};
		provider && claimTokens() && getBalance();
		return () => { mounted.current = false };
	}, [provider]);



	return (
		<>
		<Toaster position="bottom-center" reverseOrder={false} />
		<div className="flex flex-col">
			{balance && (
				<div className="flex items-end">
					<h2>{`${balance}`}</h2>
					<h3 className="gradientText font-title text-2xl pl-2 pb-1">MLP</h3>
				</div>
			)}
			<div style={Parentdiv}>
				<div style={Childdiv} className="gradientbox1">
					<span style={progresstext}></span>
				</div>
			</div>
			<div className="flex ml-auto mr-0">
				<h2 className="gradientText font-title text-xl">LVL</h2>
				<h2 className="pl-2 font-title text-xl">{`${level}`}</h2>
			</div>
		</div></>
	);
};
