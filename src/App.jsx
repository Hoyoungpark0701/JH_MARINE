import React from "react";

export default function App() {
  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/jhmarine-logo.png" alt="JH MARINE.Inc Logo" className="h-10 w-auto object-contain" />
            <span className="font-bold text-xl tracking-wide">JH MARINE.Inc</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#business" className="hover:text-blue-600 transition">Business</a>
            <a href="#service" className="hover:text-blue-600 transition">Service</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          </nav>
          <div className="hidden md:flex items-center text-sm font-semibold text-blue-600">
            Tel: <a href="tel:+821064308197" className="ml-1">+82-10-6430-8197</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=60')` }}
      >
        <div className="bg-black/40 absolute inset-0"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Global Marine Solutions</h1>
          <p className="text-lg md:text-xl mb-8">Connecting the world through reliable maritime service</p>
          <a href="#business" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition">Explore More</a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            JH MARINE.Inc is a leading maritime service provider specializing in crew management,
            ship maintenance, and port logistics. With a commitment to safety, efficiency, and sustainability,
            we continue to navigate global trade with excellence.
          </p>
        </div>
      </section>

      {/* BUSINESS SECTION */}
      <section id="business" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Business</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: 'Crew Management',
              desc: 'Providing reliable and professional crew solutions for global shipping lines.',
              img: 'https://images.unsplash.com/photo-1579547621706-1a9c79d5b4d0?auto=format&fit=crop&w=800&q=60'
            }, {
              title: 'Ship Maintenance',
              desc: 'Ensuring vessel safety and performance through expert technical services.',
              img: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=800&q=60'
            }, {
              title: 'Port Logistics',
              desc: 'Efficient port handling and logistics coordination for seamless operations.',
              img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=60'
            }].map((b, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <img src={b.img} alt={b.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE SECTION */}
      <section id="service" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {["Vessel Agency", "Technical Support", "Crew Change", "Marine Supply"].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-4xl mb-3">⚓</div>
                <h4 className="font-semibold text-lg mb-2">{service}</h4>
                <p className="text-sm text-gray-600">Professional and efficient {service.toLowerCase()} solutions for your operations.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-8">For inquiries, partnerships, or service information, reach out to us anytime.</p>
          <div className="space-y-3 text-gray-700">
            <p>Email: <a href="mailto:jhmarine@jhmarine.kr" className="text-blue-600">jhmarine@jhmarine.kr</a></p>
            <p>Tel: <a href="tel:+821064308197" className="text-blue-600">+82-10-6430-8197</a></p>
            <p>Address: Busan, Republic of Korea</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white text-center py-6">
        <p>© {new Date().getFullYear()} JH MARINE.Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
