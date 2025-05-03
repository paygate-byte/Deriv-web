import { redirect } from "next/navigation";
import Link from "next/link";
import { BaseLayout } from "~/app/_components/BaseLayout";
import { auth } from "~/server/auth";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/login");
  }

  // Redirect to dashboard if not admin
  if (!session.user.isAdmin) {
    redirect("/dashboard");
  }

  return (
    <BaseLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full">
              Admin
            </span>
            <h1 className="text-3xl font-bold text-white">
              Administrator Dashboard
            </h1>
          </div>
          <p className="text-gray-300">
            Manage your Deriv bots platform, upload content, and track usage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-b from-purple-900/40 to-indigo-900/40 p-6 rounded-xl border border-purple-500/30">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">Users</h2>
            <p className="text-gray-400 text-sm mb-4">
              Manage user accounts and permissions.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-white">0</span>
              <Link
                href="/admin/users"
                className="text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                Manage
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-b from-blue-900/40 to-cyan-900/40 p-6 rounded-xl border border-blue-500/30">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">Bots</h2>
            <p className="text-gray-400 text-sm mb-4">
              Manage and upload trading bots.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-white">0</span>
              <Link
                href="/admin/bots"
                className="text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                Manage
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-b from-fuchsia-900/40 to-pink-900/40 p-6 rounded-xl border border-fuchsia-500/30">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">Strategies</h2>
            <p className="text-gray-400 text-sm mb-4">
              Upload and manage PDF strategies.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-white">0</span>
              <Link
                href="/admin/strategies"
                className="text-pink-300 hover:text-pink-200 transition-colors"
              >
                Manage
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-b from-emerald-900/40 to-teal-900/40 p-6 rounded-xl border border-emerald-500/30">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">Analytics</h2>
            <p className="text-gray-400 text-sm mb-4">
              View download statistics and usage data.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-white">0</span>
              <Link
                href="/admin/analytics"
                className="text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                View
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#151530] p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <Link
                href="/admin/bots/upload"
                className="flex items-center gap-3 p-3 bg-[#1a1a40] rounded-lg hover:bg-[#1a1a50] transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Upload Bot</h3>
                  <p className="text-gray-400 text-sm">Add a new trading bot to the platform</p>
                </div>
              </Link>

              <Link
                href="/admin/strategies/upload"
                className="flex items-center gap-3 p-3 bg-[#1a1a40] rounded-lg hover:bg-[#1a1a50] transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-lg flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Upload PDF Strategy</h3>
                  <p className="text-gray-400 text-sm">Add a new strategy guide to the platform</p>
                </div>
              </Link>

              <Link
                href="/admin/users/manage"
                className="flex items-center gap-3 p-3 bg-[#1a1a40] rounded-lg hover:bg-[#1a1a50] transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Manage Users</h3>
                  <p className="text-gray-400 text-sm">View and manage user permissions</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-[#151530] p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#1a1a40] rounded-lg">
                <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm">Admin Account Created</h3>
                  <p className="text-gray-400 text-xs">Initial admin account set up successfully</p>
                </div>
                <span className="text-gray-500 text-xs">Just now</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#1a1a40] rounded-lg">
                <div className="w-10 h-10 bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm">Admin Logged In</h3>
                  <p className="text-gray-400 text-xs">Admin user accessed the dashboard</p>
                </div>
                <span className="text-gray-500 text-xs">1 min ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#1a1a40] rounded-lg">
                <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm">System Initialized</h3>
                  <p className="text-gray-400 text-xs">Deriv Bots Platform has been created</p>
                </div>
                <span className="text-gray-500 text-xs">5 mins ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#151530] p-6 rounded-xl border border-white/10 mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Admin Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/bots"
              className="p-4 bg-[#1a1a40] rounded-lg hover:bg-[#1a1a50] transition-colors text-center"
            >
              Manage All Bots
            </Link>
            <Link
              href="/admin/strategies"
              className="p-4 bg-[#1a1a40] rounded-lg hover:bg-[#1a1a50] transition-colors text-center"
            >
              Manage All Strategies
            </Link>
            <Link
              href="/admin/users"
              className="p-4 bg-[#1a1a40] rounded-lg hover:bg-[#1a1a50] transition-colors text-center"
            >
              User Management
            </Link>
            <Link
              href="/admin/settings"
              className="p-4 bg-[#1a1a40] rounded-lg hover:bg-[#1a1a50] transition-colors text-center"
            >
              Platform Settings
            </Link>
            <Link
              href="/admin/analytics"
              className="p-4 bg-[#1a1a40] rounded-lg hover:bg-[#1a1a50] transition-colors text-center"
            >
              Analytics Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="p-4 bg-[#1a1a40] rounded-lg hover:bg-[#1a1a50] transition-colors text-center"
            >
              Return to User Dashboard
            </Link>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
