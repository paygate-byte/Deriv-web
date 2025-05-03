"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="text-white hover:text-cyan-300 transition-colors"
    >
      Log in
    </button>
  );
}

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-white px-3 py-1 rounded-md border border-white/20 hover:bg-white/10 transition-colors"
    >
      Log out
    </button>
  );
}

export function UserButton() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name || "User"}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full flex items-center justify-center text-white">
          {session.user.name?.[0] || session.user.email?.[0] || "U"}
        </div>
      )}
      <span className="text-sm text-gray-200">
        {session.user.name || session.user.email?.split("@")[0] || "User"}
      </span>
      {session.user.isAdmin && (
        <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full">
          Admin
        </span>
      )}
    </Link>
  );
}
