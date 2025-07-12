import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full sticky bg-gray-100 dark:bg-[#2e3345] text-gray-700 dark:text-gray-300 py-2 mt-10 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-semibold mb-4 md:mb-0">
            Password Manager
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            Made with ❤️ by Tanmoy
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Tanmoy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
