'use client'

import React, { useState, useCallback } from 'react'
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
    title: 'Data Visualisation: Empowering Business with Effective Insights Job Simulation (TATA Group)',
    description: 'Certified in Data Visualization: Empowering Business with Effective Insights, demonstrating skills in creating impactful dashboards and data-driven decision-making.',
    mainCertificate: {
      title: 'Data Visualisation: Empowering Business with Effective Insights Job Simulation',
      issuer: 'Forage',
      date: 'Jan 2025',
      image: '/Data Visualisation Empowering Business with Effective Insights Job Simulation.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'Forage',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'Accenture UK - Developer and Technology Job Simulation',
    description: 'Certified in Accenture UK - Developer and Technology Job Simulation, showcasing skills in software development, problem-solving, and technology-driven solutions',
    mainCertificate: {
      title: 'Accenture UK - Developer and Technology Job Simulation',
      issuer: 'Forage',
      date: 'Jan 2025',
      image: '/Accenture UK - Developer and Technology Job Simulation.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'Forage',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'Goldman Sachs - Software Engineering Job Simulation',
    description: 'Certified in Software Engineering Job Simulation, showcasing expertise in software development, problem-solving, and engineering best practices.',
    mainCertificate: {
      title: 'Goldman Sachs - Software Engineering Job Simulation',
      issuer: 'Forage',
      date: 'Feb 2025',
      image: '/Software Engineering Job Simulation.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'Forage',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'Citi - Technology Software Development Job Simulation',
    description: 'Certified in Citi - Technology Software Development Job Simulation, demonstrating proficiency in creating state diagrams, writing feature proposals, querying data from the web, and visualizing live data.',
    mainCertificate: {
      title: 'Citi - Technology Software Development Job Simulation',
      issuer: 'Forage',
      date: 'Feb 2025',
      image: '/Citi.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'Forage',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'Cloud Essentials - Knowledge Badge Readiness Path',
    description: 'Certified in Cloud Essentials - Knowledge Badge Readiness Path, demonstrating a strong foundation in AWS Cloud concepts, services, security, architecture, pricing, and support through structured learning, knowledge checks, and assessment.',
    mainCertificate: {
      title: 'Cloud Essentials - Knowledge Badge Readiness Path',
      issuer: 'AWS Training and Certification',
      date: 'Feb 2025',
      image: '/Cloud Essentials - Knowledge Badge Readiness Path.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'Job Roles in the Cloud',
        issuer: 'AWS Training and Certification',
        date: 'Feb 2025',
        image: '/Job Roles in the Cloud.png?height=150&width=200',
      },
      {
        title: 'AWS Cloud Practitioner Essentials',
        issuer: 'AWS Training and Certification',
        date: 'Jan 2025',
        image: '/AWS Course Completion Certificate.png?height=150&width=200',
      },
      {
        title: 'Getting Started with Cloud Acquisition',
        issuer: 'AWS Training and Certification',
        date: 'Feb 2025',
        image: '/Getting Started with Cloud Acquisition.png?height=150&width=200',
      },
      {
        title: 'AWS Billing and Cost Management',
        issuer: 'AWS Training and Certification',
        date: 'Feb 2025',
        image: '/AWS Billing and Cost Management.png?height=150&width=200',
      },
      {
        title: 'AWS Foundations: Getting Started with the AWS Cloud Essentials',
        issuer: 'AWS Training and Certification',
        date: 'Feb 2025',
        image: '/AWS Foundations Getting Started with the AWS Cloud Essentials.png?height=150&width=200',
      },
    ],
  },
  {
    title: 'AWS Technical Essentials',
    description: 'Certified in AWS Technical Essentials, demonstrating proficiency in fundamental AWS concepts, including compute, database, storage, networking, monitoring, and security, along with common cloud solutions.',
    mainCertificate: {
      title: 'AWS Technical Essentials',
      issuer: 'AWS Training and Certification',
      date: 'Feb 2025',
      image: '/AWS Technical Essentials.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'AWS Training and Certification',
        date: '',
        image: '',
      },
    ],
  },
  // Add more achievements as needed
]

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const [fullscreenCertificate, setFullscreenCertificate] = useState<Certificate | null>(null)

  const openFullscreen = useCallback((certificate: Certificate) => {
    setFullscreenCertificate(certificate)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeFullscreen = useCallback(() => {
    setFullscreenCertificate(null)
    document.body.style.overflow = ''
  }, [])

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
              className="w-full h-70 object-cover rounded-md mb-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onClick={() => openFullscreen(achievement.mainCertificate)}
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
                  onClick={() => openFullscreen(cert)}
                >
                  {cert.title}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {fullscreenCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={closeFullscreen}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
              <div className="relative">
                <img 
                  src={fullscreenCertificate.image} 
                  alt={fullscreenCertificate.title} 
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                <button
                  className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-all duration-300"
                  onClick={(e) => { e.stopPropagation(); closeFullscreen(); }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {/* <div className="mt-4 text-white text-center">
                <h3 className="text-2xl font-semibold">{fullscreenCertificate.title}</h3>
                <p className="text-xl">{fullscreenCertificate.issuer} - {fullscreenCertificate.date}</p>
              </div> */}
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

