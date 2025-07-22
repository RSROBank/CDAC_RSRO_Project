import React, { useState, useEffect } from 'react';
import {
  updateProduct,
  addNewProduct,
  getProductById,
} from '../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';

const SaveOrUpdateProductComponent = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const navigate = useNavigate();
  const { productId } = useParams();
  const title = 'Add';
  //add new state object to hold validation errors (client side)
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    quantity: '',
    categoryId: '',
  });
  useEffect(() => {
    if (productId) {
      //make REST API call to get Product details
      getProductById(productId)
        .then((response) => {
          setName(response.data.name);
          setPrice(response.data.price);
          setQuantity(response.data.quantity);
          setCategoryId(response.data.categoryId);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [productId]);
  //useEffect hook added for logging errors !
  useEffect(() => {
    console.log('Errors:', errors);
  }, [errors]);
  //add validation rules
  function validateForm() {
    console.log('in validate ' + errors);
    console.log(name + ' ' + price + '  ' + quantity + '  ' + categoryId);
    //copy errors object in errorCopy
    const errorsCopy = { ...errors };
    let valid = true;
    if (name.trim()) {
      errorsCopy.name = '';
    } else {
      valid = false;
      errorsCopy.name = 'Product Name is required !';
    }
    if (price > 0) {
      errorsCopy.price = '';
    } else {
      valid = false;
      errorsCopy.price = 'Price must be > 0';
    }
    if (quantity > 0) {
      errorsCopy.quantity = '';
    } else {
      valid = false;
      errorsCopy.quantity = 'Quantity must be > 0';
    }
    if (categoryId > 0) {
      errorsCopy.categoryId = '';
    } else {
      valid = false;
      errorsCopy.categoryId = 'Category ID must be > 0';
    }
    setErrors(errorsCopy);
    return valid;
  }
  function createNewProduct() {
    //create Product object
    const Product = { name, price, quantity, categoryId };
    console.log(Product);
    addNewProduct(Product)
      .then((response) => {
        console.log(response.data);
        navigate('/products');
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function updateProductDetails() {
    //create Product object
    const Product = { name, price, quantity, categoryId };
    console.log('update ' + Product);
    updateProduct(productId, Product)
      .then((response) => {
        console.log(response.data);
        navigate('/products');
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //JS function to save Product details
  /*
  1. create Product object from the state
  2. invoke ProductService's addProduct n pass this 
  3. navigate to list categories
  */
  function saveOrUpdateProductDetails(e) {
    e.preventDefault();
    //check for validation errors
    if (validateForm()) {
      if (productId) {
        //update Product
        updateProductDetails();
      } else {
        createNewProduct();
      }
    } else {
      console.error(`validation errors ${errors}`);
    }
  }
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <h3 className='card-header'>
              {productId ? 'Update' : 'Add'} Product Details
            </h3>
            <div className='card-body'>
              <form>
                {!productId && (
                  <div className='mb-3'>
                    <label className='form-label'>Category ID</label>
                    <input
                      type='number'
                      className={`form-control ${
                        errors.categoryId ? 'is-invalid' : ''
                      }`}
                      placeholder='Enter Category ID'
                      name='categoryId'
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    />
                    {errors.categoryId && (
                      <div className='invalid-feedback'>
                        {errors.categoryId}
                      </div>
                    )}
                  </div>
                )}
                <div className='form-row mb-3'>
                  <label className='col-form-label'>Product Name</label>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.name ? 'is-invalid' : ''
                    }`}
                    placeholder='Enter Product Name'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <div className='invalid-feedback'>{errors.name}</div>
                  )}
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Price</label>
                  <input
                    type='number'
                    className={`form-control ${
                      errors.price ? 'is-invalid' : ''
                    }`}
                    placeholder='Enter Product Price'
                    name='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {errors.price && (
                    <div className='invalid-feedback'>{errors.price}</div>
                  )}
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Quantity</label>
                  <input
                    type='number'
                    className={`form-control ${
                      errors.quantity ? 'is-invalid' : ''
                    }`}
                    placeholder='Enter Product Quantity'
                    name='quantity'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  {errors.quantity && (
                    <div className='invalid-feedback'>{errors.quantity}</div>
                  )}
                </div>
                <div className='d-grid gap-2'>
                  <button
                    className='btn btn-success'
                    onClick={saveOrUpdateProductDetails}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveOrUpdateProductComponent;
