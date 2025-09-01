'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Gift, Cake, Sparkles, Clock, Calendar } from 'lucide-react'

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, color: string}>>([])
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [livedTime, setLivedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Calculate birthday countdown and lived time
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      
      // Set birthday to September 1st of current year at 4 AM
      const birthday = new Date(currentYear, 8, 1, 4, 0, 0) // Month is 0-indexed, so 8 = September, 4 AM
      
      // If birthday has passed this year, set it to next year
      if (birthday < now) {
        birthday.setFullYear(currentYear + 1)
      }
      
      const difference = birthday.getTime() - now.getTime()
      
      if (difference > 0) {
        const totalSeconds = Math.floor(difference / 1000)
        const days = Math.floor(totalSeconds / (24 * 60 * 60))
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
        const seconds = totalSeconds % 60
        
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        })
      } else {
        // If it's the birthday, show zeros
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      }
    }

    const calculateLivedTime = () => {
      const now = new Date()
      const birthDate = new Date(2002, 8, 1, 4, 0, 0) // September 1st, 2002 at 4 AM
      
      const timeDifference = now.getTime() - birthDate.getTime()
      const totalSeconds = Math.floor(timeDifference / 1000)
      
      const days = Math.floor(totalSeconds / (24 * 60 * 60))
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
      const seconds = totalSeconds % 60
      
      setLivedTime({
        days,
        hours,
        minutes,
        seconds
      })
    }

    calculateTimeLeft()
    calculateLivedTime()
    
    const timer = setInterval(() => {
      calculateTimeLeft()
      calculateLivedTime()
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  // Check if it's the birthday
  const isBirthday = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

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

              <motion.h2
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-purple-600 mb-4"
              >
                Мишээх! 🎉
              </motion.h2>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-700 mb-8"
              >
                September 1st is your special day! 🎂
              </motion.p>

              {/* Lived Time Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-6 max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-green-500 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-800">Total Time Lived</h3>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{livedTime.days.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{livedTime.hours}</div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{livedTime.minutes}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{livedTime.seconds}</div>
                    <div className="text-sm text-gray-600">Seconds</div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <div className="text-sm text-gray-600">Since September 1st, 2002 at 4 AM</div>
                </div>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8 max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-purple-500 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    {isBirthday ? "🎉 It's Your Birthday Today! 🎉" : "Countdown to Birthday!"}
                  </h3>
                </div>
                {isBirthday ? (
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">🎂 HAPPY BIRTHDAY! 🎂</div>
                    <div className="text-lg text-gray-600">Enjoy your special day!</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{timeLeft.days}</div>
                      <div className="text-sm text-gray-600">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{timeLeft.hours}</div>
                      <div className="text-sm text-gray-600">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{timeLeft.minutes}</div>
                      <div className="text-sm text-gray-600">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{timeLeft.seconds}</div>
                      <div className="text-sm text-gray-600">Seconds</div>
                    </div>
                  </div>
                )}
              </motion.div>

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
                  🎂 Happy Birthday Мишээх! 🎈
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Мишээх, you have been alive for <span className="font-bold text-green-600">{livedTime.days.toLocaleString()}</span> days, 
                  <span className="font-bold text-green-600"> {livedTime.hours}</span> hours, 
                  <span className="font-bold text-green-600"> {livedTime.minutes}</span> minutes, and 
                  <span className="font-bold text-green-600"> {livedTime.seconds}</span> seconds since September 1st, 2002 at 4 AM! 
                  May your special day be filled with love, laughter, and all the things that make you smile. 
                  Here's to another amazing year ahead filled with new opportunities, wonderful memories, 
                  and countless reasons to celebrate! You deserve all the happiness in the world! 🌟
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
