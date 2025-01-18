import { createClient } from "@/lib/supabase/server";

export default async function MyOrdersPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return <p>Please sign in first</p>;
    }

    const { data: myOrders, error } = await supabase.from("orders").select("*").eq("person", user.email);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!myOrders || myOrders.length === 0) {
        return <p>No orders found for your account.</p>;
    }

    return (
        <div>
            <h1 className="text-lg font-medium">My Orders</h1>
            <ul className="space-y-2">
                {myOrders.map((order) => (
                    <li key={order.id}>
                        <div>Order: {order.order}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
