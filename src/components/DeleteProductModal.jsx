import close from "../assets/Close.png"

const DeleteProductModal = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-[30px] w-[472px] max-w-sm flex flex-col items-center text-center">
                <img src={close} alt="" className="mt-3"/>
                <p className="mt-12 mb-6">آیا از حذف این محصول مطمئنید؟</p>
                <div className="flex justify-between *:w-[160px] *:h-[41px] font-semibold gap-6">
                    <button
                        onClick={onConfirm}
                        className="py-2.5 rounded-[10px] bg-[#F43F5E] text-white hover:bg-red-600"
                    >
                        حذف
                    </button>
                    <button
                        onClick={onClose}
                        className="py-2.5 rounded-[10px] bg-gray-300  hover:bg-gray-400"
                    >
                        لغو
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProductModal;
