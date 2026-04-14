"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, Gift, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export function SurpriseSection() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleReveal = () => {
    setIsRevealed(true)
    
    // Trigger confetti
    const duration = 3000
    const end = Date.now() + duration

    const colors = ["#FFD1DC", "#B76E79", "#E6B7A9", "#FFE4E9"]

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <div 
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            A Special Surprise
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12">
            Something just for you...
          </p>

          {!isRevealed ? (
            <Button
              onClick={handleReveal}
              size="lg"
              className="rounded-full px-10 py-8 text-xl font-medium gradient-rose text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
            >
              <Gift className="w-6 h-6 mr-3" />
              Click for a Surprise
            </Button>
          ) : (
            <div className="glass rounded-3xl p-8 md:p-12 shadow-xl animate-scale-in">
              <Heart className="w-16 h-16 text-primary fill-primary mx-auto mb-8 animate-pulse-glow" />
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed">
                No matter how many years pass, I will always choose you.
              </p>
              <div className="mt-8 flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-6 h-6 text-primary fill-primary"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Future Message */}
      <div 
        className={`max-w-2xl mx-auto mt-24 text-center transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="glass rounded-3xl p-8 shadow-lg">
          <p className="text-muted-foreground text-sm uppercase tracking-wider mb-4">
            A Promise for the Future
          </p>
          <p className="font-serif text-xl md:text-2xl text-foreground">
            See you in our 10th anniversary
          </p>
          <Heart className="w-6 h-6 text-primary fill-primary mx-auto mt-4" />
        </div>
      </div>
    </section>
  )
}
