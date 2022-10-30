import React from 'react'

export const WalletModal = () => {
  return (
    <>
      <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-screen z-50">
      <div className="absolute h-full w-full bg-black bg-opacity-40 backdrop-filter backdrop-blur" />
      <div className="z-10 w-80 transform scale-85 sm:scale-100 flex flex-col items-stretch shadow-dark text-center p-5 rounded-xl border border-white border-opacity-20 bg-grey-darkest bg-opacity-20 backdrop-filter backdrop-blur-xl">
        <p className="text-2xl font-title text-white py-4 truncate">Connect Wallet </p>
        <div className="flex flex-col gap-6 py-6">
          <button className="p-[1px] rounded-xl bg-gradient-to-r from-[#0A59AA] to-[#A278F8]">
            <span className="block px-4 py-4 font-semibold rounded-xl bg-[#111111] font-body text-white">
              <div className='flex items-center'>
                <div className='w-[50px]'>
                  <Image src={'/Images/metamask.svg'} alt={"MGH QR"} layout={'responsive'} width={200} height={200} />
                </div>
                <p className="pl-4 font-body font-light">Metamask</p>
              </div>
            </span>
          </button>
          <button className="p-[1px] rounded-xl bg-gradient-to-r from-[#0A59AA] to-[#A278F8]">
            <span className="block px-4 py-4 font-semibold rounded-xl bg-[#111111] font-body text-white">
              <div className='flex items-center'>
                <div className='w-[50px]'>
                  <Image src={'/Images/walletconnect.svg'} alt={"MGH QR"} layout={'responsive'} width={200} height={200} />
                </div>
                <p className="pl-4 font-body font-light">WalletConnect</p>
              </div>
            </span>
          </button>
          <button className="p-[1px] rounded-xl bg-gradient-to-br from-[#A278F8] to-[#0A59AA] mt-4">
            <span className="block px-4 py-4 font-semibold rounded-xl font-body text-white">
              <div className='flex items-center justify-center'>
                <p className="pl-4 font-body font-light truncate">Close</p>
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}