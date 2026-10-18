import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="frame flex min-h-screen flex-col justify-center">
      <p className="label text-accent">Error</p>
      <h1 className="display mt-4 text-[clamp(7rem,30vw,22rem)] leading-[0.8]">
        4<em>0</em>4
      </h1>
      <p className="mt-8 max-w-md border-t border-foreground pt-4 text-lg text-muted-foreground">
        Thanks for Contact - Oops! Page not found
      </p>
      <a href="/" className="label u-link u-link-static mt-6 self-start">
        Return to Home
      </a>
    </main>
  );
};

export default NotFound;
