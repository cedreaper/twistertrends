import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import MainView from './components/views/MainView';
import './App.css'

function App() {
 

  return (
    <Router>
        <MainLayout>
            <Routes>
                <Route path="/" element={<MainView />} />
            </Routes>
        </MainLayout>
    </Router>
);
}

export default App
