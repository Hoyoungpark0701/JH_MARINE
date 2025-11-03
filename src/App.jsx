import React, { useState, useEffect } from "react";

// --- 아이콘 (Menu, Close - 이전과 동일) ---
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

// --- 지구본 아이콘 (새로 추가) ---
const GlobeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);


// --- 번역 데이터 (새로 추가) ---
const translations = {
  EN: {
    nav: {
      about: "About",
      business: "Business",
      service: "Service",
      contact: "Contact",
    },
    megaMenu: {
      about: { title: "About Us", desc: "Learn about our company, mission, and values." },
      business: [
        { title: "Crew Management", desc: "Reliable and professional crew solutions." },
        { title: "Ship Maintenance", desc: "Ensuring vessel safety and performance." },
        { title: "Port Logistics", desc: "Efficient port handling and coordination." },
      ],
      service: [
        { title: "Vessel Agency", desc: "Professional agency services." },
        { title: "Technical Support", desc: "24/7 technical assistance." },
        { title: "Crew Change", desc: "Seamless crew rotation." },
        { title: "Marine Supply", desc: "Quality marine supplies." },
      ],
      contact: { title: "Contact Us", desc: "Get in touch with our team." },
    },
    hero: {
      title: "Global Marine Solutions",
      subtitle: "Connecting the world through reliable maritime service",
      button: "Explore More",
    },
    about: {
      title: "About Us",
      text: "JH MARINE.Inc is a leading maritime service provider specializing in crew management, ship maintenance, and port logistics. With a commitment to safety, efficiency, and sustainability, we continue to navigate global trade with excellence.",
    },
    business: {
      title: "Our Business",
      items: [
        { title: "Crew Management", desc: "Providing reliable and professional crew solutions for global shipping lines." },
        { title: "Ship Maintenance", desc: "Ensuring vessel safety and performance through expert technical services." },
        { title: "Port Logistics", desc: "Efficient port handling and logistics coordination for seamless operations." },
      ],
    },
    service: {
      title: "Our Services",
      items: [
        { name: "Vessel Agency", desc: "Professional and efficient vessel agency solutions." },
        { name: "Technical Support", desc: "Professional and efficient technical support solutions." },
        { name: "Crew Change", desc: "Professional and efficient crew change solutions." },
        { name: "Marine Supply", desc: "Professional and efficient marine supply solutions." },
      ],
    },
    contact: {
      title: "Contact Us",
      text: "For inquiries, partnerships, or service information, reach out to us anytime.",
      email: "Email",
      tel: "Tel",
      address: "Address",
      addressValue: "Busan, Republic of Korea"
    },
    footer: {
      text: "© {year} JH MARINE.Inc. All Rights Reserved.",
    },
    mobile: {
      tel: "Tel: +82-10-6430-8197" // 모바일 메뉴에는 전화번호 유지
    }
  },
  KO: {
    nav: {
      about: "회사소개",
      business: "사업분야",
      service: "서비스",
      contact: "연락처",
    },
    megaMenu: {
      about: { title: "회사소개", desc: "저희 회사의 미션과 가치에 대해 알아보세요." },
      business: [
        { title: "선원 관리", desc: "신뢰할 수 있는 전문 선원 솔루션." },
        { title: "선박 유지보수", desc: "선박 안전 및 성능 보장." },
        { title: "항만 물류", desc: "효율적인 항만 처리 및 조정." },
      ],
      service: [
        { title: "선박 대리점", desc: "전문적인 대리점 서비스." },
        { title: "기술 지원", desc: "연중무휴 기술 지원." },
        { title: "선원 교대", desc: "원활한 선원 교대." },
        { title: "해상 공급", desc: "고품질 해상 공급품." },
      ],
      contact: { title: "연락처", desc: "저희 팀에 문의하세요." },
    },
    hero: {
      title: "글로벌 해양 솔루션",
      subtitle: "신뢰할 수 있는 해상 서비스로 세계를 연결합니다",
      button: "더 알아보기",
    },
    about: {
      title: "회사소개",
      text: "JH MARINE.Inc는 선원 관리, 선박 유지보수, 항만 물류를 전문으로 하는 선도적인 해양 서비스 제공업체입니다. 안전, 효율성, 지속가능성에 대한 약속으로 저희는 계속해서 글로벌 무역을 탁월하게 탐색하고 있습니다.",
    },
    business: {
      title: "사업 분야",
      items: [
        { title: "선원 관리", desc: "글로벌 선사를 위한 신뢰할 수 있는 전문 선원 솔루션을 제공합니다." },
        { title: "선박 유지보수", desc: "전문 기술 서비스를 통해 선박의 안전과 성능을 보장합니다." },
        { title: "항만 물류", desc: "원활한 운영을 위한 효율적인 항만 처리 및 물류 조정을 제공합니다." },
      ],
    },
    service: {
      title: "서비스",
      items: [
        { name: "선박 대리점", desc: "전문적이고 효율적인 선박 대리점 솔루션입니다." },
        { name: "기술 지원", desc: "전문적이고 효율적인 기술 지원 솔루션입니다." },
        { name: "선원 교대", desc: "전문적이고 효율적인 선원 교대 솔루션입니다." },
        { name: "해상 공급", desc: "전문적이고 효율적인 해상 공급 솔루션입니다." },
      ],
    },
    contact: {
      title: "연락처",
      text: "문의사항, 파트너십 또는 서비스 정보가 필요하시면 언제든지 연락주십시오.",
      email: "이메일",
      tel: "전화",
      address: "주소",
      addressValue: "대한민국, 부산"
    },
    footer: {
      text: "© {year} JH MARINE.Inc. All Rights Reserved.",
    },
    mobile: {
      tel: "전화: +82-10-6430-8197"
    }
  },
};

// --- navItems 데이터를 동적으로 생성하는 함수 ---
const getNavItems = (lang) => {
  const t = translations[lang].nav;
  const mega = translations[lang].megaMenu;

  return [
    { 
      name: t.about, 
      href: "#about", 
      subItems: [{ name: mega.about.title, href: "#about" }],
      megaMenuContent: (
        <div className="grid grid-cols-4 gap-6">
          <div>
            <a href="#about" className="font-semibold text-gray-900 hover:text-blue-600">{mega.about.title}</a>
            <p className="text-sm text-gray-500 mt-1">{mega.about.desc}</p>
          </div>
        </div>
      )
    },
    { 
      name: t.business, 
      href: "#business", 
      subItems: mega.business.map(item => ({ name: item.title, href: "#business" })),
      megaMenuContent: (
        <div className="grid grid-cols-4 gap-6">
          {mega.business.map(item => (
            <div key={item.title}>
              <a href="#business" className="font-semibold text-gray-900 hover:text-blue-600">{item.title}</a>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    { 
      name: t.service, 
      href: "#service", 
      subItems: mega.service.map(item => ({ name: item.title, href: "#service" })),
      megaMenuContent: (
        <div className="grid grid-cols-4 gap-6">
          {mega.service.map(item => (
            <div key={item.title}>
              <a href="#service" className="font-semibold text-gray-900 hover:text-blue-600">{item.title}</a>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    { 
      name: t.contact, 
      href: "#contact", 
      subItems: [{ name: mega.contact.title, href: "#contact" }],
      megaMenuContent: (
        <div className="grid grid-cols-4 gap-6">
          <div>
            <a href="#contact" className="font-semibold text-gray-900 hover:text-blue-600">{mega.contact.title}</a>
            <p className="text-sm text-gray-500 mt-1">{mega.contact.desc}</p>
          </div>
        </div>
      )
    },
  ];
};


export default function App() {

  // --- 상태 (언어 lang 추가) ---
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [lang, setLang] = useState('EN'); // 'EN' 또는 'KO'

  // --- 번역 관련 변수 ---
  const navItems = getNavItems(lang);
  const t = translations[lang];
  const toggleLang = () => {
    setLang(lang === 'EN' ? 'KO' : 'EN');
  };

  // --- 스크롤 감지 useEffect (이전과 동일) ---
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) return; 
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setShowHeader(false);
          setActiveMenu(null);
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
  }, [lastScrollY, isMobileMenuOpen]);

  // --- 모바일 스크롤 방지 useEffect (이전과 동일) ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);


  return (
    <div className="min-h-screen font-sans text-gray-800">
      
      {/* --- HEADER --- */}
      <header 
        className={`fixed top-0 left-0 w-full bg-white shadow z-50 
                           transform transition-transform duration-300 
                           ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
          
          <div className="flex-1 flex justify-start">
            <a href="#" className="flex items-center">
              <img src="/jhmarine-logo.png" alt="JH MARINE.Inc Logo" className="h-10 w-auto object-contain" />
            </a>
          </div>

          {/* --- 수정된 데스크톱 메뉴 (폰트 크기/굵기) --- */}
          <nav className="hidden md:flex gap-8 text-base font-bold h-full"> {/* text-sm font-medium -> text-base font-bold */}
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative flex items-center h-full"
                onMouseEnter={() => setActiveMenu(item.name)}
              >
                <a href={item.href} className="hover:text-blue-600 transition">
                  {item.name}
                </a>
                <div 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600
                              transition-transform duration-300 origin-center
                              ${activeMenu === item.name ? 'scale-x-100' : 'scale-x-0'}`}
                ></div>
              </div>
            ))}
          </nav>

          {/* --- 수정된 우측 영역 (언어 선택) --- */}
          <div className="flex-1 hidden md:flex justify-end items-center">
            <button 
              onClick={toggleLang} 
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
              aria-label="Change language"
            >
              <GlobeIcon className="h-5 w-5" />
              <span>{lang}</span>
            </button>
          </div>

          {/* 모바일 햄버거 버튼 (이전과 동일) */}
          <div className="md:hidden flex-1 flex justify-end">
            <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
              <MenuIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>
        
        {/* 데스크톱 메가 메뉴 패널 (이전과 동일) */}
        <div 
          className={`absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200
                      transition-all duration-300 ease-in-out
                      ${activeMenu ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0'}`}
          style={{ paddingTop: activeMenu ? '2rem' : '0', paddingBottom: activeMenu ? '2rem' : '0' }}
        >
          <div className="max-w-7xl mx-auto px-6">
            {navItems.find(item => item.name === activeMenu)?.megaMenuContent}
          </div>
        </div>
      </header>

      {/* --- 모바일 메뉴 패널 (언어 선택 추가) --- */}
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
          {/* 모바일 전화번호 (번역 적용) */}
          <div className="pt-6 text-sm font-semibold text-blue-600">
            <a href="tel:+821064308197">{t.mobile.tel}</a>
          </div>
          {/* 모바일 언어 선택 */}
          <div className="pt-4">
            <button 
              onClick={toggleLang} 
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
              aria-label="Change language"
            >
              <GlobeIcon className="h-5 w-5" />
              <span>{lang}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* --- 페이지 나머지 컨텐츠 (모두 번역 적용) --- */}

      {/* HERO SECTION */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=60')` }}
      >
        <div className="bg-black/40 absolute inset-0"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.hero.title}</h1>
          <p className="text-lg md:text-xl mb-8">{t.hero.subtitle}</p>
          <a href="#business" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition">{t.hero.button}</a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-gray-50 pt-36 md:pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.about.title}</h2>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">{t.about.text}</p>
        </div>
      </section>

      {/* BUSINESS SECTION */}
      <section id="business" className="py-20 pt-36 md:pt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t.business.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.business.items.map((b, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <img src={`https://images.unsplash.com/photo-${i === 0 ? '1579547621706-1a9c79d5b4d0' : i === 1 ? '1501630834273-4b5604d2ee31' : '1506629082955-511b1aa562c8'}?auto=format&fit=crop&w=800&q=60`} alt={b.title} className="h-48 w-full object-cover" />
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
          <h2 className="text-3xl font-bold text-center mb-12">{t.service.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {t.service.items.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-4xl mb-3">⚓</div>
                <h4 className="font-semibold text-lg mb-2">{service.name}</h4>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 pt-36 md:pt-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-gray-600 mb-8">{t.contact.text}</p>
          <div className="space-y-3 text-gray-700">
            <p>{t.contact.email}: <a href="mailto:jhmarine@jhmarine.kr" className="text-blue-600">jhmarine@jhmarine.kr</a></p>
            <p>{t.contact.tel}: <a href="tel:+821064308197" className="text-blue-600">+82-10-6430-8197</a></p>
            <p>{t.contact.address}: {t.contact.addressValue}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white text-center py-6">
        <p>{t.footer.text.replace('{year}', new Date().getFullYear())}</p>
      </footer>
    </div>
  );
}
