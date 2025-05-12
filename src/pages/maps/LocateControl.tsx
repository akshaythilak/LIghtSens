import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export const LocateControl = () => {
  const map = useMap();
  const controlAdded = useRef(false);

  useEffect(() => {
    if (map && !controlAdded.current) {
      const LocateButton = L.Control.extend({
        onAdd: function () {
          const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          div.style.backgroundColor = 'white';
          div.style.width = '33px';
          div.style.height = '33px';
          div.style.cursor = 'pointer';
          div.style.display = 'flex';
          div.style.alignItems = 'center';
          div.style.justifyContent = 'center';
          div.title = 'Locate Me';

          div.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path fill="black" d="M12 8a4 4 0 100 8 4 4 0 000-8zm8.94 4.94l-2.12-.49a6.992 6.992 0 00-5.33-5.33l-.49-2.12A1 1 0 0012 4a1 1 0 00-.94.7l-.49 2.12a6.992 6.992 0 00-5.33 5.33l-2.12.49A1 1 0 002 12c0 .47.33.87.76.97l2.12.49a6.992 6.992 0 005.33 5.33l.49 2.12c.1.43.5.76.97.76s.87-.33.97-.76l.49-2.12a6.992 6.992 0 005.33-5.33l2.12-.49c.43-.1.76-.5.76-.97s-.33-.87-.76-.97z"/>
            </svg>
          `;

          div.onclick = function () {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                  const userLatLng = L.latLng(coords.latitude, coords.longitude);
                  map.setView(userLatLng, 14);
                },
                (error) => {
                  console.error('Geolocation error:', error);
                  alert('Could not get your location');
                },
              );
            } else {
              alert('Geolocation not supported');
            }
          };

          return div;
        },
        onRemove: function () {
          // nothing to do
        },
      });

      const locateButton = new LocateButton({ position: 'topright' });
      locateButton.addTo(map);

      controlAdded.current = true;
    }
  }, [map]);

  return null;
};
