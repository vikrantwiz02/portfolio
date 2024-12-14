import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Shield, GraduationCap } from 'lucide-react'
import Image from 'next/image'; // Import Image from next/image

const About: React.FC = () => {
  return (
    <section id="about" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-morphism overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-center text-gradient">
              🌟 About Me 🌟
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row items-center gap-8">
            <motion.div
              className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src="/profile.jpeg?height=192&width=192" 
                alt="Profile" 
                width={192} 
                height={192} 
                className="w-full h-full object-cover" 
              />
            </motion.div>
            <div className="flex-1 space-y-6">
              <p className="text-lg text-center lg:text-left">
                I am a dedicated Web Developer with a growing interest and developing expertise in Cybersecurity. 
                Currently, I am in the learning phase, building skills to integrate secure practices into modern web applications. 
                As a 2nd-year Computer Science and Engineering student, I&apos;m committed to continuous improvement and staying ahead in the tech landscape.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-500/10 border-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-500">
                      <Code className="mr-2" /> Web Development
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Experience with HTML, CSS, JavaScript, and learning React.js, TypeScript, and Tailwind CSS.</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-500/10 border-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-500">
                      <Shield className="mr-2" /> Cybersecurity
                    </CardTitle>
                  </CardHeader>
                  <CardContent> {/* Corrected here */}
                    <p>Completed Google Cybersecurity Professional Certificate. Skills in Python, Linux, SQL, SIEM tools, and IDS.</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-500/ 10 border-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-500">
                      <GraduationCap className="mr-2" /> Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside">
                      <li>Combine web development and cybersecurity</li>
                      <li>Continuous learning and growth</li>
                      <li>Connect with tech professionals</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

export default About