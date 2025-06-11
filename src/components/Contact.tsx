"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { SectionContainer } from "@/components/section-container"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { TiltCard } from "@/components/ui/tilt-card"
import { SectionTransition } from "@/components/section-transition"
import { submitContactForm, testEmailConfiguration } from "@/app/actions/contact"

export function ContactSection() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Client-side validation
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }

    startTransition(async () => {
      try {
        const formDataObj = new FormData()
        formDataObj.append("name", formData.name.trim())
        formDataObj.append("email", formData.email.trim())
        formDataObj.append("subject", formData.subject.trim())
        formDataObj.append("message", formData.message.trim())
        formDataObj.append("userAgent", navigator.userAgent)

        const result = await submitContactForm(formDataObj)

        if (result.success) {
          setIsSubmitted(true)
          setFormData({ name: "", email: "", subject: "", message: "" })
          setErrors({})
          toast({
            title: "Message sent successfully!",
            description: result.message,
            duration: 5000,
          })
        } else {
          toast({
            title: "Failed to send message",
            description: result.message,
            variant: "destructive",
            duration: 8000,
          })
        }
      } catch (error) {
        console.error("Form submission error:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again or contact me directly.",
          variant: "destructive",
          duration: 5000,
        })
      }
    })
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setErrors({})
  }

  // Test email configuration (for debugging)
  const testEmail = async () => {
    try {
      const result = await testEmailConfiguration()
      toast({
        title: result.success ? "Email Configuration Valid" : "Email Configuration Error",
        description: result.message,
        variant: result.success ? "default" : "destructive",
        duration: 5000,
      })
    } catch (error) {
      toast({
        title: "Test Failed",
        description: "Could not test email configuration",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  return (
    <SectionContainer id="contact" className="bg-black/20">
      <SectionTransition transitionType="fade">
        <SectionHeading
          title="Contact Me"
          subtitle="Have a question or want to work together? Feel free to reach out!"
        />
      </SectionTransition>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SectionTransition transitionType="slide-right" delay={0.2}>
          <TiltCard maxTilt={8} scale={1.02}>
            <Card className="glass h-full glow">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-semibold">Contact Information</h3>

                <div className="space-y-6">
                  <ContactItem icon={<Mail className="h-5 w-5 text-primary" />} title="Email">
                    <a
                      href="mailto:2022uee0138@iitjammu.ac.in"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      2022uee0138@iitjammu.ac.in
                    </a>
                  </ContactItem>

                  <ContactItem icon={<Phone className="h-5 w-5 text-primary" />} title="Phone">
                    <a
                      href="tel:+919103553896"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 9103553896
                    </a>
                  </ContactItem>

                  <ContactItem icon={<Linkedin className="h-5 w-5 text-primary" />} title="LinkedIn">
                    <a
                      href="https://linkedin.com/in/nageshwar-kumar-mehta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      linkedin.com/in/nageshwar-kumar-mehta
                    </a>
                  </ContactItem>

                  <ContactItem icon={<Github className="h-5 w-5 text-primary" />} title="GitHub">
                    <a
                      href="https://github.com/nageshwar-mehta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      github.com/nageshwar-mehta
                    </a>
                  </ContactItem>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-muted-foreground mb-4">
                    Currently a pre-final year student at IIT Jammu. Open to internship and collaboration opportunities.
                  </p>

                  {/* Debug button - remove in production */}
                  {process.env.NODE_ENV === "development" && (
                    <Button variant="outline" size="sm" onClick={testEmail} className="glass glass-hover text-xs">
                      Test Email Config
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </SectionTransition>

        <SectionTransition transitionType="slide-left" delay={0.4}>
          <TiltCard maxTilt={8} scale={1.02}>
            <Card className="glass glow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                    <div className="rounded-full bg-green-500/10 p-3">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h4 className="text-lg font-medium">Message Sent Successfully!</h4>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you as soon as possible. You should also receive a
                      confirmation email shortly.
                    </p>
                    <Button variant="outline" onClick={resetForm} className="glass glass-hover">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`glass border-white/5 focus-visible:ring-purple-500 focus-visible:border-purple-500/50 ${
                            errors.name ? "border-red-500 focus-visible:border-red-500" : ""
                          }`}
                          disabled={isPending}
                        />
                        {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`glass border-white/5 focus-visible:ring-purple-500 focus-visible:border-purple-500/50 ${
                            errors.email ? "border-red-500 focus-visible:border-red-500" : ""
                          }`}
                          disabled={isPending}
                        />
                        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject of your message"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`glass border-white/5 focus-visible:ring-purple-500 focus-visible:border-purple-500/50 ${
                          errors.subject ? "border-red-500 focus-visible:border-red-500" : ""
                        }`}
                        disabled={isPending}
                      />
                      {errors.subject && <p className="text-xs text-red-400">{errors.subject}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message *{" "}
                        <span className="text-xs text-muted-foreground">({formData.message.length}/2000)</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message (minimum 5 characters)"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`glass border-white/5 focus-visible:ring-purple-500 focus-visible:border-purple-500/50 ${
                          errors.message ? "border-red-500 focus-visible:border-red-500" : ""
                        }`}
                        disabled={isPending}
                      />
                      {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="h-3 w-3" />
                      <span>
                        If the form doesn't work, please contact me directly at{" "}
                        <a href="mailto:2022uee0138@iitjammu.ac.in" className="text-primary hover:underline">
                          2022uee0138@iitjammu.ac.in
                        </a>
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      * Required fields. Your information will be kept confidential.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </TiltCard>
        </SectionTransition>
      </div>
    </SectionContainer>
  )
}

interface ContactItemProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

function ContactItem({ icon, title, children }: ContactItemProps) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="glass p-2 rounded-full shrink-0 mt-0.5 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/20">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        {children}
      </div>
    </div>
  )
}
