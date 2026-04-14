"use client"

import { useState } from "react"
import { Heart, Plane, Sparkles, Gift } from "lucide-react"

const milestones = [
  {
    date: "Grade 7",
    title: "Where It All Began",
    description: "We first shared a classroom as quiet schoolmates, not knowing this was the beginning of our story.",
    icon: Heart,
  },
  {
    date: "Grade 8",
    title: "Different Paths",
    description: "You transferred schools, and the distance between us grew. For a while, our connection faded into silence.",
    icon: Plane,
  },
  {
    date: "College Days",
    title: "Destiny Reconnected Us",
    description: "A simple Facebook post and your song request reopened our conversation and brought us back into each other's world.",
    icon: Sparkles,
  },
  {
    date: "One Week Later",
    title: "Confession and Courting",
    description:
      "I told you how I felt, and to my joy, you felt the same. After seven months of courting, you finally said yes.",
    icon: Heart,
  },
  {
    date: "April 15, 2022",
    title: "Officially Us",
    description:
      "Even through long distance - UPLB and Partido State - we chose each other and held on to our love.",
    icon: Sparkles,
  },
  {
    date: "Reading Breaks and Vacations",
    title: "Bicol Trips and Little Reunions",
    description:
      "Every visit mattered. I cherished each trip to Bicol, every reading break, and every chance just to be near you.",
    icon: Plane,
  },
  {
    date: "April 15, 2023",
    title: "First Anniversary",
    description:
      "We celebrated at our house, I surprised you, and I even made you handmade crochet flowers.",
    icon: Plane,
  },
  {
    date: "April 15, 2024",
    title: "Second Anniversary",
    description:
      "We had our first photoshoot together and it was so fun. That picture is still on my frame, always sitting on my table.",
    icon: Sparkles,
  },
  {
    date: "April 15, 2025",
    title: "Third Anniversary",
    description:
      "Even with long distance between us, I treated you to a meal and we still shared our best wishes with each other.",
    icon: Heart,
  },
  {
    date: "May 2025",
    title: "Your Graduation Day",
    description:
      "I came home to witness your graduation. I could not have been more proud of you.",
    icon: Gift,
  },
  {
    date: "July - November 2025",
    title: "Standing By Each Other",
    description:
      "Through review season, stress, misunderstandings, and hard days, we stayed patient, present, and committed to us.",
    icon: Heart,
  },
  {
    date: "Present Day",
    title: "Fourth Anniversary",
    description:
      "We are celebrating our fourth anniversary long distance, but our love remains the same - only deeper and better.",
    icon: Gift,
  },
]

export function TimelineSection() {
  const [visibleItems] = useState<number[]>(milestones.map((_, index) => index))

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
