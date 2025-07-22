import { useEffect, useState } from 'react';
import {
  deleteCategoryById,
  getAllCategories,
} from '../services/CategoryService';
import { useNavigate } from 'react-router-dom';
const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  //useEffect hook
  useEffect(() => {
    getCategories();
  }, []);
  //function  to get all category details from the backend
  function getCategories() {
    getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //function to navigate user to add new cateory component
  function addNewCategory() {
    navigate('/add-category');
  }
  //function for update btn click handler
  function handleUpdateCategory(categoryId) {
    console.log('in update ' + categoryId);
    //navigate to SaveOrUpdateUpdateCategory
    navigate(`/edit-category/${categoryId}`);
  }
  function handleDeleteCategory(categoryId) {
    //REST API call
    deleteCategoryById(categoryId)
      .then((response) => {
        console.log(response.data);
        // navigate('/categories');
        getCategories();
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className='container'>
      <button className='btn btn-primary mb-2 mt-2' onClick={addNewCategory}>
        Add New Category
      </button>
      {categories && (
        <div>
          <h3>Category List</h3>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <td>Category ID</td>
                <td>Name</td>
                <td>Description</td>
                <td>Last Updated</td>
                <td>Actions</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.categoryName}</td>
                  <td>{category.description}</td>
                  <td>{category.updatedOn}</td>
                  <td>
                    <button
                      className='btn btn-info'
                      onClick={() => handleUpdateCategory(category.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default ListCategories;
