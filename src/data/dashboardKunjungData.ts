/* =======================
 *  TYPES
 * ======================= */

export type SummaryMetric = {
    value: number;
    growth?: number;
    change?: number;
};

export type MonthlyPerformance = {
    labels: string[];
    visit: number[];
    bounce: number[];
    forecast?: (number | null)[];
};

export type VisitSourceItem = {
    label: string;
    percentage: number;
    color: string;
};

export type ChannelPerformanceItem = {
    channel: string;
    revenue: number;
};

export type WeeklyExpense = {
    week: string;
    operations: number;
    maintenance: number;
    laundry: number;
    staff: number;
};

export type MonthlyFinancials = {
    labels: string[];
    income: number[];
    outcome: number[];
};

/* =======================
 *  DASHBOARD DATA
 * ======================= */

export const dashboardKunjungData = {
    /* ===== Summary Cards ===== */
    summary: {
        totalIncome: {
            value: 5_250_000_000,
            growth: 12.5,
        } as SummaryMetric,

        totalOutcome: {
            value: 2_150_000_000,
            change: -2.1,
        } as SummaryMetric,

        netProfit: {
            value: 3_100_000_000,
            growth: 18.2,
        } as SummaryMetric,

        occupancyRate: {
            value: 84,
            growth: 5.4,
        } as SummaryMetric,
    },

    /* ===== Line Chart ===== */
    monthlyPerformance: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        visit: [450, 520, 480, 600, 740, 830, 900, 880, 700, 650, 720, 950],
        bounce: [120, 130, 140, 180, 200, 220, 250, 240, 190, 180, 190, 300],
        forecast: [null, null, null, null, null, null, null, null, 720, 740, 780, 820],
    } as MonthlyPerformance,

    /* ===== Donut Chart ===== */
    visitSource: {
        total: 100,
        breakdown: [
            {
                label: "Organic Search",
                percentage: 65,
                color: "#6366F1",
            },
            {
                label: "Social Media",
                percentage: 25,
                color: "#D946EF",
            },
            {
                label: "Referral",
                percentage: 10,
                color: "#06B6D4",
            },
        ] as VisitSourceItem[],
    },

    /* ===== Channel Performance ===== */
    channelPerformance: {
        title: "Channel Performance",
        subtitle: "Revenue by Booking Platform",
        data: [
            { channel: "Airbnb", revenue: 750_000_000 },
            { channel: "Booking.com", revenue: 520_000_000 },
            { channel: "Traveloka", revenue: 360_000_000 },
            { channel: "Agoda", revenue: 250_000_000 },
            { channel: "Direct / Event", revenue: 920_000_000 },
        ] as ChannelPerformanceItem[],
    },

    /* ===== Operational Expenses ===== */
    operationalExpenses: {
        title: "Operational Expenses",
        subtitle: "Weekly breakdown by cost center",
        data: [
            {
                week: "W1",
                operations: 35_000_000,
                maintenance: 20_000_000,
                laundry: 30_000_000,
                staff: 45_000_000,
            },
            {
                week: "W2",
                operations: 35_000_000,
                maintenance: 15_000_000,
                laundry: 35_000_000,
                staff: 50_000_000,
            },
            {
                week: "W3",
                operations: 50_000_000,
                maintenance: 75_000_000,
                laundry: 40_000_000,
                staff: 55_000_000,
            },
            {
                week: "W4",
                operations: 40_000_000,
                maintenance: 20_000_000,
                laundry: 35_000_000,
                staff: 45_000_000,
            },
        ] as WeeklyExpense[],
    },

    /* ===== Monthly Financials (Income vs Outcome) ===== */
    monthlyFinancials: {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        income: [120_000_000, 150_000_000, 180_000_000, 220_000_000, 250_000_000, 300_000_000, 320_000_000, 310_000_000, 280_000_000, 260_000_000, 290_000_000, 350_000_000],
        outcome: [80_000_000, 90_000_000, 100_000_000, 110_000_000, 120_000_000, 130_000_000, 140_000_000, 135_000_000, 125_000_000, 120_000_000, 130_000_000, 160_000_000],
    } as MonthlyFinancials,
};

export default dashboardKunjungData;
