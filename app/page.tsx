"use client"
import { useRef, useEffect, useState } from "react"
import { Camera, Film, Layers, Zap, Play, MessageSquare, Instagram, Youtube, Linkedin, Mail, MessageCircle, CheckCircle, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

// Initialize EmailJS
emailjs.init("LDAiErYYHHkIijklE")

function VideoCard({ item }: { item: { category: string; title: string; video: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-900 border border-white/5 hover:border-neon-purple/50 transition-all">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        loop
        playsInline
        controlsList="nodownload"
      >
        <source src={item.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-neon-purple font-bold mb-1 block">
          {item.category}
        </span>
        <h3 className="text-sm font-bold uppercase">{item.title}</h3>
      </div>
    </div>
  )
}

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus(null)

    const form = formRef.current
    if (!form) return

    const name = (form.querySelector('input[placeholder="Your Name"]') as HTMLInputElement)?.value || ""
    const email = (form.querySelector('input[placeholder="hello@company.com"]') as HTMLInputElement)?.value || ""
    const projectType = (form.querySelector('input[placeholder="e.g., Commercial, Social Content, Music Video"]') as HTMLInputElement)?.value || ""
    const message = (form.querySelector('textarea') as HTMLTextAreaElement)?.value || ""

    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please fill in all required fields" })
      setIsLoading(false)
      return
    }

    try {
      await emailjs.send("service_evcg2zy", "template_yjbp927", {
        to_email: "arvinadove1128@gmail.com",
        from_name: name,
        from_email: email,
        project_type: projectType || "Not specified",
        message: message,
        reply_to: email,
      })

      setStatus({ type: "success", message: "Inquiry sent successfully! I'll get back to you soon." })
      form.reset()
    } catch (error) {
      console.error("[v0] Email error:", error)
      setStatus({
        type: "error",
        message: "Failed to send inquiry. Please try again.",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Name *</label>
            <input
              type="text"
              name="name"
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-neon-purple outline-none transition-colors"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Email *</label>
            <input
              type="email"
              name="email"
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-neon-purple outline-none transition-colors"
              placeholder="hello@company.com"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Project Type</label>
          <input
            type="text"
            name="projectType"
            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-neon-purple outline-none transition-colors"
            placeholder="e.g., Commercial, Social Content, Music Video"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Message *</label>
          <textarea
            name="message"
            rows={4}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 focus:border-neon-purple outline-none transition-colors resize-none"
            placeholder="Tell me about your project..."
            required
          ></textarea>
        </div>

        {status && (
          <div
            className={`flex items-center gap-3 p-4 rounded-xl ${
              status.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-300"
                : "bg-red-500/10 border border-red-500/20 text-red-300"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm">{status.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-neon-purple hover:text-white transition-all glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <main className="relative overflow-hidden bg-black text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-glow-gradient opacity-50" />
        <div className="light-arc" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-purple-900/10 to-transparent" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-10 text-center md:px-20 lg:flex-row lg:text-left lg:justify-between">
        <div className="max-w-2xl lg:pr-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-tight">
            READY TO MAKE <span className="text-neon-purple glow-text-purple animate-pulse">CHANGE</span>?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium mb-10 max-w-xl leading-relaxed">
            Hi, I'm <span className="text-neon-purple font-bold">Arvin Adove</span>  I help brands and creators/coaches tell powerful stories through cinematic edits, focused on high-converting and engaging content that connects to your market.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#work"
              className="px-8 py-4 bg-neon-purple text-white font-bold rounded-full hover:scale-105 transition-transform glow-purple"
            >
              VIEW MY WORK
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded-full transition-all"
            >
              BUILD WITH ME
            </a>
          </div>
        </div>

        <div className="mt-16 lg:mt-0 relative">
          <div className="absolute -inset-2 bg-linear-to-r from-neon-purple via-neon-blue to-neon-purple rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
          <div className="relative w-64 h-80 md:w-80 md:h-[450px] overflow-hidden rounded-2xl border-2 border-neon-purple/50 bg-gray-900 shadow-2xl">
            <img
              src="/professional-video-editor-portrait-masculine-cinem.jpg"
              alt="Arvin Adove - Professional Video Editor"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="relative z-10 py-24 px-6 md:px-12 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Recent Works</h2>
            <div className="h-1 w-20 bg-neon-purple mx-auto lg:mx-0"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {portfolioItems.map((item, index) => (
              <VideoCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-32 px-6 border-t border-white/5 bg-black">
        <div className="max-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-neon-purple text-sm font-bold uppercase tracking-[0.3em] mb-6">Capabilities</h2>
              <h3 className="text-4xl md:text-6xl font-black mb-8 uppercase leading-tight">
                High-Impact <br />
                <span className="italic text-gray-400">Post-Production</span>
              </h3>
              <p className="text-xl text-gray-400 mb-10 max-w-lg">
                I don't just cut footage. I build narrative structures that keep viewers glued to the screen from the
                first frame to the last.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Dynamic Pacing", icon: Zap },
                  { title: "Sound Design", icon: Layers },
                  { title: "Color Grading", icon: Film },
                  { title: "Motion Graphics", icon: Camera },
                ].map((service, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
                      <service.icon className="w-6 h-6 text-neon-purple" />
                    </div>
                    <span className="font-bold tracking-tight uppercase text-sm">{service.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="w-full h-64 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-neon-purple mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400 text-sm">Pure Quality. Zero Compromise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">My Workflow</h2>
            <div className="h-1 w-20 bg-neon-purple mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Strategy",
                desc: "Understanding your audience and retention goals before a single cut is made.",
              },
              {
                step: "02",
                title: "Execution",
                desc: "Fast-paced assembly, sound design, and color grading for maximum impact.",
              },
              {
                step: "03",
                title: "Delivery",
                desc: "Optimized formats for all platforms to ensure your content looks perfect everywhere.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl bg-black border border-white/5 hover:border-neon-purple/30 transition-all"
              >
                <span className="text-6xl font-black text-white/5 absolute top-4 right-8 select-none">{item.step}</span>
                <h3 className="text-2xl font-black uppercase mb-4 relative z-10">{item.title}</h3>
                <p className="text-gray-400 relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials/Client Logotypes */}
      <section className="relative z-10 py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-12">Brands I work with</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <div className="group flex flex-col items-center gap-4">
              <div className="h-20 w-32 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-neon-purple/50 transition-all overflow-hidden">
                <img src="/logos/socials-logo.png" alt="Socials Logo" className="max-h-16 max-w-28 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-black tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">Socials</span>
            </div>
            <div className="group flex flex-col items-center gap-4">
              <div className="h-20 w-32 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-neon-purple/50 transition-all overflow-hidden">
                <img src="/logos/cr8tive-realty-logo.png" alt="CR8tive Realty Logo" className="max-h-16 max-w-28 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-black tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">CR8tive Realty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="relative z-10 py-24 px-6 bg-linear-to-b from-transparent to-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-16 uppercase tracking-widest">Tools I Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {tools.map((tool, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-purple/50 transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-800 rounded-xl flex items-center justify-center group-hover:glow-purple transition-all">
                  <div className="text-2xl font-black italic text-neon-purple">{tool.initials}</div>
                </div>
                <h3 className="font-bold text-sm tracking-widest uppercase">{tool.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-tighter mb-12">
                Ready to make <br />
                <span className="text-neon-purple glow-text-purple">Waves?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-md">
                I'm currently accepting new projects for 2026. Let's discuss how we can elevate your visual
                storytelling.
              </p>


            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black italic tracking-tighter">
            AA<span className="text-neon-purple">.</span>
          </div>
          <div className="flex gap-8">
            <div className="w-5 h-5 text-gray-500 hover:text-neon-purple cursor-pointer transition-colors">
              <Instagram className="w-5 h-5" />
            </div>
            <a href="https://www.tiktok.com/@arvfx" target="_blank" rel="noopener noreferrer" className="w-5 h-5 text-gray-500 hover:text-neon-purple cursor-pointer transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.08 1.61 2.88 2.88 0 0 1 4.07-4.77v-3.4a6.45 6.45 0 0 0-6.33 6.39A6.43 6.43 0 0 0 7.16 20a6.41 6.41 0 0 0 9.79-5.87v-6.3a8.38 8.38 0 0 0 2.64 2.26z" />
              </svg>
            </a>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Arvin Adove. Crafted for Impact.
          </p>
        </div>
      </footer>
    </main>
  )
}

const portfolioItems = [
  { category: "Luxury", title: "Unboxing Limited Edition Trunk Bag", video: "/videos/video1.mp4" },
  { category: "Real Estate", title: "0% Down Payment", video: "/videos/video2.mp4" },
  { category: "Coach", title: "Podcast Video", video: "/videos/video3.mp4" },
  { category: "SMM", title: "Service Based Business", video: "/videos/video4.mp4" },
]

const tools = [
  { name: "CapCut", initials: "CC" },
  { name: "Premiere Pro", initials: "PR" },
  { name: "After Effects", initials: "AE" },
  { name: "Canva", initials: "CV" },
]
