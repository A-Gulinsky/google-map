import './App.css';
// import { Map } from './components/Map';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Markers } from './components/Markers/Markers.tsx';

// firebase
import { collection, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { MapContainer } from './App/App.styled';
import { DeleteAll } from './components/DeleteAll/DeleteAll';



const API_KEY = process.env.REACT_APP_API_KEY

function App() {

  const [data, setData] = useState([]);

  // GET all markers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'markers'));
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // ADD new Marker
  
  const handleMapClick = async (event) => {

    const lat = event.detail.latLng.lat;
    const lng = event.detail.latLng.lng;
    const timestamp = event.domEvent.timeStamp;

    // get id
    const newId = uuidv4();
    
    // get the number for the marker
    let number = null;

    if (data.length === 0) {
      number = 1;
    } else {
      const maxNumber = Math.max(...data.map(marker => marker.number));
      for (let i = 1; i <= maxNumber + 1; i++) {
    
        if (!data.find(marker => marker.number === i)) {
          number = i;
          break
        }
      }
    }    
    
    // add to date
    setData([...data, { id: newId, number, position: { lat, lng }, timestamp }]);

    // add to firebase
    try {
  
      const docRef = doc(collection(db, "markers"), newId);
      await setDoc(docRef, {
        id: newId,
        number,
        position: { lat, lng },
        timestamp
      });

      console.log("Document written with ID: ", newId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // DELETE Current Marker
  const handleDeleteMarker = async (index) => {
    
    // get data whitout current index
    setData(data.filter(marker => marker.id !== index))

    // delete current marker from firebase
    try {
      await deleteDoc(doc(db, 'markers', index)); 
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }

  }

  const position = {lat: 53.54992, lng: 10.00678};

  return (
    <APIProvider apiKey={API_KEY}>
      <MapContainer>

        <Map
          defaultCenter={position}
          defaultZoom={10}
          mapId={process.env.REACT_APP_MAP_ID}
          onDblclick={handleMapClick}
          disableDoubleClickZoom={true}
        >
          <Markers markers={data} handleDeleteMarker={handleDeleteMarker} /> 
        </Map>

        <DeleteAll />

      </MapContainer>
    </APIProvider>
  );
}

export default App;