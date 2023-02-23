import { Routes, Route } from 'react-router-dom'
import Home from './Components/home/Home';
import QuickSearch from './Components/filter/QuickSearch';
import Restaurant from './Components/restaurant/Restaurant'


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quick-search/:meal_id" element={<QuickSearch />} />
      <Route path="/restaurant/:id" element={<Restaurant />} />
    </Routes>
      
    </>
  );
}

export default App;
