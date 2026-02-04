"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Campus Life", href: "/campus-life" },
  { name: "Community", href: "/community" },
  { name: "Scholarship & Cost", href: "/scholarship-cost" },
  { name: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="navbar-sheen pointer-events-auto flex items-center p-2 pl-4 pr-3 sm:p-1.5 sm:pl-5 sm:pr-1.5 gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full group-hover:bg-primary/20 transition-colors">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight">
              Studyin<span className="text-primary">BIT</span>
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[14px] font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-primary bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-black/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/admissions"
              className="cta-button !px-3 !py-1.5 !text-xs sm:!px-5 sm:!py-2 sm:!text-sm whitespace-nowrap hidden sm:inline-flex items-center gap-1.5 sm:gap-2"
            >
              <span className="cta-glow"></span>
              Admissions
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 text-foreground transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden pt-32 px-6"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-2xl font-display font-bold py-4 border-b border-border/50",
                      pathname === item.href ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <WhatsAppButton />
                {/* <Link
                  href="https://wa.me/6281388577873"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button w-full justify-center !text-lg !py-4 items-center gap-2"
                >
                  <span className="cta-glow"></span>
                  Chat with Us
                  <MessageCircle className="w-5 h-5" />
                </Link> */}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
