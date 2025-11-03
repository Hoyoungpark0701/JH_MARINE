import React, { useState, useEffect } from "react";

// 메뉴 데이터 구조 (이전과 동일)
const navItems = [
  { 
    name: "About", 
    href: "#about", 
    subItems: [
      { name: "About Us", href: "#about" },
    ] 
  },
  { 
    name: "Business", 
    href: "#business", 
    subItems: [
      { name: "Crew Management", href: "#business" },
      { name: "Ship Maintenance", href: "#business" },
      { name: "Port Logistics", href: "#business" },
    ] 
  },
  { 
    name: "Service", 
    href: "#service", 
    subItems: [
      { name: "Vessel Agency", href: "#service" },
      { name: "Technical Support", href: "#service" },
      { name: "Crew Change", href: "#service" },
      { name: "Marine Supply", href: "#service" },
    ] 
  },
  { 
    name: "Contact", 
    href: "#contact", 
    subItems: [
      { name: "Contact Us", href: "#contact" },
    ] 
  },
];

// --- 햄버거 아이콘 (SVG) ---
const MenuIcon = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// --- 닫기 아이콘 (SVG) ---
const CloseIcon = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


export default function App() {

  // --- 스크롤 감지 기능 (이전과 동일) ---
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // --- 모바일 메뉴 상태 추가 ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 모바일 메뉴가 열려있을 때는 스크롤 감지 중단
      if (isMobileMenuOpen) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]); // isMobileMenuOpen 의존성 추가

  // 모바일 메뉴가 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);


  return (
    <div className="min-h-screen font-sans text-gray-800">
      
      {/* --- 수정된 HEADER --- */}
      <header className={`fixed top-0 left-0 w-full bg-white shadow z-50 
                           transform transition-transform duration-300 
                           ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16"> {/* 높이 고정 (h-16) */}
          
          {/* 로고 */}
          <div className="flex-1 flex justify-start">
            <a href="#" className="flex items-center">
              <img src="/jhmarine-logo.png" alt="JH MARINE.Inc Logo" className="h-10 w-auto object-contain" />
            </a>
          </div>

          {/* 데스크톱 메뉴 (이전과 동일, md:flex로 모바일에선 숨김) */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <a href={item.href} className="hover:text-blue-600 transition py-6 inline-block">
                  {item.name}
                </a>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block transition-all duration-300">
                  <div className="bg-white shadow-lg rounded-md overflow-hidden w-48 border border-gray-100">
                    {item.subItems.map((subItem) => (
                      <a 
                        key={subItem.name} 
                        href={subItem.href} 
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 whitespace-nowrap"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* 데스크톱 전화번호 (md:flex로 모바일에선 숨김) */}
          <div className="flex-1 hidden md:flex justify-end items-center text-sm font-semibold text-blue-600">
            Tel: <a href="tel:+821064308197" className="ml-1">+82-10-6430-8197</a>
          </div>

          {/* --- 모바일 햄버거 버튼 추가 --- */}
          <div className="md:hidden flex-1 flex justify-end">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>

        </div>
      </header>

      {/* --- 모바일 메뉴 패널 추가 --- */}
      <div 
        className={`fixed inset-0 bg-white z-[60] transform 
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* 모바일 메뉴 헤더 (로고, 닫기 버튼) */}
        <div className="flex justify-between items-center px-6 h-16 border-b border-gray-200">
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/jhmarine-logo.png" alt="JH MARINE.Inc Logo" className="h-10 w-auto object-contain" />
          </a>
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            aria-label="Close menu"
          >
            <CloseIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        
        {/* 모바일 메뉴 링크 */}
        <nav className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-gray-100 pb-2">
              <a 
                href={item.href} 
                className="text-lg font-semibold text-gray-800"
                onClick={() => setIsMobileMenuOpen(false)} // 링크 클릭 시 메뉴 닫기
              >
                {item.name}
              </a>
              <div className="pl-4 mt-2 flex flex-col space-y-2">
                {item.subItems.map((subItem) => (
                  <a 
                    key={subItem.name} 
                    href={subItem.href} 
                    className="text-gray-600"
                    onClick={() => setIsMobileMenuOpen(false)} // 링크 클릭 시 메뉴 닫기
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
          {/* 모바일 메뉴에 전화번호 추가 */}
          <div className="pt-6 text-sm font-semibold text-blue-600">
            Tel: <a href="tel:+821064308197" className="ml-1">+82-10-6430-8197</a>
          </div>
        </nav>
      </div>


      {/* --- 페이지 나머지 컨텐츠 --- */}

      {/* HERO SECTION (pt-16 추가: 고정 헤더 높이만큼 패딩) */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=60')` }}
      >
        {/* pt-16을 Hero 섹션 자체에 주면 배경 이미지가 밀리므로, 내부 컨텐츠에 주는 것이 좋습니다. */}
        {/* 하지만 Hero는 h-screen이므로 헤더가 덮는 것을 의도한 것일 수 있습니다. */}
        {/* 여기서는 스크롤 시작점 #about이 헤더에 가려지지 않도록 수정합니다. */}
        
        <div className="bg-black/40 absolute inset-0"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Global Marine Solutions</h1>
          <p className="text-lg md:text-xl mb-8">Connecting the world through reliable maritime service</p>
          <a href="#business" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition">Explore More</a>
        </div>
      </section>

      {/* ABOUT SECTION (pt-16 추가: 헤더에 가려지지 않도록) */}
      <section id="about" className="py-20 bg-gray-50 pt-36 md:pt-20"> {/* pt-16 (h-16) + py-20 */}
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            JH MARINE.Inc is a leading maritime service provider specializing in crew management,
            ship maintenance, and port logistics. With a commitment to safety, efficiency, and sustainability,
            we continue to navigate global trade with excellence.
          </p>
        </div>
      </section>

      {/* BUSINESS SECTION (pt-16 추가 및 반응형 그리드 수정) */}
      <section id="business" className="py-20 pt-36 md:pt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Business</h2>
          {/* --- 수정된 그리드 --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* SERVICE SECTION (pt-16 추가 및 반응형 그리드 수정) */}
      <section id="service" className="bg-gray-50 py-20 pt-36 md:pt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          {/* --- 수정된 그리드 --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
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

      {/* CONTACT SECTION (pt-16 추가) */}
      <section id="contact" className="py-20 pt-36 md:pt-20">
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
