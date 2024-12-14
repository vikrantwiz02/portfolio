import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Code, Shield } from 'lucide-react'

const projects = [
  {
    title: 'Secure E-commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB, implementing robust security measures.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Security'],
    github: 'https://github.com/yourusername/secure-ecommerce-platform',
    live: 'https://secure-ecommerce-platform-demo.com',
    type: 'web',
  },
  {
    title: 'Cybersecurity Dashboard',
    description: 'A comprehensive dashboard for monitoring and analyzing security threats using Python and data visualization tools.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Python', 'Data Visualization', 'Security Analytics'],
    github: 'https://github.com/yourusername/cybersecurity-dashboard',
    live: 'https://cybersecurity-dashboard-demo.com',
    type: 'cyber',
  },
  {
    title: 'Secure Task Management App',
    description: 'A Kanban-style task management application built with React and Firebase, featuring end-to-end encryption.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['React', 'Firebase', 'Encryption', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/secure-task-management-app',
    live: 'https://secure-task-app-demo.com',
    type: 'web',
  },
]

const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
                <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Button variant="secondary" size="sm" asChild className="mr-2">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                      </Button>
                      <Button variant="secondary" size="sm" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
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

