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
        "OS Internals",
        "Cybersecurity",
        "Penetration Testing",
        "Backend Development",
        "DevSecOps",
        "Embedded Systems",
        "Intrusion Detection",
        "Server Automation",
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
      expertise: ["Business Model Crafting", "Business Analysis", "Market Research"],
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
    <section className="py-20 px-4 relative bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A diverse group of experts dedicated to advancing space sustainability and environmental monitoring
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-4">{member.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs group-hover:bg-primary/20 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
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
