"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import useLogin from "@/hooks/Auth/useLogin";

export default function HomeOwnerLoginForm() {
  const {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
    loading,
  } = useLogin()

  return (
    <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
          required
        />
      </div>

      {/* Password */}
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff size={18} strokeWidth={1.5} />
          ) : (
            <Eye size={18} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="remember"
          className="w-4 h-4 border-gray-300 text-brown-600 focus:ring-gray-400"
        />
        <label htmlFor="remember" className="ml-2 text-[16px] text-gray-700 select-none">
          Remember me
        </label>
      </div>

      {/* Button */}
      <div className="flex flex-col">
        <button
          type="submit"
          className="w-[200px] bg-[#7A3E2C] hover:bg-[#6c3827] text-white py-2.5 rounded-md transition-all"
        >
          Log in
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <div className="w-full mt-10 mb-5 border-t border-gray-300"></div>
      </div>

      <div className="text-center">
        <Link href="/auth/forgot-password/home-owner" className="text-[16px] underline text-gray-700 hover:text-gray-900">
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}
