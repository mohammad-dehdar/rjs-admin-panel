import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../config/api';

export const useLogin = () => {
    const mutationFn = async (user) => {
        const { data } = await api.post('auth/login', user);
        return data;
    }
    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            console.log('Login successful:', data);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });
};

export const useRegister = () => {
    const mutationFn = (user) => api.post('auth/register', user);
    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            console.log('Registration successful:', data);
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        },
    });
};

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProduct) => {
            const { data } = await api.post('products', newProduct);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            queryClient.invalidateQueries(["initialProducts"]);
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId) => {
            const { data } = await api.delete(`products/${productId}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            queryClient.invalidateQueries(["initialProducts"]);
        },
    });
};

export const useEditProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }) => {
            const { data } = await api.put(`products/${id}`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            queryClient.invalidateQueries(["initialProducts"]);
        },
    });
};
