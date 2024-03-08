import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps"
import { ButtonDelete, Delete, DetailsText, Span, TimeStamp } from "./Marker.styled"
import { useRef, useState } from "react"
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export const Marker = ({marker, index, handleDeleteMarker}) => {

  // index for current marker to open info window
  const [openIndex, setOpenIndex] = useState(null);
  const markerRefs = useRef([]);

  // marker's position
  const [position, setPosition] = useState({
    lat: marker.position.lat,
    lng: marker.position.lng
  })

  // open info window
  const openWindow = (index) => {
    setOpenIndex(index);
  };

  // close info window
  const closeWindow = () => {
    setOpenIndex(null);
  };

  // if we delete marker , need to change index - null
  const additionalClose = (index) => {
    handleDeleteMarker(index)
    closeWindow()
  }

  // when we finish moving the marker, we save its new position to the database
  const handleOnCloseClick = async(event) => {
    setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
    
    const docRef = doc(collection(db, "markers"), marker.id);
    await setDoc(docRef, {
      id: marker.id,
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      timestamp: marker.timestamp
    });
    
  }

  return (
    <>
      <AdvancedMarker
        position={position}
        draggable={true}
        ref={(ref) => markerRefs.current[index] = ref}
        onClick={() => openWindow(index)}
        onDragEnd={handleOnCloseClick}
      >
        <Span>{marker.number}</Span>
      </AdvancedMarker>
        
      {openIndex === index && (
        <InfoWindow anchor={markerRefs.current[index]} onCloseClick={closeWindow} style={{ backgroundColor: 'red' }}>
              
          <DetailsText>lat: <span>{position.lat.toFixed(5)}</span></DetailsText>
          <DetailsText>lng: <span>{position.lng.toFixed(5)}</span></DetailsText>

          <TimeStamp>{marker.timestamp}</TimeStamp>
            
          <ButtonDelete onClick={() => additionalClose(marker.id)}>
            <Delete />
          </ButtonDelete>
        </InfoWindow>
      )}
    </>
  )
}