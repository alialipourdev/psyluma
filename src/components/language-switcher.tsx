"use client"
import { useEffect, useState } from "react"

// The component structure is preserved for future use if bilingual support is needed again

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return null

  // Original implementation preserved but commented out:
  /*
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="flex items-center gap-2">
        <Languages className="w-4 h-4" />
        <span className="w-6">...</span>
      </Button>
    )
  }

  return <LanguageSwitcherContent />
  */
}

function LanguageSwitcherContent() {
  /*
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "fa" ? "en" : "fa")}
      className="flex items-center gap-2"
    >
      <Languages className="w-4 h-4" />
      {language === "fa" ? "EN" : "فا"}
    </Button>
  )
  */
  return null
}
