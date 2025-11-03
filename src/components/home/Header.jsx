import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { Logo } from './Logo';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Builders', href: 'https://builders.enterprisedna.co/', external: true },
    { label: 'Pricing', href: 'https://enterprisedna.co/pricing', external: true },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-brand/10 dark:glow-effect">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Logo size="small" showSubtitle={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={item.external ? undefined : (e) => scrollToSection(e, item.href)}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-foreground/70 hover:text-brand transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-muted transition-colors dark:hover:bg-muted/50"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-secondary" />
              ) : (
                <Moon className="w-5 h-5 text-foreground/50" />
              )}
            </button>

            <Link
              to="/signin"
              className="text-sm font-medium text-foreground/70 hover:text-brand-blue transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-gradient-to-r from-brand-blue to-brand-pink text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300 hover:shadow-brand-lg dark:hover:shadow-glow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-muted rounded-lg transition-colors dark:hover:bg-muted/50"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-secondary" />
              ) : (
                <Moon className="w-5 h-5 text-foreground/50" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors dark:hover:bg-muted/50"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-4 py-6 border-t dark:border-brand/10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={item.external ? undefined : (e) => scrollToSection(e, item.href)}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-foreground/70 hover:text-brand transition-colors duration-200 px-4"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 px-4 pt-4 border-t dark:border-brand/10">
              <Link
                to="/signin"
                className="text-sm font-medium text-center py-2 text-foreground/70 hover:text-brand-blue transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-pink text-white rounded-lg text-sm font-medium text-center hover:opacity-90 transition-all duration-300 hover:shadow-brand-lg dark:hover:shadow-glow-lg"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
