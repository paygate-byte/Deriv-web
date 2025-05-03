import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#080816] py-8 text-gray-400">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 h-1 rounded-full ${
                      // Create gradient colors similar to Deriv logo
                      index < 4 ? "bg-fuchsia-500" :
                      index < 8 ? "bg-violet-500" :
                      index < 12 ? "bg-blue-500" :
                      "bg-cyan-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xl font-bold text-white">deriv</span>
            </div>
            <p className="text-sm mb-4">
              Deriv Bots Platform offers automated trading bots and strategies for Deriv traders.
            </p>
            <Link
              href="https://chat.whatsapp.com/KsCMCuu5r3RERlnFb4eqcK"
              target="_blank"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.5829 2.38913 15.1262 3.10078 16.4966L2.0737 21.2058C2.02864 21.3756 2.04158 21.5547 2.10958 21.7162C2.24269 22.0967 2.6334 22.3296 3.0139 22.1965L7.73461 20.5021C9.08754 21.1762 10.5348 21.5 12.001 21.5C17.5238 21.5 22.001 17.0229 22.001 11.5C22.001 5.97715 17.5238 2 12.001 2ZM12.001 20C10.6617 20 9.34172 19.6918 8.16871 19.0993C8.05985 19.0419 7.93764 19.0137 7.8158 19.0181L4.17504 20.2154L4.88511 16.5894C4.91165 16.4222 4.87594 16.2508 4.78356 16.1077C4.16508 14.9328 3.80098 13.599 3.80098 12.2222C3.80098 7.45388 7.56599 3.77778 12.001 3.77778C16.4359 3.77778 20.201 7.45388 20.201 12.2222C20.201 16.9905 16.4359 20.6667 12.001 20.6667V20Z" />
                <path d="M8.67871 7.20056C8.52065 6.89365 8.10786 6.73239 7.75495 6.86859C7.44825 6.98699 7.20258 7.16399 6.98255 7.36111C6.69955 7.61521 6.50254 7.89165 6.34912 8.15044C5.99721 8.70756 5.86577 9.36653 6.0027 10.0088C6.27767 11.1847 6.94496 12.3606 7.95792 13.3606C8.32084 13.7191 8.70877 14.0748 9.15367 14.3949C9.73567 14.7958 10.3909 15.1457 11.1454 15.3601C12.6978 15.7519 13.6534 15.3728 14.3325 14.855C14.67 14.5881 14.9489 14.1624 15.0518 13.7767C15.1462 13.4268 15.1358 13.0788 14.9921 12.775C14.8483 12.4712 14.5655 12.2321 14.2534 12.1071L13.4546 11.7752C13.1659 11.6584 12.8278 11.7301 12.6013 11.9566L12.3349 12.223C12.2745 12.2834 12.1778 12.2996 12.1022 12.2618C11.7068 12.0609 11.3024 11.7995 10.9505 11.4422C10.5985 11.0849 10.3424 10.6746 10.1456 10.2731C10.1091 10.1949 10.1276 10.0958 10.1904 10.033L10.4567 9.76655C10.6832 9.54007 10.7551 9.20206 10.6383 8.9133L10.3064 8.11455C10.1813 7.80248 9.94221 7.51968 9.63847 7.3758C9.33472 7.23192 8.98665 7.22155 8.67871 7.32018V7.20056Z" />
              </svg>
              Join WhatsApp Group
            </Link>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bots" className="hover:text-cyan-300 transition-colors">Trading Bots</Link>
              </li>
              <li>
                <Link href="/strategies" className="hover:text-cyan-300 transition-colors">Strategies</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyan-300 transition-colors">User Dashboard</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-cyan-300 transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-300 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-cyan-300 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-300 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-cyan-300 transition-colors">Risk Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Deriv Bots Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
