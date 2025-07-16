import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './pages/User_Dashboard';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import Admin_Dashboard from './pages/Admin_Dashboard';
import Dev_Dashboard from './pages/Dev_Dashboard';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import ShoppingPage from './pages/ShoppingPage';

const Home = () => <div className="p-6">
  <h1 className="text-3xl font-bold mb-4">Welcome to SuRaksha</h1>
  <p className="text-gray-700">Your cyber security dashboard</p>
</div>;

const About = () => <div className="p-6">
  <h1 className="text-3xl font-bold mb-4">About Us</h1>
  <p className="text-gray-700">We provide cutting-edge cyber security solutions.</p>
</div>;

const Contact = () => <div className="p-6">
  <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
  <p className="text-gray-700">Email: contact@suraksha.com</p>
</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<Admin_Dashboard />} />
            <Route path="/dev-dashboard" element={<Dev_Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shopping" element={<ShoppingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;