import logo from './logo.svg';
import './App.css';
import AddFoodData from './components/AddFoodData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OrderSection from './components/orders/OrderSection';
import ShowDetails from './components/ShowDetails';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/orders" element={<OrderSection />} />
      <Route path="/addfood" element={<AddFoodData />} />
      <Route path="/orderdetails/:orderid" element={<ShowDetails />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
