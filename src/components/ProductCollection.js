import { Image, ArrowDownCircle } from "react-feather";
import { useState, useEffect } from "react";
import { getProducts } from "../libs/api/products";

const ProductCollectionComponent = (props) => {
  const [isLoading, setIsloading] = useState(false);
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsloading(true);
        const response = await getProducts();
        setProducts(response?.data?.data);
        setNextPage(response?.data?.next_page_url);
      } catch (err) {
      } finally {
        setIsloading(false);
      }
    }
    fetchData();
  }, []);

  const launchEditProduct = (id) => {
    props.setProductId(id);
    props.setEditProduct(true);
  };

  const launchDeleteProduct = (id) => {
    props.setProductId(id);
    props.setDeleteProduct(true);
  };

  const onNextPage = async () => {
    if (!nextPage) return;
    try {
      const response = await getProducts(nextPage);
      setProducts((oldArray) => [...oldArray, ...response?.data?.data]);
      setNextPage(response?.data?.next_page_url);
    } catch (err) {}
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  if (products.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Tidak ada daftar produk</p>
      </div>
    );
  return (
    <>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-4 gap-3">
        {products?.map((item, i) => (
          <div
            className="card card-compact bg-base-100 w-full shadow-xl"
            key={i}>
            <figure>
              <Image className="h-full w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item?.product_name}</h2>
              <p>Kategori: {item?.category}</p>
              <p
                className={`font-bold  ${
                  item.discount ? "text-red-500 line-through" : ""
                }`}>
                {rupiah(item.price)}
              </p>
              {item.discount && (
                <p className="font-bold">
                  {rupiah(item.price - (item.price / 100) * item.discount)}
                </p>
              )}
              {item?.discount && (
                <p className="font-bold text-red-500">
                  Diskon: {item?.discount + "%"}
                </p>
              )}
              <div className="card-actions justify-end flex gap-2">
                <button
                  className="btn btn-success btn-sm w-full"
                  onClick={() => launchEditProduct(item?.id)}>
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm w-full"
                  onClick={() => launchDeleteProduct(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="min-h-11" />
      {nextPage && (
        <div
          className="flex flex-col items-center justify-center m-5"
          onClick={() => onNextPage()}>
          <ArrowDownCircle
            height={50}
            width={50}
            className="bg-primary rounded-full cursor-pointer"
            color="white"
          />
        </div>
      )}
    </>
  );
};

export default ProductCollectionComponent;
