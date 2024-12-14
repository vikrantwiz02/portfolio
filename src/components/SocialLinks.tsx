import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Code, Shield, Twitter, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

const socialLinks = [
  { icon: Github, url: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter, url: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: Code, url: 'https://stackoverflow.com/users/youruserid', label: 'Stack Overflow' },
  { icon: Shield, url: 'https://tryhackme.com/p/yourusername', label: 'TryHackMe' },
  { icon: Globe, url: 'https://yourblog.com', label: 'Personal Blog' },
]

const SocialLinks: React.FC = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gradient">
        Connect With Me
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks.map((link, index) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="glow-on-hover"
          >
            <Button variant="outline" size="icon" asChild className="bg-white/10 dark:bg-black/10 border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
              <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                <link.icon className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default SocialLinks

