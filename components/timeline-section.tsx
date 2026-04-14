"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, Plane, Sparkles, Gift } from "lucide-react"

const milestones = [
  {
    date: "2022",
    title: "We Met",
    description: "The beginning of everything. The moment that changed my life forever.",
    icon: Heart,
  },
  {
    date: "2023",
    title: "First Trip",
    description: "Our first adventure together. Every journey is better with you.",
    icon: Plane,
  },
  {
    date: "2024",
    title: "Growing Stronger",
    description: "More love, more memories. Our bond deepens with each passing day.",
    icon: Sparkles,
  },
  {
    date: "2026",
    title: "4 Years Anniversary",
    description: "Still choosing each other. Here&apos;s to forever.",
    icon: Gift,
  },
]

export function TimelineSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        },
        { threshold: 0.3 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="timeline" className="py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-6 animate-pulse-glow" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A timeline of our most precious moments together
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full" />

          {milestones.map((milestone, index) => {
            const Icon = milestone.icon
            const isEven = index % 2 === 0
            const isVisible = visibleItems.includes(index)

            return (
              <div
                key={milestone.date}
                ref={(el) => { itemRefs.current[index] = el }}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  isEven ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`w-5/12 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : isEven
                      ? "opacity-0 -translate-x-10"
                      : "opacity-0 translate-x-10"
                  }`}
                >
                  <div className={`glass rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isEven ? "mr-auto text-right" : "ml-auto text-left"
                  }`}>
                    <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-3">
                      {milestone.date}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Center icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-14 h-14 rounded-full gradient-rose flex items-center justify-center shadow-lg transition-all duration-500 ${
                      isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-5/12" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
