'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon not showing in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapPickerProps {
    address: string;
    onAddressChange: (address: string) => void;
    onMapUrlChange: (url: string) => void;
}

// Component to handle map clicks
function LocationMarker({ position, setPosition, onAddressChange }: any) {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);

            // Reverse Geocoding using Nominatim (Free, No API Key)
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.display_name) {
                        onAddressChange(data.display_name);
                    }
                })
                .catch(err => console.error("Geocoding error:", err));
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

// Component to handle address-to-map syncing
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

export default function MapPicker({ address, onAddressChange, onMapUrlChange }: MapPickerProps) {
    const [position, setPosition] = useState<[number, number] | null>([-8.4095, 115.1889]); // Default to Bali
    const lastSentUrl = useRef<string>('');
    const lastReceivedAddress = useRef<string>('');

    // Geocode address when it changes
    useEffect(() => {
        if (!address || address === lastReceivedAddress.current) return;

        const timer = setTimeout(() => {
            // Forward Geocoding
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        const { lat, lon } = data[0];
                        const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];
                        setPosition(newPos);
                    }
                })
                .catch(err => console.error("Forward geocoding error:", err));
        }, 1000);

        return () => clearTimeout(timer);
    }, [address]);

    // Update the embed URL for external use
    useEffect(() => {
        if (position) {
            const url = `https://maps.google.com/maps?q=${position[0]},${position[1]}&z=15&output=embed`;
            if (url !== lastSentUrl.current) {
                lastSentUrl.current = url;
                onMapUrlChange(url);
            }
        }
    }, [position, onMapUrlChange]);

    // Wrap the address change to track what we just sent
    const handleAddressChangeWithRef = (newAddress: string) => {
        lastReceivedAddress.current = newAddress;
        onAddressChange(newAddress);
    };

    return (
        <div className="w-full h-full min-h-[400px] relative z-0">
            <MapContainer
                center={position || [-8.4095, 115.1889]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker
                    position={position}
                    setPosition={setPosition}
                    onAddressChange={handleAddressChangeWithRef}
                />
                {position && <ChangeView center={position} />}
            </MapContainer>

            <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] font-medium text-gray-500 shadow-sm pointer-events-none">
                Click map to pick location
            </div>
        </div>
    );
}
