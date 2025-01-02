// import { getUserRole } from "@/lib/get-user-role";
// import { createClient } from "@/lib/supabase/server";

// export default async function ServerPage() {
//     const supabase = createClient();

//     const { data: test } = await supabase.from("test").select();

//     const {
//         data: { user },
//     } = await supabase.auth.getUser();

//     const role = await getUserRole();

//     return (
//         <div className="space-y-4">
//             <h1 className="text-lg font-medium">User: {user?.email || "N/A"}</h1>
//             <h2 className="text-lg font-medium"> Role: {role || "N/A"}</h2>

//             {test && test.length > 0 ? (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white rounded-lg shadow">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {test.map((item, index) => (
//                                 <tr key={index} className="hover:bg-gray-50">
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.item}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.stock_left}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.order_number}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p className="text-gray-500">No items found</p>
//             )}
//         </div>
//     );
// }

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
