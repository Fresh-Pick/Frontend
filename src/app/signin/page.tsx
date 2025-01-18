"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Toast } from "@radix-ui/react-toast";

export default function SignInPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInPageContent />
        </Suspense>
    );
}

function SignInPageContent() {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const supabase = createClient();
    const searchParams = useSearchParams();
    const next = searchParams.get("next");

    async function signInWithGoogle() {
        try {
            setIsGoogleLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`,
                },
            });

            if (error) {
                throw error;
            }
        } catch {
            Toast({
                title: "Please try again.",
            });
        } finally {
            setIsGoogleLoading(false);
        }
    }

    return (
        <Button type="button" variant="outline" onClick={signInWithGoogle} disabled={isGoogleLoading}>
            {isGoogleLoading ? <Icons.loaderCircle className="mr-2 size-4 animate-spin" /> : <Icons.google className="mr-2 size-6" />}
            Sign in with Google
        </Button>
    );
}
