"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Clock,
  Brain,
  Zap,
  Target,
  Trophy,
  Star,
  Flame,
  CloudLightningIcon as Lightning,
} from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  text: string
  emoji: string
  options: {
    text: string
    emoji: string
    correct: boolean
  }[]
  type: "logical" | "mathematical" | "verbal" | "spatial"
  difficulty: "easy" | "medium" | "hard"
  funFact?: string
}

const questions: Question[] = [
  {
    id: 1,
    type: "logical",
    difficulty: "easy",
    emoji: "🧩",
    text: "If all unicorns are magical, and all magical creatures are rare, then all unicorns are... 🦄",
    funFact: "Logic puzzles like this were used by ancient Greek philosophers!",
    options: [
      { text: "Rare and fabulous! ✨", emoji: "✨", correct: true },
      { text: "Common as dirt 🌍", emoji: "🌍", correct: false },
      { text: "Sometimes rare 🤔", emoji: "🤔", correct: false },
      { text: "Never rare 🚫", emoji: "🚫", correct: false },
    ],
  },
  {
    id: 2,
    type: "mathematical",
    difficulty: "medium",
    emoji: "🔢",
    text: "What's the next number in this magical sequence? 2, 6, 18, 54, ? 🎯",
    funFact: "This is a geometric sequence - each number is multiplied by 3!",
    options: [
      { text: "108 (doubling up!)", emoji: "⚡", correct: false },
      { text: "162 (triple threat!)", emoji: "🎯", correct: true },
      { text: "216 (power play!)", emoji: "💪", correct: false },
      { text: "324 (mega jump!)", emoji: "🚀", correct: false },
    ],
  },
  {
    id: 3,
    type: "verbal",
    difficulty: "easy",
    emoji: "📝",
    text: "One of these emotions is the odd one out - which party crasher doesn't belong? 🎉",
    funFact: "Humans can recognize over 27 different emotions!",
    options: [
      { text: "Happy (sunshine vibes!)", emoji: "☀️", correct: false },
      { text: "Joyful (dancing mood!)", emoji: "💃", correct: false },
      { text: "Sad (rain cloud alert!)", emoji: "🌧️", correct: true },
      { text: "Cheerful (party time!)", emoji: "🎊", correct: false },
    ],
  },
  {
    id: 4,
    type: "spatial",
    difficulty: "hard",
    emoji: "🎲",
    text: "If you slice off a corner of a cube, how many faces will your new shape have? 🔪",
    funFact: "This creates a shape called a 'truncated cube' - geometry is everywhere!",
    options: [
      { text: "6 faces (classic cube!)", emoji: "⬜", correct: false },
      { text: "7 faces (lucky number!)", emoji: "🍀", correct: true },
      { text: "8 faces (octagon vibes!)", emoji: "🛑", correct: false },
      { text: "9 faces (almost double!)", emoji: "🔥", correct: false },
    ],
  },
  {
    id: 5,
    type: "logical",
    difficulty: "hard",
    emoji: "👨‍👩‍👧",
    text: "Family math puzzle! Dad is 5 years older than Mom. Mom is 25 years older than their kid. Together they're 100 years old. How old is the kid? 🎂",
    funFact: "This type of problem is called a 'system of equations' - math detectives love these!",
    options: [
      { text: "15 years (teen spirit!)", emoji: "🎸", correct: false },
      { text: "20 years (young adult!)", emoji: "🎓", correct: false },
      { text: "23 years (prime time!)", emoji: "⭐", correct: true },
      { text: "25 years (quarter century!)", emoji: "🎯", correct: false },
    ],
  },
  {
    id: 6,
    type: "mathematical",
    difficulty: "medium",
    emoji: "🧮",
    text: "Algebra adventure! If 3x + 7 = 22, what magical value is x? ✨",
    funFact: "Algebra was invented over 1,000 years ago by Persian mathematician Al-Khwarizmi!",
    options: [
      { text: "3 (triple threat!)", emoji: "3️⃣", correct: false },
      { text: "5 (high five!)", emoji: "🖐️", correct: true },
      { text: "7 (lucky seven!)", emoji: "🍀", correct: false },
      { text: "9 (cloud nine!)", emoji: "☁️", correct: false },
    ],
  },
  {
    id: 7,
    type: "verbal",
    difficulty: "medium",
    emoji: "📚",
    text: "Word relationship puzzle! Book is to library as tree is to... 🌳",
    funFact: "Analogies like this help measure reasoning ability and are used in many IQ tests!",
    options: [
      { text: "Leaf (tiny part!)", emoji: "🍃", correct: false },
      { text: "Forest (home sweet home!)", emoji: "🌲", correct: true },
      { text: "Root (underground network!)", emoji: "🌱", correct: false },
      { text: "Branch (reaching out!)", emoji: "🌿", correct: false },
    ],
  },
  {
    id: 8,
    type: "spatial",
    difficulty: "medium",
    emoji: "🌪️",
    text: "3D imagination time! What shape do you get when you spin a triangle around one of its sides? 🔄",
    funFact: "This is called a 'solid of revolution' - spinning 2D shapes creates 3D magic!",
    options: [
      { text: "Cylinder (rolling along!)", emoji: "🥫", correct: false },
      { text: "Cone (ice cream shape!)", emoji: "🍦", correct: true },
      { text: "Sphere (perfect ball!)", emoji: "⚽", correct: false },
      { text: "Cube (box it up!)", emoji: "📦", correct: false },
    ],
  },
  {
    id: 9,
    type: "logical",
    difficulty: "medium",
    emoji: "📅",
    text: "Time travel puzzle! If today is Monday, what day will it be exactly 100 days from now? ⏰",
    funFact: "Days of the week repeat every 7 days, so we use modular arithmetic: 100 ÷ 7 = 14 remainder 2!",
    options: [
      { text: "Monday (back to start!)", emoji: "🔄", correct: false },
      { text: "Tuesday (two days ahead!)", emoji: "✌️", correct: true },
      { text: "Wednesday (hump day!)", emoji: "🐪", correct: false },
      { text: "Thursday (almost Friday!)", emoji: "📈", correct: false },
    ],
  },
  {
    id: 10,
    type: "mathematical",
    difficulty: "hard",
    emoji: "⭕",
    text: "Circle challenge! What's the area of a circle with radius 5 cm? (π ≈ 3.14) 📐",
    funFact: "The formula πr² was discovered by Archimedes over 2,000 years ago!",
    options: [
      { text: "31.4 cm² (circumference trick!)", emoji: "🔄", correct: false },
      { text: "78.5 cm² (perfect pi!)", emoji: "🥧", correct: true },
      { text: "157 cm² (double trouble!)", emoji: "👥", correct: false },
      { text: "314 cm² (pi overload!)", emoji: "🌪️", correct: false },
    ],
  },
]

const getIQLevel = (score: number) => {
  if (score >= 9)
    return {
      level: "Genius Level! 🧠✨",
      range: "130+",
      description: "You're in the top 2% of the population! Your brain is absolutely incredible!",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      emoji: "🏆",
    }
  if (score >= 7)
    return {
      level: "Super Smart! 🌟",
      range: "115-129",
      description: "Above average intelligence! You're crushing it with those brain cells!",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      emoji: "🎯",
    }
  if (score >= 5)
    return {
      level: "Solid Thinker! 💪",
      range: "85-114",
      description: "Right in the sweet spot! Your thinking skills are well-balanced!",
      color: "text-green-600",
      bgColor: "bg-green-100",
      emoji: "✅",
    }
  if (score >= 3)
    return {
      level: "Growing Mind! 🌱",
      range: "70-84",
      description: "Room for growth! Every genius started somewhere - keep practicing!",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      emoji: "📈",
    }
  return {
    level: "Future Einstein! 🚀",
    range: "Keep Trying!",
    description: "Everyone learns at their own pace! Practice makes perfect - you've got this!",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    emoji: "💪",
  }
}

export default function IntelligenceTest() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes
  const [testStarted, setTestStarted] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showFunFact, setShowFunFact] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (testStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true)
    }
  }, [timeLeft, testStarted, showResult])

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)

    const isCorrect = questions[currentQuestion].options[optionIndex]?.correct
    const timeTaken = Date.now() - questionStartTime

    // Update streak
    if (isCorrect) {
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }

    // Show fun fact for a moment
    setShowFunFact(true)
    setTimeout(() => setShowFunFact(false), 3000)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setQuestionStartTime(Date.now())
      }, 1500)
    } else {
      setTimeout(() => setShowResult(true), 2000)
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== undefined && questions[questionIndex]) {
        if (questions[questionIndex].options[answerIndex]?.correct) {
          correct++
        }
      }
    })
    return correct
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setTimeLeft(1200)
    setTestStarted(false)
    setStreak(0)
    setShowFunFact(false)
    setQuestionStartTime(Date.now())
  }

  const startTest = () => {
    setTestStarted(true)
    setQuestionStartTime(Date.now())
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/tests" className="inline-flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tests
              </Link>
            </div>

            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 p-6">
                <CardHeader className="text-center pb-2">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-4xl mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    🧠 Brain Power Challenge! 🚀
                  </CardTitle>
                  <CardDescription className="text-xl">
                    Ready to discover your intellectual superpowers? Let's see what your amazing brain can do! ✨
                  </CardDescription>
                </CardHeader>
              </div>

              <CardContent className="space-y-8 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Target className="w-6 h-6 text-red-500" />
                      Mission Briefing
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">20 minutes of pure brain fun!</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <Zap className="w-5 h-5 text-green-500" />
                        <span className="font-medium">10 mind-bending challenges await!</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <Trophy className="w-5 h-5 text-purple-500" />
                        <span className="font-medium">Unlock your genius potential!</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Pro Tips for Success!
                      </h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Trust your first instinct - it's usually right!</li>
                        <li>• Take your time, but don't overthink it</li>
                        <li>• Every question teaches you something new</li>
                        <li>• Have fun - your brain works better when you're enjoying yourself!</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Lightning className="w-6 h-6 text-yellow-500" />
                      Challenge Categories
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-lg border border-purple-200">
                        <div className="font-bold text-purple-700 flex items-center gap-2 mb-2">🧩 Logic Puzzles</div>
                        <div className="text-sm text-purple-600">
                          Mind-bending reasoning that would make Sherlock Holmes proud!
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-lg border border-blue-200">
                        <div className="font-bold text-blue-700 flex items-center gap-2 mb-2">🔢 Math Magic</div>
                        <div className="text-sm text-blue-600">
                          Number patterns and calculations that reveal hidden secrets!
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-lg border border-green-200">
                        <div className="font-bold text-green-700 flex items-center gap-2 mb-2">📝 Word Wizardry</div>
                        <div className="text-sm text-green-600">Language puzzles that unlock the power of words!</div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-orange-500/10 to-orange-500/5 rounded-lg border border-orange-200">
                        <div className="font-bold text-orange-700 flex items-center gap-2 mb-2">🎲 3D Thinking</div>
                        <div className="text-sm text-orange-600">
                          Spatial challenges that bend your mind in all dimensions!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={startTest}
                    size="lg"
                    className="px-12 py-4 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
                  >
                    <Flame className="w-5 h-5 mr-2" />
                    Ignite My Brain Power! 🚀
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    const score = calculateScore()
    const result = getIQLevel(score)

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/tests" className="inline-flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tests
              </Link>
            </div>

            <Card className="mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 p-6">
                <CardHeader className="text-center pb-2">
                  <div className="text-6xl mb-4 animate-bounce">{result.emoji}</div>
                  <CardTitle className="text-4xl mb-2">Your Brain Power Revealed!</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">{result.level}</CardDescription>
                </CardHeader>
              </div>

              <CardContent className="space-y-8 p-8">
                <div className="text-center">
                  <div className="text-8xl font-bold text-primary mb-4 animate-pulse">{score}/10</div>
                  <p className="text-xl text-muted-foreground mb-4">{result.description}</p>
                  <Badge variant="secondary" className={`text-lg px-6 py-2 ${result.bgColor} ${result.color}`}>
                    Estimated IQ Range: {result.range}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Target className="w-6 h-6 text-red-500" />
                      Your Performance Breakdown
                    </h3>
                    <div className="space-y-3">
                      {["logical", "mathematical", "verbal", "spatial"].map((type) => {
                        const typeQuestions = questions.filter((q) => q.type === type)
                        const typeCorrect = typeQuestions.reduce((acc, q, index) => {
                          const originalIndex = questions.findIndex((oq) => oq.id === q.id)
                          return (
                            acc +
                            (answers[originalIndex] !== undefined && q.options[answers[originalIndex]]?.correct ? 1 : 0)
                          )
                        }, 0)

                        const typeNames = {
                          logical: "🧩 Logic Puzzles",
                          mathematical: "🔢 Math Magic",
                          verbal: "📝 Word Wizardry",
                          spatial: "🎲 3D Thinking",
                        }

                        const percentage = Math.round((typeCorrect / typeQuestions.length) * 100)

                        return (
                          <div key={type} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="font-medium">{typeNames[type as keyof typeof typeNames]}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">
                                {typeCorrect}/{typeQuestions.length}
                              </span>
                              <Badge
                                variant={percentage >= 75 ? "default" : percentage >= 50 ? "secondary" : "outline"}
                              >
                                {percentage}%
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-500" />
                      Your Brain's Superpowers
                    </h3>
                    <div className="space-y-3">
                      {score >= 8 ? (
                        <div className="space-y-3">
                          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                            <div className="font-bold text-purple-700 mb-1">🏆 Genius-Level Thinking!</div>
                            <div className="text-sm text-purple-600">
                              You're in the top 2% of the population - your brain is absolutely incredible!
                            </div>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                            <div className="font-bold text-blue-700 mb-1">🚀 Problem-Solving Master!</div>
                            <div className="text-sm text-blue-600">
                              Complex challenges are no match for your analytical superpowers!
                            </div>
                          </div>
                        </div>
                      ) : score >= 6 ? (
                        <div className="space-y-3">
                          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            <div className="font-bold text-green-700 mb-1">⭐ Above Average Brilliance!</div>
                            <div className="text-sm text-green-600">
                              You're crushing it in most areas - your brain is firing on all cylinders!
                            </div>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <div className="font-bold text-blue-700 mb-1">📈 Growth Potential!</div>
                            <div className="text-sm text-blue-600">
                              With a bit more practice, you could reach genius level!
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                            <div className="font-bold text-yellow-700 mb-1">🌱 Growing Genius!</div>
                            <div className="text-sm text-yellow-600">
                              Every expert was once a beginner - keep challenging that amazing brain!
                            </div>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                            <div className="font-bold text-orange-700 mb-1">💪 Practice Makes Perfect!</div>
                            <div className="text-sm text-orange-600">
                              Brain games, puzzles, and reading will supercharge your thinking power!
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Button onClick={resetTest} variant="outline" className="gap-2 bg-transparent">
                    <RotateCcw className="w-4 h-4" />
                    Challenge My Brain Again!
                  </Button>
                  <Button
                    asChild
                    className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Link href="/tests">
                      <Trophy className="w-4 h-4" />
                      Explore More Brain Challenges!
                    </Link>
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
              Back to Tests
            </Link>
          </div>

          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 p-6">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-6 h-6 text-purple-500" />
                    Brain Power Challenge
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    {streak > 0 && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                        <Flame className="w-3 h-3 mr-1" />
                        {streak} Streak!
                      </Badge>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span className={timeLeft < 300 ? "text-destructive font-semibold animate-pulse" : ""}>
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full">
                      {currentQuestion + 1} of {questions.length}
                    </span>
                  </div>
                </div>
                <Progress value={progress} className="w-full h-3" />
              </CardHeader>
            </div>

            <CardContent className="space-y-8 p-8">
              {showFunFact && questions[currentQuestion].funFact && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200 animate-in slide-in-from-top duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <span className="font-bold text-yellow-800">Fun Fact!</span>
                  </div>
                  <p className="text-sm text-yellow-700">{questions[currentQuestion].funFact}</p>
                </div>
              )}

              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Badge
                    variant="outline"
                    className={`text-sm px-4 py-2 ${
                      questions[currentQuestion].difficulty === "easy"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : questions[currentQuestion].difficulty === "medium"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {questions[currentQuestion].difficulty === "easy"
                      ? "🟢 Easy Warm-up"
                      : questions[currentQuestion].difficulty === "medium"
                        ? "🟡 Medium Challenge"
                        : "🔴 Hard Brain Bender"}
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    {questions[currentQuestion].type === "logical"
                      ? "🧩 Logic"
                      : questions[currentQuestion].type === "mathematical"
                        ? "🔢 Math"
                        : questions[currentQuestion].type === "verbal"
                          ? "📝 Words"
                          : "🎲 3D Space"}
                  </Badge>
                </div>

                <div className="text-8xl mb-6 animate-bounce">{questions[currentQuestion].emoji}</div>
                <h2 className="text-2xl font-bold mb-8">{questions[currentQuestion].text}</h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={answers[currentQuestion] === index ? "default" : "outline"}
                      className="w-full justify-start text-left p-6 h-auto bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 group"
                      onClick={() => handleAnswer(index)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {option.emoji}
                        </span>
                        <div className="text-left">
                          <span className="font-semibold text-lg">{String.fromCharCode(65 + index)})</span>
                          <span className="ml-3 text-lg">{option.text}</span>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1 || answers[currentQuestion] === undefined}
                  className="gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
