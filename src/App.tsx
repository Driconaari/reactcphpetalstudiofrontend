import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../src/components/ProtectedRoute';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage.tsx';
import ProfilePage from "./pages/ProfilePage.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shop" element={<ShopPage bouquets={[]} loading={false} />} />
                <Route path="/profile" element={<ProfilePage />} />


                {/* Protected Routes */}
                <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                <Route path="/user-profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;