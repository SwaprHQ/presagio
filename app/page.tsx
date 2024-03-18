import { Profile } from "@/app/components/profile";
import Image from "next/image";

export default function App() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="space-y-5 text-center">
        <h1 className="text-5xl font-bold">Next Dapp Starter Kit</h1>
        <p className="text-lg">A template for kickstarting dapps.</p>
        <div className="p-4 bg-purple-300 rounded-lg">
          <Profile />
        </div>
        <div className="flex items-center justify-center pt-32 space-x-3">
          <p>by</p>
          <a href="https://swapr.eth.limo">
            <Image src="/swapr.svg" alt="swapr logo" width={104} height={40} />
          </a>
        </div>
      </div>
    </main>
  );
}
