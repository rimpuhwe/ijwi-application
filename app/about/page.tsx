import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Mic, Users, Rocket, Star } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F3F4F6] mb-6 text-balance">
            About <span className="text-[#F97316]">IJWI Hub</span>
          </h1>
          <p className="text-lg text-[#9CA3AF] leading-relaxed text-pretty">
            We are a creative innovation and sound technology hub dedicated to empowering creators and communities
            through cutting-edge audiovisual production and storytelling.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#F3F4F6] mb-4">Our Mission</h2>
              <p className="text-[#9CA3AF] leading-relaxed text-lg">
                Empowering creators and communities through sound and technology. We believe in the transformative power
                of storytelling and are committed to providing the tools, expertise, and support needed to bring
                creative visions to life.
              </p>
            </div>
            <Card className="bg-[#0E0E0E] border-[#27272A]">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#F97316] rounded-full mt-2"></div>
                    <p className="text-[#9CA3AF]">Professional audio and video production services</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#F97316] rounded-full mt-2"></div>
                    <p className="text-[#9CA3AF]">State-of-the-art recording and editing facilities</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#F97316] rounded-full mt-2"></div>
                    <p className="text-[#9CA3AF]">Expert guidance and creative collaboration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="bg-[#1A1A1A] border-[#27272A] lg:order-1">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#C5A36C] rounded-full mt-2"></div>
                    <p className="text-[#9CA3AF]">Leading Africa's creative sound innovation</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#C5A36C] rounded-full mt-2"></div>
                    <p className="text-[#9CA3AF]">Pioneering storytelling revolution</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#C5A36C] rounded-full mt-2"></div>
                    <p className="text-[#9CA3AF]">Building a thriving creative ecosystem</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="lg:order-2">
              <h2 className="text-3xl font-bold text-[#F3F4F6] mb-4">Our Vision</h2>
              <p className="text-[#9CA3AF] leading-relaxed text-lg">
                To lead Africa's creative sound innovation and storytelling revolution. We envision a future where every
                creator has access to world-class production facilities and expertise to share their unique stories with
                the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] text-center mb-4">Our Values</h2>
          <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            The principles that guide everything we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Creativity",
                description: "Innovative thinking and artistic expression",
              },
              {
                icon: Mic,
                title: "Authenticity",
                description: "Genuine stories that resonate",
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Working together for success",
              },
              {
                icon: Rocket,
                title: "Empowerment",
                description: "Enabling creators to thrive",
              },
              {
                icon: Star,
                title: "Excellence",
                description: "Delivering outstanding quality",
              },
            ].map((value, index) => (
              <Card key={index} className="bg-[#0E0E0E] border-[#27272A] hover:border-[#F97316] transition-colors">
                <CardContent className="p-6 text-center">
                  <value.icon className="w-10 h-10 text-[#F97316] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#F3F4F6] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
