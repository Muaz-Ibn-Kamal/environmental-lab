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
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3">Our Stellar Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovators, strategists, and creators driving space sustainability forward
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-500 border border-gray-100">
                <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-4">{member.role}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-[11px] px-2 py-1 hover:bg-primary/10 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {member.expertise.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-[11px] px-2 py-1"
                      >
                        +{member.expertise.length - 3} more
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
