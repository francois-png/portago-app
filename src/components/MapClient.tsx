"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function MapClient({
  lat,
  lng,
  markers,
  zoom = 14,
  className = "",
}: {
  lat: number;
  lng: number;
  markers?: { lat: number; lng: number; name: string; slug?: string }[];
  zoom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    const map = L.map(ref.current).setView([lat, lng], zoom);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const icon = L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#C9A96E" stroke="#0A0F1C" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="#0A0F1C"/></svg>`,
      className: "",
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

    if (markers && markers.length > 0) {
      markers.forEach((m) => {
        const marker = L.marker([m.lat, m.lng], { icon }).addTo(map);
        if (m.slug) {
          marker.bindPopup(
            `<a href="/listing/${m.slug}" style="font-weight:600;color:#0A0F1C">${m.name}</a>`
          );
        } else {
          marker.bindPopup(`<strong>${m.name}</strong>`);
        }
      });
    } else {
      L.marker([lat, lng], { icon }).addTo(map);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, zoom, markers]);

  return <div ref={ref} className={`w-full h-64 rounded-lg z-0 ${className}`} />;
}
