"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareResult } from "@/components/share-result"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Brain, Calendar, Star, Users } from "lucide-react"

export default function SharedResultPage() {
  const [mounted, setMounted] = useState(false)
  const params = useParams()
  const { language } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <SharedResultPageSkeleton />
  }

  return <SharedResultPageContent resultId={params.id as string} />
}

function SharedResultPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="animate-pulse">
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </section>
      </div>
    </div>
  )
}

function SharedResultPageContent({ resultId }: { resultId: string }) {
  const { language } = useLanguage()

  // Mock shared result data - in real app, this would be fetched from API
  const sharedResult = {
    id: resultId,
    testName: "تست شخصیت MBTI",
    testNameEn: "MBTI Personality Test",
    result: "ENFP - مبلغ",
    resultEn: "ENFP - Campaigner",
    score: 94,
    accuracy: "95%",
    category: "تست شخصیت",
    categoryEn: "Personality Test",
    date: "1403/10/15",
    dateEn: "2024/01/05",
    userName: "کاربر ناشناس",
    userNameEn: "Anonymous User",
    description: "شما یک فرد خلاق، الهام‌بخش و دلسوز هستید. به رهبری و کمک به رشد دیگران علاقه دارید.",
    descriptionEn: "You are charismatic, inspiring, and caring. You enjoy leading and helping others grow.",
    traits: ["کاریزماتیک", "الهام‌بخش", "دلسوز", "رهبر"],
    traitsEn: ["Charismatic", "Inspiring", "Caring", "Leader"],
    isPublic: true,
  }

  const handleShare = (platform: string) => {
    console.log("Shared on:", platform)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {language === "fa" ? "نتیجه تست اشتراکی" : "Shared Test Result"}
            </h1>
            <p className="text-muted-foreground">
              {language === "fa"
                ? "این نتیجه توسط یکی از کاربران پلتفرم به اشتراک گذاشته شده است"
                : "This result has been shared by one of our platform users"}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    {language === "fa" ? sharedResult.testName : sharedResult.testNameEn}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <Badge variant="secondary">
                      {language === "fa" ? sharedResult.category : sharedResult.categoryEn}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{language === "fa" ? sharedResult.date : sharedResult.dateEn}</span>
                    </div>
                  </CardDescription>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {language === "fa" ? sharedResult.result.split(" - ")[0] : sharedResult.resultEn.split(" - ")[0]}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === "fa" ? sharedResult.result.split(" - ")[1] : sharedResult.resultEn.split(" - ")[1]}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {language === "fa" ? "توضیحات نتیجه" : "Result Description"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "fa" ? sharedResult.description : sharedResult.descriptionEn}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">{language === "fa" ? "ویژگی‌های کلیدی" : "Key Traits"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(language === "fa" ? sharedResult.traits : sharedResult.traitsEn).map((trait, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">{sharedResult.score}%</div>
                  <div className="text-sm text-muted-foreground">{language === "fa" ? "امتیاز" : "Score"}</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">{sharedResult.accuracy}</div>
                  <div className="text-sm text-muted-foreground">{language === "fa" ? "دقت" : "Accuracy"}</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === "fa" ? "نتیجه معتبر" : "Valid Result"}
                  </div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-sm text-muted-foreground">{language === "fa" ? "قابل اشتراک" : "Shareable"}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <ShareResult
                  testName={language === "fa" ? sharedResult.testName : sharedResult.testNameEn}
                  testResult={language === "fa" ? sharedResult.result : sharedResult.resultEn}
                  testScore={sharedResult.score}
                  testAccuracy={sharedResult.accuracy}
                  personalityType={sharedResult.result.split(" - ")[0]}
                  testCategory={language === "fa" ? sharedResult.category : sharedResult.categoryEn}
                  resultDescription={language === "fa" ? sharedResult.description : sharedResult.descriptionEn}
                  onShare={handleShare}
                />
                <Link href="/tests">
                  <Button>
                    <Brain className="w-4 h-4 mr-2" />
                    {language === "fa" ? "انجام تست مشابه" : "Take Similar Test"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "fa" ? "درباره پلتفرم روان‌شناس" : "About Psychology Platform"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {language === "fa"
                  ? "پلتفرم روان‌شناس ارائه‌دهنده تست‌های علمی و معتبر روانشناسی است. با بیش از 50 تست مختلف، شخصیت، هوش و توانایی‌های خود را کشف کنید."
                  : "Psychology Platform provides scientific and validated psychological tests. Discover your personality, intelligence, and abilities with over 50 different tests."}
              </p>
              <Link href="/">
                <Button variant="outline">{language === "fa" ? "بازدید از پلتفرم" : "Visit Platform"}</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
