import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-5 text-center">
        <h1 className="text-5xl font-bold">Next Dapp Starter Kit</h1>
        <p className="text-lg">A template for kickstarting dapps.</p>
        <div className="flex items-center space-x-3 justify-center pt-32">
          <p>by</p>
          <a href="https://swapr.eth.limo">
            <Image src="/swapr.svg" alt="swapr logo" width={104} height={40} />
          </a>
        </div>
      </div>
    </main>
  );
}
