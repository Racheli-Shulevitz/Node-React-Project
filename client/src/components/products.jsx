import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:1222/api/products/getAll"
      );
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Error fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = async (pId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:1222/api/cart/addToCart",
        { product: pId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      alert("Product added to cart");
      // navigate("/cart"); // Uncomment this if you want to navigate to the cart page after adding an item
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Error adding product to cart");
    }
  };

  return (
    <>
      {products.map((p) => (
        <div key={p._id}>
          <p>שם: {p.name}</p>
          <p>מחיר: {p.price}</p>
          <button onClick={() => addToCart(p._id)}>הוסף לסל</button>
        </div>
      ))}
    </>
  );
};

export default Product;
