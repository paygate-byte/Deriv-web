"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Handle special admin login
      if (email === "admin@deriv-bots.com" && password === "Prince@001") {
        // Use the credentials provider for admin login
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid credentials");
          setIsLoading(false);
          return;
        }

        // Redirect to admin dashboard
        router.push("/admin");
        return;
      }

      // For regular users, you can use the same credentials provider or other providers like Discord
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
        setIsLoading(false);
        return;
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Special admin login check
  const isAdminLogin = email === "Prince" && password === "Prince@001";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#080816] to-[#1e1e3f] p-4">
      <div className="mb-8 flex items-center gap-2">
        <div className="grid grid-cols-4 gap-0.5">
          {Array.from({ length: 16 }).map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${
                index < 4 ? "bg-fuchsia-500" :
                index < 8 ? "bg-violet-500" :
                index < 12 ? "bg-blue-500" :
                "bg-cyan-400"
              }`}
            />
          ))}
        </div>
        <span className="text-2xl font-bold text-white">deriv</span>
      </div>

      <div className="w-full max-w-md bg-[#0c0c24] p-8 rounded-xl shadow-xl border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Log In to Your Account</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1 text-sm">
              Email or Username
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
              className="w-full p-3 bg-[#151530] border border-white/10 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 bg-[#151530] border border-white/10 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 ${
              isAdminLogin
                ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                : "bg-gradient-to-r from-violet-600 to-cyan-400"
            } text-white rounded-md font-medium hover:opacity-90 transition-opacity ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : isAdminLogin ? "Admin Login" : "Log In"}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-cyan-400 hover:underline">
                Register here
              </Link>
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0c0c24] text-gray-400">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#5865F2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-5 h-5">
              <path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/>
            </svg>
            Continue with Discord
          </button>
        </form>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-gray-400 hover:text-cyan-400 text-sm">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
