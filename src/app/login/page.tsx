"use client";
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the main page or any other route after a delay
        const timeoutId = setTimeout(() => {
            router.push('/');
        }, 2000); // Redirect after 2 seconds

        return () => clearTimeout(timeoutId); // Clear timeout if component unmounts
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Redirecting to Home Page...</h1>
            <p>You will be redirected automatically in a few seconds.</p>
        </div>
    );
}
