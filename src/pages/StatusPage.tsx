import { Link } from "react-router-dom";

interface StatusConfig {
    title: string;
    description: string;
    cta?: string;
    url?: string;
}

type StatusType = "maintenance" | "not-found" | "unauthorized" | "error";

const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
    maintenance: {
        title: "We'll be back soon",
        description: "Inv.max is currently undergoing scheduled maintenance. Please check back shortly.",
        cta: "Refresh",
        url: "/",
    },
    "not-found": {
        title: "Page not found",
        description: "The page you are looking for doesn’t exist or has been moved.",
        cta: "Go Home",
        url: "/",
    },
    unauthorized: {
        title: "Access denied",
        description: "You do not have permission to view this page.",
        cta: "Login",
        url: "/auth/login",
    },
    error: {
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again later.",
        cta: "Retry",
        url: "/",
    },
};

interface StatusPageProps {
    status: StatusType;
}

export default function StatusPage({ status }: StatusPageProps) {
    const config = STATUS_CONFIG[status];

    return (
        <div className="min-h-screen flex flex-col bg-main-950 text-main-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-main-950/80 backdrop-blur border-b-2 border-main-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-main-800 flex items-center justify-center">
                        <img
                            src="/invomax.svg"
                            alt="Invomax logo"
                            className="w-6 h-6 object-contain"
                        />
                    </div>
                    <h1 className="text-xl font-semibold">Inv.max</h1>
                </div>
            </header>

            {/* Status Content */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-500">
                    {config.title}
                </h2>

                <p className="text-lg md:text-xl max-w-xl mb-8 text-main-400">
                    {config.description}
                </p>

                {config.cta && (
                    <Link
                        to={config.url || "/"}
                        className="px-6 py-3 bg-primary-500 text-main-100 rounded-lg text-lg font-medium hover:bg-primary-600 transition"
                    >
                        {config.cta}
                    </Link>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-main-800">
                <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-main-500 flex justify-between">
                    <span>© {new Date().getFullYear()} Inv.max</span>
                    <span>Status Page</span>
                </div>
            </footer>
        </div>
    );
}
