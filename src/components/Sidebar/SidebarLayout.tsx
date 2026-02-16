"use client"

import type React from "react"

import { useState, useEffect, type ReactNode } from "react"
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from "@headlessui/react"
import {
    Bars3Icon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    FolderIcon,
    HomeIcon,
    SparklesIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

type NavChild = {
    name: string
    href: string
}

type NavItem = {
    name: string
    href?: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    current?: boolean
    children?: NavChild[]
}

type GroupItem = {
    id: number
    name: string
    href: string
    initial: string
    current?: boolean
}

const navigation: NavItem[] = [
    { name: "Dashboard", href: "/beranda", icon: HomeIcon, current: false },
    { name: "Property Management", href: "/beranda/manage-property", icon: FolderIcon, current: false },
    { name: "Reservations", href: "/beranda/reservations", icon: CalendarIcon, current: false },
    {
        name: "User Management",
        icon: UsersIcon,
        children: [
            { name: "Guest", href: "/beranda/manage-user/guest" },
            { name: "Property Owner", href: "/beranda/manage-user/home-owner" },
        ],
    },
    { name: "Testimonial Management", href: "/beranda/testimonial", icon: ChatBubbleLeftRightIcon, current: false },
    { name: "TnC Policy Management", href: "/beranda/terms-refund", icon: DocumentTextIcon, current: false },
    { name: "Brand Ethos Management", href: "/beranda/brand-ethos", icon: SparklesIcon, current: false },
    {
        name: "Display Management", // kelola tampilan (English)
        icon: Cog6ToothIcon,
        children: [
            { name: "Hero Section", href: "/beranda/display/hero" },
            { name: "Brand Story", href: "/beranda/display/brand-story" },
            { name: "Brand Statement", href: "/beranda/display/brand-statement" },
            { name: "Service Recommendation", href: "/beranda/display/service-section" },
            { name: "Social Media", href: "/beranda/display/social-media" },
        ],
    },
]





function classNames(...classes: Array<string | boolean | null | undefined>) {
    return classes.filter(Boolean).join(" ")
}

const isActivePath = (pathname: string, href?: string) => {
    if (!href) return false

    // Dashboard hanya aktif jika EXACT "/beranda"
    if (href === "/beranda") {
        return pathname === "/beranda"
    }

    // Menu lain aktif jika exact match atau sub-path
    return pathname === href || pathname.startsWith(href + "/")
}

const isChildActive = (pathname: string, children?: NavChild[]) => {
    if (!children) return false
    return children.some((child) => pathname === child.href || pathname.startsWith(child.href + "/"))
}

export default function SidebarLayout({
    children,
}: {
    children: ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { data: session } = useSession()

    // Get user initials from session
    const getInitials = () => {
        if (session?.user) {
            const first = session.user.firstName?.charAt(0) || ""
            const last = session.user.lastName?.charAt(0) || ""
            return first + last || "AK"
        }
        return "AK"
    }

    // Get user full name from session
    const getFullName = () => {
        if (session?.user) {
            return `${session.user.firstName || ""} ${session.user.lastName || ""}`.trim() || "Admin Kunjung"
        }
        return "Admin Kunjung"
    }

    // Logout handler
    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" })
    }
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {}
        navigation.forEach((item) => {
            if (item.children && isChildActive(pathname, item.children)) {
                initial[item.name] = true
            }
        })
        return initial
    })

    const toggleDropdown = (name: string) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [name]: !prev[name],
        }))
    }

    return (
        <>
            <div>
                {/* Mobile sidebar */}
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/70 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>

                            {/* Sidebar content (mobile) */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#7A3E2C] px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center gap-3 mt-2">
                                    <Image alt="Kunjung" src="/logo.png" width={32} height={32} className="rounded-md bg-white/10" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white tracking-wide">Kunjung Admin</span>
                                        <span className="text-[11px] text-[#FBEFE5]">Villa & Reservation Panel</span>
                                    </div>
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        {item.children && item.children.length > 0 ? (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleDropdown(item.name)}
                                                                    className={classNames(
                                                                        item.current ||
                                                                            isActivePath(pathname, item.href) ||
                                                                            isChildActive(pathname, item.children)
                                                                            ? "bg-white text-[#7A3E2C]"
                                                                            : "text-[#FBEFE5] hover:bg-white/10 hover:text-white",
                                                                        "group flex w-full items-center justify-between gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors",
                                                                    )}
                                                                >
                                                                    <span className="flex items-center gap-x-3">
                                                                        <item.icon
                                                                            aria-hidden="true"
                                                                            className={classNames(
                                                                                item.current ||
                                                                                    isActivePath(pathname, item.href) ||
                                                                                    isChildActive(pathname, item.children)
                                                                                    ? "text-[#7A3E2C]"
                                                                                    : "text-[#FBEFE5] group-hover:text-white",
                                                                                "size-6 shrink-0",
                                                                            )}
                                                                        />
                                                                        {item.name}
                                                                    </span>
                                                                    <ChevronDownIcon
                                                                        aria-hidden="true"
                                                                        className={classNames(
                                                                            openDropdowns[item.name] ? "rotate-180" : "",
                                                                            "size-4 text-[#FBEFE5] transition-transform duration-200",
                                                                        )}
                                                                    />
                                                                </button>
                                                                {openDropdowns[item.name] && (
                                                                    <ul className="mt-1 space-y-1 pl-9">
                                                                        {item.children.map((child) => (
                                                                            <li key={child.name}>
                                                                                <Link
                                                                                    href={child.href}
                                                                                    className={classNames(
                                                                                        isActivePath(pathname, child.href)
                                                                                            ? "bg-white/20 text-white font-semibold"
                                                                                            : "text-[#FBEFE5] hover:bg-white/10 hover:text-white",
                                                                                        "block rounded-md py-1.5 px-2 text-xs/5 transition-colors",
                                                                                    )}
                                                                                    onClick={() => setSidebarOpen(false)}
                                                                                >
                                                                                    {child.name}
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <Link
                                                                href={item.href || "#"}
                                                                className={classNames(
                                                                    item.current || isActivePath(pathname, item.href)
                                                                        ? "bg-white text-[#7A3E2C]"
                                                                        : "text-[#FBEFE5] hover:bg-white/10 hover:text-white",
                                                                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors",
                                                                )}
                                                                onClick={() => setSidebarOpen(false)}
                                                            >
                                                                <item.icon
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        item.current || isActivePath(pathname, item.href)
                                                                            ? "text-[#7A3E2C]"
                                                                            : "text-[#FBEFE5] group-hover:text-white",
                                                                        "size-6 shrink-0",
                                                                    )}
                                                                />
                                                                {item.name}
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#7A3E2C] px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center gap-3 mt-2">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white tracking-wide">Kunjung Admin</span>
                                <span className="text-[11px] text-[#FBEFE5]">Villa & Reservation Panel</span>
                            </div>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                {item.children && item.children.length > 0 ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleDropdown(item.name)}
                                                            className={classNames(
                                                                item.current ||
                                                                    isActivePath(pathname, item.href) ||
                                                                    isChildActive(pathname, item.children)
                                                                    ? "bg-white text-[#7A3E2C]"
                                                                    : "text-[#FBEFE5] hover:bg-white/10 hover:text-white",
                                                                "group flex w-full items-center justify-between gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors",
                                                            )}
                                                        >
                                                            <span className="flex items-center gap-x-3">
                                                                <item.icon
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        item.current ||
                                                                            isActivePath(pathname, item.href) ||
                                                                            isChildActive(pathname, item.children)
                                                                            ? "text-[#7A3E2C]"
                                                                            : "text-[#FBEFE5] group-hover:text-white",
                                                                        "size-6 shrink-0",
                                                                    )}
                                                                />
                                                                {item.name}
                                                            </span>
                                                            <ChevronDownIcon
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    openDropdowns[item.name] ? "rotate-180" : "",
                                                                    "size-4 text-[#FBEFE5] transition-transform duration-200",
                                                                )}
                                                            />
                                                        </button>
                                                        {openDropdowns[item.name] && (
                                                            <ul className="mt-1 space-y-1 pl-9">
                                                                {item.children.map((child) => (
                                                                    <li key={child.name}>
                                                                        <Link
                                                                            href={child.href}
                                                                            className={classNames(
                                                                                isActivePath(pathname, child.href)
                                                                                    ? "bg-white/20 text-white font-semibold"
                                                                                    : "text-[#FBEFE5] hover:bg-white/10 hover:text-white",
                                                                                "block rounded-md py-1.5 px-2 text-xs/5 transition-colors",
                                                                            )}
                                                                        >
                                                                            {child.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Link
                                                        href={item.href || "#"}
                                                        className={classNames(
                                                            item.current || isActivePath(pathname, item.href)
                                                                ? "bg-white text-[#7A3E2C]"
                                                                : "text-[#FBEFE5] hover:bg-white/10 hover:text-white",
                                                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors",
                                                        )}
                                                    >
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                item.current || isActivePath(pathname, item.href)
                                                                    ? "text-[#7A3E2C]"
                                                                    : "text-[#FBEFE5] group-hover:text-white",
                                                                "size-6 shrink-0",
                                                            )}
                                                        />
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Right side (top bar + content) */}
                <div className="lg:pl-72">
                    {/* Top bar */}
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Separator (mobile) */}
                        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

                        <div className="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
                            {/* Separator (desktop) */}
                            <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                            {/* Profile dropdown */}
                            {mounted ? (
                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        {session?.user?.avatar ? (
                                            <Image
                                                src={session.user.avatar}
                                                alt="Profile"
                                                width={32}
                                                height={32}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#7A3E2C] text-xs font-semibold text-white">
                                                {getInitials()}
                                            </span>
                                        )}
                                        <span className="hidden lg:flex lg:items-center">
                                            <span aria-hidden="true" className="ml-3 text-sm/6 font-semibold text-gray-900">
                                                {getFullName()}
                                            </span>
                                            <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                                        </span>
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2.5 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <MenuItem>
                                            <Link
                                                href="/beranda/profile/edit"
                                                className="block px-5 py-3 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:rounded-md data-focus:outline-hidden hover:bg-gray-50 transition-colors"
                                            >
                                                Your Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-5 py-3 text-sm/6 text-red-600 data-focus:bg-gray-50 data-focus:rounded-md data-focus:outline-hidden hover:bg-gray-50 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            ) : (
                                <div className="relative">
                                    <button className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        {session?.user?.avatar ? (
                                            <Image
                                                src={session.user.avatar}
                                                alt="Profile"
                                                width={32}
                                                height={32}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#7A3E2C] text-xs font-semibold text-white">
                                                {getInitials()}
                                            </span>
                                        )}
                                        <span className="hidden lg:flex lg:items-center">
                                            <span aria-hidden="true" className="ml-3 text-sm/6 font-semibold text-gray-900">
                                                {getFullName()}
                                            </span>
                                            <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <main className="py-8">
                        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </>
    )
}
