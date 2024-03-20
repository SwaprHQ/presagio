import { SwapboxContainer } from "@/app/components";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  // will do the fetching here

  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return ids.map(id => ({
    id: id.toString(),
  }));
}

export default function QuestionPage({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log("id:", id);

  return (
    <main className="w-full px-6 mt-12 space-y-12 md:flex md:flex-col md:items-center">
      <SwapboxContainer />
    </main>
  );
}
