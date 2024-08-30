import { Plus, X } from "react-feather";
import { useState } from "react";
import { createProduct } from "../libs/api/products";

const CreateProductComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    product_name: "",
    category: "",
    price: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    setIsLoading(true);
    try {
      const data = {
        product_name: formData.product_name,
        category: formData.category,
        price: formData.price,
        discount: formData.discount,
      };
      await createProduct(data);
      setIsSuccess(true);
    } catch (err) {
      setErrors({
        [err.response.data.errors.product_name ? "product_name" : null]: err
          .response.data.errors.product_name
          ? err.response.data.errors.product_name[0]
          : null,
        [err.response.data.errors.category ? "category" : null]: err.response
          .data.errors.category
          ? err.response.data.errors.category[0]
          : null,
        [err.response.data.errors.price ? "price" : null]: err.response.data
          .errors.price
          ? err.response.data.errors.price[0]
          : null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.product_name.trim()) {
      errors.product_name = "Nama Produk harus diisi";
    } else if (data.product_name.length >= 150) {
      errors.product_name = "Nama produk tidak boleh dari 150 karakter";
    }
    if (!data.category.trim()) {
      errors.category = "Kategori harus diisi";
    } else if (data.category.length >= 100) {
      errors.category = "Kategori produk tidak boleh dari 100 karakter";
    }
    if (!data.price) {
      errors.price = "Harga produk harus diisi";
    } else if (data.price.length >= 11) {
      errors.password = "Harga produk tidak boleh lebih dari 11 angka";
    }
    return errors;
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        {isSuccess && (
          <div>
            <dialog className="modal modal-open">
              <div className="modal-box bg-success">
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => window.location.reload()}>
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Alert</h3>
                <p className="py-4">Berhasil menambahkan produk</p>
              </div>
            </dialog>
          </div>
        )}
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Tambah Produk</h3>
          <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <form method="dialog">
              <button className="">
                <X />
              </button>
            </form>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-4 flex flex-col gap-3">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Nama Produk</span>
                </div>
                <input
                  type="text"
                  placeholder="Nama Produk"
                  className="input input-bordered w-full"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                />
                {errors?.product_name && (
                  <label className="text-red-500">{errors.product_name}</label>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Kategori Produk</span>
                </div>
                <input
                  type="text"
                  placeholder="Kategori Produk"
                  className="input input-bordered w-full"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
                {errors?.category && (
                  <label className="text-red-500">{errors.category}</label>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Harga Produk</span>
                </div>
                <input
                  type="number"
                  placeholder="Harga Produk"
                  className="input input-bordered w-full"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors?.price && (
                  <label className="text-red-500">{errors.price}</label>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Diskon Produk</span>
                </div>
                <input
                  type="number"
                  placeholder="Diskon Produk"
                  className="input input-bordered w-full"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </label>
              <button className="btn btn-success w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <div
        className="rounded-full h-14 w-14 bg-green-500 flex items-center justify-center bottom-5 right-5 z-50 cursor-pointer fixed"
        onClick={() => document.getElementById("my_modal_1").showModal()}>
        <Plus color="black" />
      </div>
    </div>
  );
};

export default CreateProductComponent;
