import React from 'react';
import { Marker } from './Marker/Marker';

type MarkerType = {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  timestamp: number;
  number: number;
};

interface MarkersProps {
  markers: MarkerType[];
  handleDeleteMarker: (index: number) => void;
}

export const Markers: React.FC<MarkersProps> = ({ markers, handleDeleteMarker }) => {
  return (
    <>
      {markers.map((marker, index) => (
        <div key={marker.id}>
          <Marker marker={marker} index={index} handleDeleteMarker={handleDeleteMarker} />
        </div>
      ))}
    </>
  );
};