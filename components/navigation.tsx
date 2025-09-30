"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Satellite } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Satellite className="h-6 w-6 text-primary" />
            <span>LEO Lab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#visualization" className="text-sm font-medium hover:text-primary transition-colors">
              3D Visualization
            </Link>
            <Link href="#investor" className="text-sm font-medium hover:text-primary transition-colors">
              Investor Metrics
            </Link>
            <Link href="#compliance" className="text-sm font-medium hover:text-primary transition-colors">
              Compliance
            </Link>
            <Link href="#dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="#team" className="text-sm font-medium hover:text-primary transition-colors">
              Team
            </Link>
            <Button size="sm" asChild>
              <Link href="#visualization">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="#visualization"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              3D Visualization
            </Link>
            <Link
              href="#investor"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Investor Metrics
            </Link>
            <Link
              href="#compliance"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Compliance
            </Link>
            <Link
              href="#dashboard"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="#team"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Team
            </Link>
            <Button size="sm" className="w-full" asChild>
              <Link href="#visualization" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
