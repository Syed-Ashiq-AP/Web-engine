import Auth from "@/components/auth/auth";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
    return (
        <main>
            <div className="w-full h-10 flex justify-between py-4 px-8 items-stretch">
                <h1 className="font-bold text-3xl">Web Engine</h1>
                <div>
                    <ThemeToggle />
                    <Auth />
                </div>
            </div>
        </main>
    );
}
