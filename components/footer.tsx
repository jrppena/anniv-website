"use client"

import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 gradient-pink">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="w-5 h-5 text-primary fill-primary animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        
        <p className="font-serif text-2xl md:text-3xl text-foreground mb-4">
          Forever & Always
        </p>
        
        <p className="text-muted-foreground">
          Made with love for the one who holds my heart
        </p>
        
        <div className="mt-8 pt-8 border-t border-primary/20">
          <p className="text-sm text-muted-foreground">
            Happy 4th Anniversary
          </p>
        </div>
      </div>
    </footer>
  )
}
