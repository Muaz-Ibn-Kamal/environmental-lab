"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface TeamMember {
  name: string
  role: string
  expertise: string[]
  image: string
}

export function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: "Muaz Ibn Kamal",
      role: "Team Lead",
      expertise: ["Project Management", "Strategic Planning", "Team Coordination"],
      image: "/team/muaz-ibn-kamal.jpg",
    },
    {
      name: "Mahbub Anam",
      role: "Systems & Security Engineer",
      expertise: ["Low-Level Systems", "Cybersecurity", "Backend Development", "DevSecOps"],
      image: "/team/mahbub-anam.jpg",
    },
    {
      name: "Rafi Ahmed Fida",
      role: "Data & Backend Developer",
      expertise: ["Data Analysis", "Backend Development", "API Design"],
      image: "/team/rafi-ahmed-fida.jpg",
    },
    {
      name: "Md Mirajul Islam",
      role: "Business Strategist",
      expertise: ["Business Model", "Business Analysis", "Market Research"],
      image: "/team/mirajul-islam.jpg",
    },
    {
      name: "Nuren Tasnim",
      role: "Content & Communications",
      expertise: ["Storytelling", "Content Writing", "Voice Artist"],
      image: "/team/nuren-tasnim.jpg",
    },
    {
      name: "Raid Hossain Neloy",
      role: "Graphics Designer",
      expertise: ["Visual Design", "UI/UX Design", "Brand Identity"],
      image: "/team/raid-hossain-neloy.jpg",
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A passionate group of innovators shaping the future of space sustainability
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center max-w-[200px] text-center"
          >
            {/* Circular Image */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg group hover:shadow-xl transition-shadow duration-500">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Name & Role */}
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-primary mb-3">{member.role}</p>

            {/* Expertise Badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {member.expertise.slice(0, 3).map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-[10px] px-2 py-1"
                >
                  {skill}
                </Badge>
              ))}
              {member.expertise.length > 3 && (
                <Badge variant="secondary" className="text-[10px] px-2 py-1">
                  +{member.expertise.length - 3}
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
