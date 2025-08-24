"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  Share2,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Mail,
  QrCode,
  ImageIcon,
  FileText,
  Check,
  ExternalLink,
  Users,
  Heart,
  Trophy,
  Zap,
  Send,
} from "lucide-react"
import { useLanguage } from "../contexts/language-context"

interface ShareResultProps {
  testName: string
  testResult: string
  testScore?: number
  testAccuracy?: string
  personalityType?: string
  testCategory: string
  resultDescription?: string
  onShare?: (platform: string) => void
}

export function ShareResult({
  testName,
  testResult,
  testScore,
  testAccuracy,
  personalityType,
  testCategory,
  resultDescription,
  onShare,
}: ShareResultProps) {
  const { language } = useLanguage()
  const mockUser = { name: "Guest User" }
  const [shareUrl, setShareUrl] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [friendEmails, setFriendEmails] = useState("")
  const [challengeMessage, setChallengeMessage] = useState("")
  const [inviteSent, setInviteSent] = useState(false)

  // Generate shareable URL
  const generateShareUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const shareId = Math.random().toString(36).substring(7)
    return `${baseUrl}/shared-result/${shareId}`
  }

  const getShareText = () => {
    const baseText = `I just took the ${testName} on Psyluma and discovered I'm ${testResult}! 🎯`
    const scoreText = testScore ? ` I scored ${testScore}%! 📊` : ""
    const challengeText = " Think you can beat my score? Take the test and find out! 🚀"
    const platformText = " #Psyluma #PsychologyTest #PersonalityTest"

    return `${baseText}${scoreText}${challengeText}${platformText} ${shareUrl || generateShareUrl()}`
  }

  const getFriendChallengeText = () => {
    return `Hey! 👋 I just took the ${testName} and got ${testResult}${testScore ? ` with a score of ${testScore}%` : ""}! 

${challengeMessage || "I'm curious to see what personality type you are! Think you can beat my score? 😄"}

Take the test here and let's compare results: ${shareUrl || generateShareUrl()}

Challenge accepted? 🎯✨`
  }

  const handleCopyLink = async () => {
    const url = shareUrl || generateShareUrl()
    setShareUrl(url)

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleSocialShare = (platform: string) => {
    const text = encodeURIComponent(getShareText())
    const url = encodeURIComponent(shareUrl || generateShareUrl())

    let shareUrl_platform = ""

    switch (platform) {
      case "twitter":
        shareUrl_platform = `https://twitter.com/intent/tweet?text=${text}`
        break
      case "facebook":
        shareUrl_platform = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`
        break
      case "linkedin":
        shareUrl_platform = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case "telegram":
        shareUrl_platform = `https://t.me/share/url?url=${url}&text=${text}`
        break
      case "whatsapp":
        shareUrl_platform = `https://wa.me/?text=${text}`
        break
      case "email":
        const subject = encodeURIComponent("My Psychology Test Result - Can You Beat My Score?")
        shareUrl_platform = `mailto:?subject=${subject}&body=${encodeURIComponent(getFriendChallengeText())}`
        break
    }

    if (shareUrl_platform) {
      window.open(shareUrl_platform, "_blank", "width=600,height=400")
      onShare?.(platform)
    }
  }

  const handleSendFriendInvites = async () => {
    if (!friendEmails.trim()) return

    // Simulate sending invites
    setInviteSent(true)
    setTimeout(() => setInviteSent(false), 3000)

    // In real app, this would send actual emails
    console.log(
      "Sending invites to:",
      friendEmails.split(",").map((email) => email.trim()),
    )
    console.log("Challenge message:", getFriendChallengeText())

    onShare?.("friend-invite")
  }

  const handleDownloadImage = async () => {
    setIsGeneratingImage(true)

    // Simulate image generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In real app, this would generate and download an actual image
    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 600
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Create a simple result card image
      ctx.fillStyle = "#1e293b"
      ctx.fillRect(0, 0, 800, 600)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 32px Arial"
      ctx.textAlign = "center"
      ctx.fillText(testName, 400, 100)

      ctx.font = "24px Arial"
      ctx.fillText(testResult, 400, 200)

      if (testScore) {
        ctx.fillText(`Score: ${testScore}%`, 400, 300)
      }

      ctx.font = "18px Arial"
      ctx.fillText("Psyluma", 400, 500)

      // Download the image
      const link = document.createElement("a")
      link.download = `${testName.replace(/\s+/g, "-")}-result.png`
      link.href = canvas.toDataURL()
      link.click()
    }

    setIsGeneratingImage(false)
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In real app, this would generate and download an actual PDF
    const pdfContent = `
      Test Name: ${testName}
      Result: ${testResult}
      ${testScore ? `Score: ${testScore}%` : ""}
      ${testAccuracy ? `Accuracy: ${testAccuracy}` : ""}
      ${resultDescription ? `Description: ${resultDescription}` : ""}
      
      Generated by Psyluma
      Date: ${new Date().toLocaleDateString()}
    `

    const blob = new Blob([pdfContent], { type: "text/plain" })
    const link = document.createElement("a")
    link.download = `${testName.replace(/\s+/g, "-")}-result.txt`
    link.href = URL.createObjectURL(blob)
    link.click()

    setIsGeneratingPDF(false)
  }

  const socialPlatforms = [
    { name: "Twitter", icon: Twitter, key: "twitter", color: "hover:bg-blue-50 hover:text-blue-600" },
    { name: "Facebook", icon: Facebook, key: "facebook", color: "hover:bg-blue-50 hover:text-blue-700" },
    { name: "LinkedIn", icon: Linkedin, key: "linkedin", color: "hover:bg-blue-50 hover:text-blue-800" },
    { name: "Telegram", icon: MessageCircle, key: "telegram", color: "hover:bg-blue-50 hover:text-blue-500" },
    { name: "WhatsApp", icon: MessageCircle, key: "whatsapp", color: "hover:bg-green-50 hover:text-green-600" },
    { name: "Email", icon: Mail, key: "email", color: "hover:bg-gray-50 hover:text-gray-700" },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border-purple-200"
        >
          <Share2 className="w-4 h-4" />
          Share & Challenge Friends
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Share Your Amazing Result!
          </DialogTitle>
          <DialogDescription>Challenge your friends and see who gets the best score! 🚀</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="friends" className="gap-2">
              <Users className="w-4 h-4" />
              Challenge Friends
            </TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="link">Direct Link</TabsTrigger>
            <TabsTrigger value="download">Download</TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Challenge Your Friends!
                </CardTitle>
                <CardDescription>Send a fun challenge to your friends and see who can beat your score!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/50 p-4 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{mockUser.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{mockUser.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {testResult}
                        {testScore && (
                          <Badge variant="secondary" className="ml-2">
                            {testScore}% Score
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-purple-700">
                    "Just crushed the {testName}! Think you can beat my score? 😎"
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Friend's Email Addresses
                  </Label>
                  <Input
                    placeholder="friend1@email.com, friend2@email.com, ..."
                    value={friendEmails}
                    onChange={(e) => setFriendEmails(e.target.value)}
                    className="min-h-[40px]"
                  />
                  <p className="text-xs text-muted-foreground">Separate multiple emails with commas</p>
                </div>

                <div className="space-y-2">
                  <Label>Personal Challenge Message (Optional)</Label>
                  <Textarea
                    placeholder="Add a fun message to challenge your friends... 🎯"
                    value={challengeMessage}
                    onChange={(e) => setChallengeMessage(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Preview Message
                  </h4>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">{getFriendChallengeText()}</div>
                </div>

                <Button
                  onClick={handleSendFriendInvites}
                  disabled={!friendEmails.trim() || inviteSent}
                  className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {inviteSent ? (
                    <>
                      <Check className="w-4 h-4" />
                      Challenge Sent! 🎉
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Challenge Invites
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Quick Share with Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 hover:bg-green-50 hover:text-green-600 transition-colors gap-2 bg-transparent"
                    onClick={() => handleSocialShare("whatsapp")}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Challenge
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 hover:bg-blue-50 hover:text-blue-500 transition-colors gap-2 bg-transparent"
                    onClick={() => handleSocialShare("telegram")}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Telegram Challenge
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 hover:bg-gray-50 hover:text-gray-700 transition-colors gap-2 bg-transparent"
                    onClick={() => handleSocialShare("email")}
                  >
                    <Mail className="w-4 h-4" />
                    Email Challenge
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 hover:bg-purple-50 hover:text-purple-600 transition-colors gap-2 bg-transparent"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Media Post Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold">
                        {mockUser.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{mockUser.name}</div>
                      <div className="text-sm text-muted-foreground">Just now</div>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{getShareText()}</p>
                  <div className="bg-card border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{testName}</div>
                        <div className="text-xs text-muted-foreground">{testResult}</div>
                        {testScore && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Score: {testScore}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Custom Message (Optional)</Label>
                  <Textarea
                    placeholder="Add your own message to the post..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon
                return (
                  <Button
                    key={platform.key}
                    variant="outline"
                    className={`h-12 ${platform.color} transition-colors`}
                    onClick={() => handleSocialShare(platform.key)}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {platform.name}
                  </Button>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{language === "fa" ? "لینک اشتراک‌گذاری" : "Share Link"}</CardTitle>
                <CardDescription>
                  {language === "fa"
                    ? "این لینک را کپی کنید و با دیگران به اشتراک بگذارید"
                    : "Copy this link and share it with others"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input value={shareUrl || generateShareUrl()} readOnly className="flex-1" />
                  <Button onClick={handleCopyLink} variant="outline">
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        {language === "fa" ? "کپی شد" : "Copied"}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        {language === "fa" ? "کپی" : "Copy"}
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{language === "fa" ? "پیش‌نمایش لینک" : "Link Preview"}</h4>
                  <div className="bg-card border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Share2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{testName} - نتیجه تست</div>
                        <div className="text-xs text-muted-foreground mb-1">
                          {testResult} • {testCategory}
                        </div>
                        <div className="text-xs text-muted-foreground">Psyluma • psyluma.com</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => handleSocialShare("whatsapp")}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" onClick={() => handleSocialShare("telegram")}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Telegram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="download" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    {language === "fa" ? "دانلود تصویر" : "Download Image"}
                  </CardTitle>
                  <CardDescription>
                    {language === "fa"
                      ? "نتیجه تست را به صورت تصویر دانلود کنید"
                      : "Download your test result as an image"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleDownloadImage} disabled={isGeneratingImage} className="w-full">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    {isGeneratingImage
                      ? language === "fa"
                        ? "در حال تولید تصویر..."
                        : "Generating Image..."
                      : language === "fa"
                        ? "دانلود تصویر (PNG)"
                        : "Download Image (PNG)"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {language === "fa" ? "دانلود PDF" : "Download PDF"}
                  </CardTitle>
                  <CardDescription>
                    {language === "fa"
                      ? "گزارش کامل نتیجه تست را دانلود کنید"
                      : "Download a complete report of your test result"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    {isGeneratingPDF
                      ? language === "fa"
                        ? "در حال تولید PDF..."
                        : "Generating PDF..."
                      : language === "fa"
                        ? "دانلود گزارش (PDF)"
                        : "Download Report (PDF)"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    {language === "fa" ? "کد QR" : "QR Code"}
                  </CardTitle>
                  <CardDescription>
                    {language === "fa" ? "کد QR برای اشتراک‌گذاری آسان" : "QR code for easy sharing"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                    <div className="w-32 h-32 bg-white border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    {language === "fa" ? "کد QR برای لینک اشتراک‌گذاری" : "QR code for share link"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
