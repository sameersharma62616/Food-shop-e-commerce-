import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import BrandDashboard from "./pages/BrandDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerDashboard from "./pages/OwnerDashboard";
import FoodDetail from "./pages/FoodDetail";
import BrandDashboard2 from "./pages/BrandDashboard2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/BrandDashboard" element={<ProtectedRoute><BrandDashboard /></ProtectedRoute>} />
        <Route path="/ownerdashboard" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/branddashboard2/:id" element={<BrandDashboard2 />} />
      </Routes>
    </Router>
  );
}

export default App;
