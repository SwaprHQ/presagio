import Link from "next/link";
import { Button } from "swapr-ui";

export default function NoBetsStatePage() {
  return (
    <div className="w-full px-6 mt-12 space-y-8 md:items-center md:flex md:flex-col">
      <div className="bg-surface-primary-accent-1 p-6 rounded-12 space-y-4">
        <p>
          You didn&apos;t do any bet yet. Checkout the markets and place a bet.
        </p>
        <Link href="/" className="block">
          <Button>Check markets</Button>
        </Link>
      </div>
    </div>
  );
}
