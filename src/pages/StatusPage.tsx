import { Button } from "../components/Buttons";

interface StatusConfig {
    title: string;
    description: string;
    cta?: string;
}

type StatusType = "maintenance" | "not-found" | "unauthorized" | "error";

const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
    maintenance: {
        title: "We'll be back soon",
        description: "Inv.max is currently undergoing scheduled maintenance. Please check back shortly.",
        cta: "Refresh",
    },
    "not-found": {
        title: "Page not found",
        description: "The page you are looking for doesn’t exist or has been moved.",
        cta: "Go Home",
    },
    unauthorized: {
        title: "Access denied",
        description: "You do not have permission to view this page.",
        cta: "Login",
    },
    error: {
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again later.",
        cta: "Retry",
    },
};

interface StatusPageProps {
    status: "maintenance" | "not-found" | "unauthorized" | "error";
}

export default function StatusPage({ status }: StatusPageProps) {
    const config = STATUS_CONFIG[status];

    return (
        <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur border-b-2 border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
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
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                    {config.title}
                </h2>

                <p className="text-lg md:text-xl max-w-xl mb-8 text-secondary">
                    {config.description}
                </p>

                <div className="flex gap-4">
                    {config.cta && (
                        <Button color="dark" size="lg" rounded="full">
                            {config.cta}
                        </Button>
                    )}
                    <Button color="neutral" size="lg" variant="outline">
                        Support
                    </Button>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-neutral-500 flex justify-between">
                    <span>© {new Date().getFullYear()} Inv.max</span>
                    <span>Status Page</span>
                </div>
            </footer>
        </div>
    );
}
