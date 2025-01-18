import { NavItem } from "@/components/nav-item";
import { UserAccountNav } from "@/components/user-account-nav";

export function MainNav() {
    return (
        <nav className="flex h-16 items-center justify-between border px-4">
            <div className="flex space-x-4">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/listings">Listings</NavItem>
                <NavItem href="/create_listing">Create Listing</NavItem>
                <NavItem href="/my_listings">My Listings</NavItem>
                <NavItem href="/my_orders">My Orders</NavItem>
            </div>
            <UserAccountNav />
        </nav>
    );
}
