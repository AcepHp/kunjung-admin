"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import useLogin from "@/hooks/Auth/useLogin";

export default function LoginPage() {
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
        <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

                {/* Left side - Brand / Copy */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#7A3E2C] via-[#8B4A36] to-[#A45A42] text-white p-10 flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold mb-3">
                            Welcome back to Kunjung 🌿
                        </h2>
                        <p className="text-sm text-orange-100 max-w-sm leading-relaxed">
                            Sign in to manage villas, reservations, and experiences —
                            all in one place, designed to make every stay unforgettable.
                        </p>
                    </div>

                    <div className="mt-10 text-xs text-orange-100 space-y-1">
                        <p>• Seamless booking management</p>
                        <p>• Secure & trusted platform</p>
                        <p>• Designed for modern hospitality</p>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-10">

                    {/* Logo + Title */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="mb-3">
                            <Image
                                src="/logo-kunjung.png"
                                alt="Kunjung Logo"
                                width={120}
                                height={64}
                                priority
                            />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Sign in to Kunjung
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 text-center">
                            Access your dashboard and manage everything with ease.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="admin@kunjung.com"
                                    className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#7A3E2C] focus:border-[#7A3E2C] transition"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-gray-300 pl-9 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#7A3E2C] focus:border-[#7A3E2C] transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>


                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#7A3E2C] hover:bg-[#693424] text-white text-sm font-medium py-2.5 transition"
                        >
                            Sign In
                        </button>
                        {error && <p className="text-red-600 text-sm ">{error}</p>}
                    </form>

                    

                    <p className="mt-4 text-center text-[11px] text-gray-400">
                        © {new Date().getFullYear()} Kunjung. All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    );
}
