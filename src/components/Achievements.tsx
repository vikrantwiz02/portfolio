import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Award, X } from 'lucide-react'

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

interface Achievement {
  title: string;
  description: string;
  mainCertificate: Certificate;
  subCertificates: Certificate[];
}

const achievements: Achievement[] = [
  {
    title: 'Google Cybersecurity Professional Certificate',
    description: 'Completed comprehensive cybersecurity program covering various aspects of digital security.',
    mainCertificate: {
      title: 'Google Cybersecurity Professional',
      issuer: 'Google',
      date: 'June 2023',
      image: '/placeholder.svg?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'Foundations of Cybersecurity',
        issuer: 'Google',
        date: 'April 2023',
        image: '/placeholder.svg?height=150&width=200',
      },
      {
        title: 'Play It Safe: Manage Security Risks',
        issuer: 'Google',
        date: 'May 2023',
        image: '/placeholder.svg?height=150&width=200',
      },
    ],
  },
  // Add more achievements as needed
]

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState('')

  const openFullscreen = (image: string) => {
    setFullscreenImage(image)
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setFullscreenImage('')
  }

  return (
    <>
      <Card className="h-full glass-morphism overflow-hidden border-2 border-purple-500/20 dark:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:scale-105">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center text-purple-600 dark:text-purple-400">
            <Award className="mr-2 text-purple-500" />
            {achievement.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 dark:text-gray-300 mb-4">{achievement.description}</CardDescription>
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400">Main Certificate:</h4>
            <img 
              src={achievement.mainCertificate.image} 
              alt={achievement.mainCertificate.title} 
              className="w-full h-40 object-cover rounded-md mb-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onClick={() => openFullscreen(achievement.mainCertificate.image)}
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.mainCertificate.title} - {achievement.mainCertificate.issuer} ({achievement.mainCertificate.date})</p>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Sub-Certificates:</h4>
            <div className="flex flex-wrap gap-2">
              {achievement.subCertificates.map((cert, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 cursor-pointer hover:bg-purple-500 hover:text-white transition-colors duration-300"
                  onClick={() => openFullscreen(cert.image)}
                >
                  {cert.title}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={closeFullscreen}
          >
            <div className="relative max-w-4xl max-h-full p-4">
              <img src={fullscreenImage} alt="Certificate" className="max-w-full max-h-full object-contain" />
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
                onClick={closeFullscreen}
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gradient">
        Achievements & Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AchievementCard achievement={achievement} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Achievements

