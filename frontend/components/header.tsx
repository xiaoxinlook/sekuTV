import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
  tips: string;
  release: string;
};

const Header: React.FC<HeaderProps> = ({ tips, release }) => {
  return (
    <header className="max-w-5xl mx-auto bg-white">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold text-violet-600 ml-2">色库TV</h1>
            <p className="ml-2 mt-4 text-violet-600">提示:{tips}</p>
          </div>
          <h2 className="mr-4 text-lg font-bold text-violet-600">我们探索的是艺术</h2>
        </div>
        <Link href={release} target="_blank">
          <Image
            src="/fabu.gif"
            alt="Advertisement"
            width={1200}
            height={80}
            style={{
              width: '100%',
              height: '80px',
              border: '1px inset #00FF00',
            }}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;