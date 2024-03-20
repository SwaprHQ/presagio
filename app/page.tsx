import { Card } from "@/app/components/ui";
import Link from "next/link";

export default function AppPage() {
  return (
    <div className="px-6 mt-12 space-y-12 md:flex md:flex-col md:items-center">
      <div>
        <h1 className="mb-12 text-2xl font-semibold text-white">
          🔮 All markets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  2xl:max-w-[1424px] 2xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(q => (
            <Link key={q} href={`questions/${q.toString()}`}>
              <Card />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
