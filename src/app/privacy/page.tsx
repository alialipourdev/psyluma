"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { Shield, Lock, Eye, Users } from "lucide-react"

export default function PrivacyPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <PrivacyPageSkeleton />
  }

  return <PrivacyPageContent />
}

function PrivacyPageSkeleton() {
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

function PrivacyPageContent() {
  const { t } = useLanguage()

  const sections = [
    {
      icon: Shield,
      title: t("informationCollection"),
      description: t("informationCollectionDesc"),
      content: [
        "اطلاعات شخصی که شما ارائه می‌دهید (نام، ایمیل، سن)",
        "پاسخ‌های شما به تست‌های روانشناسی",
        "اطلاعات فنی مانند IP، مرورگر و سیستم عامل",
        "کوکی‌ها برای بهبود تجربه کاربری",
      ],
    },
    {
      icon: Eye,
      title: t("informationUsage"),
      description: t("informationUsageDesc"),
      content: [
        "ارائه نتایج دقیق و شخصی‌سازی شده",
        "بهبود کیفیت تست‌ها و خدمات",
        "ارسال اطلاعات مفید و آموزشی",
        "پشتیبانی فنی و پاسخ به سوالات",
      ],
    },
    {
      icon: Lock,
      title: t("informationProtection"),
      description: t("informationProtectionDesc"),
      content: [
        "رمزگذاری SSL برای انتقال امن اطلاعات",
        "ذخیره‌سازی امن در سرورهای محافظت شده",
        "دسترسی محدود کارکنان به اطلاعات",
        "بک‌آپ منظم و امن اطلاعات",
      ],
    },
    {
      icon: Users,
      title: t("dataSharing"),
      description: t("dataSharingDesc"),
      content: [
        "هیچ‌گاه اطلاعات شخصی را نمی‌فروشیم",
        "تنها آمار کلی و ناشناس منتشر می‌کنیم",
        "در صورت نیاز قانونی، اطلاعات را ارائه می‌دهیم",
        "شما کنترل کامل بر اطلاعاتتان دارید",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">{t("privacyPolicy")}</h1>
          <p className="text-xl text-primary-foreground/80">{t("privacyPolicyDescription")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">تماس با ما</h3>
            <p className="text-muted-foreground">
              اگر سوالی درباره سیاست حریم خصوصی دارید، می‌توانید از طریق ایمیل{" "}
              <a href="mailto:privacy@psychology.com" className="text-primary hover:underline">
                privacy@psychology.com
              </a>{" "}
              با ما تماس بگیرید.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
