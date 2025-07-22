import { useEffect, useState } from 'react';
import { deleteProductById, getAllProducts } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
const ListProducts = () => {
  const [Products, setProducts] = useState([]);
  const navigate = useNavigate();
  //useEffect hook
  useEffect(() => {
    getProducts();
  }, []);
  //function  to get all Product details from the backend
  function getProducts() {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //function to navigate user to add new cateory component
  function addNewProduct() {
    navigate('/add-Product');
  }
  //function for update btn click handler
  function handleUpdateProduct(ProductId) {
    console.log('in update ' + ProductId);
    //navigate to SaveOrUpdateUpdateProduct
    navigate(`/edit-Product/${ProductId}`);
  }
  function handleDeleteProduct(ProductId) {
    //REST API call
    deleteProductById(ProductId)
      .then((response) => {
        console.log(response.data);
        // navigate('/Products');
        getProducts();
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className='container'>
      <button className='btn btn-primary mb-2 mt-2' onClick={addNewProduct}>
        Add New Product
      </button>
      {Products && (
        <div>
          <h3>Product List</h3>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <td>Product ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Last Updated</td>
                <td>Actions</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {Products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.updatedOn}</td>
                  <td>
                    <button
                      className='btn btn-info'
                      onClick={() => handleUpdateProduct(product.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDeleteProduct(product.id)}
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
export default ListProducts;
