"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function UploadPage() {
    const [price, setPrice] = useState("");
    const [item, setItem] = useState("");
    const [totalStock, setTotalStock] = useState("");
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Get current user
        const {
            data: { user },
        } = await supabase.auth.getUser();

        const { error } = await supabase.from("test").insert([
            {
                price: Number(price),
                item: item,
                stock_left: Number(totalStock),
                email: user?.email,
                order_number: 0,
            },
        ]);

        if (error) {
            console.error("Error inserting data:", error);
            return;
        }

        // Reset form
        setPrice("");
        setItem("");
        setTotalStock("");
    };

    return (
        <div className="space-y-4 p-4">
            <h1 className="text-lg font-medium">Upload Item</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 rounded" required />
                </div>

                <div>
                    <label className="block mb-2">Item:</label>
                    <input type="text" value={item} onChange={(e) => setItem(e.target.value)} className="border p-2 rounded" required />
                </div>

                <div>
                    <label className="block mb-2">Total Stock:</label>
                    <input type="number" value={totalStock} onChange={(e) => setTotalStock(e.target.value)} className="border p-2 rounded" required />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
}
