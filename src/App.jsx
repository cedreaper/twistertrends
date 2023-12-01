import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import MainView from './components/views/MainView';
import PrivacyPolicyView from './components/views/PrivacyPolicyView';
import ContactView from './components/views/ContactView';
import './App.css'
import AboutView from './components/views/AboutView';
import TermsOfServiceView from './components/views/TermsOfServiceView';
import LineGraphView from './components/views/LineGraphView';
import BarGraphView from './components/views/BarGraphView';
import ScatterPlotView from './components/views/ScatterPlotView';
import HistogramView from './components/views/HistogramView';
import SearchView from './components/views/SearchView';



function App() {
 

  return (
    <Router>
        <MainLayout>
            <Routes>
                <Route path='/' element={<MainView />} />
                <Route path='/privacy' element={<PrivacyPolicyView />} />
                <Route path='/contact' element={<ContactView />} />
                <Route path='/about' element={<AboutView />} />
                <Route path='/terms' element={<TermsOfServiceView />} />
                <Route path='/visualization/line' element={<LineGraphView />} />
                <Route path='visualization/bar'  element={<BarGraphView />} />
                <Route path='/visualization/scatter'  element={<ScatterPlotView />} />
                <Route path='/visualization/histogram' element={<HistogramView />} />
                <Route path='/visualization/explore' element={<SearchView />} />
            </Routes>
        </MainLayout>
    </Router>
);
}

export default App
