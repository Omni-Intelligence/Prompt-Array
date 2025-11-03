import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Logo } from './Logo';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background dark:bg-muted/5">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity mb-4">
              <Logo size="default" showSubtitle={false} />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The ultimate platform for creating, organizing, and sharing AI prompts.
            </p>
          </div>

          {/* Links Section */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Product */}
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-sm text-muted-foreground italic">Coming soon</span>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand/10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Prompt Array. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-brand transition-colors duration-200"
                  title={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
