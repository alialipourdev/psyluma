"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { ChevronDown, Search, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <FAQPageSkeleton />
  }

  return <FAQPageContent />
}

function FAQPageSkeleton() {
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

function FAQPageContent() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqData = [
    {
      question: t("faqQuestion1"),
      answer: t("faqAnswer1"),
      category: "عمومی",
    },
    {
      question: t("faqQuestion2"),
      answer: t("faqAnswer2"),
      category: "تست‌ها",
    },
    {
      question: t("faqQuestion3"),
      answer: t("faqAnswer3"),
      category: "امنیت",
    },
    {
      question: t("faqQuestion4"),
      answer: t("faqAnswer4"),
      category: "حساب کاربری",
    },
    {
      question: "چطور می‌توانم نتایج تست را با دیگران به اشتراک بگذارم؟",
      answer: "در صفحه نتایج، روی دکمه 'اشتراک‌گذاری' کلیک کنید و لینک مخصوص را کپی کنید.",
      category: "تست‌ها",
    },
    {
      question: "آیا می‌توانم تست را چندین بار انجام دهم؟",
      answer: "بله، می‌توانید هر تست را چندین بار انجام دهید، اما توصیه می‌کنیم بین هر بار حداقل یک ماه فاصله بگذارید.",
      category: "تست‌ها",
    },
    {
      question: "نتایج تست چقدر معتبر هستند؟",
      answer:
        "تست‌های ما بر اساس تحقیقات علمی معتبر طراحی شده‌اند و دقت بالای 95% دارند، اما نمی‌توانند جایگزین مشاوره تخصصی باشند.",
      category: "تست‌ها",
    },
    {
      question: "چطور رمز عبورم را تغییر دهم؟",
      answer: "به داشبورد بروید، روی 'تنظیمات حساب' کلیک کنید و گزینه 'تغییر رمز عبور' را انتخاب کنید.",
      category: "حساب کاربری",
    },
    {
      question: "آیا می‌توانم حساب کاربری‌ام را حذف کنم؟",
      answer: "بله، در تنظیمات حساب گزینه 'حذف حساب' موجود است. توجه کنید که این عمل غیرقابل بازگشت است.",
      category: "حساب کاربری",
    },
    {
      question: "چرا تست من قطع شد؟",
      answer: "ممکن است به دلیل قطع اینترنت یا بسته شدن مرورگر اتفاق افتاده باشد. می‌توانید از همان جا ادامه دهید.",
      category: "فنی",
    },
  ]

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const categories = [...new Set(faqData.map((faq) => faq.category))]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            {t("frequentlyAskedQuestions")}
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-8">{t("faqDescription")}</p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/60 w-5 h-5" />
            <Input
              placeholder="جستجو در سوالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            <Button variant={searchQuery === "" ? "default" : "outline"} size="sm" onClick={() => setSearchQuery("")}>
              همه
            </Button>
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm" onClick={() => setSearchQuery(category)}>
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">سوالی یافت نشد</h3>
              <p className="text-muted-foreground mb-8">عبارت دیگری را امتحان کنید</p>
              <Button onClick={() => setSearchQuery("")}>پاک کردن جستجو</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <Card key={index}>
                  <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="text-right">
                            <CardTitle className="text-lg">{faq.question}</CardTitle>
                            <CardDescription className="mt-1">{faq.category}</CardDescription>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform ${
                              openItems.includes(index) ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">{t("stillHaveQuestions")}</h2>
          <p className="text-muted-foreground mb-8">{t("supportTeamAvailable")}</p>
          <Link href="/contact">
            <Button size="lg">
              <MessageCircle className="w-5 h-5 ml-2" />
              {t("liveChat")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
