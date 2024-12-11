import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import UserProfilePage from './pages/UserProfilePage';

const RouterConfig = () => {
    return (
        <Router>
            <Routes>
                <Route path="/shop" element={<ShopPage bouquets={[]} loading={false} />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
        </Router>
    );
}

export default RouterConfig;
