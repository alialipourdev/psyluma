"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, RotateCcw, Heart, AlertTriangle } from "lucide-react"
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
      fa: "در هفته گذشته، چقدر احساس نگرانی یا اضطراب کرده‌اید؟",
      en: "In the past week, how much have you felt worried or anxious?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "کمی", en: "A little" }, score: 1 },
      { text: { fa: "متوسط", en: "Moderately" }, score: 2 },
      { text: { fa: "زیاد", en: "A lot" }, score: 3 },
    ],
  },
  {
    id: 2,
    text: {
      fa: "آیا کنترل نگرانی‌هایتان برایتان دشوار است؟",
      en: "Do you find it difficult to control your worries?",
    },
    options: [
      { text: { fa: "هرگز", en: "Never" }, score: 0 },
      { text: { fa: "گاهی اوقات", en: "Sometimes" }, score: 1 },
      { text: { fa: "اکثر اوقات", en: "Most of the time" }, score: 2 },
      { text: { fa: "همیشه", en: "Always" }, score: 3 },
    ],
  },
  {
    id: 3,
    text: {
      fa: "چقدر در مورد چیزهای مختلف نگران می‌شوید؟",
      en: "How much do you worry about different things?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "کمی", en: "A little" }, score: 1 },
      { text: { fa: "متوسط", en: "Moderately" }, score: 2 },
      { text: { fa: "بسیار زیاد", en: "Very much" }, score: 3 },
    ],
  },
  {
    id: 4,
    text: {
      fa: "آیا مشکل در آرام شدن دارید؟",
      en: "Do you have trouble relaxing?",
    },
    options: [
      { text: { fa: "هرگز", en: "Never" }, score: 0 },
      { text: { fa: "گاهی اوقات", en: "Sometimes" }, score: 1 },
      { text: { fa: "اکثر اوقات", en: "Most of the time" }, score: 2 },
      { text: { fa: "همیشه", en: "Always" }, score: 3 },
    ],
  },
  {
    id: 5,
    text: {
      fa: "چقدر بی‌قرار هستید که نمی‌توانید ساکت بنشینید؟",
      en: "How restless are you, so that it's hard to sit still?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "کمی", en: "A little" }, score: 1 },
      { text: { fa: "متوسط", en: "Moderately" }, score: 2 },
      { text: { fa: "بسیار زیاد", en: "Very much" }, score: 3 },
    ],
  },
  {
    id: 6,
    text: {
      fa: "چقدر به راحتی عصبانی یا کلافه می‌شوید؟",
      en: "How easily do you become annoyed or irritated?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "کمی", en: "A little" }, score: 1 },
      { text: { fa: "متوسط", en: "Moderately" }, score: 2 },
      { text: { fa: "بسیار زیاد", en: "Very much" }, score: 3 },
    ],
  },
  {
    id: 7,
    text: {
      fa: "آیا احساس می‌کنید که چیز وحشتناکی ممکن است اتفاق بیفتد؟",
      en: "Do you feel like something awful might happen?",
    },
    options: [
      { text: { fa: "هرگز", en: "Never" }, score: 0 },
      { text: { fa: "گاهی اوقات", en: "Sometimes" }, score: 1 },
      { text: { fa: "اکثر اوقات", en: "Most of the time" }, score: 2 },
      { text: { fa: "همیشه", en: "Always" }, score: 3 },
    ],
  },
  {
    id: 8,
    text: {
      fa: "آیا علائم جسمی اضطراب (تپش قلب، تعریق، لرزش) تجربه می‌کنید؟",
      en: "Do you experience physical symptoms of anxiety (heart racing, sweating, trembling)?",
    },
    options: [
      { text: { fa: "هرگز", en: "Never" }, score: 0 },
      { text: { fa: "گاهی اوقات", en: "Sometimes" }, score: 1 },
      { text: { fa: "اکثر اوقات", en: "Most of the time" }, score: 2 },
      { text: { fa: "همیشه", en: "Always" }, score: 3 },
    ],
  },
  {
    id: 9,
    text: {
      fa: "چقدر از موقعیت‌های اجتماعی اجتناب می‌کنید؟",
      en: "How much do you avoid social situations?",
    },
    options: [
      { text: { fa: "اصلاً", en: "Not at all" }, score: 0 },
      { text: { fa: "کمی", en: "A little" }, score: 1 },
      { text: { fa: "متوسط", en: "Moderately" }, score: 2 },
      { text: { fa: "بسیار زیاد", en: "Very much" }, score: 3 },
    ],
  },
  {
    id: 10,
    text: {
      fa: "آیا اضطراب بر کار یا فعالیت‌های روزانه‌تان تأثیر می‌گذارد؟",
      en: "Does anxiety interfere with your work or daily activities?",
    },
    options: [
      { text: { fa: "هرگز", en: "Never" }, score: 0 },
      { text: { fa: "گاهی اوقات", en: "Sometimes" }, score: 1 },
      { text: { fa: "اکثر اوقات", en: "Most of the time" }, score: 2 },
      { text: { fa: "همیشه", en: "Always" }, score: 3 },
    ],
  },
]

const getAnxietyLevel = (score: number) => {
  if (score <= 4)
    return {
      level: { fa: "کم", en: "Low" },
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
      description: {
        fa: "سطح اضطراب شما در محدوده طبیعی است. شما به خوبی با استرس کنار می‌آیید.",
        en: "Your anxiety level is within the normal range. You cope well with stress.",
      },
      recommendations: {
        fa: ["ادامه دهید به فعالیت‌های مثبت فعلی", "تکنیک‌های آرام‌سازی را تمرین کنید", "ورزش منظم داشته باشید"],
        en: [
          "Continue your current positive activities",
          "Practice relaxation techniques",
          "Maintain regular exercise",
        ],
      },
    }
  if (score <= 9)
    return {
      level: { fa: "خفیف", en: "Mild" },
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200",
      description: {
        fa: "سطح اضطراب خفیف دارید. ممکن است گاهی احساس نگرانی کنید اما قابل مدیریت است.",
        en: "You have mild anxiety. You may feel worried sometimes but it's manageable.",
      },
      recommendations: {
        fa: ["تکنیک‌های تنفس عمیق یاد بگیرید", "زمان بیشتری برای استراحت اختصاص دهید", "با دوستان و خانواده صحبت کنید"],
        en: ["Learn deep breathing techniques", "Allocate more time for rest", "Talk to friends and family"],
      },
    }
  if (score <= 14)
    return {
      level: { fa: "متوسط", en: "Moderate" },
      color: "text-orange-600",
      bgColor: "bg-orange-50 border-orange-200",
      description: {
        fa: "سطح اضطراب متوسط دارید. این ممکن است بر زندگی روزانه‌تان تأثیر بگذارد.",
        en: "You have moderate anxiety. This may affect your daily life.",
      },
      recommendations: {
        fa: ["با یک مشاور یا روان‌شناس مشورت کنید", "تکنیک‌های مدیریت استرس یاد بگیرید", "الگوی خواب منظم داشته باشید"],
        en: [
          "Consider consulting a counselor or psychologist",
          "Learn stress management techniques",
          "Maintain a regular sleep pattern",
        ],
      },
    }
  return {
    level: { fa: "شدید", en: "Severe" },
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
    description: {
      fa: "سطح اضطراب بالایی دارید. توصیه می‌شود کمک حرفه‌ای دریافت کنید.",
      en: "You have high anxiety levels. It's recommended to seek professional help.",
    },
    recommendations: {
      fa: [
        "حتماً با یک متخصص سلامت روان مشورت کنید",
        "درمان شناختی-رفتاری را در نظر بگیرید",
        "از شبکه حمایتی خود استفاده کنید",
      ],
      en: [
        "Definitely consult with a mental health professional",
        "Consider cognitive-behavioral therapy",
        "Use your support network",
      ],
    },
  }
}

export default function AnxietyTest() {
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
    const result = getAnxietyLevel(score)

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
                <CardTitle className="text-3xl mb-2">
                  {language === "fa" ? "نتیجه تست اضطراب شما" : "Your Anxiety Test Result"}
                </CardTitle>
                <CardDescription className="text-xl">Anxiety Level: {result.level.en}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">{score}/30</div>
                  <div className={`p-4 rounded-lg border-2 ${result.bgColor} mb-4`}>
                    <p className={`text-lg font-semibold ${result.color} mb-2`}>{result.level.en}</p>
                    <p className="text-muted-foreground">{result.description.en}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      {language === "fa" ? "توصیه‌های مراقبت از خود" : "Self-Care Recommendations"}
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
                          ? "• این تست تشخیص پزشکی نیست و جایگزین مشاوره حرفه‌ای نمی‌باشد"
                          : "• This test is not a medical diagnosis and doesn't replace professional consultation"}
                      </p>
                      <p>
                        {language === "fa"
                          ? "• اگر علائم شدید دارید، با متخصص مشورت کنید"
                          : "• If you have severe symptoms, consult with a specialist"}
                      </p>
                      <p>
                        {language === "fa"
                          ? "• اضطراب قابل درمان است و کمک موجود است"
                          : "• Anxiety is treatable and help is available"}
                      </p>
                      {score >= 15 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-700 font-medium">
                            {language === "fa"
                              ? "⚠️ توصیه می‌شود در اسرع وقت با یک متخصص سلامت روان مشورت کنید"
                              : "⚠️ It's recommended to consult with a mental health professional as soon as possible"}
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
                  <Heart className="w-6 h-6 text-primary" />
                  {language === "fa" ? "تست سطح اضطراب" : "Anxiety Level Test"}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
              <CardDescription className="mt-4">
                {language === "fa"
                  ? "لطفاً بر اساس احساسات خود در هفته گذشته پاسخ دهید"
                  : "Please answer based on how you've felt in the past week"}
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
