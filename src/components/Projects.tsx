'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Code, Shield } from 'lucide-react'

const projects = [
  {
    title: 'Army Arms Management System',
    description: 'The Army Arms Management System (AAMS) streamlines the tracking, storage, and distribution of weapons, ammunition, and military equipment. It ensures accurate inventory, improves security, and optimizes logistics, supporting operational efficiency and readiness.',
    image: '/aams.png?height=200&width=300',
    tags: ['HTML', 'CSS', 'PHP', 'MySQL', 'JavaScript'],
    github: 'https://github.com/vikrantwiz02/army-arms-management-system',
    live: 'https://drive.google.com/file/d/1HzdHZwedvgV14mAlRdgwKQu7aWzJY4ex/view?usp=sharing',
    type: 'web',
  },
  {
    title: 'Saviour',
    description: 'Saviour is a technology-driven solution designed to save lives during natural disasters. It features real-time alerts, navigation assistance, resource availability tracking, user-to-user support, and offline communication. By integrating weather forecasting and innovative technologies, Saviour ensures timely information and aid to those in need, enhancing disaster preparedness and response.',
    image: '/Saviour.png?height=200&width=300',
    tags: ['TypeScript', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/vikrantwiz02/SAVIOUR',
    live: 'https://drive.google.com/file/d/11MtDJCIcEl4Fgp5eM4wybGQ0oZBjyUvH/view?usp=sharing',
    type: 'web',
  },
  {
    title: 'Kavach',
    description: 'Kavach is a web application designed to address workplace sexual harassment by enabling users to lodge complaints, track their status in real-time, and send emergency SOS alerts with live location sharing. It aims to provide a safe, transparent, and supportive environment for individuals facing harassment in the workplace.',
    image: '/kavach.png?height=200&width=300',
    tags: ['TypeScript', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/vikrantwiz02/KAVACH',
    live: 'https://drive.google.com/file/d/1YVGRA76clSaDif01R5Vq9LlGIXgC5mLH/view?usp=sharing',
    type: 'web',
  },
  {
    title: 'Saviour2.0',
    description: 'Saviour is a technology-driven solution designed to save lives during natural disasters. It features real-time alerts, navigation assistance, resource availability tracking, user-to-user support, and offline communication. By integrating weather forecasting and innovative technologies, Saviour ensures timely information and aid to those in need, enhancing disaster preparedness and response.',
    image: '/Saviour2.png?height=200&width=300',
    tags: ['TypeScript', 'JavaScript', 'Tailwind CSS','React.js','MongoDB'],
    github: 'https://github.com/vikrantwiz02/Saviour2',
    live: 'https://saviour-chi.vercel.app/',
    type: 'web',
  },
  {
    title: 'Portfolio',
    description: 'My portfolio serves as a comprehensive showcase of my work, highlighting projects across web development and cybersecurity. It reflects my ability to create innovative solutions, combining creativity and technical expertise to solve real-world problems. Through this collection of projects, I aim to demonstrate my commitment to continuous learning and growth in the tech field.',
    image: '/portfolio.png?height=200&width=300',
    tags: ['TypeScript', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/vikrantwiz02/portfolio',
    live: 'https://vikrant-portfolio-kappa.vercel.app/',
    type: 'web',
  },
  {
    title: 'Magic Form Builder',
    description: 'Magic Form Builder is a dynamic tool for creating forms effortlessly, similar to Google Forms. It enables users to design forms through an intuitive interface, with a real-time preview feature to visualize how the final form will appear.  It simplifies form creation by allowing users to build, edit, save, delete, and preview forms, making integration into projects seamless.',
    image: '/magic-form-builder.png?height=200&width=300',
    tags: ['TypeScript', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/vikrantwiz02/Magic-Form-Builder',
    live: '',
    type: 'web',
  },
  {
    title: 'IIITDMJ Unofficial Website',
    description: 'The IIITDMJ Unofficial Website is a fully responsive, full-stack project covering frontend, backend, and database storage. Designed to provide key insights into academics, campus life, and events, this independent platform ensures seamless accessibility and engagement for students and aspirants.',
    image: '/iiitdmj-website.png?height=200&width=300',
    tags: ['TypeScript', 'JavaScript', 'Tailwind CSS','Next.js','MongoDB','Clerk'],
    github: 'https://github.com/vikrantwiz02/iiitdmj-website',
    live: 'https://iiitdmj-ten.vercel.app/',
    type: 'web',
  },
  {
    title: 'Koinx Assessment',
    description: 'Developed a responsive web app using React.js and TypeScript, integrating real-time cryptocurrency data from Coingecko APIs and interactive charts from TradingView. Delivered a production-grade project with dynamic components and a clean, scalable codebase.',
    image: '/koinx.png?height=200&width=300',
    tags: ['TypeScript', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/vikrantwiz02/koinx',
    live: 'https://koinx-iota-one.vercel.app/',
    type: 'web',
  },
]

const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  const handleImageClick = (index: number) => {
    setClickedIndex(clickedIndex === index ? null : index)
  }

  const isOverlayVisible = (index: number) => hoveredIndex === index || clickedIndex === index

  return (
    <section id="projects" className="py-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gradient">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card className="h-full glass-morphism overflow-hidden border-2 border-blue-500/20 dark:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center text-blue-600 dark:text-blue-400">
                  {project.type === 'web' ? <Code className="mr-2 text-blue-500" /> : <Shield className="mr-2 text-purple-500" />}
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="relative h-48 mb-4 overflow-hidden rounded-md cursor-pointer"
                  onClick={() => handleImageClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleImageClick(index)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Toggle ${project.title} project details`}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                  {isOverlayVisible(index) && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Button variant="secondary" size="sm" asChild className="mr-2">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                      </Button>
                      <Button variant="secondary" size="sm" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Demo
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Projects

