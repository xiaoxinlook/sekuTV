import React from 'react';
import { SiTelegram } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

type FooterProps = {
  telegram: string;
  email: string;
  footer: string;
};

const Footer: React.FC<FooterProps> = ({ telegram, email, footer }) => {
  return (
    <footer className="max-w-5xl mx-auto bg-violet-600 rounded-lg shadow dark:bg-violet-600 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">色库TV</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 dark:text-gray-400">
            <li className="mr-6">
              <div className="hover:underline flex items-center text-black hover:text-blue-500 transition">
                <SiTelegram className="mr-2 text-2xl" />
                <span>{telegram}</span>
              </div>
            </li>
            <li>
              <div className="hover:underline flex items-center text-black hover:text-blue-500 transition">
                <MdEmail className="mr-2 text-2xl" />
                <span>{email}</span>
              </div>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center text-black">{footer}</span>
      </div>
    </footer>
  );
};

export default Footer;