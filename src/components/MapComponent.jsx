const GMAP_API = import.meta.env.GMAP_API
import React, { useState, useEffect } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const MapComponent = ({ lat, lng }) => {
  const [nearestDoctor, setNearestDoctor] = useState(null);
  const location = { lat, lng };

  let [locations, setLocation] = useState([])    

  useEffect(() => {
    if (lat && lng) {
      searchNearbyPlaces(lat, lng, 'doctor');
    }
  }, []);

  const searchNearbyPlaces = async (latitude, longitude, type) => {
    const response = await fetch(
      `http://localhost:3000/api/places?lat=${latitude}&lng=${longitude}&type=${type}`
    );
    const data = await response.json();
    console.log(data)
    if (data.results && data.results.length > 0) {
        data.results.map((key, _) => {
            setLocation([
                ...locations,
                {
                    location: key.geometry.location,
                    key: key.name
                }
            ])
        }); 


      const nearest = data.results[0];
      setNearestDoctor({
        name: nearest.name,
        location: {
          lat: nearest.geometry.location.lat,
          lng: nearest.geometry.location.lng,
        },
      });
    }
    console.log(locations)
    
  };

  return (
    <Map
        defaultZoom={13}
        defaultCenter={ { lat, lng } }
        mapId='DEMO_MAP_ID'
        // onCameraChanged={ (ev) =>
        //     console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        // }
    >
    {
        locations.map( poi => {
            console.log(poi)
            return (
                <AdvancedMarker
                key={poi.key}
                position={poi.location}>
                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            )
            }
        )
    }
    </Map>
  );
};

export default MapComponent;