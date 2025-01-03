import { getUserRole } from "@/lib/get-user-role";
import { createClient } from "@/lib/supabase/server";
import TestTable from "@/components/test-table";

export default async function ServerPage() {
    const supabase = createClient();

    const { data: test } = await supabase.from("test").select();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const role = await getUserRole();

    return (
        <div className="space-y-4">
            <h1 className="text-lg font-medium">User: {user?.email || "N/A"}</h1>
            <h2 className="text-lg font-medium"> Role: {role || "N/A"}</h2>

            {test && test.length > 0 ? <TestTable test={test} /> : <p className="text-gray-500">No items found</p>}
        </div>
    );
}
