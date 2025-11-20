// 1. ข้อมูลโซน (Polygons)
export const zonesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "zone-water",
        type: "water", // สีฟ้า
        name: "โซนบริหารจัดการน้ำ",
        color: "#3b82f6", // Blue-500
        borderColor: "#1d4ed8",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [100.5, 13.7],
            [100.51, 13.7],
            [100.51, 13.71],
            [100.5, 13.71],
            [100.5, 13.7],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "zone-fire",
        type: "fire", // สีแดง
        name: "โซนเฝ้าระวังอัคคีภัย",
        color: "#ef4444", // Red-500
        borderColor: "#b91c1c",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [100.52, 13.72],
            [100.53, 13.72],
            [100.53, 13.73],
            [100.52, 13.73],
            [100.52, 13.72],
          ],
        ],
      },
    },
  ],
};

// 2. ข้อมูลจุด Pin (Markers)
export const pinsData = [
  {
    id: 1,
    lat: 13.705,
    lng: 100.505,
    type: "water",
    title: "สถานีสูบน้ำหลัก",
  },
  {
    id: 2,
    lat: 13.725,
    lng: 100.525,
    type: "fire",
    title: "จุดติดตั้ง Fire Alarm",
  },
];
