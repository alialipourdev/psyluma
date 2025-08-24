"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Textarea } from "../components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  helpful: number
  notHelpful: number
  testType: string
}

interface RatingSystemProps {
  testType: string
  testName: string
  onRatingSubmit?: (rating: number, comment: string) => void
}

export function RatingSystem({ testType, testName, onRatingSubmit }: RatingSystemProps) {
  const mockUser = { name: "Guest User", isAuthenticated: false }
  const { language } = useLanguage()
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock reviews data - in real app, this would come from API
  const mockReviews: Review[] = [
    {
      id: "1",
      userId: "user1",
      userName: "Sarah Johnson",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "Very accurate and helpful test. The results matched my personality perfectly.",
      date: "2024/01/15",
      helpful: 12,
      notHelpful: 1,
      testType: testType,
    },
    {
      id: "2",
      userId: "user2",
      userName: "Mike Chen",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment: "Good test but could use more questions for better accuracy.",
      date: "2024/01/10",
      helpful: 8,
      notHelpful: 2,
      testType: testType,
    },
    {
      id: "3",
      userId: "user3",
      userName: "Emma Davis",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "Excellent! Really helped me understand myself better.",
      date: "2024/01/08",
      helpful: 15,
      notHelpful: 0,
      testType: testType,
    },
  ]

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length
  const totalReviews = mockReviews.length

  const handleRatingClick = (rating: number) => {
    setUserRating(rating)
    if (!showReviewForm) {
      setShowReviewForm(true)
    }
  }

  const handleSubmitReview = async () => {
    if (!mockUser.isAuthenticated || userRating === 0) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (onRatingSubmit) {
      onRatingSubmit(userRating, userComment)
    }

    // Reset form
    setUserRating(0)
    setUserComment("")
    setShowReviewForm(false)
    setIsSubmitting(false)
  }

  const renderStars = (rating: number, interactive = false, size = "w-5 h-5") => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      const isFilled = interactive ? (hoveredRating || userRating) >= starValue : rating >= starValue

      return (
        <Star
          key={index}
          className={`${size} cursor-pointer transition-colors ${isFilled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            }`}
          onClick={interactive ? () => handleRatingClick(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        />
      )
    })
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            Ratings & Reviews
          </CardTitle>
          <CardDescription>User reviews for {testName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 mb-1">{renderStars(averageRating)}</div>
              <div className="text-sm text-muted-foreground">{totalReviews} reviews</div>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = mockReviews.filter((r) => r.rating === star).length
                const percentage = (count / totalReviews) * 100
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="text-sm w-3">{star}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* User Rating Form */}
          {mockUser.isAuthenticated && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Your Review</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rate this test:</label>
                  <div className="flex items-center gap-1">{renderStars(userRating, true)}</div>
                </div>

                {showReviewForm && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your comment (optional):</label>
                      <Textarea
                        placeholder="Share your experience with this test..."
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSubmitReview} disabled={isSubmitting || userRating === 0}>
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                      </Button>
                      <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {!mockUser.isAuthenticated && (
            <div className="border-t pt-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground mb-2">Sign in to leave a review</p>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">User Reviews</h3>
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.userName}</span>
                    <div className="flex items-center gap-1">{renderStars(review.rating, false, "w-4 h-4")}</div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-3 leading-relaxed">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="w-4 h-4 ml-1" />
                      {review.helpful}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsDown className="w-4 h-4 ml-1" />
                      {review.notHelpful}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
