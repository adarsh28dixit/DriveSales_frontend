import './App.css';
import Home from './Components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddUser from './Components/AddUser';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Details from './Components/Details';
import Edit from './Components/Edit';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addNewUser" element={<Register />}></Route>
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
