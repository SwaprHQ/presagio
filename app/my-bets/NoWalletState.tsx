import { ConnectButton } from "@/app/components";
import Image from "next/image";

export default function NoWalletState() {
  return (
    <div className="w-full px-6 mt-12 space-y-8 md:items-center md:flex md:flex-col">
      <Image
        src="/assets/images/connect-wallet.svg"
        width={112}
        height={112}
        alt={"connect wallet"}
      />
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-text-high-em">
          Connect wallet to check your bets
        </h1>
        <p className="text-text-low-em">
          Click the button below to connect your wallet and check your bets or
          create new ones.
        </p>
      </div>
      <ConnectButton
        size="lg"
        className="mx-auto px-24"
        variant="solid"
        colorScheme="primary"
      >
        Connect Wallet
      </ConnectButton>
    </div>
  );
}
