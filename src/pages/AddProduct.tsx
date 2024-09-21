import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

const AddProduct: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number | ''>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || price === '') {
            setError('Name and price are required');
            setSuccess(null);
            return;
        }

        try {
            await axios.post(
                'http://localhost:8080/products',
                { name, description, price },
                { headers: { 'Content-Type': 'application/json' } }
            );
            setName('');
            setDescription('');
            setPrice('');
            setError(null);
            setSuccess('Product added successfully!');
        } catch (err) {
            setError('Failed to add product');
            setSuccess(null);
        }
    };

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, success]);

    return (
        <div className="flex flex-col gap-12 max-w-md mx-auto pt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
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
                <button
                    type="submit"
                    className="px-6 py-2 w-full text-md font-medium text-zinc-950 bg-zinc-300 hover:bg-white transition-all duration-300"
                >
                    Add Product
                </button>
            </form>
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {success && (
                <Alert variant="default" className="mb-4">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default AddProduct;
