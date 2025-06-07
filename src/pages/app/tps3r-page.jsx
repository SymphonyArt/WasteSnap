import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "../../styles/tps3r.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom marker icons
const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: "user-marker",
});

// Sample TPS3R data for Jakarta
const tps3rLocations = [
  {
    id: 1,
    name: "TPS3R Jakarta Pusat",
    position: [-6.1862, 106.8345],
    address: "Jl. Merdeka No. 1",
  },
  {
    id: 2,
    name: "TPS3R Jakarta Selatan",
    position: [-6.2615, 106.8106],
    address: "Jl. Sudirman Kav. 1",
  },
  {
    id: 3,
    name: "TPS3R Jakarta Barat",
    position: [-6.1683, 106.7585],
    address: "Jl. Kembangan Raya No. 5",
  },
  {
    id: 4,
    name: "TPS3R Jakarta Timur",
    position: [-6.225, 106.9003],
    address: "Jl. Cipinang Jaya No. 10",
  },
  {
    id: 5,
    name: "TPS3R Jakarta Utara",
    position: [-6.1384, 106.8663],
    address: "Jl. Pluit Raya No. 2",
  },
];

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Routing = ({ map, start, end }) => {
  const routingControlRef = useRef();

  useEffect(() => {
    if (!map || !start || !end) return;

    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: false,
      showAlternatives: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: {
        styles: [{ color: "#3b82f6", weight: 5 }],
      },
      createMarker: () => null,
    }).addTo(map);

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, start, end]);

  return null;
};

const FindTPS3RPage = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [placedMarker, setPlacedMarker] = useState(null);
  const [nearestTps3r, setNearestTps3r] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTps3r, setSelectedTps3r] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const mapRef = useRef();

  // Default to Jakarta coordinates
  const defaultCenter = [-6.2, 106.816666];
  const defaultZoom = 12;

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = [position.coords.latitude, position.coords.longitude];
          setUserPosition(pos);
          setLoading(false);
          findNearestTps3r(pos);
        },
        (err) => {
          console.error("Error getting location:", err);
          setError(
            "Tidak dapat mengakses lokasi Anda. Silakan klik peta untuk memilih lokasi."
          );
          setLoading(false);
        }
      );
    } else {
      setError(
        "Browser tidak mendukung geolokasi. Silakan klik peta untuk memilih lokasi."
      );
      setLoading(false);
    }
  }, []);

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Function to find nearest TPS3R locations
  const findNearestTps3r = (position) => {
    if (!position) return;

    const withDistances = tps3rLocations.map((tps3r) => ({
      ...tps3r,
      distance: calculateDistance(
        position[0],
        position[1],
        tps3r.position[0],
        tps3r.position[1]
      ),
    }));

    // Sort by distance and take top 5
    const nearest = [...withDistances]
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    setNearestTps3r(nearest);
  };

  // Handle map click to place marker
  const handleMapClick = (e) => {
    const position = [e.latlng.lat, e.latlng.lng];
    setPlacedMarker(position);
    findNearestTps3r(position);
    if (showRoute) {
      setShowRoute(false);
      setSelectedTps3r(null);
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.on("click", handleMapClick);
      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [mapRef.current, showRoute]);

  const handleShowRoute = (tps3r) => {
    if (showRoute && selectedTps3r?.id === tps3r.id) {
      setShowRoute(false);
      setSelectedTps3r(null);
    } else {
      setSelectedTps3r(tps3r);
      setShowRoute(true);
      mapRef.current.flyTo(tps3r.position, 15);
    }
  };

  const handleHideRoute = () => {
    setShowRoute(false);
    setSelectedTps3r(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat peta dan lokasi TPS3R...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Cari Lokasi TPS3R Terdekat di Jakarta
        </h1>
        <p className="text-gray-600">
          Klik di peta untuk menandai lokasi Anda dan menemukan TPS3R terdekat
        </p>
      </div>

      {error && (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-96 w-full relative">
          <MapContainer
            center={userPosition || defaultCenter}
            zoom={defaultZoom}
            scrollWheelZoom={true}
            className="h-full w-full"
            whenCreated={(map) => {
              mapRef.current = map;
            }}
          >
            <ChangeView
              center={userPosition || defaultCenter}
              zoom={defaultZoom}
            />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* User position marker */}
            {userPosition && (
              <Marker position={userPosition}>
                <Popup>Lokasi Anda Saat Ini</Popup>
              </Marker>
            )}

            {/* User-placed marker */}
            {placedMarker && (
              <Marker position={placedMarker} icon={customMarkerIcon}>
                <Popup>Lokasi yang Anda pilih</Popup>
              </Marker>
            )}

            {/* TPS3R markers */}
            {nearestTps3r.map((tps3r) => (
              <Marker key={tps3r.id} position={tps3r.position}>
                <Popup>
                  <div className="space-y-1">
                    <h3 className="font-bold text-blue-600">{tps3r.name}</h3>
                    <p className="text-sm">{tps3r.address}</p>
                    <p className="text-xs text-gray-500">
                      Jarak: {tps3r.distance.toFixed(2)} km
                    </p>
                    <button
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                      onClick={() => handleShowRoute(tps3r)}
                    >
                      {showRoute && selectedTps3r?.id === tps3r.id
                        ? "Sembunyikan Rute"
                        : "Lihat Rute"}
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Routing */}
            {showRoute && selectedTps3r && (
              <Routing
                map={mapRef.current}
                start={placedMarker || userPosition}
                end={selectedTps3r.position}
              />
            )}
          </MapContainer>
        </div>
      </div>

      {/* Route control panel */}
      {showRoute && selectedTps3r && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-blue-800">
                Rute ke {selectedTps3r.name}
              </h3>
              <p className="text-sm text-blue-700">
                {selectedTps3r.address} ({selectedTps3r.distance.toFixed(2)} km)
              </p>
            </div>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
              onClick={handleHideRoute}
            >
              Tutup Rute
            </button>
          </div>
        </div>
      )}

      {placedMarker && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            TPS3R Terdekat dari Lokasi yang Dipilih
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearestTps3r.map((tps3r) => (
              <div
                key={tps3r.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="font-bold text-gray-800">{tps3r.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{tps3r.address}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {tps3r.distance.toFixed(2)} km
                  </span>
                  <button
                    className="text-blue-500 text-sm font-medium hover:text-blue-700"
                    onClick={() => {
                      mapRef.current.flyTo(tps3r.position, 15);
                    }}
                  >
                    Lihat di Peta
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!placedMarker && (
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-blue-800">
            Klik di peta untuk memilih lokasi dan melihat TPS3R terdekat
          </p>
        </div>
      )}
    </div>
  );
};

export default FindTPS3RPage;
