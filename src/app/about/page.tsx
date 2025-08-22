"use client"

import { Navigation } from "../../components/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Users, Target, Heart, Shield, Zap, CheckCircle } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"
import { useEffect, useState } from "react"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <AboutPageSkeleton />
  }

  return <AboutPageContent />
}

function AboutPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="animate-pulse">
        <section className="bg-primary py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="h-12 bg-muted rounded mb-6 max-w-md mx-auto"></div>
            <div className="h-6 bg-muted rounded max-w-lg mx-auto"></div>
          </div>
        </section>
      </div>
    </div>
  )
}

function AboutPageContent() {
  const { t } = useLanguage()

  const team = [
    {
      name: "Dr. Sara Ahmadi",
      nameEn: "Dr. Sara Ahmadi",
      role: "Clinical Psychologist & Scientific Director",
      roleEn: "Clinical Psychologist & Scientific Director",
      description: "PhD in Clinical Psychology from University of Tehran with 15 years experience",
      descriptionEn: "PhD in Clinical Psychology from University of Tehran with 15 years experience",
    },
    {
      name: "Dr. Ali Mohammadi",
      nameEn: "Dr. Ali Mohammadi",
      role: "Psychometrics Specialist",
      roleEn: "Psychometrics Specialist",
      description: "PhD in Cognitive Psychology and specialist in psychological test design",
      descriptionEn: "PhD in Cognitive Psychology and specialist in psychological test design",
    },
    {
      name: "Maryam Rezaei",
      nameEn: "Maryam Rezaei",
      role: "Technical & Development Manager",
      roleEn: "Technical & Development Manager",
      description: "Master's in Computer Science with specialization in Artificial Intelligence",
      descriptionEn: "Master's in Computer Science with specialization in Artificial Intelligence",
    },
  ]

  const values = [
    {
      icon: Shield,
      title: t("scientificCredibility"),
      description: t("scientificCredibilityDesc"),
    },
    {
      icon: Heart,
      title: t("privacyProtection"),
      description: t("privacyProtectionDesc"),
    },
    {
      icon: Zap,
      title: t("easyAccess"),
      description: t("easyAccessDesc"),
    },
    {
      icon: Target,
      title: t("accurateResults"),
      description: t("accurateResultsDesc"),
    },
  ]

  const achievements = [
    { number: "250K+", label: t("activeUsers") },
    { number: "50+", label: t("testTypes") },
    { number: "99%", label: t("accuracy") },
    { number: "5", label: t("yearsExperience") },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">{t("aboutPlatform")}</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">{t("aboutDescription")}</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">{t("ourMission")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{t("missionDescription")}</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{t("scientificReliableTests")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{t("userPrivacyProtection")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{t("easyFreeAccess")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{t("continuousUserSupport")}</span>
                </div>
              </div>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-2">{achievement.number}</div>
                    <div className="text-muted-foreground">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("ourValues")}</h2>
            <p className="text-xl text-muted-foreground">{t("valuesDescription")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{value.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("ourTeam")}</h2>
            <p className="text-xl text-muted-foreground">{t("teamDescription")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    {member.role}
                  </Badge>
                  <CardDescription className="leading-relaxed">{member.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
