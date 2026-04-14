"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface GalleryImage {
  url: string
  caption: string
  year: string
}

interface GalleryImageWithIndex extends GalleryImage {
  index: number
}

const rotateItems = (items: GalleryImageWithIndex[], offset: number) => {
  if (items.length <= 1) return items
  const safeOffset = ((offset % items.length) + items.length) % items.length
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)]
}

const seedShuffle = <T,>(items: T[], seed: number) => {
  const shuffled = [...items]
  let randomSeed = seed

  const nextRandom = () => {
    randomSeed = (randomSeed * 1664525 + 1013904223) % 4294967296
    return randomSeed / 4294967296
  }

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(nextRandom() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

// Fallback images when Cloudinary is not configured yet
const fallbackGalleryImages: GalleryImage[] = [
  {
    url: "https://res.cloudinary.com/dkrvedamn/image/upload/v1776170477/608cc916-b482-4b36-af25-8f6f2c6d2415.png",
    caption: "Our first picture together",
    year: "Year 1",
  },
  {
    url: "https://res.cloudinary.com/dkrvedamn/image/upload/v1776170701/857ef7ea-323d-4d76-a068-a54e9bbe6582.png",
    caption: "First time celebrating the birthday of one another",
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
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(fallbackGalleryImages)
  const [isLoadingGallery, setIsLoadingGallery] = useState(true)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)
  const selectedImageRef = useRef<number | null>(null)
  const galleryLengthRef = useRef(fallbackGalleryImages.length)

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
    selectedImageRef.current = selectedImage
    galleryLengthRef.current = galleryImages.length
  }, [selectedImage, galleryImages.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageRef.current === null) return
      if (e.key === "Escape") setSelectedImage(null)
      if (e.key === "ArrowRight") {
        setSelectedImage((prev) => (prev! + 1) % galleryLengthRef.current)
      }
      if (e.key === "ArrowLeft") {
        setSelectedImage((prev) => (prev! - 1 + galleryLengthRef.current) % galleryLengthRef.current)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    const loadCloudinaryImages = async () => {
      try {
        const response = await fetch("/api/gallery-images", { cache: "no-store" })
        if (!response.ok) throw new Error("Failed to fetch gallery images")

        const data = (await response.json()) as { images?: GalleryImage[] }
        if (data.images && data.images.length > 0) {
          setGalleryImages(data.images)
        }
      } catch {
        // Keep fallback images if Cloudinary fetch fails
      } finally {
        setIsLoadingGallery(false)
      }
    }

    loadCloudinaryImages()
  }, [])

  useEffect(() => {
    setLoadedImages(new Set())
    setSelectedImage((prev) => {
      if (prev === null) return null
      return prev >= galleryImages.length ? null : prev
    })
  }, [galleryImages])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  const columnCount = 4
  const columns = useMemo(() => {
    const indexedImages = galleryImages.map((image, index) => ({ ...image, index }))
    const shuffledImages = seedShuffle(indexedImages, galleryImages.length * 97)
    const groupSize = Math.ceil(shuffledImages.length / columnCount)

    return Array.from({ length: columnCount }, (_, columnIndex) => {
      const start = columnIndex * groupSize
      const end = start + groupSize
      return shuffledImages.slice(start, end)
    })
  }, [galleryImages])

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

        {/* Infinite Vertical Carousel */}
        <div 
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 h-[40rem] sm:h-[44rem] md:h-[48rem] overflow-hidden transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="overflow-hidden">
              <div
                className={`flex flex-col gap-4 ${
                  columnIndex % 2 === 0 ? "gallery-marquee-up" : "gallery-marquee-down"
                }`}
                style={{ animationDuration: `${52 + columnIndex * 4}s` }}
              >
                {[
                  ...column,
                  ...rotateItems(column, Math.max(1, Math.floor(column.length / 3))),
                ].map((image, loopIndex) => (
                  <div
                    key={`${image.index}-${loopIndex}`}
                    className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 h-56 md:h-64"
                    onClick={() => setSelectedImage(image.index)}
                  >
                    {!loadedImages.has(image.index) && (
                      <div className="absolute inset-0 bg-muted/80 flex items-center justify-center">
                        <Heart className="w-9 h-9 text-primary fill-primary/70 animate-pulse-glow" />
                      </div>
                    )}
                    <Image
                      src={image.url}
                      alt={image.caption}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                        loadedImages.has(image.index) ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(image.index)}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />

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
            </div>
          ))}
        </div>

        {isLoadingGallery && (
          <p className="text-center mt-6 text-sm text-muted-foreground">Loading gallery...</p>
        )}

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
