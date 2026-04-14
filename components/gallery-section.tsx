"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Placeholder images - replace with actual Cloudinary URLs
const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    caption: "Our first date",
    year: "Year 1",
  },
  {
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80",
    caption: "Favorite selfie together",
    year: "Year 1",
  },
  {
    url: "https://images.unsplash.com/photo-1544639685-8db88f7ef2e7?w=600&q=80",
    caption: "Our first trip",
    year: "Year 2",
  },
  {
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80",
    caption: "Adventures together",
    year: "Year 2",
  },
  {
    url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80",
    caption: "Random happy moments",
    year: "Year 3",
  },
  {
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
    caption: "Growing together",
    year: "Year 3",
  },
  {
    url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600&q=80",
    caption: "Sunset memories",
    year: "Year 4",
  },
  {
    url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
    caption: "Our latest picture",
    year: "Year 4",
  },
]

export function GallerySection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === "Escape") setSelectedImage(null)
      if (e.key === "ArrowRight") setSelectedImage((prev) => (prev! + 1) % galleryImages.length)
      if (e.key === "ArrowLeft") setSelectedImage((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-6 animate-pulse-glow" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Memories
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A collection of our favorite moments captured in time
          </p>
        </div>

        {/* Masonry Grid */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ${
                index % 3 === 0 ? "row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(index)}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className={`relative w-full ${index % 3 === 0 ? "h-80 md:h-[500px]" : "h-48 md:h-60"}`}>
                {!loadedImages.has(index) && (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground animate-pulse" />
                  </div>
                )}
                <Image
                  src={image.url}
                  alt={image.caption}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                    loadedImages.has(index) ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(index)}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
                    {image.year}
                  </span>
                  <p className="font-serif text-lg mt-1">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length)
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <div 
              className="relative max-w-4xl max-h-[80vh] animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].url}
                alt={galleryImages[selectedImage].caption}
                width={800}
                height={600}
                className="rounded-2xl object-contain max-h-[80vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <span className="text-sm font-medium uppercase tracking-wider text-white/70">
                  {galleryImages[selectedImage].year}
                </span>
                <p className="font-serif text-xl text-white mt-1">
                  {galleryImages[selectedImage].caption}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) => (prev! + 1) % galleryImages.length)
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
