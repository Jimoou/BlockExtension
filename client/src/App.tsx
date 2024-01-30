import React from 'react';
import 'assets/style/App.scss';
import { Route, Routes } from 'react-router-dom';
import ExtensionManagement from 'pages/ExtensionManagement';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<ExtensionManagement />} />
      </Routes>
    </div>
  );
}

export default App;
