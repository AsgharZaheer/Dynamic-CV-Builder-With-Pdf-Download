'use cliennt'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { jsPDF } from 'jspdf'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Trash2, Download } from 'lucide-react'

type Experience = {
  company: string
  position: string
  duration: string
  description: string
}

type Education = {
  school: string
  degree: string
  year: string
}

export default function ResumeBuilder() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [experiences, setExperiences] = useState<Experience[]>([{ company: '', position: '', duration: '', description: '' }])
  const [education, setEducation] = useState<Education[]>([{ school: '', degree: '', year: '' }])
  const [skills, setSkills] = useState<string[]>([''])
  
  const resumeRef = useRef<HTMLDivElement>(null)

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index][field] = value
    setExperiences(updatedExperiences)
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...education]
    updatedEducation[index][field] = value
    setEducation(updatedEducation)
  }

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills]
    updatedSkills[index] = value
    setSkills(updatedSkills)
  }

  const addExperience = () => setExperiences([...experiences, { company: '', position: '', duration: '', description: '' }])
  const removeExperience = (index: number) => setExperiences(experiences.filter((_, i) => i !== index))

  const addEducation = () => setEducation([...education, { school: '', degree: '', year: '' }])
  const removeEducation = (index: number) => setEducation(education.filter((_, i) => i !== index))

  const addSkill = () => setSkills([...skills, ''])
  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index))

  const downloadResume = () => {
    if (resumeRef.current) {
      const pdf = new jsPDF()
      pdf.html(resumeRef.current, {
        callback: function (pdf) {
          pdf.save('resume.pdf')
        },
        x: 10,
        y: 10,
        width: 190,
        windowWidth: 650
      })
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6 md:p-8 bg-blue-600 text-white">
          <h1 className="text-3xl font-bold mb-2">Dynamic Resume Builder</h1>
          <p>Create your professional resume with ease</p>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Personal Information</h2>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Full Name"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-label="Phone"
                />
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Work Experience</h2>
              <AnimatePresence>
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 mb-4 p-4 border border-blue-200 rounded-lg"
                  >
                    <Input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      aria-label={`Company for experience ${index + 1}`}
                    />
                    <Input
                      type="text"
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                      aria-label={`Position for experience ${index + 1}`}
                    />
                    <Input
                      type="text"
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                      aria-label={`Duration for experience ${index + 1}`}
                    />
                    <Textarea
                      placeholder="Job Description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      aria-label={`Job Description for experience ${index + 1}`}
                    />
                    <Button variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button onClick={addExperience} className="mt-2">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Education</h2>
              <AnimatePresence>
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 mb-4 p-4 border border-blue-200 rounded-lg"
                  >
                    <Input
                      type="text"
                      placeholder="School"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                      aria-label={`School for education ${index + 1}`}
                    />
                    <Input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      aria-label={`Degree for education ${index + 1}`}
                    />
                    <Input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                      aria-label={`Year for education ${index + 1}`}
                    />
                    <Button variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button onClick={addEducation} className="mt-2">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Skills</h2>
              <AnimatePresence>
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Input
                      type="text"
                      placeholder="Skill"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      aria-label={`Skill ${index + 1}`}
                    />
                    <Button variant="destructive" size="sm" onClick={() => removeSkill(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button onClick={addSkill} className="mt-2">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </section>
          </div>
          <div className="space-y-6">
            <div ref={resumeRef} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Resume Preview</h2>
              <div className="space-y-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <p>{email} | {phone}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <h3 className="text-lg font-semibold text-blue-600">Work Experience</h3>
                  {experiences.map((exp, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-semibold">{exp.position} at {exp.company}</p>
                      <p className="text-sm">{exp.duration}</p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                  <h3 className="text-lg font-semibold text-blue-600">Education</h3>
                  {education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-sm">{edu.school}, {edu.year}</p>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                  <h3 className="text-lg font-semibold text-blue-600">Skills</h3>
                  <p>{skills.join(', ')}</p>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button onClick={downloadResume} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Resume as PDF
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
