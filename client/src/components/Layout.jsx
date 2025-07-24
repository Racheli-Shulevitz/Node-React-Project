import React from "react";
import { Outlet } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";

const Layout = () => {
  const items = [
    {
      label: <img src="/pics/logo.jpg" alt="Logo" style={{ height: "10vh" }} />,
      url: "/home",
    },
    {
      icon: "pi pi-user-plus",
      label: (
        <span>
          <i style={{ marginRight: "0.7rem" }} />
          התחברות
        </span>
      ),
      items: [
        {
          label: "כניסה",
          url: "/login",
        },
        {
          label: "הרשמה",
          url: "/register",
        },
      ],
    },
    {
      icon: "pi pi-unlock",
      label: (
        <span>
          <i style={{ marginRight: "0.7rem" }} />
          ניהול מוצרים
        </span>
      ),
      url: "/controlProducts",
    },
    {
      icon: "pi pi-shopping-cart",
      label: (
        <span>
          <i style={{ marginRight: "0.7rem" }} />
          סל קניות
        </span>
      ),
      url: "/cart",
    },
    {
      icon: "pi pi-sign-out",
      label: (
        <span>
          <i style={{ marginRight: "0.7rem" }} />
          יציאה
          <button
            onClick={() => {
              localStorage.removeItem("token");
            }}
            style={{
              background: "none",
              border: "none",
              padding: "0",
              color: "inherit",
            }}
          ></button>
        </span>
      ),
      url: "/",
    },
    {
      icon: "pi pi-th-large",
      label: (
        <span>
          <i style={{ marginRight: "0.7rem" }} />
          מוצרים
        </span>
      ),
      url: "/products",
    },
  ];

  return (
    <div
      style={{
        marginTop: "-3.5vh",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Menubar model={items} style={{ direction: "rtl", height:"12vh"}} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default Layout;
