import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import MainPage from './pages/MainPage';
import MyQuotesPage from './pages/MyQuotesPage';
import '@mantine/core/styles.css';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
// import AuthModal from './components/AuthModal';

function App() {
  return (
    <MantineProvider>

      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route path='/' element={<MainPage />}/>
              <Route path='/my-quotes' element={<MyQuotesPage />}/>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      
    </MantineProvider>
  )
}

export default App
