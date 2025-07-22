import './App.css';
import SaveOrUpdateCategoryComponent from './components/SaveOrUpdateCategoryComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListCategories from './components/ListCategories';
import ListProducts from './components/ListProducts';
import SaveOrUpdateProductComponent from './components/SaveOrUpdateProductComponent';
//import ListEmployees from './components/ListEmployees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000 */}
          <Route path='/' element={<ListCategories />} />
          {/* http://localhost:3000/categories */}
          <Route path='/categories' element={<ListCategories />} />
          {/* http://localhost:3000/add-category */}
          <Route
            path='/add-category'
            element={<SaveOrUpdateCategoryComponent />}
          />
          {/* http://localhost:3000/edit-category/categoryId */}
          <Route
            path='/edit-category/:categoryId'
            element={<SaveOrUpdateCategoryComponent />}
          />
          {/* http://localhost:3000/products */}
          <Route path='/products' element={<ListProducts />} />
          {/* http://localhost:3000/add-product */}
          <Route
            path='/add-product'
            element={<SaveOrUpdateProductComponent />}
          />
          {/* http://localhost:3000/edit-product/productId */}
          <Route
            path='/edit-product/:productId'
            element={<SaveOrUpdateProductComponent />}
          />
        </Routes>
        {/* <FooterComponent /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
