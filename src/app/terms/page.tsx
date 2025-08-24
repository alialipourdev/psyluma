"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { FileText, User, Copyright, Server } from "lucide-react"

export default function TermsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <TermsPageSkeleton />
  }

  return <TermsPageContent />
}

function TermsPageSkeleton() {
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

function TermsPageContent() {
  const { t } = useLanguage()

  const sections = [
    {
      icon: FileText,
      title: t("serviceUsage"),
      description: t("serviceUsageDesc"),
      content: [
        "استفاده از پلتفرم برای اهداف قانونی و مجاز",
        "ارائه اطلاعات صحیح و دقیق",
        "عدم سوء استفاده از خدمات و امکانات",
        "رعایت حقوق سایر کاربران",
      ],
    },
    {
      icon: User,
      title: t("userResponsibilities"),
      description: t("userResponsibilitiesDesc"),
      content: [
        "حفظ امنیت حساب کاربری و رمز عبور",
        "عدم اشتراک‌گذاری اطلاعات حساب با دیگران",
        "گزارش هرگونه مشکل امنیتی",
        "استفاده مسئولانه از نتایج تست‌ها",
      ],
    },
    {
      icon: Copyright,
      title: t("intellectualProperty"),
      description: t("intellectualPropertyDesc"),
      content: [
        "تمام تست‌ها و محتوا متعلق به روان‌شناس است",
        "عدم کپی‌برداری یا توزیع غیرمجاز محتوا",
        "استفاده شخصی از نتایج تست‌ها",
        "احترام به حقوق مالکیت فکری",
      ],
    },
    {
      icon: Server,
      title: t("serviceAvailability"),
      description: t("serviceAvailabilityDesc"),
      content: [
        "تلاش برای ارائه خدمات 24/7",
        "امکان قطعی موقت برای نگهداری",
        "اطلاع‌رسانی پیشین در صورت قطعی برنامه‌ریزی شده",
        "عدم مسئولیت در قبال خسارات ناشی از قطعی",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">{t("termsOfService")}</h1>
          <p className="text-xl text-primary-foreground/80">{t("termsOfServiceDescription")}</p>
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
            <h3 className="text-lg font-semibold text-foreground mb-4">تغییرات در شرایط</h3>
            <p className="text-muted-foreground mb-4">
              ما حق تغییر این شرایط را در هر زمان محفوظ می‌داریم. تغییرات مهم از طریق ایمیل یا اعلان در سایت اطلاع‌رسانی
              خواهد شد.
            </p>
            <p className="text-muted-foreground">
              برای سوالات بیشتر، با ما از طریق{" "}
              <a href="mailto:legal@psychology.com" className="text-primary hover:underline">
                legal@psychology.com
              </a>{" "}
              تماس بگیرید.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
