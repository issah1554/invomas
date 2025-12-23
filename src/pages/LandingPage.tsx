import { Button } from "../components/Buttons";
import { TextInput } from "../components/TextInput";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur border-b-2 border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                            <img
                                src="/invomax.svg"
                                alt="Invomax logo"
                                className="w-6 h-6 object-contain"
                            />
                        </div>
                        <h1 className="text-xl font-semibold text-neutral-100">Inv.max</h1>
                    </div>

                    <nav className="hidden md:flex gap-6 text-sm text-neutral-500">
                        <a className="hover:text-accent">About us</a>
                        <a className="hover:text-white">Account</a>
                    </nav>
                </div>
            </header>


            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                    Welcome to Inv.max
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mb-8 text-secondary">
                    An Invetory Manager for track, analyze, and optimize your investments with ease.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button color="dark" size="lg" variant="solid" rounded="full">
                        Get Started
                    </Button>
                    <Button color="neutral" size="lg" variant="outline">
                        Learn More
                    </Button>
                </div>
                <div className="mt-10">
                    <TextInput  name="email" color="primary" size="2xl" placeholder="example@gmail.com" type="email" label="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                </div>
            </main>

            {/* Footer */}
            <footer id="contact" className="mt-auto">
                <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-neutral flex flex-col md:flex-row justify-between gap-4">
                    <span>© {new Date().getFullYear()} Inv.max. All rights reserved.</span>
                    <div className="flex gap-6">
                        <a  className="hover:text-white">Privacy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
