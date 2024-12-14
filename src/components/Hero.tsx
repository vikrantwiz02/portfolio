import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Hero: React.FC = () => {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 relative interactive-bg">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-gradient animate-float"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hi, I'm Vikrant Kumar
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Web Developer & Cybersecurity Enthusiast
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore My Work
          </Button>
        </motion.div>
        <motion.div
          className="mt-12"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-8 h-8 mx-auto text-blue-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero