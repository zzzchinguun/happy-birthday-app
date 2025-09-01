'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Gift, Cake, Sparkles } from 'lucide-react'

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, color: string}>>([])

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    
    const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']
    const confettiInterval = setInterval(() => {
      const newConfetti = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
      }))
      setConfetti(prev => [...prev, ...newConfetti])
    }, 300)

    return () => {
      clearTimeout(timer)
      clearInterval(confettiInterval)
    }
  }, [])

  useEffect(() => {
    const cleanup = setInterval(() => {
      setConfetti(prev => prev.filter(c => Date.now() - c.id < 3000))
    }, 1000)
    return () => clearInterval(cleanup)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-2 h-2 confetti"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <Cake className="w-24 h-24 text-pink-500 mx-auto" />
              </motion.div>

              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold gradient-text mb-6"
              >
                Happy Birthday!
              </motion.h1>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-700 mb-8"
              >
                Wishing you a day filled with joy, laughter, and wonderful surprises! 🎉
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex justify-center space-x-8 mb-8"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                >
                  <Heart className="w-12 h-12 text-red-500 animate-pulse" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Star className="w-12 h-12 text-yellow-500 animate-sparkle" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Gift className="w-12 h-12 text-green-500 animate-bounce-slow" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  <Sparkles className="w-12 h-12 text-purple-500 animate-pulse-slow" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  🎂 Another Year, Another Adventure! 🎈
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  May your special day be filled with love, laughter, and all the things that make you smile. 
                  Here's to another amazing year ahead filled with new opportunities, wonderful memories, 
                  and countless reasons to celebrate!
                </p>
              </motion.div>

              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
