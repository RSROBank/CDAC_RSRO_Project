import React, { useState, useEffect } from 'react';
import {
  updateCategory,
  addNewCategory,
  getCategoryById,
} from '../services/CategoryService';
import { useNavigate, useParams } from 'react-router-dom';

const AddCategoryComponent = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const title = 'Add';
  //add new state object to hold validation errors (client side)
  const [errors, setErrors] = useState({
    categoryName: '',
    description: '',
  });
  useEffect(() => {
    if (categoryId) {
      //make REST API call to get category details
      getCategoryById(categoryId)
        .then((response) => {
          setCategoryName(response.data.categoryName);
          setDescription(response.data.description);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [categoryId]);
  //useEffect hook added for logging errors !
  useEffect(() => {
    console.log('Errors:', errors);
  }, [errors]);
  //add validation rules
  function validateForm() {
    //copy errors object in errorCopy
    const errorsCopy = { ...errors };
    let valid = true;
    if (categoryName.trim()) {
      errorsCopy.categoryName = '';
    } else {
      valid = false;
      errorsCopy.categoryName = 'Category Name is required !';
    }
    if (description.trim()) {
      errorsCopy.description = '';
    } else {
      valid = false;
      errorsCopy.description = 'Description is required !';
    }
    setErrors(errorsCopy);
    return valid;
  }
  function createNewCategory() {
    //create category object
    const category = { categoryName, description };
    console.log(category);
    addNewCategory(category)
      .then((response) => {
        console.log(response.data);
        navigate('/categories');
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function updateCategoryDetails() {
    //create category object
    const category = { categoryName, description };
    console.log('update ' + category);
    updateCategory(categoryId, category)
      .then((response) => {
        console.log(response.data);
        navigate('/categories');
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //JS function to save category details
  /*
  1. create category object from the state
  2. invoke CategoryService's addCategory n pass this 
  3. navigate to list categories
  */
  function saveOrUpdateCategoryDetails(e) {
    e.preventDefault();
    //check for validation errors
    if (validateForm()) {
      if (categoryId) {
        //update category
        updateCategoryDetails();
      } else {
        createNewCategory();
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
              {categoryId ? 'Update' : 'Add'} Category Details
            </h3>
            <div className='card-body'>
              <form>
                <div className='form-row mb-3'>
                  <label className='col-form-label'>Name</label>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.categoryName ? 'is-invalid' : ''
                    }`}
                    placeholder='Enter Category Name'
                    name='categoryName'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  {errors.categoryName && (
                    <div className='invalid-feedback'>
                      {errors.categoryName}
                    </div>
                  )}
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Description</label>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.description ? 'is-invalid' : ''
                    }`}
                    placeholder='Enter Category Desc'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <div className='invalid-feedback'>{errors.description}</div>
                  )}
                </div>
                <div className='d-grid gap-2'>
                  <button
                    className='btn btn-success'
                    onClick={saveOrUpdateCategoryDetails}
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

export default AddCategoryComponent;
