import { MapContainer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
// import { EditControl } from 'react-leaflet-draw';
import { CurrentMapPos } from '../../hooks/CurrentPosition';
import { LocateControl } from './LocateControl';
import MapDark from '../../svg/Dark/global.svg';
import TasksDark from '../../svg/Dark/clipboard-text.svg';

const customData = [
  {
    id: 1,
    name: 'Streetlight A',
    latitude: 12.9716,
    longitude: 77.5946,
    status: 'Working',
    iconUrl: MapDark,
  },
  {
    id: 2,
    name: 'Streetlight B',
    latitude: 12.2958,
    longitude: 76.6394,
    status: 'Not Working',
    iconUrl: TasksDark,
  },
];

const SetViewOnPositionChange = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
};

function TileLayerCustom() {
  const map = useMap();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return null;
}

const AddSearchControl = () => {
  const map = useMap();
  const searchAdded = useRef(false);

  useEffect(() => {
    if (map && !searchAdded.current) {
      L.Control.geocoder({
        defaultMarkGeocode: true,
      }).addTo(map);
      searchAdded.current = true;
    }
  }, [map]);

  return null;
};

const GisMaps = () => {
  const position = CurrentMapPos();
  // const [streetlights, setStreetlights] = useState<any[]>(customData);

  // const handleDrawCreate = (e: { layer: any; layerType: any }) => {
  //   const layer = e.layer;
  //   const type = e.layerType;

  //   if (type === 'marker') {
  //     console.log('Marker coordinates:', layer.getLatLng());
  //   } else {
  //     console.log('Shape coordinates:', layer.getLatLngs());
  //   }
  // };

  return (
    <MapContainer center={position} zoom={12} scrollWheelZoom={true} style={{ minHeight: '100vh' }}>
      <TileLayerCustom />

      <Marker
        position={position}
        eventHandlers={{
          mouseover: (e) => {
            e.target.openPopup();
          },
          mouseout: (e) => {
            e.target.closePopup();
          },
        }}
      >
        <Popup>
          <div>
            <div>Lat: {position[0].toFixed(5)}</div>
            <div>Lng: {position[1].toFixed(5)}</div>
            <div>Other Info</div>
          </div>
        </Popup>
      </Marker>

      {customData.map((light) => {
        const customIcon = new L.Icon({
          iconUrl: light.iconUrl,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        });

        return (
          <Marker key={light.id} position={[light.latitude, light.longitude]} icon={customIcon}>
            <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false}>
              <div>
                <strong>{light.name}</strong>
                <br />
                Status: {light.status}
              </div>
            </Tooltip>

            <Popup>
              <div>
                <h3>{light.name}</h3>
                <p>Status: {light.status}</p>
                <p>
                  Coordinates: {light.latitude}, {light.longitude}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            rectangle: true,
            polygon: true,
            circle: true,
            marker: true,
            polyline: true,
          }}
          edit={{ remove: true }}
          onCreated={handleDrawCreate}
        />
      </FeatureGroup> */}

      <SetViewOnPositionChange position={position} />
      <AddSearchControl />
      <LocateControl />
    </MapContainer>
  );
};

export default GisMaps;
