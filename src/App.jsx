import React, { useState, useEffect } from "react";

// --- navItems 데이터 확장 ---
// (기존 subItems는 모바일 메뉴용으로 유지, megaMenuContent는 데스크톱용으로 추가)
const navItems = [
  { 
    name: "About", 
    href: "#about", 
    subItems: [
      { name: "About Us", href: "#about" }
    ],
    // 데스크톱 메가 메뉴에 표시될 내용
    megaMenuContent: (
      <div className="grid grid-cols-4 gap-6">
        <div>
          <a href="#about" className="font-semibold text-gray-900 hover:text-blue-600">About Us</a>
          <p className="text-sm text-gray-500 mt-1">Learn about our company, mission, and values.</p>
        </div>
      </div>
    )
  },
  { 
    name: "Business", 
    href: "#business", 
    subItems: [
      { name: "Crew Management", href: "#business" },
      { name: "Ship Maintenance", href: "#business" },
      { name: "Port Logistics", href: "#business" },
    ],
    // 데스크톱 메가 메뉴에 표시될 내용
    megaMenuContent: (
      <div className="grid grid-cols-4 gap-6">
        <div>
          <a href="#business" className="font-semibold text-gray-900 hover:text-blue-600">Crew Management</a>
          <p className="text-sm text-gray-500 mt-1">Reliable and professional crew solutions.</p>
        </div>
        <div>
          <a href="#business" className="font-semibold text-gray-900 hover:text-blue-600">Ship Maintenance</a>
          <p className="text-sm text-gray-500 mt-1">Ensuring vessel safety and performance.</p>
        </div>
        <div>
          <a href="#business" className="font-semibold text-gray-900 hover:text-blue-600">Port Logistics</a>
          <p className="text-sm text-gray-500 mt-1">Efficient port handling and coordination.</p>
        </div>
      </div>
    )
  },
  { 
    name: "Service", 
    href: "#service", 
    subItems: [
      { name: "Vessel Agency", href: "#service" },
      { name: "Technical Support", href: "#service" },
      { name: "Crew Change", href: "#service" },
      { name: "Marine Supply", href: "#service" },
    ],
    // 데스크톱 메가 메뉴에 표시될 내용
    megaMenuContent: (
      <div className="grid grid-cols-4 gap-6">
        <div>
          <a href="#service" className="font-semibold text-gray-900 hover:text-blue-600">Vessel Agency</a>
          <p className="text-sm text-gray-500 mt-1">Professional agency services.</p>
        </div>
        <div>
          <a href="#service" className="font-semibold text-gray-900 hover:text-blue-600">Technical Support</a>
          <p className="text-sm text-gray-500 mt-1">24/7 technical assistance.</p>
        </div>
        <div>
          <a href="#service" className="font-semibold text-gray-900 hover:text-blue-600">Crew Change</a>
          <p className="text-sm text-gray-500 mt-1">Seamless crew rotation.</p>
        </div>
        <div>
          <a href="#service" className="font-semibold text-gray-900 hover:text-blue-600">Marine Supply</a>
          <p className="text-sm text-gray-500 mt-1">Quality marine supplies.</p>
        </div>
      </div>
    )
  },
  { 
    name: "Contact", 
    href: "#contact", 
    subItems: [
      { name: "Contact Us", href: "#contact" }
    ],
    // 데스크톱 메가 메뉴에 표시될 내용
    megaMenuContent: (
      <div className="grid grid-cols-4 gap-6">
        <div>
          <a href="#contact" className="font-semibold text-gray-900 hover:text-blue-600">Contact Us</a>
          <p className="text-sm text-gray-500 mt-1">Get in touch with our team.</p>
        </div>
      </div>
    )
  },
];
// --- navItems 정의 끝 ---


// --- 아이콘 (이전과 동일) ---
const MenuIcon = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const CloseIcon = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
// --- 아이콘 끝 ---


export default function App() {

  // --- 기존 상태 ---
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 메가 메뉴 상태 추가 ---
  const [activeMenu, setActiveMenu] = useState(null);

  // --- 기존 useEffect (스크롤 감지) ---
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen || activeMenu) return; // 모바일 메뉴 또는 메가 메뉴가 열려있으면 스크롤 감지 중단

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
  }, [lastScrollY, isMobileMenuOpen, activeMenu]); // activeMenu 의존성 추가

  // --- 기존 useEffect (모바일 스크롤 방지) ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);


  return (
    <div className="min-h-screen font-sans text-gray-800">
      
      {/* --- 수정된 HEADER --- 
          - onMouseLeave 이벤트 추가
          - 메가 메뉴 패널 추가
      */}
      <header 
        className={`fixed top-0 left-0 w-full bg-white shadow z-50 
                           transform transition-transform duration-300 
                           ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
        onMouseLeave={() => setActiveMenu(null)} // 마우스가 헤더 전체를 떠나면 메뉴 닫기
      >
        {/* 헤더 상단 (로고, 메뉴, 버튼) */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
          
          <div className="flex-1 flex justify-start">
            <a href="#" className="flex items-center">
              <img src="/jhmarine-logo.png" alt="JH MARINE.Inc Logo" className="h-10 w-auto object-contain" />
            </a>
          </div>

          {/* --- 수정된 데스크톱 메뉴 ---
              - group/group-hover 로직 제거
              - onMouseEnter로 activeMenu 상태 제어
              - 하단에 활성 막대(active bar) 추가
          */}
          <nav className="hidden md:flex gap-8 text-sm font-medium h-full">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative flex items-center h-full"
                onMouseEnter={() => setActiveMenu(item.name)} // 마우스 올리면 activeMenu 설정
              >
                <a href={item.href} className="hover:text-blue-600 transition">
                  {item.name}
                </a>
                {/* 활성 카테고리 표시줄 (SK hynix의 주황색 막대 역할) */}
                <div 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600
                              transition-transform duration-300 origin-center
                              ${activeMenu === item.name ? 'scale-x-100' : 'scale-x-0'}`}
                ></div>
              </div>
            ))}
          </nav>
          {/* --- 데스크톱 메뉴 끝 --- */}

          <div className="flex-1 hidden md:flex justify-end items-center text-sm font-semibold text-blue-600">
            Tel: <a href="tel:+821064308197" className="ml-1">+82-10-6430-8197</a>
          </div>

          <div className="md:hidden flex-1 flex justify-end">
            <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
              <MenuIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>
        
        {/* --- 새로운 데스크톱 메가 메뉴 패널 --- */}
        <div 
          className={`absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200
                      transition-all duration-300 ease-in-out
                      ${activeMenu ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0'}`}
          style={{ paddingTop: activeMenu ? '2rem' : '0', paddingBottom: activeMenu ? '2rem' : '0' }} //
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* activeMenu에 해당하는 megaMenuContent를 렌더링 */}
            {navItems.find(item => item.name === activeMenu)?.megaMenuContent}
          </div>
        </div>
        {/* --- 메가 메뉴 패널 끝 --- */}

      </header>

      {/* --- 모바일 메뉴 패널 (이전과 동일) --- */}
      <div 
        className={`fixed inset-0 bg-white z-[60] transform 
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-between items-center px-6 h-16 border-b border-gray-200">
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/jhmarine-logo.png" alt="JH MARINE.Inc Logo" className="h-10 w-auto object-contain" />
          </a>
          <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <CloseIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        
        <nav className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-gray-100 pb-2">
              <a 
                href={item.href} 
                className="text-lg font-semibold text-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
              {/* 모바일은 기존 subItems를 사용 (데이터 구조를 유지했기 때문에 수정 불필요) */}
              <div className="pl-4 mt-2 flex flex-col space-y-2">
                {item.subItems.map((subItem) => (
                  <a 
                    key={subItem.name} 
                    href={subItem.href} 
                    className="text-gray-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-6 text-sm font-semibold text-blue-600">
            Tel: <a href="tel:+821064308197" className="ml-1">+82-10-6430-8197</a>
          </div>
        </nav>
      </div>

      {/* --- 페이지 나머지 컨텐츠 (이전과 동일) --- */}

      {/* HERO SECTION */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit-crop&w=2000&q=60')` }}
      >
        <div className="bg-black/40 absolute inset-0"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Global Marine Solutions</h1>
          <p className="text-lg md:text-xl mb-8">Connecting the world through reliable maritime service</p>
          <a href="#business" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition">Explore More</a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-gray-50 pt-36 md:pt-20">
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
      <section id="business" className="py-20 pt-36 md:pt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              title: 'Crew Management',
              desc: 'Providing reliable and professional crew solutions for global shipping lines.',
              img: 'https://images.unsplash.com/photo-1579547621706-1a9c79d5b4d0?auto=format&fit-crop&w=800&q=60'
            }, {
              title: 'Ship Maintenance',
              desc: 'Ensuring vessel safety and performance through expert technical services.',
              img: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit-crop&w=800&q=60'
            }, {
              title: 'Port Logistics',
              desc: 'Efficient port handling and logistics coordination for seamless operations.',
              img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit-crop&w=800&q=60'
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
      <section id="service" className="bg-gray-50 py-20 pt-36 md:pt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
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

      {/* CONTACT SECTION */}
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
