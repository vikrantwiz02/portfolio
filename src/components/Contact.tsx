'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden shadow-lg max-w-mx">
            <CardHeader className="bg-primary text-primary-foreground p-6 md:p-10">
              <CardTitle className="text-3xl md:text-4xl font-bold text-center">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Contact Information</h3>
                  <div className="space-y-4">
                    <motion.a
                      href="mailto:vikrantkrd@gmail.com"
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      <EnvelopeIcon className="h-5 w-5 mr-2" />
                      vikrantkrd@gmail.com
                    </motion.a>
                    <motion.a
                      href="tel:+918306721779"
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      +91 8306721779
                    </motion.a>
                    <motion.p
                      className="flex items-center text-gray-600 dark:text-gray-300"
                      whileHover={{ x: 5 }}
                    >
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      IIITDM Jabalpur
                    </motion.p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact