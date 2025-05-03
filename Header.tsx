import Link from "next/link";
import { auth } from "~/server/auth";
import { SignInButton, SignOutButton, UserButton } from "./auth-buttons";

export async function Header() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
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

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-cyan-300 transition-colors">
            Home
          </Link>
          <Link href="/bots" className="text-white hover:text-cyan-300 transition-colors">
            Bots
          </Link>
          <Link href="/strategies" className="text-white hover:text-cyan-300 transition-colors">
            Strategies
          </Link>
          <Link
            href="https://chat.whatsapp.com/KsCMCuu5r3RERlnFb4eqcK"
            target="_blank"
            className="text-white hover:text-cyan-300 transition-colors"
          >
            Join WhatsApp
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <UserButton />
              <SignOutButton />
            </>
          ) : (
            <>
              <SignInButton />
              <Link
                href="/register"
                className="bg-gradient-to-r from-violet-600 to-cyan-400 text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
