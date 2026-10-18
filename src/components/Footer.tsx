const Footer = () => (
  <footer className="ink bg-background text-foreground">
    <div className="frame flex flex-col gap-3 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="meta text-muted-foreground">
        © {new Date().getFullYear()} Anshuman Prakash. Built with React & passion.
      </p>
      <a href="#" className="label u-link self-start text-muted-foreground hover:text-foreground sm:self-auto">
        Back to top ↑
      </a>
    </div>
  </footer>
);

export default Footer;
