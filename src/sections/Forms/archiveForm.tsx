// Import necessary hooks and components
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Iconify } from 'src/components/iconify';

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

export function ArchiveForm() {
  const [title, setTitle] = useState(''); // State for title
  const [record, setRecord] = useState(''); // State for record
  const [imageUrl, setImageUrl] = useState(''); // State for imageUrl
  const [archiveData, setArchiveData] = useState([]); // State for fetched data

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !record || !imageUrl) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const docData = { title, record, imageUrl };
      const docRef = await addDoc(collection(db, 'Archive'), docData);
      console.log('Document written with ID:', docRef.id);
      alert('Entry successfully added!');
      fetchArchiveData(); // Fetch data after adding
    } catch (error) {
      console.error('Error adding entry:', error);
      alert(`Error adding entry: ${error.message}`);
    }
  };

  const fetchArchiveData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Archive'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Include document ID
      setArchiveData(data); // Set fetched data to state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchArchiveData(); // Fetch data on component mount
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
        name="record"
        label="Record"
        value={record}
        onChange={(e) => setRecord(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        name="imageUrl"
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
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
        Archive Form
      </Typography>
      {renderArchiveForm}

    </>
  );
}
