"use client"

import { Button } from "../components/ui/button"
import { useTheme } from "../contexts/theme-context"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
        <div className="w-4 h-4"></div>
      </Button>
    )
  }

  return <ThemeSwitcherContent />
}

function ThemeSwitcherContent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 hover:bg-muted transition-colors hover:text-primary duration-200"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-4 h-4 ">
        <Sun
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 hover:text-primary ${theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"
            }`}
        />
        <Moon
          className={`absolute inset-0 w-4 h-4 transition-all duration-300 hover:text-primary ${theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
        />
      </div>
    </Button>
  )
}
