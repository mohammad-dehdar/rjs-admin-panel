import { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useDeleteProduct } from '../services/auth';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import trash from "../assets/trash.png";
import edit from "../assets/edit.png";

const ProductList = () => {
    const { products, isLoading, error } = useProductContext();
    const { mutate: deleteProduct } = useDeleteProduct();
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);

    if (isLoading) return <p className="text-center py-4">Loading products...</p>;
    if (error) return <p className="text-center py-4 text-red-500">Error loading products: {error.message}</p>;

    if (!products || !products.data || products.data.length === 0) {
        return <p className="text-center py-4 text-red-500">No products found</p>;
    }

    const handleDelete = (productId) => {
        setProductToDelete(productId);
    };

    const confirmDelete = () => {
        deleteProduct(productToDelete, {
            onSuccess: () => setProductToDelete(null),
        });
    };

    return (
        <div className="rounded-3xl h-[700px] bg-white">
            <table className="w-full overflow-hidden bg-white rounded-t-3xl">
                <thead>
                    <tr className="text-right bg-[#E4E4E4] text-sm font-medium">
                        <th className="py-4 px-6">نام کالا</th>
                        <th className="py-4 px-6">موجودی</th>
                        <th className="py-4 px-6">قیمت</th>
                        <th className="py-4 px-6">شناسه کالا</th>
                        <th className="py-4 px-6"></th>
                    </tr>
                </thead>
                <tbody className='rounded-b-2xl text-xs'>
                    {products.data.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 border-b">
                            <td className="p-6">{product.name}</td>
                            <td className="py-4 px-6">{product.quantity}</td>
                            <td className="py-4 px-6">{product.price} هزار تومان</td>
                            <td className="py-4 px-6">{product.id}</td>
                            <td className="py-4 px-6">
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className="text-green-500 hover:text-green-700"
                                    >
                                        <img src={edit} alt="" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <img src={trash} alt="" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                />
            )}

            {productToDelete && (
                <DeleteProductModal
                    onClose={() => setProductToDelete(null)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default ProductList;