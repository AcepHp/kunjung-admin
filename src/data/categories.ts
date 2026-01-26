import {
    HomeIcon,
    CalendarDaysIcon,
    CameraIcon,
} from '@heroicons/react/24/outline';

export const categoryData = {
    "categories": [
        {
            "id": "stay",
            "name": "Stay",
            "icon": HomeIcon,
            "description": "Daily or short-term villa stays",
            "subCategories": []
        },
        {
            "id": "event",
            "name": "Event",
            "icon": CalendarDaysIcon,
            "description": "Venue for celebrations and gatherings",
            "subCategories": [
                {
                    "id": "celebration",
                    "name": "Celebration",
                    "items": [
                        "Wedding",
                        "Birthday Party",
                        "Engagement Party",
                        "Anniversary",
                        "Bridal Shower",
                        "Baby Shower"
                    ]
                },
                {
                    "id": "gathering",
                    "name": "Gathering",
                    "items": [
                        "Reunion",
                        "Arisan",
                        "Syukuran"
                    ]
                },
                {
                    "id": "business",
                    "name": "Business",
                    "items": [
                        "Meeting"
                    ]
                }
            ]
        },
        {
            "id": "shoot",
            "name": "Shoot",
            "icon": CameraIcon,
            "description": "Space for photoshoots and sessions",
            "subCategories": [
                {
                    "id": "instacation",
                    "name": "Instacation",
                    "items": [
                        "Stay & Shooting Session"
                    ]
                },
                {
                    "id": "session-shoot",
                    "name": "Session Shoot",
                    "items": [
                        {
                            "name": "Morning Session",
                            "duration": "5 jam",
                            "time": "07.00–12.00"
                        },
                        {
                            "name": "Afternoon Session",
                            "duration": "5 jam",
                            "time": "13.00–18.00"
                        },
                        {
                            "name": "Full Day Session",
                            "duration": "11 jam",
                            "time": "07.00–18.00"
                        }
                    ]
                }
            ]
        }
    ]
};
