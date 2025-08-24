"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, RotateCcw, Sun, Cloud, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  text: {
    fa: string
    en: string
  }
  options: {
    text: { fa: string; en: string }
    score: number
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: {
      fa: "در دو هفته گذشته، چقدر احساس غمگینی، افسردگی یا ناامیدی کرده‌اید؟",
      en: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "چند روز", en: "Several days" }, score: 1 },
      { text: { fa: "بیش از نیمی از روزها", en: "More than half the days" }, score: 2 },
      { text: { fa: "تقریباً هر روز", en: "Nearly every day" }, score: 3 },
    ],
  },
  {
    id: 2,
    text: {
      fa: "چقدر علاقه یا لذت کمتری از انجام کارها داشته‌اید؟",
      en: "How often have you had little interest or pleasure in doing things?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "چند روز", en: "Several days" }, score: 1 },
      { text: { fa: "بیش از نیمی از روزها", en: "More than half the days" }, score: 2 },
      { text: { fa: "تقریباً هر روز", en: "Nearly every day" }, score: 3 },
    ],
  },
  {
    id: 3,
    text: {
      fa: "چقدر مشکل در به خواب رفتن، خواب ماندن یا خیلی زیاد خوابیدن داشته‌اید؟",
      en: "How often have you had trouble falling asleep, staying asleep, or sleeping too much?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "چند روز", en: "Several days" }, score: 1 },
      { text: { fa: "بیش از نیمی از روزها", en: "More than half the days" }, score: 2 },
      { text: { fa: "تقریباً هر روز", en: "Nearly every day" }, score: 3 },
    ],
  },
  {
    id: 4,
    text: {
      fa: "چقدر احساس خستگی یا کمبود انرژی کرده‌اید؟",
      en: "How often have you felt tired or had little energy?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "چند روز", en: "Several days" }, score: 1 },
      { text: { fa: "بیش از نیمی از روزها", en: "More than half the days" }, score: 2 },
      { text: { fa: "تقریباً هر روز", en: "Nearly every day" }, score: 3 },
    ],
  },
  {
    id: 5,
    text: {
      fa: "چقدر اشتهای کم یا پرخوری داشته‌اید؟",
      en: "How often have you had poor appetite or overeating?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "چند روز", en: "Several days" }, score: 1 },
      { text: { fa: "بیش از نیمی از روزها", en: "More than half the days" }, score: 2 },
      { text: { fa: "تقریباً هر روز", en: "Nearly every day" }, score: 3 },
    ],
  },
  {
    id: 6,
    text: {
      fa: "چقدر احساس بدی نسبت به خودتان داشته‌اید یا فکر کرده‌اید که شکست خورده‌اید؟",
      en: "How often have you felt bad about yourself or that you're a failure?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "چند روز", en: "Several days" }, score: 1 },
      { text: { fa: "بیش از نیمی از روزها", en: "More than half the days" }, score: 2 },
      { text: { fa: "تقریباً هر روز", en: "Nearly every day" }, score: 3 },
    ],
  },
  {
    id: 7,
    text: {
      fa: "چقدر مشکل در تمرکز روی کارهایی مثل خواندن یا تماشای تلویزیون داشته‌اید؟",
      en: "How often have you had trouble concentrating on things like reading or watching TV?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "چند روز", en: "Several days" }, score: 1 },
      { text: { fa: "بیش از نیمی از روزها", en: "More than half the days" }, score: 2 },
      { text: { fa: "تقریباً هر روز", en: "Nearly every day" }, score: 3 },
    ],
  },
  {
    id: 8,
    text: {
      fa: "چقدر آهسته حرکت کرده‌اید یا برعکس بی‌قرار و پرتحرک بوده‌اید؟",
      en: "How often have you moved or spoken slowly, or been fidgety or restless?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "چند روز", en: "Several days" }, score: 1 },
      { text: { fa: "بیش از نیمی از روزها", en: "More than half the days" }, score: 2 },
      { text: { fa: "تقریباً هر روز", en: "Nearly every day" }, score: 3 },
    ],
  },
  {
    id: 9,
    text: {
      fa: "چقدر به مرگ یا آسیب رساندن به خودتان فکر کرده‌اید؟",
      en: "How often have you thought about death or hurting yourself?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "چند روز", en: "Several days" }, score: 1 },
      { text: { fa: "بیش از نیمی از روزها", en: "More than half the days" }, score: 2 },
      { text: { fa: "تقریباً هر روز", en: "Nearly every day" }, score: 3 },
    ],
  },
]

const getDepressionLevel = (score: number) => {
  if (score <= 4)
    return {
      level: { fa: "کم", en: "Minimal" },
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
      icon: Sun,
      description: {
        fa: "علائم افسردگی کمی دارید. حال روحی شما در محدوده طبیعی است.",
        en: "You have minimal depression symptoms. Your mood is within the normal range.",
      },
      recommendations: {
        fa: [
          "به فعالیت‌های مثبت فعلی ادامه دهید",
          "روابط اجتماعی خود را حفظ کنید",
          "ورزش منظم و تغذیه سالم داشته باشید",
        ],
        en: [
          "Continue your current positive activities",
          "Maintain your social relationships",
          "Keep regular exercise and healthy nutrition",
        ],
      },
    }
  if (score <= 9)
    return {
      level: { fa: "خفیف", en: "Mild" },
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200",
      icon: Cloud,
      description: {
        fa: "علائم افسردگی خفیف دارید. ممکن است گاهی احساس غمگینی کنید.",
        en: "You have mild depression symptoms. You may feel sad sometimes.",
      },
      recommendations: {
        fa: [
          "فعالیت‌های لذت‌بخش را افزایش دهید",
          "با دوستان و خانواده بیشتر در ارتباط باشید",
          "تکنیک‌های آرام‌سازی تمرین کنید",
        ],
        en: ["Increase enjoyable activities", "Connect more with friends and family", "Practice relaxation techniques"],
      },
    }
  if (score <= 14)
    return {
      level: { fa: "متوسط", en: "Moderate" },
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200",
      icon: Cloud,
      description: {
        fa: "علائم افسردگی متوسط دارید. این ممکن است بر زندگی روزانه‌تان تأثیر بگذارد.",
        en: "You have moderate depression symptoms. This may affect your daily life.",
      },
      recommendations: {
        fa: ["با یک مشاور یا روان‌شناس مشورت کنید", "برنامه روزانه منظم داشته باشید", "از گروه‌های حمایتی استفاده کنید"],
        en: [
          "Consider consulting a counselor or psychologist",
          "Maintain a regular daily routine",
          "Consider support groups",
        ],
      },
    }
  if (score <= 19)
    return {
      level: { fa: "نسبتاً شدید", en: "Moderately Severe" },
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200",
      icon: AlertTriangle,
      description: {
        fa: "علائم افسردگی نسبتاً شدید دارید. توصیه می‌شود کمک حرفه‌ای دریافت کنید.",
        en: "You have moderately severe depression symptoms. Professional help is recommended.",
      },
      recommendations: {
        fa: [
          "حتماً با یک متخصص سلامت روان مشورت کنید",
          "درمان دارویی را در نظر بگیرید",
          "از شبکه حمایتی خود بیشتر استفاده کنید",
        ],
        en: [
          "Definitely consult with a mental health professional",
          "Consider medication treatment",
          "Use your support network more",
        ],
      },
    }
  return {
    level: { fa: "شدید", en: "Severe" },
    color: "text-red-700",
    bgColor: "bg-red-100 border-red-300",
    icon: AlertTriangle,
    description: {
      fa: "علائم افسردگی شدید دارید. فوراً کمک حرفه‌ای دریافت کنید.",
      en: "You have severe depression symptoms. Seek professional help immediately.",
    },
    recommendations: {
      fa: [
        "فوراً با یک متخصص سلامت روان تماس بگیرید",
        "درمان جامع شامل دارو و مشاوره دریافت کنید",
        "از نزدیکان خود کمک بخواهید",
      ],
      en: [
        "Contact a mental health professional immediately",
        "Get comprehensive treatment including medication and counseling",
        "Ask for help from your loved ones",
      ],
    },
  }
}

export default function DepressionTest() {
  const { language, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-muted rounded mb-6"></div>
          </div>
        </div>
      </div>
    )
  }

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const calculateScore = () => {
    return answers.reduce((total, answerIndex, questionIndex) => {
      if (answerIndex !== undefined && questions[questionIndex]) {
        return total + questions[questionIndex].options[answerIndex].score
      }
      return total
    }, 0)
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResult) {
    const score = calculateScore()
    const result = getDepressionLevel(score)
    const IconComponent = result.icon

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/tests" className="inline-flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "fa" ? "بازگشت به تست‌ها" : "Back to Tests"}
              </Link>
            </div>

            <Card className="mb-8">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl mb-2">
                  {language === "fa" ? "نتیجه تست افسردگی شما" : "Your Depression Test Result"}
                </CardTitle>
                <CardDescription className="text-xl">Depression Level: {result.level.en}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">{score}/27</div>
                  <div className={`p-4 rounded-lg border-2 ${result.bgColor} mb-4`}>
                    <p className={`text-lg font-semibold ${result.color} mb-2`}>{result.level.en}</p>
                    <p className="text-muted-foreground">{result.description.en}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Sun className="w-5 h-5" />
                      {language === "fa" ? "توصیه‌های بهبود" : "Improvement Recommendations"}
                    </h3>
                    <ul className="space-y-2">
                      {result.recommendations.en.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {language === "fa" ? "نکات مهم" : "Important Notes"}
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        {language === "fa"
                          ? "• این تست بر اساس مقیاس PHQ-9 طراحی شده است"
                          : "• This test is based on the PHQ-9 scale"}
                      </p>
                      <p>
                        {language === "fa"
                          ? "• تشخیص پزشکی نیست و جایگزین مشاوره حرفه‌ای نمی‌باشد"
                          : "• This is not a medical diagnosis and doesn't replace professional consultation"}
                      </p>
                      <p>
                        {language === "fa"
                          ? "• افسردگی قابل درمان است و کمک موجود است"
                          : "• Depression is treatable and help is available"}
                      </p>
                      {score >= 15 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-700 font-medium">
                            {language === "fa"
                              ? "⚠️ توصیه می‌شود فوراً با یک متخصص سلامت روان مشورت کنید"
                              : "⚠️ It's strongly recommended to consult with a mental health professional immediately"}
                          </p>
                        </div>
                      )}
                      {answers[8] > 0 && (
                        <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
                          <p className="text-red-800 font-bold">
                            {language === "fa"
                              ? "🚨 اگر به آسیب رساندن به خود فکر می‌کنید، فوراً با خط کمک خودکشی تماس بگیرید: 1480"
                              : "🚨 If you're thinking about hurting yourself, please contact a suicide prevention hotline immediately"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={resetTest} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {language === "fa" ? "تست مجدد" : "Retake Test"}
                  </Button>
                  <Button asChild>
                    <Link href="/tests">{language === "fa" ? "تست‌های بیشتر" : "More Tests"}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/tests" className="inline-flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "fa" ? "بازگشت به تست‌ها" : "Back to Tests"}
            </Link>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-6 h-6 text-primary" />
                  {language === "fa" ? "تست سطح افسردگی" : "Depression Level Test"}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
              <CardDescription className="mt-4">
                {language === "fa"
                  ? "لطفاً بر اساس احساسات خود در دو هفته گذشته پاسخ دهید"
                  : "Please answer based on how you've felt over the last 2 weeks"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].text.en}</h2>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={answers[currentQuestion] === index ? "default" : "outline"}
                      className="w-full justify-start text-left p-4 h-auto"
                      onClick={() => handleAnswer(index)}
                    >
                      {option.text.en}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === "fa" ? "قبلی" : "Previous"}
                </Button>
                <Button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1 || answers[currentQuestion] === undefined}
                >
                  {language === "fa" ? "بعدی" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
