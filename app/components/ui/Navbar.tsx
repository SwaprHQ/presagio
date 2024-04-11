import Link from "next/link";
import { ConnectButton } from "..";

export const Navbar = () => {
  return (
    <nav className=" bg-surface-surface-0 h-20 py-5 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-white font-black text-[24px] flex items-center md:space-x-2">
              <p className="hidden md:block">Presagio </p>
              <p>👁️</p>
            </div>
          </Link>
          <div className="mx-3 md:ml-28"></div>
        </div>
        <div className="h-10 md:w-[488px] space-x-2 flex items-center justify-end">
          <Link href="/my-bets">
            <div className="px-3 py-2 capitalize cursor-pointer bg-stone-800 hover:bg-stone-700 rounded-2xl">
              Bets
            </div>
          </Link>

          <ConnectButton />
          <div className="px-3 py-2 capitalize cursor-pointer bg-stone-800 hover:bg-stone-700 rounded-2xl">
            <div className="flex items-center space-x-2 &#9660">
              <div className="bg-green-700 rounded-full size-5"></div>
              <p className="hidden md:block">Gnosis</p>
            </div>
          </div>
          <div className="px-3 py-2 capitalize cursor-pointer bg-stone-800 hover:bg-stone-700 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};
