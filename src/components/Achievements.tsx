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
    title: 'Google Cybersecurity Professional',
    description: 'Completed comprehensive cybersecurity program covering various aspects of digital security.',
    mainCertificate: {
      title: 'Google Cybersecurity Professional',
      issuer: 'Coursera',
      date: 'Dec 2024',
      image: '/CourseraEMOS42929MSG.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'Foundations of Cybersecurity',
        issuer: 'Coursera',
        date: 'March 2024',
        image: '/Coursera6XU2QJWQBTRU.png?height=150&width=200',
      },
      {
        title: 'Play It Safe: Manage Security Risks',
        issuer: 'Coursera',
        date: 'March 2024',
        image: '/CourseraKALHXPSDQLQV.png?height=150&width=200',
      },
      {
        title: 'Connect and Protect: Networks and Network Security',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/CourseraXCU5FXFBZQ4E.png?height=150&width=200',
      },
      {
        title: ' Tools of the Trade: Linux and SQL',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/CourseraYM2HT6ZUOOMM.png?height=150&width=200',
      },
      {
        title: 'Assets, Threats, and Vulnerabilities',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/CourseraV7WRH8RBM2N2.png?height=150&width=200',
      },
      {
        title: ' Sound the Alarm: Detection and Response',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/CourseraM1LC8DZ1CSEN.png?height=150&width=200',
      },
      {
        title: ' Automate Cybersecurity Tasks with Python',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/Coursera4EM5F1AQOROZ.png?height=150&width=200',
      },
      {
        title: ' Put It to Work: Prepare for Cybersecurity Jobs',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/Coursera9C9CTHULJWG5.png?height=150&width=200',
      },
    ],
  },
  {
    title: 'Google IT Support',
    description: 'Completed comprehensive program that equips learners with foundational IT skills, including troubleshooting, networking, operating systems, system administration, and IT security, preparing them for entry-level IT support roles.',
    mainCertificate: {
      title: 'Google IT Support',
      issuer: 'Coursera',
      date: 'Dec 2024',
      image: '/Googleitsupport.jpg?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'Technical Support Fundamentals',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/Coursera A1FCU9GHXW6M_page-0001.jpg?height=150&width=200',
      },
      {
        title: ' The Bits and Bytes of Computer Networking',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/Coursera MIDNMAYK1CBY_page-0001.jpg?height=150&width=200',
      },
      {
        title: ' Operating Systems and You: Becoming a Power User',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/Coursera JSHJR1SULJ39_page-0001.jpg?height=150&width=200',
      },
      {
        title: 'System Administration and IT Infrastructure Services',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/Coursera RU1WH0ZWJGWZ_page-0001.jpg?height=150&width=200',
      },
      {
        title: 'IT Security: Defense against the digital dark art',
        issuer: 'Coursera',
        date: 'Dec 2024',
        image: '/Coursera T43R9UVFLNHN_page-0001.jpg?height=150&width=200',
      },
    ],
  },
  {
    title: 'The Complete Mobile Ethical Hacking',
    description: 'Completed a comprehensive program that teaches mobile ethical hacking, covering penetration testing, security vulnerabilities, and app protection techniques using industry tools.',
    mainCertificate: {
      title: 'The Complete Mobile Ethical Hacking',
      issuer: 'EC-Council',
      date: 'Dec 2024',
      image: '/thecompletemobileethicalhacking.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'EC-Council',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'End-to-End Mobile Security',
    description: 'Completed a comprehensive program that covers mobile security from start to finish, focusing on app security, penetration testing, malware analysis, and securing mobile networks using industry-standard tools.',
    mainCertificate: {
      title: 'End-to-End Mobile Security',
      issuer: 'EC-Council',
      date: 'Dec 2024',
      image: '/endtoendmobilesecurity.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'EC-Council',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'Practical Internet of Things Hacking',
    description: 'Completed a hands-on program that focuses on IoT security, including penetration testing, vulnerability assessment, and exploiting weaknesses in IoT devices and networks using practical tools and techniques.',
    mainCertificate: {
      title: 'Practical Internet of Things Hacking',
      issuer: 'EC-Council',
      date: 'Dec 2024',
      image: '/practicalinternetofthings.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'EC-Council',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'Foundation of Hacking and Pentesting Android Apps',
    description: 'Completed a foundational program on hacking and penetration testing of Android apps, covering security vulnerabilities, exploit techniques, and securing mobile applications against attacks.',
    mainCertificate: {
      title: 'Poundation of Hacking and Pentesting Android Apps',
      issuer: 'EC-Council',
      date: 'Dec 2024',
      image: '/foundationofhacking.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'EC-Council',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'The Complete Guide to Android Bug Bounty Penetration Tests',
    description: 'Completed a comprehensive program on Android bug bounty penetration testing, focusing on identifying, exploiting, and reporting vulnerabilities in Android apps to earn bug bounties.',
    mainCertificate: {
      title: 'The Complete Guide to Android Bug Bounty Penetration Tests',
      issuer: 'EC-Council',
      date: 'Dec 2024',
      image: '/bugbounty.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'EC-Council',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'Hands-on Android Security',
    description: 'Completed a practical program on Android security, covering vulnerability assessment, penetration testing, and securing Android apps from potential threats and exploits.',
    mainCertificate: {
      title: 'Hands-on Android Security',
      issuer: 'EC-Council',
      date: 'Dec 2024',
      image: '/handsonsecurity.png?height=200&width=300',
    },
    subCertificates: [
      {
        title: 'No Sub-Certificates',
        issuer: 'EC-Council',
        date: '',
        image: '',
      },
    ],
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    description: 'Completed the AWS Cloud Practitioner Essentials certificate, covering foundational knowledge of AWS services, cloud concepts, pricing models, and security best practices.',
    mainCertificate: {
      title: 'AWS Cloud Practitioner Essentials',
      issuer: 'AWS Training and Certification',
      date: 'Jan 2025',
      image: '/AWS Course Completion Certificate.jpg?height=200&width=300',
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

