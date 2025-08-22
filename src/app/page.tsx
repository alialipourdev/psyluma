"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import Link from "next/link"
import { Brain, Heart, Users, Play, Star, CheckCircle, Zap, Shield, Smile, BarChart3, Award, Clock } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { useEffect, useState } from "react"
import { Navigation } from "../components/navigation"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <HomePageSkeleton />
  }

  return <HomePageContent />
}

function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="animate-pulse">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/30"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="h-8 bg-muted rounded-full mb-8"></div>
                <div className="h-20 bg-muted rounded-lg mb-8"></div>
                <div className="h-6 bg-muted rounded mb-10"></div>
                <div className="flex gap-6">
                  <div className="h-14 w-40 bg-muted rounded-full"></div>
                  <div className="h-14 w-40 bg-muted rounded-full"></div>
                </div>
              </div>
              <div className="h-96 bg-muted rounded-2xl"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function HomePageContent() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Brain,
      title: "Scientific Tests",
      description: "Evidence-based psychological assessments developed by experts",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get detailed insights about your personality immediately",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is secure and never shared with third parties",
    },
  ]

  const stats = [
    { number: "250K+", label: "Active Users" },
    { number: "50+", label: "Test Types" },
    { number: "99%", label: "Accuracy" },
    { number: "4.9", label: "User Rating" },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Psychologist",
      content:
        "The best platform for personality assessment I've ever seen. The results are very accurate and practical.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "HR Manager",
      content: "We use these tests for recruitment. It really helps us a lot in finding the right candidates.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Student",
      content:
        "It has entertaining tests that are also very useful. I recommend it to everyone interested in psychology.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary/90">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1200&width=1600')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-background/10 backdrop-blur-md text-primary-foreground px-6 py-3 rounded-full text-sm font-medium border border-background/20">
                <Star className="w-4 h-4 fill-current" />
                Trusted by 250,000+ users worldwide
              </div>

              <h1 className="text-6xl lg:text-7xl font-black text-primary-foreground leading-tight">
                Discover Your
                <span className="block text-primary-foreground/90 bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                  True Self
                </span>
              </h1>

              <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-lg">
                Take scientifically-backed psychology tests and unlock deep insights about your personality,
                intelligence, and emotional well-being.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/tests">
                  <Button
                    size="lg"
                    className="bg-background text-primary hover:bg-background/90 text-lg px-10 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Free Test
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-4 rounded-full border-background/30 text-primary-foreground hover:bg-background/10 bg-transparent font-semibold"
                >
                  View Sample Results
                </Button>
              </div>

              <div className="flex items-center gap-3 text-primary-foreground/80">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">100% Free • No Registration Required</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-background/20 to-background/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-background/10 backdrop-blur-xl rounded-3xl p-8 border border-background/20 shadow-2xl">
                <div className="bg-card rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-card-foreground">MBTI Personality Test</h3>
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground font-medium">Personality Type:</span>
                      <span className="font-bold text-card-foreground">ENFP - The Campaigner</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                      <span className="text-muted-foreground font-medium">Accuracy Score:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="w-[94%] h-full bg-primary rounded-full"></div>
                        </div>
                        <span className="font-bold text-card-foreground">94%</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                      <div className="flex items-center gap-3 mb-4">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-card-foreground">Key Personality Traits</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { trait: "Creative", strength: 92 },
                          { trait: "Social", strength: 88 },
                          { trait: "Energetic", strength: 85 },
                          { trait: "Flexible", strength: 79 },
                        ].map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-muted-foreground">{item.trait}</span>
                              <span className="text-xs text-muted-foreground/70">{item.strength}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                                style={{ width: `${item.strength}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-muted/30 to-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className="text-5xl font-black text-primary mb-3">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-foreground mb-6">Why Choose Psyluma?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the most advanced psychology testing platform with cutting-edge features designed for accuracy
              and user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30"
                >
                  <CardHeader className="text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-4">{feature.title}</CardTitle>
                    <CardDescription className="text-lg leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-muted/20 to-muted/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-foreground mb-6">Explore Test Categories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive collection of scientifically-validated psychological assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {[
              {
                icon: Users,
                title: "Personality Tests",
                count: "15 Tests Available",
                color: "from-primary to-primary/80",
                link: "/tests/personality",
                description: "Discover your unique personality traits",
              },
              {
                icon: Brain,
                title: "Intelligence Tests",
                count: "12 Tests Available",
                color: "from-accent to-accent/80",
                link: "/tests/intelligence",
                description: "Measure your cognitive abilities",
              },
              {
                icon: Heart,
                title: "Emotional Tests",
                count: "8 Tests Available",
                color: "from-primary/80 to-primary/60",
                link: "/tests/anxiety",
                description: "Understand your emotional patterns",
              },
              {
                icon: Smile,
                title: "Relationship Tests",
                count: "10 Tests Available",
                color: "from-accent/80 to-accent/60",
                link: "/tests/relationship",
                description: "Explore your social connections",
              },
            ].map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link key={index} href={category.link}>
                  <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border-0 bg-white overflow-hidden dark:bg-card ">
                    <CardHeader className="text-center p-8">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold mb-2">{category.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mb-3">
                        {category.description}
                      </CardDescription>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {category.count}
                      </Badge>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-16">
            <Link href="/tests">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 text-lg px-12 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Play className="w-6 h-6 mr-3" />
                Start Your Free Test Now
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-8 mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">5-10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="font-medium">100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-medium">Scientifically Validated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-foreground mb-6">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who have discovered valuable insights about themselves.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-muted/30"
              >
                <CardHeader className="p-8">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-lg leading-relaxed text-muted-foreground italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-bold text-card-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-card text-card-foreground py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-black">Psyluma</span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                The most advanced psychology testing platform, helping people discover their true potential through
                science-backed assessments.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Psychology Tests</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/tests/personality" className="hover:text-card-foreground transition-colors">
                    Personality Tests
                  </Link>
                </li>
                <li>
                  <Link href="/tests/intelligence" className="hover:text-card-foreground transition-colors">
                    Intelligence Tests
                  </Link>
                </li>
                <li>
                  <Link href="/tests/anxiety" className="hover:text-card-foreground transition-colors">
                    Emotional Tests
                  </Link>
                </li>
                <li>
                  <Link href="/tests/relationship" className="hover:text-card-foreground transition-colors">
                    Relationship Tests
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-card-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-card-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-card-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-card-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-card-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-16 pt-8 text-center text-muted-foreground">
            <p>© 2024 Psyluma. All rights reserved. Made with ❤️ for psychology enthusiasts worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
