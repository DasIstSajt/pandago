import './App.css'
import Ures from "./pages/NoPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Kezdolap from './pages/Home';
import Bejelentkezes from './pages/Login';
import Reg from './pages/Reg';
import Profile from './pages/Profile';
import Journey from './pages/Journey';
import { UserProvider } from './context/UserContext';

function App() {

  return (
    <>
    <UserProvider>
      <Router>
        <Toaster/>
      <Routes>
        <Route index element={<Kezdolap />} />
        <Route path="*" element={<Ures />} />
        <Route path='/home' element={<Kezdolap />} />
        <Route path='/login' element={<Bejelentkezes />} />
        <Route path='/register' element={<Reg/>} />
        <Route path='/me' element={<Profile />} />
        <Route path='/journey' element={<Journey />} />
      </Routes>
    </Router>
    </UserProvider>
    </>
  )
}

export default App