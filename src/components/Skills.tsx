import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Code } from 'lucide-react'

const webDevSkills = [
  'HTML', 'CSS', 'PHP', 'JavaScript', 'ReactJS', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'Git', 'MySQL', 'Python', 'Linux', 'SQL'
]

const SkillCategory: React.FC<{ title: string; icon: React.ReactNode; skills: string[] }> = ({ title, icon, skills }) => (
  <Card className="glass-morphism overflow-hidden">
    <CardHeader>
      <CardTitle className="text-2xl font-bold flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="glow-on-hover"
          >
            <Badge variant="outline" className="text-sm font-semibold px-3 py-1 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300">
              {skill}
            </Badge>
          </motion.div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gradient">
        Skills
      </h2>
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          <SkillCategory title="Web Development" icon={<Code className="text-blue-500" />} skills={webDevSkills} />
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

