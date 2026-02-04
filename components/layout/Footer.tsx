import Link from "next/link";
import { GraduationCap, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    explore: [
      { name: "Home", href: "/" },
      { name: "Campus Life", href: "/campus-life" },
      { name: "Indonesian Community", href: "/community" },
    ],
    resources: [
      { name: "Admissions & Scholarships", href: "/admissions" },
      { name: "FAQ", href: "/faq" },
    ],
    social: [
      { name: "WhatsApp (Consultation)", href: "https://wa.me/6281388577873", icon: MessageCircle },
    ]
  };

  return (
    <footer className="bg-white/50 border-t border-border/40 backdrop-blur-lg pt-10 md:pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-12 mb-10 md:mb-16">
          {/* Brand */}
          <div className="md:col-span-1 space-y-3 md:space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 md:p-2 rounded-full">
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-base md:text-lg tracking-tight">Studyin<span className="text-primary">BIT</span></span>
            </Link>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              Your gateway to world-class engineering education at Beijing Institute of Technology.
            </p>
          </div>

          {/* Links + Contact row on mobile */}
          <div className="flex justify-between md:contents">
            {/* Left side: Explore + Resources stacked */}
            <div className="space-y-4 md:space-y-0 md:contents">
              <div>
                <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wider text-foreground/80">Explore</h3>
                <ul className="space-y-2 md:space-y-3">
                  {links.explore.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wider text-foreground/80">Resources</h3>
                <ul className="space-y-2 md:space-y-3">
                  {links.resources.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: Connect */}
            <div className="text-right md:text-left">
              <h3 className="font-semibold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wider text-foreground/80">Connect</h3>
              <ul className="space-y-2 md:space-y-3">
                {links.social.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm md:justify-start justify-end"
                    >
                      <link.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
                <li className="pt-3 md:pt-4 space-y-3">
                   <div>
                      <p className="text-xs md:text-sm font-medium text-foreground">Timothy Pardin</p>
                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">+62 813-88577-873</p>
                   </div>
                   <div>
                      <p className="text-xs md:text-sm font-medium text-foreground">Email Inquiry</p>
                      <a href="mailto:zhong.melvinw@gmail.com" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors mt-0.5 inline-block">
                        zhong.melvinw@gmail.com
                      </a>
                   </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} BIT Recruitment. All rights reserved.
          </p>
          {/* <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
