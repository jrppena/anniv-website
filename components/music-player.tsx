"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Show the player after a short delay
    const timer = setTimeout(() => setShowPlayer(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.6
  }, [])

  useEffect(() => {
    const handleStartJourney = async () => {
      if (!audioRef.current) return

      try {
        await audioRef.current.play()
      } catch {
        setIsPlaying(false)
      }
    }

    window.addEventListener("anniv:start-journey", handleStartJourney)
    return () => window.removeEventListener("anniv:start-journey", handleStartJourney)
  }, [])

  const togglePlay = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      return
    }

    try {
      await audioRef.current.play()
    } catch {
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music/bg_1.mp3"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showPlayer ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="glass rounded-full p-2 shadow-lg flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>

          <div className="flex items-center gap-2 px-3">
            <Music className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground font-medium hidden sm:inline">
              {isPlaying ? "Playing..." : "Play Music"}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="rounded-full w-10 h-10 hover:bg-primary/10"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </>
  )
}
