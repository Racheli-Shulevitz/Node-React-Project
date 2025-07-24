import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const SetProduct = ({ product, onClose }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [materials, setMaterials] = useState("");
  const [deliverytime, setDeliverytime] = useState("");
  const [warranty, setWarranty] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setImage(product.image || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setSize(product.size || "");
      setMaterials(product.materials || "");
      setDeliverytime(product.deliverytime || "");
      setWarranty(product.warranty || "");
    }
  }, [product]);

  const fetchSetProduct = async (e) => {
    e.preventDefault(); // למנוע רענון דף

    const newProduct = {
      name,
      image,
      description,
      price,
      size,
      materials,
      deliverytime,
      warranty,
    };

    if (product) {
      try {
        await axios.post("http://localhost:1222/api/products/update", {
          id: product._id,
          newProduct,
        });
      } catch (err) {
        alert("dupliate");
      }
    } else {
      try {
        await axios.post(
          "http://localhost:1222/api/products/create",
          newProduct
        );
      } catch (err) {
        alert("Duplicate");
      }
    }
    onClose();

    setError("התרחשה שגיאה בעדכון/יצירת המוצר. אנא נסה שוב.");
    //   console.log(err);
  };
  return (
    <>
      <form
        onSubmit={fetchSetProduct}
        style={{
          direction: "rtl",
          padding: "0 1rem",
        }}
      >
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="שם מוצר"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
        />
        <InputText
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="תמונה"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
        />
        <InputText
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="תיאור מוצר"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
        />
        <InputText
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="מחיר"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
        />
        <InputText
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="מידות"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
        ></InputText>
        <InputText
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          placeholder="חומרים"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
        ></InputText>
        <InputText
          value={deliverytime}
          onChange={(e) => setDeliverytime(e.target.value)}
          placeholder="זמן אספקה משוער"
          style={{ marginBottom: "1rem", marginRight: "0.5rem" }}
        ></InputText>
        <InputText
          value={warranty}
          onChange={(e) => setWarranty(e.target.value)}
          placeholder="אחריות"
          style={{ marginBottom: "1rem", marginRight: "1rem" }}
        ></InputText>
        <Button
          type="submit"
          label={product ? "עדכן מוצר" : "הוסף מוצר"}
          icon={product ? "pi pi-pencil" : "pi pi-plus"}
          style={{
            backgroundColor: "lightblue",
            width: "15.7vw",
            borderColor: "gray",
            marginBottom: "1rem",
            marginRight: "1.2rem",
          }}
        />
      </form>
    </>
  );
};

export default SetProduct;
