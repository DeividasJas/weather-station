import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className='border'>
        <nav>
          <ul className='flex justify-center space-x-4'>
            <li>
              <Link href='/'>Weather</Link>
            </li>
            <li>
              <Link href='/statistics'>Statistics</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
