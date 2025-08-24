"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../../../contexts/language-context"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Progress } from "../../../components/ui/progress"
import { RatingSystem } from "../../../components/rating-system"
import { ShareResult } from "../../../components/share-result"
import { ArrowLeft, ArrowRight, RotateCcw, Download, Sparkles, Trophy, Heart } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  text: string
  emoji: string
  options: {
    text: string
    emoji: string
    score: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number }
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "You're at a party! What's your vibe? 🎉",
    emoji: "🎉",
    options: [
      {
        text: "I'm the social butterfly, chatting with everyone!",
        emoji: "🦋",
        score: { E: 2, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      },
      {
        text: "I prefer deep conversations with a few close friends",
        emoji: "💭",
        score: { E: 0, I: 2, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      },
    ],
  },
  {
    id: 2,
    text: "Decision time! What's your superpower? 🤔",
    emoji: "🤔",
    options: [
      {
        text: "Logic and analysis - I'm like Sherlock Holmes!",
        emoji: "🔍",
        score: { E: 0, I: 0, S: 0, N: 0, T: 2, F: 0, J: 0, P: 0 },
      },
      {
        text: "Heart and values - I follow my feelings",
        emoji: "❤️",
        score: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 2, J: 0, P: 0 },
      },
    ],
  },
  {
    id: 3,
    text: "What describes you best? ✨",
    emoji: "✨",
    options: [
      {
        text: "Practical and down-to-earth - I keep it real!",
        emoji: "🌱",
        score: { E: 0, I: 0, S: 2, N: 0, T: 0, F: 0, J: 0, P: 0 },
      },
      {
        text: "Creative dreamer with wild imagination!",
        emoji: "🌈",
        score: { E: 0, I: 0, S: 0, N: 2, T: 0, F: 0, J: 0, P: 0 },
      },
    ],
  },
  {
    id: 4,
    text: "Your ideal weekend plan? 📅",
    emoji: "📅",
    options: [
      {
        text: "Everything planned perfectly - I love schedules!",
        emoji: "📋",
        score: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 2, P: 0 },
      },
      {
        text: "Go with the flow - spontaneous adventures!",
        emoji: "🎲",
        score: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 2 },
      },
    ],
  },
  {
    id: 5,
    text: "Where do you recharge your batteries? 🔋",
    emoji: "🔋",
    options: [
      {
        text: "Around people - they energize me!",
        emoji: "👥",
        score: { E: 2, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      },
      {
        text: "Alone time for reflection and peace",
        emoji: "🧘",
        score: { E: 0, I: 2, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      },
    ],
  },
  {
    id: 6,
    text: "Learning something new - what's your style? 📚",
    emoji: "📚",
    options: [
      {
        text: "Step by step, detail by detail - methodical!",
        emoji: "🔢",
        score: { E: 0, I: 0, S: 2, N: 0, T: 0, F: 0, J: 0, P: 0 },
      },
      {
        text: "Big picture first - I see the whole forest!",
        emoji: "🌲",
        score: { E: 0, I: 0, S: 0, N: 2, T: 0, F: 0, J: 0, P: 0 },
      },
    ],
  },
  {
    id: 7,
    text: "Conflict resolution mode activated! ⚔️",
    emoji: "⚔️",
    options: [
      {
        text: "Facts and logic - let's be rational!",
        emoji: "🧠",
        score: { E: 0, I: 0, S: 0, N: 0, T: 2, F: 0, J: 0, P: 0 },
      },
      {
        text: "Understanding feelings - everyone matters!",
        emoji: "🤗",
        score: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 2, J: 0, P: 0 },
      },
    ],
  },
  {
    id: 8,
    text: "Your dream workspace? 🏢",
    emoji: "🏢",
    options: [
      {
        text: "Organized and predictable - everything in its place!",
        emoji: "📊",
        score: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 2, P: 0 },
      },
      {
        text: "Dynamic and ever-changing - variety is the spice!",
        emoji: "🎨",
        score: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 2 },
      },
    ],
  },
  {
    id: 9,
    text: "Your communication style? 💬",
    emoji: "💬",
    options: [
      {
        text: "Direct and to the point - efficiency rocks!",
        emoji: "🎯",
        score: { E: 1, I: 0, S: 1, N: 0, T: 1, F: 0, J: 1, P: 0 },
      },
      {
        text: "Warm and considerate - feelings first!",
        emoji: "🌸",
        score: { E: 0, I: 1, S: 0, N: 1, T: 0, F: 1, J: 0, P: 1 },
      },
    ],
  },
  {
    id: 10,
    text: "Your ideal vacation? 🏖️",
    emoji: "🏖️",
    options: [
      {
        text: "Adventure and exploration - let's discover!",
        emoji: "🗺️",
        score: { E: 1, I: 0, S: 0, N: 1, T: 0, F: 0, J: 0, P: 1 },
      },
      {
        text: "Relaxation and familiar comforts",
        emoji: "🛋️",
        score: { E: 0, I: 1, S: 1, N: 0, T: 0, F: 1, J: 1, P: 0 },
      },
    ],
  },
]

const personalityTypes = {
  INTJ: {
    name: "The Mastermind Architect 🏗️",
    description:
      "You're a strategic visionary who loves turning big ideas into reality! You see patterns others miss and plan like a chess grandmaster.",
    traits: ["Strategic Genius", "Independent Thinker", "Future-Focused", "Perfectionist"],
    percentage: "2%",
    famous: ["Elon Musk", "Isaac Newton", "Nikola Tesla"],
    strengths: ["Innovative thinking", "Long-term planning", "Self-motivated"],
    careers: ["Scientist", "Engineer", "Strategist", "Entrepreneur"],
  },
  INFJ: {
    name: "The Mystical Advocate 🔮",
    description:
      "You're a rare gem with incredible intuition and deep empathy! You see the potential in everyone and fight for what's right.",
    traits: ["Intuitive Empath", "Idealistic", "Creative Soul", "Mysterious"],
    percentage: "1%",
    famous: ["Martin Luther King Jr.", "Maya Angelou", "Nelson Mandela"],
    strengths: ["Deep insight", "Inspiring others", "Creative vision"],
    careers: ["Counselor", "Writer", "Teacher", "Social Worker"],
  },
  ENTJ: {
    name: "The Bold Commander 👑",
    description:
      "You're a natural-born leader who turns visions into victories! You inspire others and make things happen with unstoppable energy.",
    traits: ["Natural Leader", "Strategic", "Confident", "Goal-Crusher"],
    percentage: "3%",
    famous: ["Steve Jobs", "Margaret Thatcher", "Gordon Ramsay"],
    strengths: ["Leadership", "Strategic thinking", "Efficiency"],
    careers: ["CEO", "Manager", "Entrepreneur", "Politician"],
  },
  ENFJ: {
    name: "The Inspiring Protagonist 🌟",
    description:
      "You're a charismatic people-magnet who brings out the best in everyone! Your enthusiasm is contagious and your heart is huge.",
    traits: ["Charismatic", "Inspiring", "People-Focused", "Optimistic"],
    percentage: "3%",
    famous: ["Oprah Winfrey", "Barack Obama", "Maya Angelou"],
    strengths: ["Inspiring others", "Communication", "Empathy"],
    careers: ["Teacher", "Coach", "Politician", "Counselor"],
  },
  ISTJ: {
    name: "The Reliable Guardian 🛡️",
    description:
      "You're the dependable rock everyone can count on! Your attention to detail and strong work ethic make you absolutely invaluable.",
    traits: ["Super Reliable", "Detail-Oriented", "Traditional", "Hardworking"],
    percentage: "12%",
    famous: ["Warren Buffett", "George Washington", "Queen Elizabeth II"],
    strengths: ["Reliability", "Organization", "Practical thinking"],
    careers: ["Accountant", "Manager", "Administrator", "Engineer"],
  },
  ISFJ: {
    name: "The Caring Protector 🤗",
    description:
      "You're a warm-hearted guardian angel who puts others first! Your kindness and loyalty make the world a better place.",
    traits: ["Nurturing", "Loyal", "Supportive", "Humble"],
    percentage: "13%",
    famous: ["Mother Teresa", "Kate Middleton", "Jimmy Carter"],
    strengths: ["Caring for others", "Attention to detail", "Loyalty"],
    careers: ["Nurse", "Teacher", "Social Worker", "Administrator"],
  },
  ESTJ: {
    name: "The Executive Organizer 📊",
    description:
      "You're a results-driven powerhouse who gets stuff done! Your organizational skills and leadership make you a natural manager.",
    traits: ["Organized", "Results-Driven", "Traditional", "Direct"],
    percentage: "9%",
    famous: ["Judge Judy", "Vince Lombardi", "John D. Rockefeller"],
    strengths: ["Organization", "Leadership", "Efficiency"],
    careers: ["Manager", "Administrator", "Judge", "Military Officer"],
  },
  ESFJ: {
    name: "The Social Butterfly 🦋",
    description:
      "You're the heart of every group with your warmth and social magic! You create harmony and make everyone feel special.",
    traits: ["Social", "Caring", "Harmonious", "Supportive"],
    percentage: "12%",
    famous: ["Taylor Swift", "Jennifer Garner", "Sally Field"],
    strengths: ["Social skills", "Empathy", "Organization"],
    careers: ["Teacher", "Nurse", "Event Planner", "HR Manager"],
  },
  ISTP: {
    name: "The Cool Craftsman 🔧",
    description:
      "You're a hands-on problem solver with incredible practical skills! You stay calm under pressure and fix anything.",
    traits: ["Practical", "Independent", "Calm", "Skilled"],
    percentage: "5%",
    famous: ["Clint Eastwood", "Bear Grylls", "Michael Jordan"],
    strengths: ["Problem-solving", "Practical skills", "Adaptability"],
    careers: ["Engineer", "Mechanic", "Pilot", "Athlete"],
  },
  ISFP: {
    name: "The Artistic Soul 🎨",
    description:
      "You're a gentle creative spirit with a beautiful inner world! Your artistic nature and kindness touch everyone around you.",
    traits: ["Artistic", "Gentle", "Flexible", "Caring"],
    percentage: "9%",
    famous: ["Bob Ross", "Audrey Hepburn", "Johnny Depp"],
    strengths: ["Creativity", "Empathy", "Adaptability"],
    careers: ["Artist", "Designer", "Musician", "Counselor"],
  },
  ESTP: {
    name: "The Energetic Entertainer 🎪",
    description:
      "You're a spontaneous thrill-seeker who lives life to the fullest! Your energy and charisma light up every room.",
    traits: ["Energetic", "Spontaneous", "Charismatic", "Practical"],
    percentage: "4%",
    famous: ["Donald Trump", "Madonna", "Eddie Murphy"],
    strengths: ["Adaptability", "People skills", "Energy"],
    careers: ["Salesperson", "Entertainer", "Entrepreneur", "Athlete"],
  },
  ESFP: {
    name: "The Joyful Performer 🎭",
    description:
      "You're a fun-loving entertainer who spreads joy wherever you go! Your enthusiasm and warmth make life a celebration.",
    traits: ["Enthusiastic", "Fun-loving", "Spontaneous", "People-focused"],
    percentage: "7%",
    famous: ["Will Smith", "Marilyn Monroe", "Robin Williams"],
    strengths: ["Enthusiasm", "People skills", "Creativity"],
    careers: ["Performer", "Teacher", "Social Worker", "Event Planner"],
  },
  INTP: {
    name: "The Brilliant Thinker 🧠",
    description:
      "You're a logical genius who loves exploring ideas and theories! Your analytical mind sees possibilities others can't imagine.",
    traits: ["Logical", "Independent", "Curious", "Innovative"],
    percentage: "3%",
    famous: ["Albert Einstein", "Bill Gates", "Marie Curie"],
    strengths: ["Logical thinking", "Innovation", "Independence"],
    careers: ["Scientist", "Programmer", "Researcher", "Philosopher"],
  },
  INFP: {
    name: "The Dreamy Idealist 🌙",
    description:
      "You're a passionate dreamer with deep values and creativity! Your authentic spirit and imagination inspire beautiful things.",
    traits: ["Idealistic", "Creative", "Passionate", "Authentic"],
    percentage: "4%",
    famous: ["Shakespeare", "Johnny Depp", "J.K. Rowling"],
    strengths: ["Creativity", "Empathy", "Authenticity"],
    careers: ["Writer", "Artist", "Counselor", "Musician"],
  },
  ENTP: {
    name: "The Innovative Debater 💡",
    description:
      "You're a quick-witted innovator who loves exploring new possibilities! Your creativity and debate skills make you fascinating.",
    traits: ["Innovative", "Quick-witted", "Enthusiastic", "Independent"],
    percentage: "3%",
    famous: ["Mark Twain", "Robert Downey Jr.", "Leonardo da Vinci"],
    strengths: ["Innovation", "Quick thinking", "Enthusiasm"],
    careers: ["Entrepreneur", "Inventor", "Consultant", "Journalist"],
  },
  ENFP: {
    name: "The Enthusiastic Campaigner 🎈",
    description:
      "You're an inspiring free spirit who sees potential everywhere! Your enthusiasm and creativity make everything more exciting.",
    traits: ["Enthusiastic", "Creative", "Inspiring", "Flexible"],
    percentage: "7%",
    famous: ["Robin Williams", "Ellen DeGeneres", "Walt Disney"],
    strengths: ["Enthusiasm", "Creativity", "People skills"],
    careers: ["Counselor", "Teacher", "Artist", "Entrepreneur"],
  },
}

export default function PersonalityTest() {
  // const { language, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 })

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

    // Calculate scores
    const newScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
    newAnswers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== undefined && questions[questionIndex]) {
        const option = questions[questionIndex].options[answerIndex]
        Object.entries(option.score).forEach(([key, value]) => {
          newScores[key as keyof typeof newScores] += value
        })
      }
    })
    setScores(newScores)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setShowResult(true), 500)
    }
  }

  const handleRatingSubmit = (rating: number, comment: string) => {
    console.log("Rating submitted:", { rating, comment, testType: "personality" })
  }

  const handleShare = (platform: string) => {
    console.log("Shared on:", platform)
  }

  const getPersonalityType = () => {
    const type =
      (scores.E > scores.I ? "E" : "I") +
      (scores.S > scores.N ? "S" : "N") +
      (scores.T > scores.F ? "T" : "F") +
      (scores.J > scores.P ? "J" : "P")

    return personalityTypes[type as keyof typeof personalityTypes] || personalityTypes.INTJ
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setShowRating(false)
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 })
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResult) {
    const result = getPersonalityType()
    const personalityTypeCode =
      (scores.E > scores.I ? "E" : "I") +
      (scores.S > scores.N ? "S" : "N") +
      (scores.T > scores.F ? "T" : "F") +
      (scores.J > scores.P ? "J" : "P")

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
              <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 p-6">
                <CardHeader className="text-center pb-2">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <CardTitle className="text-3xl">Your Personality Revealed!</CardTitle>
                    <Sparkles className="w-8 h-8 text-purple-500" />
                  </div>
                  <CardDescription className="text-2xl font-bold text-primary">{result.name}</CardDescription>
                </CardHeader>
              </div>

              <CardContent className="space-y-8 p-8">
                <div className="text-center">
                  <div className="text-8xl font-bold text-primary mb-4 animate-pulse">{personalityTypeCode}</div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{result.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">Only {result.percentage} of people share your type!</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      Your Superpowers
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-primary rounded-full text-sm font-medium border border-primary/20"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Famous People Like You:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.famous.map((person, index) => (
                          <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Your Personality Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span>Energy Source</span>
                        <span className="font-semibold text-primary">
                          {scores.E > scores.I ? `Extrovert (${scores.E})` : `Introvert (${scores.I})`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span>Information Processing</span>
                        <span className="font-semibold text-primary">
                          {scores.S > scores.N ? `Sensing (${scores.S})` : `Intuitive (${scores.N})`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span>Decision Making</span>
                        <span className="font-semibold text-primary">
                          {scores.T > scores.F ? `Thinking (${scores.T})` : `Feeling (${scores.F})`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span>Lifestyle</span>
                        <span className="font-semibold text-primary">
                          {scores.J > scores.P ? `Judging (${scores.J})` : `Perceiving (${scores.P})`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Perfect Career Matches</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.careers.map((career, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Button onClick={resetTest} variant="outline" className="gap-2 bg-transparent">
                    <RotateCcw className="w-4 h-4" />
                    Take Again
                  </Button>
                  <ShareResult
                    testName="MBTI Personality Test"
                    testResult={`${personalityTypeCode} - ${result.name}`}
                    testScore={Math.round(
                      ((scores.E + scores.I + scores.S + scores.N + scores.T + scores.F + scores.J + scores.P) / 20) *
                      100,
                    )}
                    testAccuracy="96%"
                    personalityType={personalityTypeCode}
                    testCategory="Personality Assessment"
                    resultDescription={result.description}
                    onShare={handleShare}
                  />
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download Report
                  </Button>
                  <Button asChild>
                    <Link href="/tests">Explore More Tests</Link>
                  </Button>
                </div>

                <div className="text-center">
                  <Button variant="ghost" onClick={() => setShowRating(!showRating)} className="text-primary gap-2">
                    <Heart className="w-4 h-4" />
                    {showRating ? "Hide Reviews" : "Rate This Test"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showRating && (
              <RatingSystem
                testType="personality"
                testName="MBTI Personality Test"
                onRatingSubmit={handleRatingSubmit}
              />
            )}
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
            <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 p-6">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                    MBTI Personality Discovery
                  </CardTitle>
                  <span className="text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full">
                    {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <Progress value={progress} className="w-full h-3" />
              </CardHeader>
            </div>

            <CardContent className="space-y-8 p-8">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">{questions[currentQuestion].emoji}</div>
                <h2 className="text-2xl font-bold mb-8">{questions[currentQuestion].text}</h2>
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left p-6 h-auto bg-transparent hover:text-primary hover:bg-primary/5 hover:border-primary/50  transition-all duration-300 group"
                      onClick={() => handleAnswer(index)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {option.emoji}
                        </span>
                        <span className="text-lg">{option.text}</span>
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
