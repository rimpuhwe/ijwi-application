"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-[#0E0E0E] min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[55vh] sm:min-h-[70vh] md:min-h-[95vh] py-16 sm:py-24 md:py-32 px-4 sm:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
            alt="About Hero - Sound Studio"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center py-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-xl leading-tight sm:leading-tight">
            About <span className="text-[#F97316]">IJWI Hub</span>
          </h1>
          <p className="text-base sm:text-xl text-[#F3F4F6] leading-relaxed font-light drop-shadow text-center max-w-md sm:max-w-xl">
            We are a creative innovation and sound technology hub dedicated to empowering creators and communities through cutting-edge audiovisual production and storytelling.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#F3F4F6] mb-4">
              Our Mission
            </h2>
            <p className="text-[#9CA3AF] leading-relaxed text-lg mb-6">
              Empowering creators and communities through sound and technology.
              We believe in the transformative power of storytelling and are
              committed to providing the tools, expertise, and support needed to
              bring creative visions to life.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#F97316] rounded-full mt-2 block"></span>
                <span className="text-[#9CA3AF]">
                  To empower local talent and nurture African sound
                  professionals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#F97316] rounded-full mt-2 block"></span>
                <span className="text-[#9CA3AF]">
                  To support and collaborate with independent film and media
                  productions
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#F97316] rounded-full mt-2 block"></span>
                <span className="text-[#9CA3AF]">
                  To train and inspire the next generation shaping the future of
                  African sound
                </span>
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1765533125/WhatsApp_Image_2025-12-03_at_3.16.33_PM_qdysif.jpg"
              alt="Mission Visual - Mixing Console"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1765533208/WhatsApp_Image_2025-12-03_at_3.16.29_PM_ulb4tz.jpg"
              alt="Vision Visual - Teamwork"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-[#F3F4F6] mb-4">
              Our Vision
            </h2>
            <p className="text-[#9CA3AF] leading-relaxed text-lg mb-6">
              To lead Africa's creative sound innovation and storytelling
              revolution. We envision a future where every creator has access to
              world-class production facilities and expertise to share their
              unique stories with the world.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#C5A36C] rounded-full mt-2 block"></span>
                <span className="text-[#9CA3AF]">
                  To elevate African cinema and media through world-class sound
                  design and post-production
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#C5A36C] rounded-full mt-2 block"></span>
                <span className="text-[#9CA3AF]">
                  To blend modern technology with Africa’s rich storytelling
                  traditions
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#C5A36C] rounded-full mt-2 block"></span>
                <span className="text-[#9CA3AF]">
                  To make sound the soulful core of every African story
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] text-center mb-4">
            Our Values
          </h2>
          <p className="text-[#9CA3AF] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            The principles that guide everything we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#F97316] mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343L4.929 4.929"
                    />
                  </svg>
                ),
                title: "Creativity",
                description: "Innovative thinking and artistic expression",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#F97316] mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 7v-7"
                    />
                  </svg>
                ),
                title: "Authenticity",
                description: "Genuine stories that resonate",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#F97316] mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 6v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a6 6 0 0112 0z"
                    />
                  </svg>
                ),
                title: "Collaboration",
                description: "Working together for success",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#F97316] mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ),
                title: "Empowerment",
                description: "Enabling creators to thrive",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-[#F97316] mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.505l6.908-1.004L12 2.75l3.092 5.751L22 9.505l-5.007 4.617 1.179 6.873z"
                    />
                  </svg>
                ),
                title: "Excellence",
                description: "Delivering outstanding quality",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-[#0E0E0E] border border-[#27272A] hover:border-[#F97316] transition-colors rounded-xl p-6 text-center shadow-lg flex flex-col items-center"
              >
                {value.icon}
                <h3 className="text-lg font-semibold text-[#F3F4F6] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
