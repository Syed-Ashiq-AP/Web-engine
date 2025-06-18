import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/auth/providers";

const inter = Inter({
    variable: "--inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Web Engine",
    description: "Website builder",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Providers>
                        {children}

                        <Toaster />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
