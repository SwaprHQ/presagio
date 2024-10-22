import Link from 'next/link';
import { APP_NAME, Categories, DISCORD_URL, GITHUB_URL, X_URL } from '@/constants';
import { MadeBySwapr } from '@/app/components/MadeBySwapr';

export const Footer = () => (
  <div className="mt-32 border-t border-surface-surface-2 bg-surface-surface-0 px-6 md:px-10 lg:px-20 xl:px-40">
    <div className="flex flex-col-reverse items-start justify-between py-10 md:flex-row">
      <div className="w-full space-y-12 md:w-fit">
        <div className="hidden space-y-2 md:block">
          <Logo />
          <p>Where prediction markets and AI agents meet</p>
        </div>
        <PoweredByPartners />
      </div>
      <div className="flex space-x-20">
        <div>
          <p className="mb-2 text-lg font-bold">Markets</p>
          <ul className="space-y-1">
            {Object.values(Categories).map(category => (
              <li className="text-md font-medium capitalize" key={category}>
                <a href={`/?c=${category}`}>
                  <p className="hover:text-text-primary-main">{category}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-lg font-bold">Connect</p>
          <ul className="space-y-1">
            <li className="text-md capitalize">
              <a href={DISCORD_URL} target="_blank">
                <p className="hover:text-text-primary-main">Discord</p>
              </a>
            </li>
            <li className="text-md capitalize">
              <a href={GITHUB_URL} target="_blank">
                <p className="hover:text-text-primary-main">Github</p>
              </a>
            </li>
            <li className="text-md capitalize">
              <a href={X_URL} target="_blank">
                <p className="hover:text-text-primary-main">X</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <MadeBySwapr />
  </div>
);

const PoweredByPartners = () => (
  <div className="flex flex-wrap items-center gap-2 rounded-8 bg-surface-surface-1 p-3">
    <p className="">Powered by</p>
    <a
      href="https://www.gnosis.io/"
      className="flex items-center space-x-1"
      target="_blank"
    >
      <GnosisIcon />
      <p className="font-bold">Gnosis</p>
    </a>
    <span className="">•</span>
    <a href="https://reality.eth.limo/" className="font-bold" target="_blank">
      Reality.eth
    </a>
    <span className="">•</span>
    <a href="https://kleros.io/" className="flex items-center space-x-1" target="_blank">
      <KlerosIcon />
      <p className="font-bold">Kleros</p>
    </a>
    <span className="">•</span>
    <a href="https://www.gnosis.io/labs" className="font-bold" target="_blank">
      Gnosis AI
    </a>
  </div>
);

const Logo = () => (
  <Link href="/">
    <div className="text-white flex items-center text-[24px] font-black md:space-x-2">
      <p>👁️</p>
      <p>{APP_NAME}</p>
    </div>
  </Link>
);

const GnosisIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 428 428">
    <path
      fill="currentColor"
      d="M125.8,243.7c12.3,0,24.3-4.1,34-11.6l-78-78c-18.8,24.3-14.3,59.3,10,78.1  C101.6,239.6,113.5,243.7,125.8,243.7L125.8,243.7z"
    />
    <path
      fill="currentColor"
      d="M357.8,188c0-12.3-4.1-24.3-11.6-34l-78,78c24.3,18.8,59.2,14.3,78-10  C353.7,212.3,357.8,200.3,357.8,188z"
    />
    <path
      fill="currentColor"
      d="M397.1,103.1l-34.5,34.5c27.8,33.3,23.4,82.9-9.9,110.7c-29.2,24.4-71.6,24.4-100.8,0L214,286.2  l-37.8-37.8c-33.3,27.8-82.9,23.4-110.7-9.9c-24.4-29.2-24.4-71.6,0-100.8L47.8,120L31,103.1C10.7,136.5,0,174.9,0,214  c0,118.2,95.8,214,214,214s214-95.8,214-214C428.1,174.9,417.3,136.5,397.1,103.1z"
    />
    <path
      fill="currentColor"
      d="M368.8,66.3c-81.5-85.5-216.9-88.7-302.4-7.2c-2.5,2.4-4.9,4.8-7.2,7.2c-5.3,5.6-10.3,11.4-15,17.5  L214,253.7L383.8,83.8C379.2,77.7,374.1,71.9,368.8,66.3z M214,28c50,0,96.6,19.3,131.6,54.5L214,214.1L82.4,82.5  C117.4,47.3,164,28,214,28z"
    />
  </svg>
);

const KlerosIcon = () => (
  <svg width="18" height="18" viewBox="0 0 1445 1445" version="1.1">
    <title>Artboard</title>
    <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="kleros-symbol-grey-flat"
        transform="translate(41.000000, 117.000000)"
        fill="currentColor"
        fillRule="nonzero"
      >
        <path
          d="M400.202936,0 L1085.53556,30.5930708 L1363,646.292053 L971.549202,1209 L282.490982,1164.93034 L0,497.824333 L400.202936,0 Z M902.643081,354.903686 L405.958198,571.629314 L830.592822,899.523948 L902.643081,354.903686 Z M845.138906,246.304517 L448.205988,75.6167542 L364.825362,434.495521 L845.138906,246.304517 Z M744.530277,982.025113 L313.141344,674.384045 L323.576299,1091.256 L744.530277,982.025113 Z M1294.09593,644.934076 L1000.12639,347.017989 L922.535789,919.897844 L1294.09593,644.934076 Z M845.672707,1049.03421 L481.852689,1144.00208 L909.703034,1171.36352 L845.672707,1049.03421 Z M1236.64772,780.099671 L918.174978,1017.03589 L981.45626,1140.54698 L1236.64772,780.099671 Z M1086.00813,116.618087 L1024.15176,243.438162 L1254.39231,477.177133 L1086.00813,116.618087 Z M1008.93842,55.9304419 L604.631289,39.5402223 L938.136562,185.22581 L1008.93842,55.9304419 Z M341.161607,114.57683 L57.9714108,471.706563 L247.307286,511.758173 L341.161607,114.57683 Z M235.890826,581.814115 L45.6423228,541.58631 L244.151832,1008.6431 L235.890826,581.814115 Z"
          id="Combined-Shape"
        ></path>
      </g>
    </g>
  </svg>
);
