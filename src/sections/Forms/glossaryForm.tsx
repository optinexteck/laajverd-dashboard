// Import necessary hooks and components
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCjA3GI1FC6_wikAy6qMw8hk4ZXDPsgw1U',
  authDomain: 'laajverd-42a3f.firebaseapp.com',
  databaseURL: 'https://laajverd-42a3f-default-rtdb.firebaseio.com',
  projectId: 'laajverd-42a3f',
  storageBucket: 'laajverd-42a3f.firebasestorage.app',
  messagingSenderId: '654657065769',
  appId: '1:654657065769:web:9cff527bd2a4ec6a9f1d38',
  measurementId: 'G-ZS0JV6362J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ----------------------------------------------------------------------

export function GlossaryForm() {
  const [title, setTitle] = useState(''); // State for title
  const [description, setDescription] = useState(''); // State for description
  const [glossaryData, setGlossaryData] = useState([]); // State for fetched data

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const docData = { title, description };
      const docRef = await addDoc(collection(db, 'archives'), docData);
      console.log('Document written with ID:', docRef.id);
      alert('Entry successfully added!');
      fetchGlossaryData(); // Fetch data after adding
    } catch (error) {
      console.error('Error adding entry:', error);
      alert(`Error adding entry: ${error.message}`);
    }
  };

  const fetchGlossaryData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'archives'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Include document ID
      setGlossaryData(data); // Set fetched data to state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchGlossaryData(); // Fetch data on component mount
  }, []);

  const renderArchiveForm = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <TextField
        fullWidth
        name="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 3 }}
      />
      <LoadingButton fullWidth size="large" type="submit" color="inherit" variant="contained">
        Add Entry
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Glossary Form
      </Typography>
      {renderArchiveForm}


      {/* Display fetched glossary data */}
    
    </>
  );
}
