"use client"

import { Navigation } from "../../components/navigation"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import Link from "next/link"
import { Brain, Heart, Users, Smile, Clock, Star, Search, Filter, X, Play, Award, TrendingUp } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"
import { useEffect, useState } from "react"

export default function TestsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <TestsPageSkeleton />
  }

  return <TestsPageContent />
}

function TestsPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="animate-pulse">
        <section className="bg-gradient-to-br from-primary via-accent to-primary/90 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              <div className="h-16 bg-white/20 rounded-2xl mb-8 max-w-2xl mx-auto"></div>
              <div className="h-8 bg-white/20 rounded-xl mb-12 max-w-3xl mx-auto"></div>
              <div className="h-14 bg-white/20 rounded-full max-w-md mx-auto"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function TestsPageContent() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [filteredTests, setFilteredTests] = useState<any[]>([])

  const testCategories = [
    {
      id: "personality",
      title: "Personality Tests",
      description: "Discover your unique personality traits and characteristics",
      icon: Users,
      color: "from-primary to-primary/80",
      count: 15,
      tests: [
        {
          name: "MBTI Personality Test",
          nameEn: "MBTI Personality Test",
          description: "Discover your personality type based on global standards",
          descriptionEn: "Discover your personality type based on global standards",
          duration: "15",
          questions: 60,
          rating: 4.9,
          popular: true,
          category: "personality",
          completions: "250K+",
        },
        {
          name: "Enneagram Test",
          nameEn: "Enneagram Test",
          description: "Discover the 9 Enneagram personality types",
          descriptionEn: "Discover the 9 Enneagram personality types",
          duration: "12",
          questions: 45,
          rating: 4.8,
          category: "personality",
          completions: "180K+",
        },
        {
          name: "Big Five Test",
          nameEn: "Big Five Test",
          description: "Assess the 5 main dimensions of personality",
          descriptionEn: "Assess the 5 main dimensions of personality",
          duration: "10",
          questions: 40,
          rating: 4.7,
          category: "personality",
          completions: "120K+",
        },
      ],
    },
    {
      id: "intelligence",
      title: "Intelligence Tests",
      description: "Measure your cognitive abilities and mental performance",
      icon: Brain,
      color: "from-accent to-accent/80",
      count: 12,
      tests: [
        {
          name: "Standard IQ Test",
          nameEn: "Standard IQ Test",
          description: "Accurate assessment of intelligence quotient",
          descriptionEn: "Accurate assessment of intelligence quotient",
          duration: "30",
          questions: 40,
          rating: 4.9,
          popular: true,
          category: "intelligence",
          completions: "300K+",
        },
        {
          name: "Emotional Intelligence Test",
          nameEn: "Emotional Intelligence Test",
          description: "Assess ability to understand and manage emotions",
          descriptionEn: "Assess ability to understand and manage emotions",
          duration: "15",
          questions: 35,
          rating: 4.8,
          category: "intelligence",
          completions: "150K+",
        },
        {
          name: "Creativity Test",
          nameEn: "Creativity Test",
          description: "Assess creative thinking and innovation power",
          descriptionEn: "Assess creative thinking and innovation power",
          duration: "20",
          questions: 30,
          rating: 4.6,
          category: "intelligence",
          completions: "90K+",
        },
      ],
    },
    {
      id: "emotional",
      title: "Emotional Tests",
      description: "Understand your emotional patterns and mental health",
      icon: Heart,
      color: "from-primary/80 to-primary/60",
      count: 8,
      tests: [
        {
          name: "Anxiety Test",
          nameEn: "Anxiety Test",
          description: "Assess anxiety and stress levels",
          descriptionEn: "Assess anxiety and stress levels",
          duration: "8",
          questions: 25,
          rating: 4.7,
          category: "emotional",
          completions: "200K+",
        },
        {
          name: "Depression Test",
          nameEn: "Depression Test",
          description: "Examine depression symptoms",
          descriptionEn: "Examine depression symptoms",
          duration: "10",
          questions: 30,
          rating: 4.8,
          category: "emotional",
          completions: "175K+",
        },
        {
          name: "Self-Confidence Test",
          nameEn: "Self-Confidence Test",
          description: "Assess level of self-confidence",
          descriptionEn: "Assess level of self-confidence",
          duration: "12",
          questions: 28,
          rating: 4.6,
          category: "emotional",
          completions: "110K+",
        },
      ],
    },
    {
      id: "fun",
      title: "Relationship Tests",
      description: "Explore your social connections and relationships",
      icon: Smile,
      color: "from-accent/80 to-accent/60",
      count: 20,
      tests: [
        {
          name: "Relationship Health Test",
          nameEn: "Relationship Health Test",
          description: "Assess the quality of your relationships",
          descriptionEn: "Assess the quality of your relationships",
          duration: "12",
          questions: 25,
          rating: 4.5,
          popular: true,
          category: "fun",
          completions: "85K+",
        },
        {
          name: "Love Language Test",
          nameEn: "Love Language Test",
          description: "Discover how you express and receive love",
          descriptionEn: "Discover how you express and receive love",
          duration: "8",
          questions: 20,
          rating: 4.7,
          category: "fun",
          completions: "160K+",
        },
        {
          name: "Communication Style Test",
          nameEn: "Communication Style Test",
          description: "Understand your communication patterns",
          descriptionEn: "Understand your communication patterns",
          duration: "10",
          questions: 22,
          rating: 4.6,
          category: "fun",
          completions: "95K+",
        },
      ],
    },
  ]

  useEffect(() => {
    let allTests: any[] = []

    testCategories.forEach((category) => {
      category.tests.forEach((test) => {
        allTests.push({
          ...test,
          categoryId: category.id,
          categoryTitle: category.title,
          categoryColor: category.color,
        })
      })
    })

    // Filter by search query
    if (searchQuery) {
      allTests = allTests.filter(
        (test) =>
          test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      allTests = allTests.filter((test) => test.category === selectedCategory)
    }

    // Sort tests
    switch (sortBy) {
      case "popular":
        allTests.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
        break
      case "rating":
        allTests.sort((a, b) => b.rating - a.rating)
        break
      case "duration":
        allTests.sort((a, b) => Number.parseInt(a.duration) - Number.parseInt(b.duration))
        break
      case "questions":
        allTests.sort((a, b) => a.questions - b.questions)
        break
    }

    setFilteredTests(allTests)
  }, [searchQuery, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("popular")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="bg-gradient-to-br from-primary via-accent to-primary/90 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1200&width=1600')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center text-primary-foreground">
            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              Psychology Tests
              <span className="block text-5xl md:text-6xl text-primary-foreground/90">Collection</span>
            </h1>
            <p className="text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive collection of scientifically-backed psychology tests designed to help you
              understand yourself better.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <Input
                placeholder="Search for personality, IQ, anxiety tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 pr-6 py-4 text-lg bg-background/95 backdrop-blur-sm border-0 rounded-full shadow-2xl focus:shadow-3xl transition-all"
              />
            </div>

            <div className="flex items-center justify-center gap-8 mt-12 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-medium">50+ Tests Available</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">1M+ Tests Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">4.8 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-lg font-semibold text-card-foreground">Filters:</span>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-56 h-12 rounded-full border-2 border-border bg-card shadow-sm">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="personality">Personality Tests</SelectItem>
                <SelectItem value="intelligence">Intelligence Tests</SelectItem>
                <SelectItem value="emotional">Emotional Tests</SelectItem>
                <SelectItem value="fun">Relationship Tests</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-56 h-12 rounded-full border-2 border-border bg-card shadow-sm">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="duration">Shortest Time</SelectItem>
                <SelectItem value="questions">Fewest Questions</SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery || selectedCategory !== "all" || sortBy !== "popular") && (
              <Button
                variant="outline"
                size="lg"
                onClick={clearFilters}
                className="rounded-full border-2 border-border hover:border-primary bg-transparent"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="font-medium">Showing {filteredTests.length} tests</span>
            {searchQuery && (
              <span>
                • Searching for: <span className="font-semibold text-primary">"{searchQuery}"</span>
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-muted/20 to-muted/40">
        <div className="max-w-7xl mx-auto px-6">
          {filteredTests.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-6">No Tests Found</h3>
              <p className="text-xl text-muted-foreground mb-10 max-w-md mx-auto">
                Try adjusting your search criteria or browse all available tests.
              </p>
              <Button size="lg" onClick={clearFilters} className="rounded-full px-8 py-3">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTests.map((test, index) => (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card overflow-hidden group"
                >
                  <CardHeader className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                            {test.name}
                          </CardTitle>
                          {test.popular && (
                            <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-muted-foreground leading-relaxed text-base mb-4">
                          {test.description}
                        </CardDescription>
                        <Badge
                          variant="outline"
                          className="bg-gradient-to-r from-muted to-muted/80 border-border text-muted-foreground font-medium"
                        >
                          {test.categoryTitle}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{test.duration} minutes</span>
                        </div>
                        <span className="text-muted-foreground font-medium">{test.questions} questions</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-card-foreground">{test.rating}</span>
                          <span className="text-muted-foreground text-sm">rating</span>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">{test.completions} completed</span>
                      </div>
                    </div>
                    <Link href={`/tests/${test.categoryId}`}>
                      <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
                        <Play className="w-4 h-4 mr-2" />
                        Start Test Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black text-primary-foreground mb-8 leading-tight">
            Can't Find the Perfect Test?
          </h2>
          <p className="text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're constantly adding new psychology tests based on the latest research. Let us know what you're looking
            for!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/help">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 text-xl px-12 py-4 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all"
              >
                Request New Test
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-12 py-4 rounded-full border-background/30 text-primary-foreground hover:bg-background/10 bg-transparent font-bold"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
