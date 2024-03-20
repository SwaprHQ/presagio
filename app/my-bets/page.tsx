import { RowCard } from "@/app/components/ui";
import Link from "next/link";

export default function MyBetsPage() {
  return (
    <div className="w-full px-6 mt-12 space-y-12 md:items-center md:flex md:flex-col">
      <div>
        <h1 className="mb-12 text-2xl font-semibold text-white">My bets</h1>
        <div className="space-y-5 w-full md:w-[760px]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(q => (
            <Link key={q} href={`questions/${q.toString()}`} className="block">
              <RowCard />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
