import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Alert } from '../components/ui/alert';

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number | ''>('');
    const [updatedAt, setUpdatedAt] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [currentImageURL, setCurrentImageURL] = useState<string | null>(null); // Mevcut resim URL'si için

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${id}`);
                const product = response.data;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setUpdatedAt(product.updated_at);
                setCurrentImageURL(product.image_url); // Mevcut resim URL'sini ayarla
            } catch (err) {
                setError('Failed to load product');
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || price === '') {
            setError('Name and price are required');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/products/${id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setUpdatedAt(response.data.updated_at);
            setSuccess('Product updated successfully');
            setError(null);

            setTimeout(() => {
                navigate('/product-list');
            }, 2000);
        } catch (err) {
            setError('Failed to update product');
        }
    };

    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:8080/products/${id}`);
            setSuccess('Product deleted successfully');
            setError(null);
            setTimeout(() => {
                navigate('/product-list');
            }, 2000);
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    return (
        <div>
            <a href="/product-list">Back to List</a>
            <div className="flex flex-col gap-12 max-w-md mx-auto pt-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Current Image</label>
                        {currentImageURL && (
                            <div>
                                <img src={currentImageURL} alt="Current Product" className="w-full h-auto my-2" />
                                <p className="text-sm text-gray-500">Current Image</p>
                            </div>
                        )}
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setImage(e.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    <div>
                        {updatedAt && (
                            <p className="text-sm text-zinc-300">Last updated at: {new Date(updatedAt).toLocaleString()}</p>
                        )}
                    </div>
                    <div className='flex flex-row gap-4'>
                        <button
                            type="submit"
                            className="px-6 py-2 w-full text-md font-medium text-zinc-950 bg-zinc-300 hover:bg-white transition-all duration-300"
                        >
                            Update Product
                        </button>
                        <button
                            type="button"
                            onClick={deleteProduct}
                            className="px-6 py-2 w-full text-md font-medium text-white bg-red-600 hover:bg-red-700 transition-all duration-300"
                        >
                            Delete Product
                        </button>
                    </div>
                </form>
                {error && <Alert variant="destructive">{error}</Alert>}
                {success && <Alert variant="default">{success}</Alert>}
            </div>
        </div>
    );
};

export default EditProduct;
