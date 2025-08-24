"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Brain, Menu, X } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
// import { LanguageSwitcher } from "./language-switcher"
import { ThemeSwitcher } from "./theme-switcher"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <NavigationSkeleton />
  }

  return <NavigationContent isOpen={isOpen} setIsOpen={setIsOpen} />
}

function NavigationSkeleton() {
  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Psyluma</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <div className="w-16 h-6 bg-muted rounded-full animate-pulse"></div>
            <div className="w-20 h-8 bg-muted rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavigationContent({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const { t } = useLanguage()

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              Psyluma
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/tests"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
            >
              Tests
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/help"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
            >
              Help
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* <LanguageSwitcher /> */}
            <ThemeSwitcher />
            <Link href="/tests">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
                Start Test
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              <Link
                href="/tests"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Tests
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/help"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Help
              </Link>
              <div className="flex gap-3 pt-3 border-t border-border">
                {/* <LanguageSwitcher /> */}
                <ThemeSwitcher />
                <Link href="/tests" onClick={() => setIsOpen(false)}>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium">
                    Start Test
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
