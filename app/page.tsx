import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LiveKPIBanner } from "@/components/live-kpi-banner"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
const EnhancedEarth3D = dynamic(
  () =>
    import("@/components/earth-3d-quantum").catch((err) => {
      console.error("[v0] Failed to load Earth 3D component:", err)
      return {
        default: () => (
          <div className="h-[700px] flex items-center justify-center bg-muted rounded-lg">
            <p className="text-muted-foreground">Failed to load 3D visualization</p>
          </div>
        ),
      }
    }),
  {
    ssr: false,
    loading: () => (
      <div className="h-[700px] flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-lg border border-primary/20">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading 3D Visualization...</p>
        </div>
      </div>
    ),
  },
)
import { InvestorDashboard } from "@/components/investor-dashboard"
import { ComplianceDashboard } from "@/components/compliance-dashboard"
import { VisualizationDashboard } from "@/components/visualization-dashboard"
import { OrbitHealthIndex } from "@/components/orbit-health-index"
import { ComplianceChecker } from "@/components/compliance-checker"
import { ScenarioSimulator } from "@/components/scenario-simulator"
import { ClimateAnalytics } from "@/components/climate-analytics"
import { EnvironmentalEvents } from "@/components/environmental-events"
import { SustainabilityLedger } from "@/components/sustainability-ledger"
import { ESGDashboard } from "@/components/esg-dashboard"
import { TeamSection } from "@/components/team-section"

export default function Home() {
  console.log("[v0] Rendering Home page")

  return (
    <main className="min-h-screen">
      <Navigation />

      <HeroSection />

      <LiveKPIBanner />

      <StatsSection />

      <section id="features">
        <FeaturesSection />
      </section>

      <section id="visualization" className="py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-accent/10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance holographic">
              Quantum Earth Visualization
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Experience real-time holographic Earth with interactive satellite tracking, environmental data layers, and
              quantum-enhanced visual effects. Click satellites to see mission details and operational status.
            </p>
          </div>
          <EnhancedEarth3D />
        </div>
      </section>

      <section id="investor" className="py-20 px-4 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <InvestorDashboard />
        </div>
      </section>

      <section id="compliance" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ComplianceDashboard />
        </div>
      </section>

      <section id="dashboard" className="py-20 px-4 bg-accent/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Operational Dashboard</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Real-time orbital monitoring and environmental intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <VisualizationDashboard />
            <div className="space-y-8">
              <OrbitHealthIndex />
              <ScenarioSimulator />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ComplianceChecker />
            <EnvironmentalEvents />
          </div>

          <ClimateAnalytics />

          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Sustainability & ESG</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                Comprehensive tracking and verification of environmental initiatives
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SustainabilityLedger />
              <ESGDashboard />
            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <TeamSection />
      </section>

      <footer className="py-12 px-4 border-t border-border bg-accent/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-2">Team Anthrogen</p>
          <p className="text-xs text-muted-foreground">See LEO. Know Risk. Ensure Sustainability.</p>
          {/* <p className="text-xs text-muted-foreground mt-4">Powered by NASA Open Data APIs</p> */}
        </div>
      </footer>
    </main>
  )
}
