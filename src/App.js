import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Box } from '@chakra-ui/react';
import Editor from './components/Editor';
import NavAdmin from './components/NavAdmin';


function App() {
  return (
          <Box>
            <Routes>            
              <Route path="/" element={
                <>
                  <NavAdmin />
                  <Editor availableMenus={["editorMenu", "semanticMarkupMenu", "criticalApparatusMenu", "transcriptionMenu"]}/>
                </>
              } /> 
              <Route path="/manzoni" element={
                <>
                  <NavAdmin />
                  <Editor defaultFileName="Benucci" availableMenus={['noteMenu', 'semanticMarkupMenu']}/>
                </>
              } />                 
            </Routes>
          </Box>
  );
}

export default App;
