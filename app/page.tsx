"use client"

import { useEffect, useState } from "react"
import { FloatingHearts } from "@/components/floating-hearts"
import { HeroSection } from "@/components/hero-section"
import { LoveCounter } from "@/components/love-counter"
import { TimelineSection } from "@/components/timeline-section"
import { MessageSection } from "@/components/message-section"
import { GallerySection } from "@/components/gallery-section"
import { SurpriseSection } from "@/components/surprise-section"
import { MusicPlayer } from "@/components/music-player"
import { Footer } from "@/components/footer"
import confetti from "canvas-confetti"

export default function AnniversaryPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Initial confetti burst on load
    const timer = setTimeout(() => {
      const colors = ["#FFD1DC", "#B76E79", "#E6B7A9", "#FFE4E9"]
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-pink">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading something special...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative overflow-hidden">
      <FloatingHearts />
      <HeroSection />
      <LoveCounter />
      <TimelineSection />
      <GallerySection />
      <MessageSection />
      <SurpriseSection />
      <Footer />
      <MusicPlayer />
    </main>
  )
}
