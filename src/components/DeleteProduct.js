import { useState } from "react";
import { X, HelpCircle } from "react-feather";
import { deleteProduct } from "../libs/api/products";

const DeleteProductComponent = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProduct(props.id);
      setIsSuccess(true);
    } catch (err) {
      setIsError(err.response.data.errors.message[0]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <dialog id="my_modal_1" className="modal modal-open">
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
                <p className="py-4">Berhasil menghapus produk</p>
              </div>
            </dialog>
          </div>
        )}
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Hapus Produk</h3>
          <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <button onClick={() => props?.setDeleteProduct(false)}>
              <X />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4 items-center justify-center">
            <p>Apakah anda akan menghapus produk ini?</p>
            <HelpCircle color="red" height={100} width={100} />
            {isError && <label className="text-red-500">{isError}</label>}
            <div className="flex gap-3 items-center justify-center">
              <button
                className="btn btn-sm btn-success w-full"
                onClick={() => onDelete()}
                disabled={isLoading}>
                Ya
              </button>
              <button
                className="btn btn-sm btn-error w-full"
                onClick={() => props?.setDeleteProduct(false)}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteProductComponent;
