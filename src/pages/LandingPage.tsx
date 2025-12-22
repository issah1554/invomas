export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b-2  border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Inv.max</h1>
                    <nav className="hidden md:flex gap-6 text-sm text-slate-300">
                        <a  className="hover:text-white">About us</a>
                        <a  className="hover:text-white">Account</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Welcome to Inv.max
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mb-8">
                    An Invetory Manager for track, analyze, and optimize your investments with ease.
                </p>
            </main>

            {/* Footer */}
            <footer id="contact" className="mt-auto">
                <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-slate-400 flex flex-col md:flex-row justify-between gap-4">
                    <span>© {new Date().getFullYear()} Inv.max. All rights reserved.</span>
                    <div className="flex gap-6">
                        <a  className="hover:text-white">Privacy</a>
                        <a  className="hover:text-white">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
