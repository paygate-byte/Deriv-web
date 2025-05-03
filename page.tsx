import { redirect } from "next/navigation";
import { BaseLayout } from "~/app/_components/BaseLayout";
import { auth } from "~/server/auth";

export default async function DashboardPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/login");
  }

  const isAdmin = session.user.isAdmin;

  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome, {session.user.name || session.user.email?.split("@")[0] || "User"}
          </h1>
          <p className="text-gray-300">
            Manage your downloads and access Deriv trading resources.
          </p>
        </div>

        {isAdmin && (
          <div className="mb-8 p-4 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg border border-purple-500/30">
            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full">
                Admin
              </span>
              Administrator Access
            </h2>
            <p className="text-gray-300 mb-4">
              You have administrator privileges. You can manage users, upload bots, and add strategy PDFs.
            </p>
            <a
              href="/admin"
              className="inline-block px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Go to Admin Dashboard
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#151530] p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">My Downloads</h2>
              <span className="text-2xl font-bold text-cyan-400">0</span>
            </div>
            <p className="text-gray-400 mb-4">
              Track and manage your downloaded bots and strategy files.
            </p>
            <a
              href="/dashboard/downloads"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              View Downloads
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          <div className="bg-[#151530] p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Trading Bots</h2>
              <span className="text-sm px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full">
                Latest
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Explore our collection of automated trading bots for Deriv.
            </p>
            <a
              href="/bots"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              Browse Bots
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          <div className="bg-[#151530] p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Strategies</h2>
              <span className="text-sm px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                PDF Guides
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Access detailed PDF guides with proven trading strategies.
            </p>
            <a
              href="/strategies"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              View Strategies
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Recently Added</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#151530] p-6 rounded-xl border border-white/10 flex gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">Martingale Strategy Bot</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Automated bot implementing the Martingale strategy for consistent profits.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Added 2 days ago</span>
                  <a href="/bots/martingale" className="text-cyan-400 hover:underline text-sm">View Details</a>
                </div>
              </div>
            </div>

            <div className="bg-[#151530] p-6 rounded-xl border border-white/10 flex gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">Grid Trading Strategy Guide</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Comprehensive PDF guide on implementing grid trading strategies on Deriv.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Added 5 days ago</span>
                  <a href="/strategies/grid-trading" className="text-cyan-400 hover:underline text-sm">View Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Join Our WhatsApp Community</h2>
              <p className="text-green-100 mb-4 md:mb-0">
                Connect with other traders, get real-time signals, and receive support from our experts.
              </p>
            </div>
            <a
              href="https://chat.whatsapp.com/KsCMCuu5r3RERlnFb4eqcK"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-green-100 transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.5829 2.38913 15.1262 3.10078 16.4966L2.0737 21.2058C2.02864 21.3756 2.04158 21.5547 2.10958 21.7162C2.24269 22.0967 2.6334 22.3296 3.0139 22.1965L7.73461 20.5021C9.08754 21.1762 10.5348 21.5 12.001 21.5C17.5238 21.5 22.001 17.0229 22.001 11.5C22.001 5.97715 17.5238 2 12.001 2ZM12.001 20C10.6617 20 9.34172 19.6918 8.16871 19.0993C8.05985 19.0419 7.93764 19.0137 7.8158 19.0181L4.17504 20.2154L4.88511 16.5894C4.91165 16.4222 4.87594 16.2508 4.78356 16.1077C4.16508 14.9328 3.80098 13.599 3.80098 12.2222C3.80098 7.45388 7.56599 3.77778 12.001 3.77778C16.4359 3.77778 20.201 7.45388 20.201 12.2222C20.201 16.9905 16.4359 20.6667 12.001 20.6667V20Z" />
              </svg>
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
