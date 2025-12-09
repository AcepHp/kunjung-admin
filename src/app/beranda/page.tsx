export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Title section */}
            <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1E1E1E]">
                    Overview
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Welcome back to Kunjung. Here&apos;s a quick snapshot of your villas and reservations.
                </p>
            </div>

            {/* Simple cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Total Villas
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-[#1E1E1E]">18</p>
                    <p className="mt-1 text-xs text-gray-400">
                        Active & listed on Kunjung
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Upcoming Stays
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-[#1E1E1E]">27</p>
                    <p className="mt-1 text-xs text-gray-400">
                        Check-ins in the next 7 days
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Occupancy Rate
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-[#1E1E1E]">82%</p>
                    <p className="mt-1 text-xs text-gray-400">
                        Based on this week&apos;s bookings
                    </p>
                </div>
            </div>

            {/* Table placeholder */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                        <h2 className="text-base md:text-lg font-semibold text-[#1E1E1E]">
                            Latest Reservations
                        </h2>
                        <p className="text-xs text-gray-500">
                            A quick look at the most recent bookings.
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wide">
                                <th className="py-2 pr-4">Guest</th>
                                <th className="py-2 pr-4">Villa</th>
                                <th className="py-2 pr-4">Check-in</th>
                                <th className="py-2 pr-4">Nights</th>
                                <th className="py-2 pr-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="py-2 pr-4">John Doe</td>
                                <td className="py-2 pr-4">Kunjung Hillside Villa</td>
                                <td className="py-2 pr-4">12 Dec 2025</td>
                                <td className="py-2 pr-4">3</td>
                                <td className="py-2 pr-4">
                                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                        Confirmed
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4">Sarah Lee</td>
                                <td className="py-2 pr-4">Oceanfront Retreat</td>
                                <td className="py-2 pr-4">15 Dec 2025</td>
                                <td className="py-2 pr-4">2</td>
                                <td className="py-2 pr-4">
                                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                                        Pending
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4">Michael Chen</td>
                                <td className="py-2 pr-4">Forest Escape Lodge</td>
                                <td className="py-2 pr-4">18 Dec 2025</td>
                                <td className="py-2 pr-4">4</td>
                                <td className="py-2 pr-4">
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                                        Draft
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
