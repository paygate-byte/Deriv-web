import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#080816] to-[#1e1e3f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#080816] to-[#1e1e3f] shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      // Create gradient colors similar to Deriv logo
                      index < 4 ? "bg-fuchsia-500" :
                      index < 8 ? "bg-violet-500" :
                      index < 12 ? "bg-blue-500" :
                      "bg-cyan-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-white">deriv</span>
            </Link>
            <span className="text-sm text-gray-300 ml-1">Bots Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-white hover:text-cyan-300 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-violet-600 to-cyan-400 text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                <span className="bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Automate
                </span>{" "}
                Your Deriv Trading
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Access our collection of high-performance Deriv trading bots and strategies.
                Optimize your trading experience with automated solutions crafted by experts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-violet-600 to-cyan-400 text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
                <Link
                  href="https://chat.whatsapp.com/KsCMCuu5r3RERlnFb4eqcK"
                  target="_blank"
                  className="border border-violet-600 text-white px-6 py-3 rounded-md hover:bg-violet-600/10 transition-colors"
                >
                  Join WhatsApp Group
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-blue-500/20 to-cyan-400/20 rounded-xl blur-lg"></div>
                <div className="relative z-10 w-full h-full bg-[#0a0a20] rounded-xl overflow-hidden border border-white/10 p-4">
                  <div className="bg-[#0a0a20] rounded-md p-2 mb-4 flex items-center gap-2 border-b border-white/10">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-400">Deriv Bot Dashboard</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2 bg-gradient-to-b from-[#151530] to-[#1e1e3f] p-3 rounded-md">
                      <div className="mb-2 text-xs text-cyan-400">EUR/USD Chart</div>
                      <div className="h-40 w-full relative">
                        {/* Simulated chart */}
                        <svg className="w-full h-full" viewBox="0 0 100 40">
                          <path
                            d="M0,20 L5,18 L10,22 L15,15 L20,17 L25,13 L30,20 L35,18 L40,25 L45,20 L50,15 L55,19 L60,16 L65,13 L70,18 L75,14 L80,20 L85,18 L90,23 L95,16 L100,14"
                            fill="none"
                            stroke="#60a5fa"
                            strokeWidth="1"
                          />
                        </svg>
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1e1e3f] to-transparent"></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="bg-[#151530] p-3 rounded-md">
                        <div className="mb-1 text-xs text-gray-400">Bot Status</div>
                        <div className="text-green-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                          Running
                        </div>
                      </div>
                      <div className="bg-[#151530] p-3 rounded-md">
                        <div className="mb-1 text-xs text-gray-400">Profit Today</div>
                        <div className="text-green-400">+$128.45</div>
                      </div>
                      <div className="bg-[#151530] p-3 rounded-md">
                        <div className="mb-1 text-xs text-gray-400">Total Trades</div>
                        <div className="text-white">24</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#151530] p-3 rounded-md">
                    <div className="text-xs text-gray-400 mb-2">Recent Activity</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>EUR/USD</span>
                        <span className="text-green-400">+$12.50</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>GBP/JPY</span>
                        <span className="text-red-400">-$5.25</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>BTC/USD</span>
                        <span className="text-green-400">+$34.10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Join Our WhatsApp Community
              </h2>
              <p className="text-green-100 max-w-xl">
                Get instant access to updates, trading signals, and connect with other traders. Our WhatsApp group provides real-time support and insights.
              </p>
            </div>
            <Link
              href="https://chat.whatsapp.com/KsCMCuu5r3RERlnFb4eqcK"
              target="_blank"
              className="bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-green-100 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.5829 2.38913 15.1262 3.10078 16.4966L2.0737 21.2058C2.02864 21.3756 2.04158 21.5547 2.10958 21.7162C2.24269 22.0967 2.6334 22.3296 3.0139 22.1965L7.73461 20.5021C9.08754 21.1762 10.5348 21.5 12.001 21.5C17.5238 21.5 22.001 17.0229 22.001 11.5C22.001 5.97715 17.5238 2 12.001 2ZM12.001 20C10.6617 20 9.34172 19.6918 8.16871 19.0993C8.05985 19.0419 7.93764 19.0137 7.8158 19.0181L4.17504 20.2154L4.88511 16.5894C4.91165 16.4222 4.87594 16.2508 4.78356 16.1077C4.16508 14.9328 3.80098 13.599 3.80098 12.2222C3.80098 7.45388 7.56599 3.77778 12.001 3.77778C16.4359 3.77778 20.201 7.45388 20.201 12.2222C20.201 16.9905 16.4359 20.6667 12.001 20.6667V20Z" />
              </svg>
              Join WhatsApp Group Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080816] py-8 text-gray-400">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Deriv Bots Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
