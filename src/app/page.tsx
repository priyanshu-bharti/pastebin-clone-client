import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen">
            <Link href="/create">
                Take me to the app
            </Link>
        </main>
    );
}
