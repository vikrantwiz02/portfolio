import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = ['About', 'Skills', 'Projects', 'Achievements', 'Contact']

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.h1
            className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400"
            whileHover={{ scale: 1.05 }}
          >
            Vikrant Kumar
          </motion.h1>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                {menuItems.map((item) => (
                  <motion.li key={item} whileHover={{ scale: 1.1 }}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="bg-white/10 dark:bg-black/10 border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-white/10 dark:bg-black/10 border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.nav
            className="mt-4 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <motion.li key={item} whileHover={{ scale: 1.05 }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    onClick={toggleMenu}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}

export default Header

