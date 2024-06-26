import Link from "next/link";

export default function Home() {
  return (
    <Link
      href={"/webapp"}
      className="text-center text-2xl font-bold text-blue-600 underline"
    >
      Go to event page
    </Link>
  );
}
