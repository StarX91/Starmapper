import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete, TrafficLayer, InfoWindow } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faHandPointer, faTrafficLight, faSearchLocation } from '@fortawesome/free-solid-svg-icons';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

// Fallback center location if geolocation fails
const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090
};

const Map = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [pinnedLocations, setPinnedLocations] = useState([]);
  const [isPinning, setIsPinning] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [activePin, setActivePin] = useState(null); // For displaying InfoWindow
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  // Function to get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
        },
        () => {
          console.warn('Geolocation failed or permission denied');
          // If geolocation fails, map center will remain the default location
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(markerPosition); // Center the map on the new marker position
      mapRef.current.setZoom(19); // Optionally, zoom into the new marker position
    }
  }, [markerPosition]);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const location = place.geometry.location;
      const newCenter = {
        lat: location.lat(),
        lng: location.lng()
      };
      console.log('New place location:', newCenter); // Debugging
      setMapCenter(newCenter);
      setMarkerPosition(newCenter); // Update marker position
    } else {
      console.error("No geometry available for the selected place.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      onPlaceChanged(); // Call the place search function
    }
  };

  const onMapClick = (event) => {
    if (isPinning) {
      const newPin = {
        id: new Date().getTime(), // unique id
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      console.log('New pinned location:', newPin); // Debugging
      setPinnedLocations([...pinnedLocations, newPin]);
    }
  };

  const togglePinningMode = () => {
    setIsPinning(!isPinning);
  };

  const toggleTrafficLayer = () => {
    setShowTraffic(!showTraffic);
  };

  const removePin = (pinId) => {
    setPinnedLocations(pinnedLocations.filter(pin => pin.id !== pinId));
  };

  const handleLatChange = (event) => {
    setLat(event.target.value);
  };

  const handleLngChange = (event) => {
    setLng(event.target.value);
  };

  const handleLatLngSearch = () => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
  
    if (!isNaN(latitude) && !isNaN(longitude)) {
      const newPosition = { lat: latitude, lng: longitude };
      console.log('New lat/lng position:', newPosition); // Debugging
      setMapCenter(newPosition);
      setMarkerPosition(newPosition); // Update marker position
  
      // Add a new pin automatically to the pinnedLocations
      const newPin = {
        id: new Date().getTime(), // unique id
        lat: latitude,
        lng: longitude
      };
      setPinnedLocations([...pinnedLocations, newPin]); // Add the new pin to the list
    } else {
      alert('Please enter valid latitude and longitude values.');
    }
  };
  

  return (
    <LoadScript googleMapsApiKey="AIzaSyDEIv1QNf-ygOSToYwVykWC0f75fmUwkL0" libraries={['places']}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Autocomplete
          onLoad={ref => (autocompleteRef.current = ref)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search places"
            onKeyPress={handleKeyPress} // Trigger on "Enter"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: 'absolute',
              top: '10px',
              left: '50%',
              marginLeft: '-120px',
              zIndex: 10
            }}
          />
        </Autocomplete>
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={handleLatChange}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `120px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              marginRight: '10px'
            }}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={handleLngChange}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `120px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              marginRight: '10px'
            }}
          />
          <button
            onClick={handleLatLngSearch}
            style={{
              padding: '10px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            <FontAwesomeIcon icon={faSearchLocation} />
          </button>
        </div>
        <button
          onClick={togglePinningMode}
          style={{
            position: 'absolute',
            top: '90px', // Adjust button position
            right: '10px',
            zIndex: 10,
            padding: '10px',
            backgroundColor: isPinning ? 'red' : 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <FontAwesomeIcon icon={isPinning ? faHandPointer : faMapMarkerAlt} />
        </button>
        <button
          onClick={toggleTrafficLayer}
          style={{
            position: 'absolute',
            top: '130px', // Adjust button position
            right: '10px',
            zIndex: 10,
            padding: '10px',
            backgroundColor: showTraffic ? 'red' : 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <FontAwesomeIcon icon={faTrafficLight} />
        </button>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={19} // Ensure zoom level is appropriate
          onClick={onMapClick}
          onLoad={(map) => (mapRef.current = map)}
        >
          <Marker position={markerPosition} icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }} />
          {pinnedLocations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }}
              onClick={() => removePin(location.id)}
              onMouseOver={() => setActivePin(location.id)}
              onMouseOut={() => setActivePin(null)}
            >
              {activePin === location.id && (
                <InfoWindow position={{ lat: location.lat, lng: location.lng }}>
                  <div>
                    <p>Lat: {location.lat}</p>
                    <p>Lng: {location.lng}</p>
                    <button onClick={() => removePin(location.id)}>Remove</button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
          {showTraffic && <TrafficLayer />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
