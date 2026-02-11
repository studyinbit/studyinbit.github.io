"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizePath, stripLocale } from "@/lib/i18n/path-utils";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const { locale, messages } = useLocale();

  const navItems = [
    { name: messages.navbar.home, href: "/" },
    { name: messages.navbar.campusLife, href: "/campus-life" },
    { name: messages.navbar.community, href: "/community" },
    { name: messages.navbar.scholarshipCost, href: "/scholarship-cost" },
    { name: messages.navbar.faq, href: "/faq" },
  ];

  const activePath = stripLocale(pathname).cleanPath;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="navbar-sheen pointer-events-auto flex items-center p-2 pl-3 pr-2 sm:p-1.5 sm:pl-5 sm:pr-2 gap-1.5 sm:gap-4">
          <Link href={localizePath("/", locale)} className="flex items-center gap-2 group shrink-0">
            <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full group-hover:bg-primary/20 transition-colors">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <span className="hidden md:inline font-display font-bold text-base sm:text-lg tracking-tight">
              Studyin<span className="text-primary">BIT</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[14px] font-medium transition-all duration-200",
                  activePath === item.href
                    ? "text-primary bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-black/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            <Link
              href={localizePath("/admissions", locale)}
              onClick={() => setIsOpen(false)}
              className="cta-button !px-3 !py-1.5 !text-xs sm:!px-5 sm:!py-2 sm:!text-sm whitespace-nowrap inline-flex items-center gap-1.5 sm:gap-2"
            >
              <span className="cta-glow"></span>
              {messages.navbar.admissions}
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            <LanguageSwitcher
              compact
              respondToOpenRequests
              className="rounded-full hover:bg-black/5 text-foreground"
            />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 text-foreground transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

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
                    href={localizePath(item.href, locale)}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-2xl font-display font-bold py-4 border-b border-border/50",
                      activePath === item.href ? "text-primary" : "text-foreground/80"
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
