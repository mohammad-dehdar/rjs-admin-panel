import React from 'react';
import { useForm } from 'react-hook-form';
import { useEditProduct } from '../services/auth';

const EditProductModal = ({ product, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: product.name,
            price: product.price,
            stock: product.stock
        }
    });

    const { mutate: editProduct, isLoading } = useEditProduct();

    const onSubmit = (data) => {
        editProduct(
            { id: product.id, updates: data },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 w-[460px] flex flex-col items-center rounded-[30px] max-w-md">
                <div className="flex justify-between items-center my-4 text-xl font-medium">
                    <h2 className="text-xl font-bold">ویرایش اطلاعات</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            نام کالا
                        </label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                             className="w-[389px] h-[42px] p-2.5 rounded-[8px] font-light text-sm bg-[#F2F2F2] placeholder:text-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter product name"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name.message}</span>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            تعداد
                        </label>
                        <input
                            {...register('quantity', {
                                required: 'quantity is required',
                                min: { value: 0, message: 'Stock cannot be negative' }
                            })}
                            type="number"
                             className="w-[389px] h-[42px] p-2.5 rounded-[8px] font-light text-sm bg-[#F2F2F2] placeholder:text-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="تعداد"
                        />
                        {errors.stock && (
                            <span className="text-red-500 text-sm">{errors.stock.message}</span>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            قیمت
                        </label>
                        <input
                            {...register('price', {
                                required: 'Price is required',
                                pattern: {
                                    value: /^\d+(\.\d{1,2})?$/,
                                    message: 'Invalid price format'
                                }
                            })}
                            type="number"
                            step="0.01"
                             className="w-[389px] h-[42px] p-2.5 rounded-[8px] font-light text-sm bg-[#F2F2F2] placeholder:text-gray-700/50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter price"
                        />
                        {errors.price && (
                            <span className="text-red-500 text-sm">{errors.price.message}</span>
                        )}
                    </div>


                    <div className="flex justify-between gap-4 *:rounded-[10px] space-x-2 pt-4 *:w-full text-sm *:p-2.5">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#55A3F0] text-white rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                        >
                            {isLoading ? 'درحال ذخیره...' : 'ثبت اطلاعات جدید'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="border bg-[#DFDFDF] hover:bg-gray-100 transition-colors"
                        >
                            انصراف
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;