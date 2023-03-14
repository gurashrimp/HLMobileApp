
import React, { useState, createContext } from 'react'
import { getProducts, getProductById } from './ProductService';

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);

  const onGetProducts = async (sort) => {
    try {
      const result = await getProducts(sort);
      setProducts(result);

    } catch (error) {
      console.log('get productsss fail', error);
    }
  }

  const updateCart = (product, quantity, price, checked) => {
    let temp = cart;
    if (cart == 0) {
      temp.push({ product: product, quantity: quantity, price: price, checked: checked });
    } else {
      const check = cart.filter(item => item.product._id == product._id);
      // khong co san pham
      if (check.length == 0) {

        temp.push({ product: product, quantity: quantity, price: price, checked: checked })
      } else {
        if (quantity <= 0) {
          temp = temp.filter(item => item.product._id != product._id)
        } else {
          temp = temp.map(item => {
            if (item.product._id == product._id) {

              item.quantity = quantity >= 3 ? 3 : quantity;
            }
            return item;
          }
          )
        }
      }
    }
    setCart([...temp]);
  }
  const resetCart = () => { setCart([]) }
  const onGetProductById = async (id) => {
    try {
      const result = await getProductById(id);
      setProduct(result);
    } catch (error) {
      console.log(' onGetProductById that bai', error);
    }
  }
  return (
    <ProductContext.Provider
      value={{
        onGetProducts, onGetProductById, updateCart, product, products, cart, setCart, resetCart
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}


export default ProductContextProvider
