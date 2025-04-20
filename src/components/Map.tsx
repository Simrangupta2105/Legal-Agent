import  { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Center = {
  id: number;
  name: string;
  address: string;
  type: string;
  latitude: number;
  longitude: number;
};

interface MapProps {
  centers: Center[];
}

const Map = ({ centers }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN'; // Replace this with your token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.5946, 12.9716], // Default center (Bangalore)
      zoom: 11
    });

    // Add markers for each center
    // centers.forEach((center) => {
    //   const marker = new mapboxgl.Marker()
    //     .setLngLat([center.longitude, center.latitude])
    //     .setPopup(
    //       new mapboxgl.Popup({ offset: 25 })
    //         .setHTML(`<h3>${center.name}</h3><p>${center.address}</p>`)
    //     )
    //     .addTo(map.current!);
    // });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [centers]);

  return (
    <div ref={mapContainer} className="w-full h-full rounded-lg" />
  );
};

export default Map;