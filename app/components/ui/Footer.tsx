import Image from "next/image";

export const Footer = () => (
  <div className="flex items-center justify-center space-x-3 px-6 pt-32">
    <p>built by</p>
    <a href="https://swapr.eth.limo">
      <Image src="/swapr.svg" alt="swapr logo" width={104} height={40} />
    </a>
  </div>
);
