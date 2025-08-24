"use client"

import { Navigation } from "../../components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useLanguage } from "../../contexts/language-context"
import { useEffect, useState } from "react"
import { Play, BarChart3, User, Settings, Wrench, Search, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <HelpPageSkeleton />
  }

  return <HelpPageContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
}

function HelpPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="animate-pulse">
        <section className="bg-primary py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="h-12 bg-muted rounded mb-4"></div>
            <div className="h-6 bg-muted rounded"></div>
          </div>
        </section>
      </div>
    </div>
  )
}

function HelpPageContent({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
}) {
  const { t } = useLanguage()

  const helpSections = [
    {
      icon: Play,
      title: t("gettingStarted"),
      description: t("gettingStartedDesc"),
      articles: [
        "نحوه ثبت‌نام و ایجاد حساب کاربری",
        "آشنایی با رابط کاربری پلتفرم",
        "انتخاب اولین تست مناسب",
        "تنظیمات اولیه حساب کاربری",
      ],
    },
    {
      icon: BarChart3,
      title: t("takingTests"),
      description: t("takingTestsDesc"),
      articles: [
        "نحوه شروع و انجام تست‌ها",
        "نکات مهم برای پاسخ‌دهی دقیق",
        "مدیریت زمان در تست‌های زمان‌دار",
        "ذخیره و ادامه تست‌های ناتمام",
      ],
    },
    {
      icon: User,
      title: t("understandingResults"),
      description: t("understandingResultsDesc"),
      articles: [
        "تفسیر نتایج تست‌های شخصیت",
        "درک امتیازات تست‌های هوش",
        "استفاده عملی از نتایج در زندگی",
        "مقایسه نتایج با میانگین جامعه",
      ],
    },
    {
      icon: Settings,
      title: t("accountManagement"),
      description: t("accountManagementDesc"),
      articles: [
        "تغییر اطلاعات شخصی و پروفایل",
        "مدیریت رمز عبور و امنیت حساب",
        "تنظیمات اعلان‌ها و ایمیل",
        "حذف حساب کاربری",
      ],
    },
    {
      icon: Wrench,
      title: t("troubleshooting"),
      description: t("troubleshootingDesc"),
      articles: [
        "حل مشکلات ورود به حساب",
        "رفع خطاهای رایج در تست‌ها",
        "مشکلات نمایش و رابط کاربری",
        "تماس با پشتیبانی فنی",
      ],
    },
  ]

  const filteredSections = helpSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.articles.some((article) => article.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

    </div>
  )
}
