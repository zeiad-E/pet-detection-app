import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar.jsx';
import Home from './components/home/Home.jsx';
import AboutUs from './components/about us/AboutUs.jsx';
import SignUp from './components/sign up/SignUp.jsx';
import Login from './components/login/Login.jsx';
import Footer from './components/footer/Footer.jsx';
import Upload from './components/upload/Upload.jsx';
import Demo from './components/demoTest/Demo.jsx';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
