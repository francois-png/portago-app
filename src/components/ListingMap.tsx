"use client";

import dynamic from "next/dynamic";

const MapClientLazy = dynamic(
  () => import("@/components/MapClient").then((m) => m.MapClient),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse" />
    ),
  }
);

export function ListingMap({
  lat,
  lng,
  name,
}: {
  lat: number;
  lng: number;
  name: string;
}) {
  return (
    <MapClientLazy
      lat={lat}
      lng={lng}
      markers={[{ lat, lng, name }]}
      className="h-72"
    />
  );
}
