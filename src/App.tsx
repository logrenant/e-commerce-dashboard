import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import Orders from './pages/Orders';
import AdminLayout from './layouts/AdminLayout'; // AdminLayout'u buraya ekledik
import EditProduct from './pages/EditProduct';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/add-product"
          element={
            <AdminLayout>
              <AddProduct />
            </AdminLayout>
          }
        />
        <Route
          path="/product-list"
          element={
            <AdminLayout>
              <ProductList />
            </AdminLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <AdminLayout>
              <Orders />
            </AdminLayout>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <AdminLayout>
              <EditProduct />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
