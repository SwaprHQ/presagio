import { ConnectButton } from "@/app/components";
import { ConnectWalletImage } from "@/app/components/ui";

export default function NoWalletStatePage() {
  return (
    <div className="w-full px-6 mt-12 space-y-8 items-center md:flex md:flex-col">
      <ConnectWalletImage className="mx-auto" />
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
