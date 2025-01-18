"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface TestItem {
    id: number;
    item: string;
    price: number;
    stock_left: number;
    email: string;
    order_number: number;
}

interface TestTableProps {
    test: TestItem[];
}

export default function TestTable({ test }: TestTableProps) {
    const [items, setItems] = useState(test);
    const supabase = createClient();

    async function handleOrder(itemId: number, currentStock: number, currentOrders: number, index: number) {
        if (currentStock > 0) {
            const { error } = await supabase
                .from("test")
                .update({
                    stock_left: currentStock - 1,
                    order_number: currentOrders + 1,
                })
                .eq("id", itemId);

            if (error) {
                console.error("Error updating stock or orders:", error.message);
            } else {
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (user) {
                    const itemName = items[index].item;
                    const { error: insertError } = await supabase.from("orders").insert({
                        person: user.email,
                        order: itemName,
                    });

                    if (insertError) {
                        console.error("Error inserting new order:", insertError.message);
                    }
                }

                // Update the local state to reflect the changes
                const updatedItems = [...items];
                updatedItems[index].stock_left -= 1;
                updatedItems[index].order_number += 1;
                setItems(updatedItems);
            }
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">{item.item}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.stock_left}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.order_number}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleOrder(item.id, item.stock_left, item.order_number, index)} className={`px-4 py-2 rounded text-white ${item.stock_left > 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`} disabled={item.stock_left === 0}>
                                    {item.stock_left > 0 ? "Order" : "Out of Stock"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
