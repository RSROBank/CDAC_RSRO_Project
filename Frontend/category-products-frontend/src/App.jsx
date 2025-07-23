import "./App.css";
import SaveOrUpdateCategoryComponent from "./components/SaveOrUpdateCategoryComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListCategories from "./components/ListCategories";
import ListProducts from "./components/ListProducts";
import SaveOrUpdateProductComponent from "./components/SaveOrUpdateProductComponent";
//import ListEmployees from './components/ListEmployees';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/Home";
import LoginPage from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Herosection from "./components/Herosection";
import CustomerDashboard from "./components/Dashboard/Dashbord";

function App() {
  return (
    <>
      <div className="min-h-screen bg-richblack-900 flex flex-col overflow-y-hidden">
          {/* <HeaderComponent /> */}
          <Navbar/>
          
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            {/* http://localhost:3000 */}
            <Route path="/" element={<HomePage />} />
            <Route path="dashboard" element={<CustomerDashboard/>}/>

            

            {/* http://localhost:3000/categories */}
            <Route path="/categories" element={<ListCategories />} />
            {/* http://localhost:3000/add-category */}
            <Route
              path="/add-category"
              element={<SaveOrUpdateCategoryComponent />}
            />
            {/* http://localhost:3000/edit-category/categoryId */}
            <Route
              path="/edit-category/:categoryId"
              element={<SaveOrUpdateCategoryComponent />}
            />
            {/* http://localhost:3000/products */}
            <Route path="/products" element={<ListProducts />} />
            {/* http://localhost:3000/add-product */}
            <Route
              path="/add-product"
              element={<SaveOrUpdateProductComponent />}
            />
            {/* http://localhost:3000/edit-product/productId */}
            <Route
              path="/edit-product/:productId"
              element={<SaveOrUpdateProductComponent />}
            />
          </Routes>
          {/* <FooterComponent /> */}
          <Footer/>
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;
