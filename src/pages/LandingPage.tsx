import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Select2 from "../components/ui/Select2";

export default function LandingPage() {
    const { toggleTheme } = useTheme();

    return (
        <div className="min-h-screen flex flex-col bg-main-100 text-main-700">            
            {/* Header */}
            <header className="sticky top-0 z-50 bg-main-200/80 backdrop-blur border-b-2 border-main-300">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-main-300 flex items-center justify-center">
                            <img
                                src="/invomax.svg"
                                alt="Invomax logo"
                                className="w-6 h-6 object-contain"
                                onClick={toggleTheme}
                            />
                        </div>
                        <h1 className="text-xl font-semibold text-primary-600">Inv.max</h1>
                    </div>

                    <nav className="hidden md:flex gap-6 text-sm text-main-600">
                        <Link to="/auth/login" className="hover:text-accent">Login</Link>
                        <Link to="/auth/register" className="hover:text-accent">Register</Link>
                    </nav>
                </div>
            </header>


            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <p className="text-lg md:text-xl max-w-2xl mb-8 text-main-600">
                    An Invetory Manager for track, analyze, and optimize your investments with ease.
                </p>
                <Select2
                    options={[
                        { value: "1", label: "Option 1" },
                        { value: "2", label: "Option 2" },
                        { value: "3", label: "Option 3" },
                    ]}
                    placeholder="Select an option"
                    color="primary"
                    multiple={true}
                />
            </main>

            {/* Footer */}
            <footer id="contact" className="mt-auto">
                <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-main flex justify-center items-center text-center">
                    <span>© {new Date().getFullYear()} Inv.max. All rights reserved.</span>
                </div>
            </footer>

        </div>
    );
}
