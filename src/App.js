import React, { useState } from "react";
import CreateProductComponent from "./components/CreateProduct";
import UpdateProductComponent from "./components/UpdateProduct";
import DeleteProductComponent from "./components/DeleteProduct";
import ProductCollectionComponent from "./components/ProductCollection";
import NavbarComponent from "./components/Navbar";

const App = () => {
  const [productId, setProductId] = useState("");
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);

  return (
    <>
      <NavbarComponent />
      <div className="p-4">
        <ProductCollectionComponent
          setProductId={setProductId}
          setEditProduct={setEditProduct}
          setDeleteProduct={setDeleteProduct}
        />
        <CreateProductComponent />
        {editProduct && (
          <UpdateProductComponent
            id={productId}
            setEditProduct={setEditProduct}
          />
        )}
        {deleteProduct && (
          <DeleteProductComponent
            id={productId}
            setDeleteProduct={setDeleteProduct}
          />
        )}
      </div>
    </>
  );
};
export default App;
