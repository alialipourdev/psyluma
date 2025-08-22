"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  Heart,
  Users,
  Smile,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Download,
  Share2,
  Star,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Trophy,
  Target,
  Activity,
  Zap,
  Crown,
  Flame,
  Sparkles,
  Rocket,
  Shield,
  Gem,
  CloudLightningIcon as Lightning,
  Swords,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <DashboardPageSkeleton />
  }

  return <DashboardPageContent />
}

function DashboardPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="animate-pulse">
        <section className="bg-primary py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-8 bg-muted rounded mb-4 max-w-md"></div>
            <div className="h-4 bg-muted rounded max-w-lg"></div>
          </div>
        </section>
      </div>
    </div>
  )
}

function DashboardPageContent() {
  const { t } = useLanguage()
  const mockUser = {
    name: "Psychology Explorer",
    email: "user@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: new Date().toISOString(),
  }
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: "",
    location: "",
    bio: "",
    birthDate: "",
    occupation: "",
  })

  const [currentStreak, setCurrentStreak] = useState(7)
  const [totalXP, setTotalXP] = useState(2450)
  const [currentLevel, setCurrentLevel] = useState(8)
  const [nextLevelXP, setNextLevelXP] = useState(2800)

  const completedTests = [
    {
      id: "1",
      name: "MBTI Personality Test",
      category: "Personality Assessment",
      result: "ENFP - The Campaigner",
      date: "2024/01/05",
      score: 94,
      icon: Users,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      accuracy: "95%",
      timeSpent: "12 minutes",
      xpEarned: 150,
      streak: 3,
    },
    {
      id: "2",
      name: "IQ Brain Challenge",
      category: "Intelligence Test",
      result: "IQ: 125 - Above Average",
      date: "2023/12/31",
      score: 88,
      icon: Brain,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      accuracy: "92%",
      timeSpent: "25 minutes",
      xpEarned: 200,
      streak: 2,
    },
    {
      id: "3",
      name: "Emotional Intelligence Assessment",
      category: "Emotional Test",
      result: "EQ: 118 - High Emotional Intelligence",
      date: "2023/12/26",
      score: 92,
      icon: Heart,
      color: "bg-gradient-to-r from-red-500 to-pink-500",
      accuracy: "89%",
      timeSpent: "18 minutes",
      xpEarned: 175,
      streak: 1,
    },
    {
      id: "4",
      name: "What Animal Are You?",
      category: "Fun Test",
      result: "Lion - Natural Leader",
      date: "2023/12/19",
      score: 85,
      icon: Smile,
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      accuracy: "87%",
      timeSpent: "8 minutes",
      xpEarned: 100,
      streak: 0,
    },
    {
      id: "5",
      name: "Anxiety Assessment",
      category: "Mental Health",
      result: "Low Anxiety Level - Excellent!",
      date: "2023/12/11",
      score: 78,
      icon: Heart,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      accuracy: "91%",
      timeSpent: "10 minutes",
      xpEarned: 125,
      streak: 0,
    },
  ]

  const stats = [
    { title: "Tests Completed", value: completedTests.length.toString(), icon: Award, color: "text-green-600" },
    { title: "Average Score", value: "89%", icon: TrendingUp, color: "text-blue-600" },
    { title: "Current Streak", value: `${currentStreak} days`, icon: Flame, color: "text-orange-600" },
    { title: "Total XP", value: totalXP.toLocaleString(), icon: Star, color: "text-purple-600" },
  ]

  const achievements = [
    {
      title: "First Steps",
      description: "Completed your first psychology test",
      icon: Trophy,
      earned: true,
      date: "2023/12/11",
      xpReward: 50,
      rarity: "common",
      category: "Milestone",
    },
    {
      title: "Personality Explorer",
      description: "Completed 5 personality tests",
      icon: Users,
      earned: true,
      date: "2024/01/05",
      xpReward: 200,
      rarity: "rare",
      category: "Specialist",
    },
    {
      title: "Genius Mind",
      description: "Scored above 90% in intelligence tests",
      icon: Brain,
      earned: false,
      progress: 75,
      xpReward: 300,
      rarity: "epic",
      category: "Excellence",
    },
    {
      title: "Streak Master",
      description: "Maintained a 7-day testing streak",
      icon: Flame,
      earned: true,
      date: "2024/01/12",
      xpReward: 150,
      rarity: "rare",
      category: "Consistency",
    },
    {
      title: "Speed Demon",
      description: "Complete a test in under 5 minutes",
      icon: Lightning,
      earned: false,
      progress: 60,
      xpReward: 100,
      rarity: "uncommon",
      category: "Speed",
    },
    {
      title: "Perfect Score",
      description: "Achieve 100% accuracy on any test",
      icon: Crown,
      earned: false,
      progress: 94,
      xpReward: 500,
      rarity: "legendary",
      category: "Perfection",
    },
    {
      title: "Social Butterfly",
      description: "Share 10 test results with friends",
      icon: Share2,
      earned: false,
      progress: 30,
      xpReward: 75,
      rarity: "common",
      category: "Social",
    },
    {
      title: "Knowledge Seeker",
      description: "Complete tests in all 4 categories",
      icon: Gem,
      earned: true,
      date: "2024/01/05",
      xpReward: 250,
      rarity: "epic",
      category: "Completionist",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Alex Chen", xp: 4250, level: 12, avatar: "AC", streak: 15, badge: "🏆" },
    { rank: 2, name: "Sarah Johnson", xp: 3890, level: 11, avatar: "SJ", streak: 12, badge: "🥈" },
    { rank: 3, name: "Mike Rodriguez", xp: 3650, level: 10, avatar: "MR", streak: 8, badge: "🥉" },
    { rank: 4, name: "Emma Wilson", xp: 3200, level: 9, avatar: "EW", streak: 6, badge: "⭐" },
    {
      rank: 5,
      name: "You",
      xp: totalXP,
      level: currentLevel,
      avatar: mockUser.name.charAt(0),
      streak: currentStreak,
      badge: "🔥",
      isCurrentUser: true,
    },
    { rank: 6, name: "David Kim", xp: 2100, level: 7, avatar: "DK", streak: 4, badge: "" },
    { rank: 7, name: "Lisa Zhang", xp: 1950, level: 6, avatar: "LZ", streak: 3, badge: "" },
  ]

  const dailyChallenges = [
    {
      id: 1,
      title: "Quick Thinker",
      description: "Complete any test in under 10 minutes",
      progress: 0,
      target: 1,
      xpReward: 50,
      icon: Lightning,
      difficulty: "Easy",
      timeLeft: "23h 45m",
    },
    {
      id: 2,
      title: "High Scorer",
      description: "Score above 85% on any test",
      progress: 0,
      target: 1,
      xpReward: 75,
      icon: Target,
      difficulty: "Medium",
      timeLeft: "23h 45m",
    },
    {
      id: 3,
      title: "Social Sharer",
      description: "Share a test result with friends",
      progress: 0,
      target: 1,
      xpReward: 25,
      icon: Share2,
      difficulty: "Easy",
      timeLeft: "23h 45m",
    },
  ]

  const recommendations = [
    {
      title: "Enneagram Personality Test",
      description: "Based on your MBTI results, this test can provide deeper insights into your motivations",
      category: "Personality Assessment",
      duration: "12 minutes",
      match: "95%",
      reason: "Perfect match for ENFP personality",
      xpReward: 150,
      difficulty: "Medium",
    },
    {
      title: "Creative Thinking Challenge",
      description: "Perfect for ENFP personalities who love innovative problem-solving",
      category: "Intelligence Test",
      duration: "20 minutes",
      match: "88%",
      reason: "Enhances your natural strengths",
      xpReward: 200,
      difficulty: "Hard",
    },
    {
      title: "Stress Management Assessment",
      description: "Learn techniques to manage stress and maintain peak performance",
      category: "Mental Health",
      duration: "15 minutes",
      match: "82%",
      reason: "Improve mental wellness",
      xpReward: 125,
      difficulty: "Easy",
    },
  ]

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData)
    setIsEditingProfile(false)
  }

  const handleCancelEdit = () => {
    setProfileData({
      name: mockUser.name,
      email: mockUser.email,
      phone: "",
      location: "",
      bio: "",
      birthDate: "",
      occupation: "",
    })
    setIsEditingProfile(false)
  }

  const levelProgress = ((totalXP - (currentLevel - 1) * 350) / 350) * 100

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 bg-gray-100"
      case "uncommon":
        return "text-green-600 bg-green-100"
      case "rare":
        return "text-blue-600 bg-blue-100"
      case "epic":
        return "text-purple-600 bg-purple-100"
      case "legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Enhanced Header with Gamification */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white/20">
                  <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {mockUser.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  Welcome back, {mockUser.name}!
                  {currentStreak >= 7 && <Flame className="w-6 h-6 text-orange-400 animate-pulse" />}
                </h1>
                <p className="text-white/80 mb-3">Ready to unlock your mind's potential today?</p>
                <div className="flex items-center gap-6 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Member since: {new Date(mockUser.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>{completedTests.length} tests completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    <span>{currentStreak} day streak!</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">Level {currentLevel}</span>
              </div>
              <Progress value={levelProgress} className="w-32 mb-2 bg-white/20" />
              <div className="text-sm text-white/70">
                {totalXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
              </div>
              <div className="text-xs text-white/60 mt-1">{nextLevelXP - totalXP} XP to next level</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                          index === 0
                            ? "from-green-400 to-emerald-500"
                            : index === 1
                              ? "from-blue-400 to-cyan-500"
                              : index === 2
                                ? "from-orange-400 to-red-500"
                                : "from-purple-400 to-pink-500"
                        } flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tests">My Tests</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Daily Challenges */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-orange-500" />
                        Daily Challenges
                      </CardTitle>
                      <CardDescription>Complete challenges to earn bonus XP!</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dailyChallenges.map((challenge) => {
                          const IconComponent = challenge.icon
                          return (
                            <div
                              key={challenge.id}
                              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border"
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${
                                    challenge.difficulty === "Easy"
                                      ? "from-green-400 to-emerald-500"
                                      : challenge.difficulty === "Medium"
                                        ? "from-yellow-400 to-orange-500"
                                        : "from-red-400 to-pink-500"
                                  } flex items-center justify-center`}
                                >
                                  <IconComponent className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold">{challenge.title}</h4>
                                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {challenge.difficulty}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{challenge.xpReward} XP</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">
                                  {challenge.progress}/{challenge.target}
                                </div>
                                <div className="text-xs text-muted-foreground">{challenge.timeLeft} left</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {completedTests.slice(0, 3).map((test, index) => {
                          const IconComponent = test.icon
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg"
                            >
                              <div className={`w-10 h-10 ${test.color} rounded-lg flex items-center justify-center`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{test.name}</h4>
                                <p className="text-sm text-muted-foreground">{test.result}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-green-600">+{test.xpEarned} XP</div>
                                <div className="text-xs text-muted-foreground">{test.date}</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Quick Stats */}
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        Your Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600 mb-1">{totalXP.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Total Experience Points</div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Current Level</span>
                            <span className="font-semibold">{currentLevel}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Tests Completed</span>
                            <span className="font-semibold">{completedTests.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Current Streak</span>
                            <span className="font-semibold flex items-center gap-1">
                              <Flame className="w-3 h-3 text-orange-500" />
                              {currentStreak} days
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Achievements</span>
                            <span className="font-semibold">
                              {achievements.filter((a) => a.earned).length}/{achievements.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommended Tests */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-blue-500" />
                        Recommended for You
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recommendations.slice(0, 2).map((rec, index) => (
                          <div
                            key={index}
                            className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
                          >
                            <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                +{rec.xpReward} XP
                              </Badge>
                              <Button size="sm" className="h-6 text-xs">
                                Start Test
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tests" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Completed Tests</h2>
                <Link href="/tests">
                  <Button className="gap-2">
                    <Zap className="w-4 h-4" />
                    Take New Test
                  </Button>
                </Link>
              </div>
              <div className="grid gap-6">
                {completedTests.map((test, index) => {
                  const IconComponent = test.icon
                  return (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${test.color} rounded-xl flex items-center justify-center`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">{test.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <Badge variant="secondary">{test.category}</Badge>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{test.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{test.timeSpent}</span>
                                </div>
                                {test.streak > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Flame className="w-4 h-4 text-orange-500" />
                                    <span>{test.streak} streak</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-foreground mb-1">{test.result}</div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Score: {test.score}% • Accuracy: {test.accuracy}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-green-100 text-green-800 text-xs">+{test.xpEarned} XP</Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Achievements & Badges</h2>
                <p className="text-muted-foreground mb-6">
                  Unlock achievements by completing tests and reaching milestones!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  return (
                    <Card
                      key={index}
                      className={`border-0 shadow-lg transition-all duration-300 ${
                        achievement.earned
                          ? "bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 border-2 border-yellow-200 hover:shadow-xl"
                          : "hover:shadow-md"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              achievement.earned
                                ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-white shadow-lg animate-pulse"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-foreground">{achievement.title}</h3>
                              <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="text-xs">
                                {achievement.category}
                              </Badge>
                              <Badge className="bg-purple-100 text-purple-800 text-xs">
                                +{achievement.xpReward} XP
                              </Badge>
                            </div>
                            {achievement.earned ? (
                              <Badge className="bg-green-100 text-green-800 mt-2">Earned on {achievement.date}</Badge>
                            ) : (
                              <div className="mt-3">
                                <Progress value={achievement.progress} className="h-2 mb-1" />
                                <span className="text-xs text-muted-foreground">{achievement.progress}% complete</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Global Leaderboard</h2>
                <p className="text-muted-foreground mb-6">
                  See how you rank against other psychology test enthusiasts worldwide!
                </p>
              </div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {leaderboard.map((player, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                          player.isCurrentUser
                            ? "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200"
                            : "bg-gradient-to-r from-gray-50 to-white hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                player.rank === 1
                                  ? "bg-yellow-400 text-white"
                                  : player.rank === 2
                                    ? "bg-gray-300 text-gray-700"
                                    : player.rank === 3
                                      ? "bg-orange-400 text-white"
                                      : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {player.rank}
                            </div>
                            <span className="text-2xl">{player.badge}</span>
                          </div>
                          <Avatar className="w-12 h-12">
                            <AvatarFallback
                              className={`${
                                player.isCurrentUser ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : ""
                              }`}
                            >
                              {player.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className={`font-semibold ${player.isCurrentUser ? "text-purple-700" : ""}`}>
                              {player.name}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>Level {player.level}</span>
                              <div className="flex items-center gap-1">
                                <Flame className="w-3 h-3 text-orange-500" />
                                <span>{player.streak} streak</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{player.xp.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">XP</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Daily & Weekly Challenges</h2>
                <p className="text-muted-foreground mb-6">
                  Complete challenges to earn bonus XP and unlock special rewards!
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-500" />
                      Daily Challenges
                    </CardTitle>
                    <CardDescription>Reset every 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dailyChallenges.map((challenge) => {
                        const IconComponent = challenge.icon
                        return (
                          <div
                            key={challenge.id}
                            className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${
                                  challenge.difficulty === "Easy"
                                    ? "from-green-400 to-emerald-500"
                                    : challenge.difficulty === "Medium"
                                      ? "from-yellow-400 to-orange-500"
                                      : "from-red-400 to-pink-500"
                                } flex items-center justify-center`}
                              >
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold">{challenge.title}</h4>
                                <p className="text-sm text-muted-foreground">{challenge.description}</p>
                              </div>
                              <Badge className="bg-orange-100 text-orange-800">+{challenge.xpReward} XP</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex-1 mr-4">
                                <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                                <div className="text-xs text-muted-foreground mt-1">
                                  {challenge.progress}/{challenge.target} completed
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground">{challenge.timeLeft} left</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Swords className="w-5 h-5 text-purple-500" />
                      Weekly Challenges
                    </CardTitle>
                    <CardDescription>Reset every Monday</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">Test Master</h4>
                            <p className="text-sm text-muted-foreground">Complete 5 tests this week</p>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800">+500 XP</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <Progress value={60} className="h-2" />
                            <div className="text-xs text-muted-foreground mt-1">3/5 completed</div>
                          </div>
                          <div className="text-xs text-muted-foreground">4 days left</div>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">Consistency Champion</h4>
                            <p className="text-sm text-muted-foreground">Maintain your streak for 7 days</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">+300 XP</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <Progress value={100} className="h-2" />
                            <div className="text-xs text-green-600 mt-1 font-medium">Completed! ✓</div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 text-xs">Claimed</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                    {!isEditingProfile ? (
                      <Button variant="outline" onClick={() => setIsEditingProfile(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        {isEditingProfile ? (
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{profileData.name || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        {isEditingProfile ? (
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{profileData.email || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditingProfile ? (
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{profileData.phone || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        {isEditingProfile ? (
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{profileData.location || "Not provided"}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="birthDate">Birth Date</Label>
                        {isEditingProfile ? (
                          <Input
                            id="birthDate"
                            type="date"
                            value={profileData.birthDate}
                            onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{profileData.birthDate || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="occupation">Occupation</Label>
                        {isEditingProfile ? (
                          <Input
                            id="occupation"
                            value={profileData.occupation}
                            onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <Settings className="w-4 h-4 text-muted-foreground" />
                            <span>{profileData.occupation || "Not provided"}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="bio">About Me</Label>
                        {isEditingProfile ? (
                          <Textarea
                            id="bio"
                            rows={3}
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            placeholder="Tell us about yourself..."
                          />
                        ) : (
                          <div className="mt-1">
                            <p className="text-sm text-muted-foreground">{profileData.bio || "Nothing written yet"}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive updates and new test recommendations</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Privacy Settings</h4>
                        <p className="text-sm text-muted-foreground">Manage visibility of personal information</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Settings
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-muted-foreground">Update your account password</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
