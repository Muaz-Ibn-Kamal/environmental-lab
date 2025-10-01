"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

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
      expertise: [
        "Low-Level Systems",
        "Cybersecurity",
        "Backend Development",
        "DevSecOps",
      ],
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
    <section className="py-16 px-4 relative bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            className="text-base text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A passionate group of innovators shaping the future of space sustainability
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="overflow-hidden rounded-2xl group hover:shadow-lg hover:shadow-primary/10 transition-all duration-500">
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.expertise.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5 group-hover:bg-primary/10"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {member.expertise.length > 3 && (
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                        +{member.expertise.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
