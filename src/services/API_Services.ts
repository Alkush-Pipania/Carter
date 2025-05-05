import { NEXT_PUBLIC_BACKEND_URL } from "./config";
import axios from "axios";
import { error } from "console";

import { toast } from "sonner";

const BASE_URL = NEXT_PUBLIC_BACKEND_URL;
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined. Check your configuration.');
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors?.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(new Error(error));
    },
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/signin'
        }
        return Promise.reject(error)
    },
)

export const getCarter = async (url: string, requestParams?: { params?: Record<string, any> } | Record<string, any>) => {
    try {
        const params = 'params' in requestParams ? requestParams.params : requestParams;
        const response = await axiosInstance.get(`${BASE_URL}${url}`, { params });
        return response?.data ?? response;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error fetching data';
        toast('Error', {
            description: errorMessage
        });
        throw new Error(errorMessage);
    }
}

export const postCarter = async (url: string, requestParams: object) => {
    try {


        const response = await axiosInstance.post(`${BASE_URL}${url}`, requestParams);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Something went wrong';
        toast('Error', {
            description: errorMessage
        });
        throw new Error(errorMessage);
    }
};

export const putCarter = async (url: string, requestParams: object) => {
    try {
        const response = await axiosInstance.put(url, requestParams);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error updating data';
        toast('Error', {
            description: errorMessage
        });
        throw new Error(errorMessage);
    }
};

export const delCarter = async (url: string, requestParams?: object) => {
    try {

        const response = await axiosInstance.delete(url, {
            data: requestParams,
        });

        return response.data;
    } catch (error: any) {

        const errorMessage = error.response?.data?.message || 'Error deleting data';
        toast('Error', {
            description: errorMessage
        });
        throw new Error(errorMessage);
    }
};

export const postUnilane = async (url: string, requestParams: object) => {
    try {

        const response = await axiosInstance.post(url, requestParams);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Something went wrong';
        toast('Error', {
            description: errorMessage
        });
        throw new Error(errorMessage);
    }
};

export const postCarterFormData = async (url: string, formData: FormData) => {
    try {

        // Log FormData contents for debugging (without actually reading the file data)
        const formDataEntries = Array.from(formData.entries()).map(([key, value]) => {
            if (value instanceof File) {
                return `${key}: File[${value.name}, ${value.type}, ${value.size} bytes]`;
            }
            return `${key}: ${value}`;
        });


        const response = await axiosInstance.post(`${BASE_URL}${url}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {

        const errorMessage = error.response?.data?.error || 'Something went wrong uploading the file';
        toast('Error', {
            description: errorMessage
        });
        throw new Error(errorMessage);
    }
};