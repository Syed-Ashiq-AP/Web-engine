import Auth from "@/components/auth/auth";
import Dashboard from "@/components/dashboard/dashboard";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
    return (
        <main>
            <div className="w-full flex justify-between py-4 px-8 items-center border-b">
                <h1 className="font-bold text-3xl">Web Engine</h1>
                <div className="flex gap-4 items-center">
                    <ThemeToggle />
                    <Auth />
                </div>
            </div>
            <Dashboard />
        </main>
    );
}
