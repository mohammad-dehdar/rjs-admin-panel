import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotificationModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded shadow-lg max-w-sm w-full flex flex-col justify-center items-center ">
                <div className="text-3xl font-bold text-center relative bottom-8  w-16 h-16 leading-[70px] bg-red-500 text-white rounded-full"><FontAwesomeIcon icon={faXmark} /></div>
                <div className="flex flex-col space-y-4 items-center text-gray-600">
                    <p className="text-2xl">ناموفق!</p>
                    <p>{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 w-52 rounded-md bg-red-500 text-white font-normal px-4 py-2 mb-4 mx-auto"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default NotificationModal;
