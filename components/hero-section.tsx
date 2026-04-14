"use client"

import { useEffect, useState } from "react"
import { Heart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToJourney = () => {
    const element = document.getElementById("love-counter")
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.dispatchEvent(new Event("anniv:start-journey"))
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-pink">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
      
      <div 
        className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex justify-center mb-8">
          <Heart className="w-16 h-16 text-primary fill-primary animate-pulse-glow" />
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 text-balance">
          Celebrating 4 Beautiful Years
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed text-pretty">
          Every moment with you has been a dream I never want to wake up from.
        </p>
        
        <Button
          onClick={scrollToJourney}
          size="lg"
          className="rounded-full px-8 py-6 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Start Our Journey
          <Heart className="ml-2 w-5 h-5 fill-current" />
        </Button>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>
  )
}
