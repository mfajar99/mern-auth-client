// eslint-disable-next-line no-unused-vars
import React, { useState, use, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ProductList = () => {
  const [products, serProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/products')
    serProducts(response.data)
  }

  const deleteProducts = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`)
    getProducts()
  }

  return (
    <div>
      <h1 className='title'>Products</h1>
      <h2 className='subtitle'>List of Products</h2>
      <Link to="/products/add" className='button is-primary mb-2'>Add New</Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.user.name}</td>
              <td>
                <Link to={`/products/edit/${product.uuid}`} className="button is-small is-info">Edit</Link>
                <button onClick={() => deleteProducts(product.uuid)} className='button is-small is-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default ProductList