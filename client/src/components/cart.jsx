// import { useEffect, useState } from "react";
// import axios from "axios";

// const Cart = () => {
//   const [allCart, setAllCart] = useState([]);

//   const deleteFromCart = async (pId) => {
//     try {
//       const { data } = await axios.delete(
//         "http://localhost:1222/api/cart/deleteFromCart",
//         {
//           headers: { Authorization: "Bearer " + localStorage.getItem("token") },
//           data: { product: pId },
//         }
//       );
//       // Fetch the updated cart after deletion
//       fetchAllCart();
//     } catch (err) {
//       alert("Error deleting item from cart");
//     }
//   };

//   const fetchAllCart = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:1222/api/cart/getAllCart",
//         {
//           headers: { Authorization: "Bearer " + localStorage.getItem("token") },
//         }
//       );
//       setAllCart(data);
//     } catch (err) {
//       alert("Error fetching cart");
//     }
//   };

//   useEffect(() => {
//     fetchAllCart();
//   }, []);

//   return (
//     <>
//       {allCart.map((p) => {
//         return (
//           <div key={p.product._id}>
//             <p>שם: {p.product.name}</p>
//             <p>מחיר: {p.product.price}</p>
//             <button onClick={() => deleteFromCart(p.product._id)}>מחיקה</button>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default Cart;
