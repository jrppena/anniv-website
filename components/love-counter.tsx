"use client"

import { useEffect, useState } from "react"
import { Heart, Clock, Calendar, Sparkles } from "lucide-react"

// Anniversary start date - April 15, 2022 (local time)
const ANNIVERSARY_DATE = new Date(2022, 3, 15, 0, 0, 0)

interface TimeUnit {
  value: number
  label: string
  icon: React.ReactNode
}

export function LoveCounter() {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const diff = now.getTime() - ANNIVERSARY_DATE.getTime()
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeUnits([
        { value: days, label: "Days", icon: <Calendar className="w-6 h-6" /> },
        { value: hours, label: "Hours", icon: <Clock className="w-6 h-6" /> },
        { value: minutes, label: "Minutes", icon: <Sparkles className="w-6 h-6" /> },
        { value: seconds, label: "Seconds", icon: <Heart className="w-6 h-6" /> },
      ])
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("love-counter")
    if (element) observer.observe(element)

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  return (
    <section id="love-counter" className="py-24 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-6 animate-pulse-glow" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Time Together
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every second with you is a treasure I hold dear
          </p>
        </div>

        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="glass rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-primary mb-4 flex justify-center">
                {unit.icon}
              </div>
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                {unit.value.toLocaleString()}
              </div>
              <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-lg text-muted-foreground">
          {"We've been together for "}
          <span className="text-primary font-semibold">
            {timeUnits[0]?.value.toLocaleString()}+ days
          </span>
          {" of love"}
        </p>
      </div>
    </section>
  )
}
