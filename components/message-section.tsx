"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const rotatingMessages = [
  "You are my favorite place.",
  "4 years, countless memories.",
  "Still falling for you every day.",
  "Forever starts with you.",
  "You + Me = Always",
]

export function MessageSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % rotatingMessages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % rotatingMessages.length)
  }

  const prevMessage = () => {
    setCurrentMessage((prev) => (prev - 1 + rotatingMessages.length) % rotatingMessages.length)
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 gradient-pink">
      <div className="max-w-4xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-6 animate-pulse-glow" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            From My Heart to Yours
          </h2>
        </div>

        {/* Main Love Letter */}
        <div 
          className={`glass rounded-3xl p-8 md:p-12 shadow-xl mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Quote className="w-10 h-10 text-primary/40 mb-6" />
          <div className="font-serif text-xl md:text-2xl leading-relaxed text-foreground space-y-6">
            <p>
              Four years ago, I found more than just love—I found my home in you.
            </p>
            <p>
              Through every laugh, every challenge, and every quiet moment, you&apos;ve been my constant.
            </p>
            <p>
              Thank you for choosing me every single day. Thank you for loving me in ways I didn&apos;t even know I needed.
            </p>
            <p>
              Here&apos;s to the memories we&apos;ve made and the lifetime we&apos;re still building.
            </p>
            <p className="text-primary font-semibold">
              I love you more with every passing day.
            </p>
          </div>
          <div className="flex justify-end mt-8">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
        </div>

        {/* Rotating Messages Carousel */}
        <div 
          className={`transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="glass rounded-3xl p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevMessage}
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="flex-1 text-center min-h-[80px] flex items-center justify-center">
                <p className="font-serif text-2xl md:text-3xl text-foreground animate-fade-in-up" key={currentMessage}>
                  &ldquo;{rotatingMessages[currentMessage]}&rdquo;
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextMessage}
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {rotatingMessages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMessage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentMessage
                      ? "bg-primary w-6"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
