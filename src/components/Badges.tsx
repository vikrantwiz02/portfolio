import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface Badge {
  id: string;
  name: string;
  company: string;
  image: string;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'Google Cybersecurity Professional',
    company: 'Coursera',
    image: '/google-cybersecurity-certificate.png?height=400&width=200'
  },
  {
    id: '2',
    name: 'Google IT Support Professional',
    company: 'Coursera',
    image: '/google-it-support-professional-certificate.2.png?height=400&width=200'
  },
  {
    id: '3',
    name: 'Frontend Developer',
    company: 'Devfolio',
    image: '/skill-verified-frontend.b9559f3f..png?height=400&width=200'
  },
  {
    id: '4',
    name: 'Backend Developer',
    company: 'Devfolio',
    image: '/skill-verified-backend.0c910c4b..png?height=400&width=200'
  },
  // Add more badges as needed
]

const Badges: React.FC = () => {
  return (
    <section id="badges" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gradient">
        Badges
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="glass-morphism overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center">
                  <img
                    src={badge.image}
                    alt={badge.name}
                    className="w-24 h-24 object-contain mb-2"
                  />
                  <h3 className="text-sm font-semibold text-center">{badge.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{badge.company}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Badges

