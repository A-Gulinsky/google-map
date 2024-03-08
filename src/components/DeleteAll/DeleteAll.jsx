import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Button } from "./DeleteAll.styled";

export const DeleteAll = ({setData}) => {

  const deleteAllMarkers = async () => {
    try {
    
      const querySnapshot = await getDocs(collection(db, 'markers'));

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    
      setData([])

      console.log('All markers deleted successfully!');
    } catch (error) {
      console.error('Error deleting markers:', error);
    }
  };

  return (
    <Button onClick={deleteAllMarkers}>Delete All Markers</Button>
  )
}