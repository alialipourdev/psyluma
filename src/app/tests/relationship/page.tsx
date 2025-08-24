"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, RotateCcw, Heart, Users, MessageCircle } from "lucide-react"
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
  category: "communication" | "trust" | "intimacy" | "conflict" | "support"
}

const questions: Question[] = [
  {
    id: 1,
    category: "communication",
    text: {
      fa: "چقدر راحت با شریک زندگی‌تان در مورد احساساتتان صحبت می‌کنید؟",
      en: "How comfortable are you talking about your feelings with your partner?",
    },
    options: [
      { text: { fa: "بسیار راحت", en: "Very comfortable" }, score: 4 },
      { text: { fa: "نسبتاً راحت", en: "Somewhat comfortable" }, score: 3 },
      { text: { fa: "کمی راحت", en: "A little comfortable" }, score: 2 },
      { text: { fa: "اصلاً راحت نیستم", en: "Not comfortable at all" }, score: 1 },
    ],
  },
  {
    id: 2,
    category: "trust",
    text: {
      fa: "چقدر به شریک زندگی‌تان اعتماد دارید؟",
      en: "How much do you trust your partner?",
    },
    options: [
      { text: { fa: "کاملاً اعتماد دارم", en: "Complete trust" }, score: 4 },
      { text: { fa: "زیاد اعتماد دارم", en: "High trust" }, score: 3 },
      { text: { fa: "تا حدی اعتماد دارم", en: "Moderate trust" }, score: 2 },
      { text: { fa: "کم اعتماد دارم", en: "Low trust" }, score: 1 },
    ],
  },
  {
    id: 3,
    category: "intimacy",
    text: {
      fa: "چقدر با شریک زندگی‌تان احساس نزدیکی عاطفی می‌کنید؟",
      en: "How emotionally close do you feel to your partner?",
    },
    options: [
      { text: { fa: "بسیار نزدیک", en: "Very close" }, score: 4 },
      { text: { fa: "نسبتاً نزدیک", en: "Somewhat close" }, score: 3 },
      { text: { fa: "کمی نزدیک", en: "A little close" }, score: 2 },
      { text: { fa: "اصلاً نزدیک نیستم", en: "Not close at all" }, score: 1 },
    ],
  },
  {
    id: 4,
    category: "conflict",
    text: {
      fa: "چگونه اختلافات خود را حل می‌کنید؟",
      en: "How do you resolve your disagreements?",
    },
    options: [
      { text: { fa: "با گفتگوی سازنده", en: "Through constructive dialogue" }, score: 4 },
      { text: { fa: "با صبر و تحمل", en: "With patience and tolerance" }, score: 3 },
      { text: { fa: "با سکوت و اجتناب", en: "Through silence and avoidance" }, score: 2 },
      { text: { fa: "با جر و بحث", en: "Through arguments" }, score: 1 },
    ],
  },
  {
    id: 5,
    category: "support",
    text: {
      fa: "چقدر از شریک زندگی‌تان حمایت احساس می‌کنید؟",
      en: "How supported do you feel by your partner?",
    },
    options: [
      { text: { fa: "کاملاً حمایت می‌شوم", en: "Completely supported" }, score: 4 },
      { text: { fa: "زیاد حمایت می‌شوم", en: "Very supported" }, score: 3 },
      { text: { fa: "تا حدی حمایت می‌شوم", en: "Moderately supported" }, score: 2 },
      { text: { fa: "کم حمایت می‌شوم", en: "Little support" }, score: 1 },
    ],
  },
  {
    id: 6,
    category: "communication",
    text: {
      fa: "شریک زندگی‌تان چقدر به حرف‌هایتان گوش می‌دهد؟",
      en: "How well does your partner listen to you?",
    },
    options: [
      { text: { fa: "همیشه با دقت گوش می‌دهد", en: "Always listens carefully" }, score: 4 },
      { text: { fa: "اکثر اوقات گوش می‌دهد", en: "Usually listens" }, score: 3 },
      { text: { fa: "گاهی گوش می‌دهد", en: "Sometimes listens" }, score: 2 },
      { text: { fa: "به ندرت گوش می‌دهد", en: "Rarely listens" }, score: 1 },
    ],
  },
  {
    id: 7,
    category: "trust",
    text: {
      fa: "آیا می‌توانید رازهای شخصی‌تان را با شریک زندگی‌تان در میان بگذارید؟",
      en: "Can you share your personal secrets with your partner?",
    },
    options: [
      { text: { fa: "همیشه", en: "Always" }, score: 4 },
      { text: { fa: "اکثر اوقات", en: "Most of the time" }, score: 3 },
      { text: { fa: "گاهی اوقات", en: "Sometimes" }, score: 2 },
      { text: { fa: "هرگز", en: "Never" }, score: 1 },
    ],
  },
  {
    id: 8,
    category: "intimacy",
    text: {
      fa: "چقدر از زمان گذراندن با شریک زندگی‌تان لذت می‌برید؟",
      en: "How much do you enjoy spending time with your partner?",
    },
    options: [
      { text: { fa: "بسیار زیاد", en: "Very much" }, score: 4 },
      { text: { fa: "زیاد", en: "A lot" }, score: 3 },
      { text: { fa: "تا حدی", en: "Somewhat" }, score: 2 },
      { text: { fa: "کم", en: "A little" }, score: 1 },
    ],
  },
  {
    id: 9,
    category: "conflict",
    text: {
      fa: "پس از دعوا چقدر طول می‌کشد تا آشتی کنید؟",
      en: "How long does it take to make up after an argument?",
    },
    options: [
      { text: { fa: "خیلی زود", en: "Very quickly" }, score: 4 },
      { text: { fa: "چند ساعت", en: "A few hours" }, score: 3 },
      { text: { fa: "چند روز", en: "A few days" }, score: 2 },
      { text: { fa: "خیلی طولانی", en: "Very long time" }, score: 1 },
    ],
  },
  {
    id: 10,
    category: "support",
    text: {
      fa: "شریک زندگی‌تان چقدر در رسیدن به اهدافتان به شما کمک می‌کند؟",
      en: "How much does your partner help you achieve your goals?",
    },
    options: [
      { text: { fa: "بسیار زیاد کمک می‌کند", en: "Helps a lot" }, score: 4 },
      { text: { fa: "زیاد کمک می‌کند", en: "Helps quite a bit" }, score: 3 },
      { text: { fa: "کمی کمک می‌کند", en: "Helps a little" }, score: 2 },
      { text: { fa: "اصلاً کمک نمی‌کند", en: "Doesn't help at all" }, score: 1 },
    ],
  },
  {
    id: 11,
    category: "communication",
    text: {
      fa: "چقدر راحت درباره نیازها و خواسته‌هایتان صحبت می‌کنید؟",
      en: "How comfortable are you expressing your needs and wants?",
    },
    options: [
      { text: { fa: "بسیار راحت", en: "Very comfortable" }, score: 4 },
      { text: { fa: "نسبتاً راحت", en: "Somewhat comfortable" }, score: 3 },
      { text: { fa: "کمی راحت", en: "A little comfortable" }, score: 2 },
      { text: { fa: "اصلاً راحت نیستم", en: "Not comfortable at all" }, score: 1 },
    ],
  },
  {
    id: 12,
    category: "intimacy",
    text: {
      fa: "چقدر احساس می‌کنید شریک زندگی‌تان شما را درک می‌کند؟",
      en: "How much do you feel your partner understands you?",
    },
    options: [
      { text: { fa: "کاملاً درک می‌کند", en: "Completely understands" }, score: 4 },
      { text: { fa: "زیاد درک می‌کند", en: "Understands well" }, score: 3 },
      { text: { fa: "تا حدی درک می‌کند", en: "Somewhat understands" }, score: 2 },
      { text: { fa: "کم درک می‌کند", en: "Doesn't understand much" }, score: 1 },
    ],
  },
]

const getRelationshipHealth = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100

  if (percentage >= 85)
    return {
      level: { fa: "عالی", en: "Excellent" },
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
      icon: Heart,
      description: {
        fa: "رابطه شما بسیار سالم و قوی است. شما و شریک زندگی‌تان ارتباط عمیق و مثبتی دارید.",
        en: "Your relationship is very healthy and strong. You and your partner have a deep, positive connection.",
      },
      recommendations: {
        fa: [
          "به حفظ این ارتباط قوی ادامه دهید",
          "تجربیات جدید را با هم به اشتراک بگذارید",
          "از لحظات خوش با هم لذت ببرید",
        ],
        en: [
          "Continue maintaining this strong connection",
          "Share new experiences together",
          "Enjoy your good moments together",
        ],
      },
    }
  if (percentage >= 70)
    return {
      level: { fa: "خوب", en: "Good" },
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      icon: Users,
      description: {
        fa: "رابطه شما در وضعیت خوبی است. چند نقطه قوت دارید اما فضا برای بهبود نیز وجود دارد.",
        en: "Your relationship is in good condition. You have several strengths but there's room for improvement.",
      },
      recommendations: {
        fa: ["روی ارتباطات بیشتر کار کنید", "زمان بیشتری با هم بگذرانید", "به نقاط قوت رابطه‌تان توجه کنید"],
        en: ["Work more on communication", "Spend more quality time together", "Focus on your relationship strengths"],
      },
    }
  if (percentage >= 55)
    return {
      level: { fa: "متوسط", en: "Average" },
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200",
      icon: MessageCircle,
      description: {
        fa: "رابطه شما در حد متوسط است. برخی چالش‌ها وجود دارد که نیاز به توجه دارند.",
        en: "Your relationship is average. There are some challenges that need attention.",
      },
      recommendations: {
        fa: ["روی مهارت‌های ارتباطی کار کنید", "اعتماد متقابل را تقویت کنید", "مشاوره زوجین را در نظر بگیرید"],
        en: ["Work on communication skills", "Build mutual trust", "Consider couples counseling"],
      },
    }
  return {
    level: { fa: "نیاز به بهبود", en: "Needs Improvement" },
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
    icon: MessageCircle,
    description: {
      fa: "رابطه شما نیاز به توجه و بهبود جدی دارد. مشاوره حرفه‌ای توصیه می‌شود.",
      en: "Your relationship needs serious attention and improvement. Professional counseling is recommended.",
    },
    recommendations: {
      fa: ["حتماً مشاوره زوجین دریافت کنید", "روی مسائل اساسی کار کنید", "صبور باشید و به تدریج پیشرفت کنید"],
      en: ["Definitely seek couples counseling", "Work on fundamental issues", "Be patient and progress gradually"],
    },
  }
}

export default function RelationshipTest() {
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

  const calculateCategoryScores = () => {
    const categories = {
      communication: { score: 0, max: 0 },
      trust: { score: 0, max: 0 },
      intimacy: { score: 0, max: 0 },
      conflict: { score: 0, max: 0 },
      support: { score: 0, max: 0 },
    }

    questions.forEach((question, index) => {
      const category = question.category
      categories[category].max += 4 // max score per question
      if (answers[index] !== undefined) {
        categories[category].score += question.options[answers[index]].score
      }
    })

    return categories
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const maxScore = questions.length * 4

  if (showResult) {
    const score = calculateScore()
    const result = getRelationshipHealth(score, maxScore)
    const categoryScores = calculateCategoryScores()
    const IconComponent = result.icon

    const categoryNames = {
      communication: { fa: "ارتباطات", en: "Communication" },
      trust: { fa: "اعتماد", en: "Trust" },
      intimacy: { fa: "صمیمیت", en: "Intimacy" },
      conflict: { fa: "حل تعارض", en: "Conflict Resolution" },
      support: { fa: "حمایت", en: "Support" },
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

            <Card className="mb-8">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl mb-2">
                  {language === "fa" ? "نتیجه تست رابطه شما" : "Your Relationship Test Result"}
                </CardTitle>
                <CardDescription className="text-xl">Relationship Status: {result.level.en}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">
                    {score}/{maxScore}
                  </div>
                  <div className="text-2xl font-semibold text-muted-foreground mb-4">
                    {Math.round((score / maxScore) * 100)}%
                  </div>
                  <div className={`p-4 rounded-lg border-2 ${result.bgColor} mb-4`}>
                    <p className={`text-lg font-semibold ${result.color} mb-2`}>{result.level.en}</p>
                    <p className="text-muted-foreground">{result.description.en}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      {language === "fa" ? "تحلیل بخش‌ها" : "Category Analysis"}
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(categoryScores).map(([category, data]) => {
                        const percentage = Math.round((data.score / data.max) * 100)
                        return (
                          <div key={category} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                {categoryNames[category as keyof typeof categoryNames].en}
                              </span>
                              <span className="text-sm text-muted-foreground">{percentage}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
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
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{language === "fa" ? "نکته مهم" : "Important Note"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "fa"
                      ? "این تست ابزاری برای خودشناسی است و جایگزین مشاوره حرفه‌ای نمی‌باشد. اگر مشکلات جدی در رابطه دارید، با یک مشاور متخصص مشورت کنید."
                      : "This test is a self-awareness tool and doesn't replace professional counseling. If you have serious relationship issues, consult with a qualified counselor."}
                  </p>
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
                  {language === "fa" ? "تست سلامت رابطه" : "Relationship Health Test"}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
              <CardDescription className="mt-4">
                {language === "fa"
                  ? "لطفاً بر اساس وضعیت فعلی رابطه‌تان پاسخ دهید"
                  : "Please answer based on your current relationship situation"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {questions[currentQuestion].category === "communication"
                      ? "Communication"
                      : questions[currentQuestion].category === "trust"
                        ? "Trust"
                        : questions[currentQuestion].category === "intimacy"
                          ? "Intimacy"
                          : questions[currentQuestion].category === "conflict"
                            ? "Conflict Resolution"
                            : "Support"}
                  </span>
                </div>
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
