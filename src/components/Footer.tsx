import { Home, Facebook, Instagram, Twitter, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import MarketingShell from "@/components/layout/MarketingShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="px-6 lg:px-16 xl:px-20 pt-16 pb-8 bg-[hsl(var(--dark-bg))]">
      <MarketingShell>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Dwello</span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed mb-5">
              Smart real estate platform connecting you with your dream home through intelligent matching and personalized recommendations.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/35 hover:text-white/70 hover:border-white/25 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-serif text-base text-white mb-5">Quick Links</p>
            <ul className="space-y-3">
              {["Browse Properties", "AI Property Hub", "About Us", "Contact", "Careers", "Blog"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/35 hover:text-white/70 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-serif text-base text-white mb-5">Contact Info</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-white/35 leading-relaxed">502, Devpath Building,<br />Near Torrent Lab,<br />Ashram Road, Lagos</p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm text-white/35">+234 98765 43210</p>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm text-white/35">hello@dwello.com</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-serif text-base text-white mb-5">Stay Updated</p>
            <p className="text-sm text-white/35 leading-relaxed mb-4">Subscribe to our newsletter for the latest listings, market insights, and exclusive offers.</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="rounded-lg bg-white/[0.06] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary h-11"
              />
              <Button className="w-full rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-sm font-medium">
                Subscribe
              </Button>
            </div>
            <p className="text-[11px] text-white/25 mt-3">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/[0.06]">
          <p className="text-xs text-white/25">&copy; 2026 Dwello. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((link) => (
              <a key={link} href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </MarketingShell>
    </footer>
  );
};

export default Footer;
