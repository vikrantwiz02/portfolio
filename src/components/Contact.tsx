'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
          variant: "default",
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Send me a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
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