import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="">
        <nav>
          <ul className="flex justify-center space-x-4 text-2xl">
            <li className="hover:text-blue-500">
              <Link href="/">Weather</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link href="/statistics">Statistics</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
