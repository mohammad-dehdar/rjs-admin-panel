import { useForm } from 'react-hook-form';
import { useAddProduct } from '../services/auth';

const AddProductModal = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { mutate: addProduct, isLoading } = useAddProduct();

    const onSubmit = (data) => {
        addProduct(data, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-[30px] w-[460px] max-w-md flex flex-col items-center">
                <div className="flex justify-between items-center my-4">
                    <h2 className="text-xl font-medium">ایجاد محصول جدید</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            نام کالا
                        </label>
                        <input
                            {...register('name', { required: 'نام کالا ضروری است' })}
                            className="w-[389px] h-[42px] p-2.5 rounded-[8px] font-light text-sm bg-[#F2F2F2] placeholder:text-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="نام کالا"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            قیمت
                        </label>
                        <input
                            {...register('price', {
                                required: 'قیمت کالا ضروری است',
                                pattern: {
                                    value: /^\d+(\.\d{1,2})?$/,
                                    message: 'فرمت نامعتبر وارد نکنید'
                                }
                            })}
                            type="number"
                            step="0.01"
                            className="w-[389px] h-[42px] p-2.5 rounded-[8px] font-light text-sm bg-[#F2F2F2] placeholder:text-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="قیمت"
                        />
                        {errors.price && (
                            <span className="text-red-500 text-sm">{errors.price.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            تعداد کالا
                        </label>
                        <input
                            {...register('quantity', {
                                required: 'تعداد کالا ضروری است',
                                min: { value: 0, message: 'تعداد نمیتواند منفی باشد' }
                            })}
                            type="number"
                            className="w-[389px] h-[42px] p-2.5 rounded-[8px] font-light text-sm bg-[#F2F2F2] placeholder:text-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="تعداد"
                        />
                        {errors.stock && (
                            <span className="text-red-500 text-sm">{errors.stock.message}</span>
                        )}
                    </div>

                    <div className="flex justify-between gap-4 pt-4 *:w-full *:rounded-[10px]">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-[#55A3F0] text-white  hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                        >
                            {isLoading ? 'اضافه کردن...' : 'ایجاد'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#DFDFDF] px-4 py-2 border hover:bg-gray-100 transition-colors"
                        >
                            انصراف
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;