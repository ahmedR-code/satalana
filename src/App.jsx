import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AccommodationDetails from './pages/AccommodationDetails'
import TourDetails from './pages/TourDetails'
import DahabiyaDetails from './pages/DahabiyaDetails'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation-details" element={<AccommodationDetails />} />
        <Route path="/tour-details" element={<TourDetails />} />
        <Route path="/dahabiya-details" element={<DahabiyaDetails />} />
      </Routes>
    </Router>
  )
}

export default App
