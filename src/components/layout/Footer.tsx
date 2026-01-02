export default function Footer() {
    return (
        <footer
            className="text-center bg-main-100 border-t border-main-200 mt-auto text-main-700
                py-2 sm:py-3 text-xs sm:text-sm"
        >
            © {new Date().getFullYear()}{" "}
            <a
                href="https://databenki.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-primary hover:text-accent"
            >
                Dira
            </a>
            . All rights reserved.
        </footer>
    );
}