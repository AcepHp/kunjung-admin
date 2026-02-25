// bookings.data.ts

export enum BookingStatus {
    CONFIRMED = "CONFIRMED",
    WAITING_CONFIRMATION = "WAITING_CONFIRMATION",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}

export enum BookingSource {
    DIRECT = "DIRECT",
    AIRBNB = "AIRBNB",
    BOOKING_COM = "BOOKING_COM",
    TRAVELOKA = "TRAVELOKA",
    AGODA = "AGODA",
}

export type BookingPrice = {
    accommodationFare: number;
    taxPercentage: number; // contoh: 10
    total: number;
};

export type BookingDate = {
    checkInDate: string;   // ISO string
    checkOutDate: string; // ISO string
    checkInTime: string;  // "14.00"
    checkOutTime: string; // "12.00"
    nights: number;
};

export type Booking = {
    id: string;
    villaId: number;
    guestId: string; // Relasi ke ID di UserGuest.ts
    source: BookingSource; // Sumber platform (e.g., Airbnb)


    guests: number;
    status: BookingStatus;

    bookingDate: BookingDate;
    price: BookingPrice;

    canCancel: boolean;
    canReschedule: boolean;
};

export const bookingsData: Booking[] = [
    {
        id: "BK-001",
        villaId: 1,
        guestId: "guest-001",
        source: BookingSource.AIRBNB,
        guests: 2,
        status: BookingStatus.CONFIRMED,
        bookingDate: {
            checkInDate: "2026-02-10",
            checkOutDate: "2026-02-13",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 3,
        },
        price: {
            accommodationFare: 4500000,
            taxPercentage: 10,
            total: 4950000,
        },
        canCancel: true,
        canReschedule: true,
    },
    {
        id: "BK-002",
        villaId: 2,
        guestId: "guest-002",
        source: BookingSource.DIRECT,
        guests: 4,
        status: BookingStatus.WAITING_CONFIRMATION,
        bookingDate: {
            checkInDate: "2026-02-15",
            checkOutDate: "2026-02-18",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 3,
        },
        price: {
            accommodationFare: 7200000,
            taxPercentage: 10,
            total: 7920000,
        },
        canCancel: true,
        canReschedule: true,
    },
    {
        id: "BK-003",
        villaId: 3,
        guestId: "guest-003",
        source: BookingSource.BOOKING_COM,
        guests: 2,
        status: BookingStatus.CANCELLED,
        bookingDate: {
            checkInDate: "2026-01-20",
            checkOutDate: "2026-01-22",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 2,
        },
        price: {
            accommodationFare: 3000000,
            taxPercentage: 10,
            total: 3300000,
        },
        canCancel: false,
        canReschedule: false,
    },
    {
        id: "BK-004",
        villaId: 4,
        guestId: "guest-004",
        source: BookingSource.TRAVELOKA,
        guests: 6,
        status: BookingStatus.COMPLETED,
        bookingDate: {
            checkInDate: "2025-12-10",
            checkOutDate: "2025-12-14",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 4,
        },
        price: {
            accommodationFare: 12000000,
            taxPercentage: 10,
            total: 13200000,
        },
        canCancel: false,
        canReschedule: false,
    },
    {
        id: "BK-005",
        villaId: 5,
        guestId: "guest-005",
        source: BookingSource.AIRBNB,
        guests: 2,
        status: BookingStatus.CONFIRMED,
        bookingDate: {
            checkInDate: "2026-03-01",
            checkOutDate: "2026-03-04",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 3,
        },
        price: {
            accommodationFare: 5400000,
            taxPercentage: 10,
            total: 5940000,
        },
        canCancel: true,
        canReschedule: true,
    },
    {
        id: "BK-006",
        villaId: 6,
        guestId: "guest-006",
        source: BookingSource.AGODA,
        guests: 3,
        status: BookingStatus.WAITING_CONFIRMATION,
        bookingDate: {
            checkInDate: "2026-02-25",
            checkOutDate: "2026-02-27",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 2,
        },
        price: {
            accommodationFare: 3600000,
            taxPercentage: 10,
            total: 3960000,
        },
        canCancel: true,
        canReschedule: true,
    },
    {
        id: "BK-007",
        villaId: 7,
        guestId: "guest-007",
        source: BookingSource.DIRECT,
        guests: 4,
        status: BookingStatus.CONFIRMED,
        bookingDate: {
            checkInDate: "2026-04-05",
            checkOutDate: "2026-04-08",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 3,
        },
        price: {
            accommodationFare: 4800000,
            taxPercentage: 10,
            total: 5280000,
        },
        canCancel: true,
        canReschedule: false,
    },
    {
        id: "BK-008",
        villaId: 8,
        guestId: "guest-008",
        source: BookingSource.TRAVELOKA,
        guests: 2,
        status: BookingStatus.COMPLETED,
        bookingDate: {
            checkInDate: "2025-11-05",
            checkOutDate: "2025-11-07",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 2,
        },
        price: {
            accommodationFare: 2600000,
            taxPercentage: 10,
            total: 2860000,
        },
        canCancel: false,
        canReschedule: false,
    },
    {
        id: "BK-009",
        villaId: 9,
        guestId: "guest-009",
        source: BookingSource.AIRBNB,
        guests: 5,
        status: BookingStatus.CANCELLED,
        bookingDate: {
            checkInDate: "2026-01-05",
            checkOutDate: "2026-01-08",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 3,
        },
        price: {
            accommodationFare: 6000000,
            taxPercentage: 10,
            total: 6600000,
        },
        canCancel: false,
        canReschedule: false,
    },
    {
        id: "BK-010",
        villaId: 10,
        guestId: "guest-010",
        source: BookingSource.DIRECT,
        guests: 2,
        status: BookingStatus.CONFIRMED,
        bookingDate: {
            checkInDate: "2026-05-10",
            checkOutDate: "2026-05-12",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 2,
        },
        price: {
            accommodationFare: 3200000,
            taxPercentage: 10,
            total: 3520000,
        },
        canCancel: true,
        canReschedule: true,
    },
    {
        id: "BK-011",
        villaId: 11,
        guestId: "guest-011",
        source: BookingSource.AGODA,
        guests: 3,
        status: BookingStatus.WAITING_CONFIRMATION,
        bookingDate: {
            checkInDate: "2026-03-18",
            checkOutDate: "2026-03-20",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 2,
        },
        price: {
            accommodationFare: 2800000,
            taxPercentage: 10,
            total: 3080000,
        },
        canCancel: true,
        canReschedule: true,
    },
    {
        id: "BK-012",
        villaId: 12,
        guestId: "guest-001",
        source: BookingSource.AIRBNB,
        guests: 2,
        status: BookingStatus.COMPLETED,
        bookingDate: {
            checkInDate: "2025-10-01",
            checkOutDate: "2025-10-04",
            checkInTime: "14.00",
            checkOutTime: "12.00",
            nights: 3,
        },
        price: {
            accommodationFare: 3900000,
            taxPercentage: 10,
            total: 4290000,
        },
        canCancel: false,
        canReschedule: false,
    },
];
