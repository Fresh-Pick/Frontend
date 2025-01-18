import { createClient } from "@/lib/supabase/server";

export default async function MyListingsPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return <p>Please sign in first</p>;
    }

    const { data: myListings, error } = await supabase.from("test").select("*").eq("email", user.email);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!myListings || myListings.length === 0) {
        return <p>No listings found for your account.</p>;
    }

    return (
        <div>
            <h1 className="text-lg font-medium">My Listings</h1>
            <ul className="space-y-2">
                {myListings.map((listing) => (
                    <li key={listing.id}>
                        <div>Item: {listing.item}</div>
                        <div>Price: {listing.price}</div>
                        <div>Stock Left: {listing.stock_left}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
