function Footer() {
    return (
        <footer className="footer footer-center p-4 text-base-content border-t border-base-300 fixed bottom-0 left-0 right-0 z-50 shadow-lg backdrop-blur-sm bg-base-100/95">
            <div className="grid grid-flow-col gap-4">
                <a 
                    href="https://github.com/TheMediterraneans/the-mediterranean" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link link-hover text-sm"
                >
                    GitHub Repository
                </a>
                <a href="mailto:TheMediterraneans@themediterranean.com" className="link link-hover text-sm">
                    Contact Us
                </a>
            </div>
            <div>
                <p className="text-base-content/70 text-sm">Made in The Mediterranean with ❤️</p>
            </div>
        </footer>
    );
}

export default Footer;