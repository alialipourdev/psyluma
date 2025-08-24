"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, translations, languages } from "../lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.en) => string // Updated to use English keys
  dir: "rtl" | "ltr"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en") // Default to English
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // const savedLang = localStorage.getItem("language") as Language
    // if (savedLang && (savedLang === "fa" || savedLang === "en")) {
    //   setLanguage(savedLang)
    // }
  }, [])

  useEffect(() => {
    if (mounted) {
      // localStorage.setItem("language", language)
      document.documentElement.lang = language
      document.documentElement.dir = languages[language].dir
    }
  }, [language, mounted])

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir: languages[language].dir,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
  }
  return context
}
