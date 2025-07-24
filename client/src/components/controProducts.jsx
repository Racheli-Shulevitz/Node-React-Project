import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";

// טעינה עצלה של הקומפוננטה setProduct
const LazySetProduct = React.lazy(() => import("./setProduct"));

const ControlProducts = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:1222/api/products/getAll"
      );
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (pName) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:1222/api/products/delete",
        { data: { name: pName } }
      );
      console.log(data);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const closeDialogAndRefresh = () => {
    setVisible(false);
    fetchProducts();
  };

  const ProductCard = ({ product }) => {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "370px",
          marginBottom: "2rem",
          marginTop: "2rem",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "450px",
        }}
      >
        <Card>
          <div
            className="card flex justify-content-center"
            style={{ height: "37vh", overflow: "hidden" }}
          >
            <Image
              src={`/pics/${product.image}`}
              alt={product.name}
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ marginTop: "1rem", flexGrow: 1 }}>
            <h2 style={{ fontSize: "1.2rem", textAlign: "center" }}>
              {product.name}
            </h2>
            <p style={{ fontSize: "0.8rem", textAlign: "right" }}>
              <div style={{ fontWeight: "bolder" }}> ₪ {product.price}</div>
            </p>
            <p style={{ fontSize: "0.9rem", textAlign: "right" }}>
              {product.description}
            </p>
            <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
              {product.size}
            </p>
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              label="מחיקה"
              icon="pi pi-trash"
              className="p-button-danger"
              style={{
                backgroundColor: "lightblue",
                width: "45%",
                borderColor: "gray",
              }}
              onClick={() => deleteProduct(product.name)}
            />
            <Button
              label="עדכון"
              icon="pi pi-pencil"
              style={{
                backgroundColor: "lightblue",
                width: "45%",
                borderColor: "gray",
              }}
              onClick={() => {
                setCurrentProduct(product);
                setVisible(true);
              }}
            />
          </div>
        </Card>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {products &&
          products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              deleteProduct={deleteProduct}
            />
          ))}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Button
          label="הוסף מוצר"
          icon="pi pi-plus"
          onClick={() => {
            setCurrentProduct(null);
            setVisible(true);
          }}
        />
      </div>
      <Dialog
        header={currentProduct ? "עדכן מוצר" : "הוסף מוצר"}
        visible={visible}
        style={{
          width: "70vw",
          height: "50vh",
          fontStyle: "normal",
          textAlign: "center",
          color: "slategrey",
        }}
        onHide={() => setVisible(false)}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <LazySetProduct
            product={currentProduct}
            onClose={closeDialogAndRefresh}
          />
        </Suspense>
      </Dialog>
    </>
  );
};

export default ControlProducts;
