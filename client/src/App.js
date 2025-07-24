import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
// import "primeflex/themes/primeone-light.css"
// import "primeflex/themes/primeone-dark.css"
// import "/node_modules/primeflex/primeflex.css"   
             

const LazyLayout = React.lazy(() => import("./components/Layout"));
const LazyRegister = React.lazy(() => import("./components/register"));
const LazyLogin = React.lazy(() => import("./components/Login"));
const LazyProducts = React.lazy(() => import("./components/controProducts"));
const LazySetProduct = React.lazy(() => import("./components/setProduct"));
const LazyCart =React.lazy(() => import("./components/cart"))
const LazyPro =React.lazy(()=> import("./components/products"))
const LazyHome = React.lazy(()=>import("./components/home"))

function App() {
  return (
    <div className="App">
      <PrimeReactProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense>
                  <LazyLayout />
                </Suspense>
              }
            >
              <Route
                path="/home"
                element={
                  <Suspense fallback="loading...">
                    <LazyHome />
                  </Suspense>
                }
              />
              <Route
                path="/register"
                element={
                  <Suspense fallback="loading...">
                    <LazyRegister />
                  </Suspense>
                }
              />
              <Route
                path="/login"
                element={
                  <Suspense fallback="loading...">
                    <LazyLogin />
                  </Suspense>
                }
              />
              <Route
                path="/controlProducts"
                element={
                  <Suspense fallback="loading...">
                    <LazyProducts />
                  </Suspense>
                }
              />
              <Route
                path="/setProduct"
                element={
                  <Suspense fallback="loading...">
                    <LazySetProduct />
                  </Suspense>
                }
              />
              <Route
                path="/cart"
                element={
                  <Suspense fallback="loading...">
                    <LazyCart />
                  </Suspense>
                }
              />
              <Route
                path="/products"
                element={
                  <Suspense fallback="loading...">
                    <LazyPro />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
