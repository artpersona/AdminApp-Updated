import React, {createContext, useContext, useState, useEffect} from 'react';
import {FirebaseContext} from './FirebaseContext';
import {AuthContext} from './AuthContext';

export const ProductContext = createContext();

const sortByKey = (array, key) =>
  array.sort((a, b) => {
    const x = a[key].toLowerCase();
    const y = b[key].toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

const ProductProvider = ({children}) => {
  const {userInfoRole, store_id, userInfoStore} = useContext(AuthContext);
  const {database} = useContext(FirebaseContext);

  const [storeProducts, setStoreProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    fetchStoreProducts();
  }, [userInfoStore, store_id]);

  const fetchStoreProducts = () => {
    const storeID =
      userInfoRole == 'branch_admin' ? String(store_id) : String(userInfoStore);
    const productsRef = database().ref('products');
    productsRef
      .orderByChild('store_id')
      .equalTo(storeID)
      .on('value', snapshot => {
        const productCategories = new Set();
        const productsObject = (snapshot && snapshot.val()) || {};
        const productsArray =
          (productsObject &&
            Object.entries(productsObject) &&
            Object.entries(productsObject).length &&
            Object.entries(productsObject).map(item => {
              item[1].key = item[0];
              productCategories.add(item[1].product_category_name);
              return item[1];
            })) ||
          [];
        console.log('product categories are: ', productCategories);
        setProductCategories(Array.from(productCategories));
        setStoreProducts(sortByKey(productsArray, 'name'));
      });
  };

  const updateProduct = (
    product,
    {stock, name, storePrice, price, discountPrice, discountSellingPrice},
    storeID,
  ) => {
    return new Promise((resolve, reject) => {
      product.stock[`${storeID}`] = parseInt(stock);
      product.name = name;
      product.price = price;
      product.storePrice = storePrice;
      product.discountPrice = discountPrice;
      product.discountSellingPrice = discountSellingPrice;
      let updates = {};
      updates[`products/` + product.key] = product;
      database()
        .ref()
        .update(updates)
        .then(res => {
          resolve();
        })
        .catch(error => {
          console.log('error is: ', error);
          reject(error);
        });
    });
  };

  const payload = {
    storeProducts,
    fetchStoreProducts,
    updateProduct,
    productCategories,
  };
  return (
    <ProductContext.Provider value={payload}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
