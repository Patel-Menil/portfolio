

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 font-mono font-bold">
          <span>MENIL</span>
        </div>
        
        <p className="text-sm text-text-secondary font-mono text-center md:text-left">
          Building systems across algorithms • Web3 • games • AI security
        </p>

        <p className="text-sm text-text-secondary/50 font-mono">
          &copy; {new Date().getFullYear()} Menil
        </p>
      </div>
    </footer>
  );
};

export default Footer;
