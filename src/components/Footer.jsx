function Footer() {
    return (
        <footer className="footer footer-center p-4 bg-base-100 text-base-content fixed bottom-0 left-0 right-0 z-10 border-t border-base-300">
            <div className="grid grid-flow-col gap-4">
                <a 
                    href="https://github.com/TheMediterraneans/the-mediterranean" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link link-hover text-sm"
                >
                    GitHub Repository
                </a>
                <span className="text-base-content/70 text-sm">Contact Us</span>
            </div>
            <div>
                <p className="text-base-content/70 text-sm">Made in The Mediterranean with ❤️</p>
            </div>
        </footer>
    );
}

export default Footer;