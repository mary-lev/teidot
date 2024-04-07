import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Box } from '@chakra-ui/react';
import Editor from './components/Editor';
import NavAdmin from './components/NavAdmin';


function App() {
  return (
    <Box>    
          <>
            <NavAdmin />
            <Editor />
          </>
    </Box>
  );
}

export default App;
