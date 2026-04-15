"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [activeCardTab, setActiveCardTab] = useState("virtual");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderTransparent(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 350);
  };

  const cancelMouseLeave = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { question: "Is KYC really not required?", answer: "No! IZIPAY offers anonymous cards without KYC required. Your privacy is our priority. You can get a virtual card instantly with just your email." },
    { question: "What are the fees?", answer: "Virtual cards: $49 one-time fee. Physical cards: $459 one-time fee. No monthly maintenance fees. Low transaction fees worldwide." },
    { question: "How long does it take to get my card?", answer: "Virtual cards are issued instantly upon registration. Physical cards are delivered within 5-7 business days." },
    { question: "Can I link the card to Apple Pay or Google Pay?", answer: "Yes! Our cards support Apple Pay and Google Pay for seamless mobile payments at any terminal accepting contactless payments." }
  ];

  const services = [
    "Netflix", "ChatGPT Plus", "Spotify", "OnlyFans", "PlayStation", "Booking", "Airbnb", "Amazon", "Google Ads", "AWS",
    "Telegram Premium", "Figma", "GitHub", "Claude Pro", "Midjourney", "YouTube Premium", "Apple One", "Google Workspace", "Adobe Cloud", "DigitalOcean"
  ];

  const marketAssets = [
    { name: "Bitcoin", symbol: "BTC", price: "$67,432", change: "+2.34%", up: true, icon: "₿" },
    { name: "Ethereum", symbol: "ETH", price: "$3,521", change: "+1.87%", up: true, icon: "Ξ" },
    { name: "Solana", symbol: "SOL", price: "$178.92", change: "+4.12%", up: true, icon: "◎" },
    { name: "Ripple", symbol: "XRP", price: "$0.5234", change: "-0.45%", up: false, icon: "✕" },
    { name: "BNB", symbol: "BNB", price: "$602.34", change: "+1.23%", up: true, icon: "B" },
    { name: "Tether", symbol: "USDT", price: "$1.00", change: "+0.01%", up: true, icon: "₮" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header with Mega Menu */}
      <header 
        id="izipay-header" 
        ref={headerRef}
        className={`${isHeaderTransparent ? "is-transparent" : ""}`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="header-container">
          <div className="header-left">
            <Link href="/" className="logo-link">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%2388D65E'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='20' font-weight='bold' fill='%23121212'%3Ei%3C/text%3E%3C/svg%3E" alt="IZIPAY" className="header-logo-img" />
              <span className="header-brand">IZIPAY</span>
            </Link>
          </div>
          
          <nav className="header-center" onMouseLeave={handleMouseLeave}>
            <div className="nav-item" onMouseEnter={() => handleMouseEnter('personal')}>
              <a href="#" className="text-sm font-semibold">Personal</a>
            </div>
            <div className="nav-item" onMouseEnter={() => handleMouseEnter('business')}>
              <a href="#" className="text-sm font-semibold">Business</a>
            </div>
            <div className="nav-item" onMouseEnter={() => handleMouseEnter('markets')}>
              <a href="#" className="text-sm font-semibold">Markets</a>
            </div>
            <div className="nav-item" onMouseEnter={() => handleMouseEnter('company')}>
              <a href="#" className="text-sm font-semibold">Company</a>
            </div>
          </nav>

          {/* SINGLE SHARED MEGA MENU */}
          <div 
            className={`mega-menu-pane ${activeDropdown ? 'open' : ''}`}
            onMouseEnter={cancelMouseLeave}
            onMouseLeave={handleMouseLeave}
          >
            {activeDropdown === 'personal' && (
              <div className="dropdown-grid">
                <div className="dropdown-side-info">
                  <h3>Personal Cards</h3>
                  <p>Get instant virtual & physical crypto cards for everyday spending. No bank account needed.</p>
                  <Link href="/login" className="dropdown-cta">Get Started →</Link>
                </div>
                <div className="dropdown-main-content">
                  <div className="dropdown-section">
                    <h4>💳 Cards</h4>
                    <Link href="/virtual-card" className="menu-sub-item">
                      <strong>Virtual Crypto Card</strong>
                      <span>Instant issuance, no delivery fee</span>
                    </Link>
                    <Link href="/physical-card" className="menu-sub-item">
                      <strong>Physical Metal Card</strong>
                      <span>Premium stainless steel, 5-7 days delivery</span>
                    </Link>
                  </div>
                  <div className="dropdown-section">
                    <h4>💰 Wallet</h4>
                    <Link href="/login" className="menu-sub-item">
                      <strong>Crypto Wallet</strong>
                      <span>Store BTC, ETH, USDT and more</span>
                    </Link>
                    <Link href="/login" className="menu-sub-item">
                      <strong>Fiat Wallet</strong>
                      <span>Add funds via bank transfer or card</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeDropdown === 'business' && (
              <div className="dropdown-grid">
                <div className="dropdown-side-info">
                  <h3>Business Solutions</h3>
                  <p>Empower your business with crypto payments, corporate cards, and white-label solutions.</p>
                  <Link href="/login" className="dropdown-cta">Contact Sales →</Link>
                </div>
                <div className="dropdown-main-content">
                  <div className="dropdown-section">
                    <h4>🏢 Corporate</h4>
                    <div className="menu-sub-item coming-soon">
                      <strong>Corporate Accounts</strong>
                      <span>Multi-user access, expense management</span>
                    </div>
                    <div className="menu-sub-item coming-soon">
                      <strong>White Label</strong>
                      <span>Custom crypto card branding</span>
                    </div>
                  </div>
                  <div className="dropdown-section">
                    <h4>💳 Payments</h4>
                    <div className="menu-sub-item coming-soon">
                      <strong>Payment Gateway</strong>
                      <span>Accept crypto payments on your site</span>
                    </div>
                    <div className="menu-sub-item coming-soon">
                      <strong>API for Developers</strong>
                      <span>Integrate card issuance into your app</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDropdown === 'markets' && (
              <div className="markets-container">
                <div className="markets-side">
                  <h3>Crypto Markets</h3>
                  <p className="text-sm text-gray-500 mb-4">Live prices updated every 5 seconds</p>
                  <Link href="/login" className="dropdown-cta">Trade Now →</Link>
                </div>
                <div className="markets-grid-main">
                  {marketAssets.map((asset, i) => (
                    <Link key={i} href="/login" className="asset-card">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-lg font-bold text-black">{asset.icon}</div>
                      <div className="asset-info flex-1">
                        <strong>{asset.name}</strong>
                        <span>{asset.symbol}</span>
                      </div>
                      <div className="asset-stat">
                        <div>{asset.price}</div>
                        <div className={asset.up ? 'text-green-500' : 'text-red-500'}>{asset.change}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeDropdown === 'company' && (
              <div className="company-dropdown">
                <div className="company-links">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Company</h4>
                  <Link href="/about">About Us</Link>
                  <Link href="#">Careers</Link>
                  <Link href="#">Press Kit</Link>
                  <Link href="#">Blog</Link>
                </div>
                <div className="company-links">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Support</h4>
                  <Link href="#faq">Help Center</Link>
                  <Link href="#faq">FAQ</Link>
                  <Link href="#">Contact Us</Link>
                  <Link href="#">Telegram Community</Link>
                </div>
                <div className="company-links">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Legal</h4>
                  <Link href="/privacy">Privacy Policy</Link>
                  <Link href="/terms">Terms of Service</Link>
                  <Link href="#">Cookies Policy</Link>
                  <Link href="/security">Security</Link>
                </div>
                <div className="company-links">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Download App</h4>
                  <a href="#" className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white text-lg"></div>
                    <div>
                      <div className="text-xs text-gray-500">Download on</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white text-lg">▶</div>
                    <div>
                      <div className="text-xs text-gray-500">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </a>
                  <div className="company-social">
                    <a href="#" className="social-link">𝕏</a>
                    <a href="#" className="social-link">✈</a>
                    <a href="#" className="social-link">in</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="header-right">
            <Link href="/login" className="btn-login">Sign In</Link>
            <Link href="/login" className="btn-signup">Get Started</Link>
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[99999] bg-white transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{display: mobileMenuOpen ? 'block' : 'none'}}>
        <div className="p-6 pt-20">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Personal</h3>
            <Link href="#cards" className="block py-3 border-b border-gray-100 text-base font-semibold" onClick={() => setMobileMenuOpen(false)}>Virtual Cards</Link>
            <Link href="#cards" className="block py-3 border-b border-gray-100 text-base font-semibold" onClick={() => setMobileMenuOpen(false)}>Physical Cards</Link>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Business</h3>
            <span className="block py-3 border-b border-gray-100 text-base text-gray-400">Coming Soon</span>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Company</h3>
            <Link href="#faq" className="block py-3 border-b border-gray-100 text-base font-semibold" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            <Link href="/about" className="block py-3 border-b border-gray-100 text-base font-semibold" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/privacy" className="block py-3 border-b border-gray-100 text-base font-semibold" onClick={() => setMobileMenuOpen(false)}>Privacy Policy</Link>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <Link href="/login" className="w-full py-4 text-center border-2 border-black rounded-xl font-semibold" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            <Link href="/login" className="w-full py-4 text-center bg-black text-white rounded-xl font-semibold" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
          </div>
        </div>
      </div>

      {/* PREMIUM HERO SECTION with Your Image */}
      <section className="scroll-container">
        <div className="hero-content">
          <h1 className="hero-title">Crypto card<span className="highlight">of the future</span></h1>
          <p className="hero-desc">Get instant virtual & physical crypto cards for seamless global payments. Spend USDT, BTC, and ETH anywhere online with Apple Pay. No KYC required.</p>
          <a href="#cards" className="cta-btn-dark">Get Your Card<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
          <div className="trust-microcopy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#88D65E"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            Trusted by 500,000+ users
          </div>
        </div>
        
        {/* Premium CSS Hero Card */}
        <div className="hero-visual">
          <div className="premium-hero-card">
            <div className="hero-card-surface">
              <div className="hero-card-chip"></div>
              <div className="hero-card-logo">IZIPAY</div>
              <div className="hero-card-number">•••• •••• •••• 8831</div>
              <div className="hero-card-name">IZIPAY USER</div>
              <div className="hero-card-expiry">12/28</div>
              <div className="hero-card-circles">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <div className="brands-marquee">
        <div className="brands-track">
          <span>VISA</span><span>MASTERCARD</span><span>APPLE PAY</span><span>GOOGLE PAY</span><span>TETHER</span><span>BITCOIN</span><span>ETHEREUM</span><span>BINANCE</span>
          <span>VISA</span><span>MASTERCARD</span><span>APPLE PAY</span><span>GOOGLE PAY</span><span>TETHER</span><span>BITCOIN</span><span>ETHEREUM</span><span>BINANCE</span>
        </div>
      </div>

      {/* Stats Section */}
      <section className="section black">
        <div className="content-section">
          <div className="stats-grid">
            <div className="stat-item"><div className="stat-number">$2.4M+</div><div className="stat-label">Processed Volume</div></div>
            <div className="stat-item"><div className="stat-number">12,450+</div><div className="stat-label">Active Global Users</div></div>
            <div className="stat-item"><div className="stat-number">1.2 Mins</div><div className="stat-label">Average Issue Time</div></div>
          </div>
        </div>
      </section>

      {/* Perfect For Everyone */}
      <section className="section white" id="features">
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Perfect for Everyone</h2>
            <p className="section-desc">Whether you're a digital nomad, privacy advocate, or crypto investor, IZIPAY has you covered.</p>
          </div>
          <div className="audience-grid">
            <div className="audience-card">
              <i className="text-4xl">✈️</i>
              <h3>Digital Nomads</h3>
              <p>Travel the world without borders. Access your funds anywhere, anytime with zero foreign transaction fees.</p>
            </div>
            <div className="audience-card">
              <i className="text-4xl">🛡️</i>
              <h3>Privacy Advocates</h3>
              <p>Keep your financial data private. No KYC required. Your identity stays anonymous.</p>
            </div>
            <div className="audience-card">
              <i className="text-4xl">📈</i>
              <h3>Crypto Investors</h3>
              <p>Instantly convert your crypto to fiat and spend anywhere Visa is accepted. No waiting for bank transfers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Card Showcase - Premium Photo Reference Style */}
      <section className="section white" id="cards">
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Choose Your Card</h2>
          </div>
          
          <div className="premium-card-switcher">
            <button 
              className={`switcher-tab ${activeCardTab === 'virtual' ? 'active' : ''}`} 
              onClick={() => setActiveCardTab('virtual')}
            >
              <span className="switcher-tab-inner">
                <span className="switcher-label">Virtual Card</span>
                <span className="switcher-price">$49.99</span>
              </span>
            </button>
            <button 
              className={`switcher-tab ${activeCardTab === 'physical' ? 'active' : ''}`} 
              onClick={() => setActiveCardTab('physical')}
            >
              <span className="switcher-tab-inner">
                <span className="switcher-label">Physical Metal Card</span>
                <span className="switcher-price">$459.99</span>
              </span>
            </button>
          </div>
          
          {/* Virtual Card - Left Image, Right Text */}
          <div className={`premium-card-panel ${activeCardTab === 'virtual' ? 'active' : ''}`}>
            <div className="premium-card-split">
              <div className="premium-card-image">
                <div className="custom-card-mockup">
                  <img src="/virtualcard.webp" alt="Virtual Card" />
                </div>
              </div>
              <div className="premium-card-details">
                <span className="card-badge-popular">MOST POPULAR</span>
                <h2 className="premium-card-heading">Virtual Card</h2>
                <p className="premium-card-sub">Get instant virtual card for online purchases. Perfect for e-commerce, subscriptions, and digital payments.</p>
                <ul className="premium-features-list">
                  <li>
                    <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Instant delivery</span>
                  </li>
                  <li>
                    <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No delivery fees</span>
                  </li>
                  <li>
                    <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Apple Pay & Google Pay</span>
                  </li>
                  <li>
                    <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No monthly fees</span>
                  </li>
                </ul>
                <div className="premium-btn-row">
                  <Link href="/login" className="btn-issue">Issue Virtual Card</Link>
                  <Link href="/virtual-card" className="btn-details-outline">Virtual Card Details</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Physical Card - Left Image, Right Text */}
          <div className={`premium-card-panel ${activeCardTab === 'physical' ? 'active' : ''}`}>
            <div className="premium-card-split">
              <div className="premium-card-image">
                <div className="custom-card-mockup">
                  <img src="/physicalcard.webp" alt="Physical Metal Card" />
                </div>
              </div>
              <div className="premium-card-details">
                <span className="card-badge-premium">PREMIUM</span>
                <h2 className="premium-card-heading">Physical Metal Card</h2>
                <p className="premium-card-sub">Premium stainless steel card for in-store purchases. Stand out with a sleek design and enjoy seamless payments worldwide.</p>
                <ul className="premium-features-list">
                  <li>
                    <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Stainless steel metal card</span>
                  </li>
                  <li>
                    <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5-7 days delivery</span>
                  </li>
                  <li>
                    <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Works worldwide</span>
                  </li>
                  <li>
                    <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Contactless payments</span>
                  </li>
                </ul>
                <div className="scarcity-pill">
                  <svg className="star-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  <span>Only 143 metal cards left in this batch</span>
                </div>
                <div className="premium-btn-row">
                  <Link href="/login" className="btn-order">Order Physical Card</Link>
                  <Link href="/physical-card" className="btn-details-outline-dark">Physical Card Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section light">
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Works With</h2>
          </div>
          <div className="services-grid">
            {services.map((service, i) => (
              <div key={i} className="service-item">{service}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Apple Pay & Google Pay Section - Premium Device Mockups */}
      <section className="section black">
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title text-white">Apple Pay & Google Pay</h2>
            <p className="section-desc text-gray-400">Add your IZIPAY card to Apple Pay or Google Pay for contactless payments</p>
          </div>
          <div className="premium-payment-grid">
            <div className="premium-payment-card apple">
              <div className="device-mockup">
                <div className="device-frame">
                  <div className="device-screen">
                    <div className="wallet-preview">
                      <div className="wallet-header">
                        <span className="wallet-logo"></span>
                        <span className="wallet-label">Wallet</span>
                      </div>
                      <div className="card-strip">
                        <div className="strip-label">IZIPAY</div>
                        <div className="strip-dots">•••• 4242</div>
                      </div>
                      <div className="contactless-icon">📲</div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-extrabold mb-3">Apple Pay</h3>
              <p className="text-gray-400 mb-6">Add your virtual card to Apple Wallet and pay with Face ID or Touch ID at any contactless terminal.</p>
              <Link href="/login" className="payment-btn">Add to Apple Pay</Link>
            </div>
            <div className="premium-payment-card google">
              <div className="device-mockup">
                <div className="device-frame android">
                  <div className="device-screen">
                    <div className="wallet-preview gpay">
                      <div className="wallet-header">
                        <span className="gpay-logo">G</span>
                        <span className="wallet-label">Pay</span>
                      </div>
                      <div className="card-strip">
                        <div className="strip-label">IZIPAY</div>
                        <div className="strip-dots">•••• 4242</div>
                      </div>
                      <div className="contactless-icon">📲</div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-extrabold mb-3">Google Pay</h3>
              <p className="text-gray-400 mb-6">Link your card to Google Pay and enjoy fast, secure payments at millions of merchants worldwide.</p>
              <Link href="/login" className="payment-btn">Add to Google Pay</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section black" style={{paddingTop: '100px'}}>
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title text-white">How It Works</h2>
          </div>
          <div className="steps-wrapper">
            <div className="step-box">
              <div className="step-num">01</div>
              <h3 className="text-xl font-extrabold mb-4">Create Account</h3>
              <p className="text-gray-400">Sign up with just an email. No ID or passport required for basic virtual card usage.</p>
            </div>
            <div className="step-box">
              <div className="step-num">02</div>
              <h3 className="text-xl font-extrabold mb-4">Top Up Crypto</h3>
              <p className="text-gray-400">Send USDT, BTC, or ETH to your secure wallet address generated in the dashboard.</p>
            </div>
            <div className="step-box">
              <div className="step-num">03</div>
              <h3 className="text-xl font-extrabold mb-4">Pay Anywhere</h3>
              <p className="text-gray-400">Your crypto is converted to fiat instantly at checkout. Add to Apple Pay and tap.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Exchange Section - Premium Top Up UI */}
      <section className="section white" id="crypto-ramp">
        <div className="content-section">
          <div className="premium-ramp-layout">
            <div className="premium-ramp-info">
              <span className="inline-block px-3 py-1 bg-[rgba(136,214,94,0.15)] text-[#88D65E] text-xs font-bold rounded-full mb-6">CRYPTO RAMP</span>
              <h2>Top Up Instantly via Web3</h2>
              <p className="premium-ramp-desc">Send crypto directly to your wallet and spend instantly. No conversions needed - your crypto is converted to fiat at checkout.</p>
              <ul className="ramp-benefits">
                <li>
                  <span className="ramp-icon">₿</span>
                  <div>
                    <strong>Bitcoin</strong>
                    <span>Send BTC directly to your wallet</span>
                  </div>
                </li>
                <li>
                  <span className="ramp-icon">Ξ</span>
                  <div>
                    <strong>Ethereum</strong>
                    <span>ERC-20 tokens supported</span>
                  </div>
                </li>
                <li>
                  <span className="ramp-icon">₮</span>
                  <div>
                    <strong>USDT</strong>
                    <span>TRC-20 & ERC-20</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="premium-swap-widget">
              <div className="swap-header-bar">
                <div className="swap-tabs">
                  <button className="swap-tab active">Buy</button>
                  <button className="swap-tab">Sell</button>
                  <button className="swap-tab">Swap</button>
                </div>
              </div>
              <div className="swap-panel">
                <label className="swap-input-label">You Pay</label>
                <div className="swap-input-row">
                  <input type="number" placeholder="0.00" className="premium-swap-input" />
                  <button className="premium-select-btn">
                    <span className="coin-icon btc">₿</span>
                    <span>BTC</span>
                  </button>
                </div>
                <div className="usd-equivalent">≈ $0.00 USD</div>
              </div>
              <div className="swap-action-row">
                <button className="swap-exchange-btn">⇅</button>
              </div>
              <div className="swap-panel">
                <label className="swap-input-label">You Receive</label>
                <div className="swap-input-row">
                  <input type="number" placeholder="0.00" className="premium-swap-input" />
                  <button className="premium-select-btn">
                    <span className="coin-icon usdt">₮</span>
                    <span>USDT</span>
                  </button>
                </div>
                <div className="usd-equivalent">≈ $0.00 USD</div>
              </div>
              <div className="swap-rate-info">
                <span>1 BTC = 1.00 USDT</span>
                <span className="rate-info-note">Best rate guaranteed</span>
              </div>
              <Link href="/login" className="premium-swap-btn">Top Up Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section white" id="testimonials">
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">What Users Say</h2>
          </div>
          <div className="testimonials-carousel">
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">"iziPay changed how I spend my crypto. Finally, a way to use my Bitcoin for everyday purchases!"</p>
              <div className="testi-user">
                <div className="testi-avatar">AT</div>
                <div className="testi-info">
                  <strong>Alex Thompson</strong>
                  <span>Crypto Investor</span>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">"Finally a card that works globally! I travel constantly and this is the best solution for crypto spending."</p>
              <div className="testi-user">
                <div className="testi-avatar">SC</div>
                <div className="testi-info">
                  <strong>Sarah Chen</strong>
                  <span>Digital Nomad</span>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">"The virtual card feature is incredible. Instant issuance and works perfectly with Apple Pay!"</p>
              <div className="testi-user">
                <div className="testi-avatar">MR</div>
                <div className="testi-info">
                  <strong>Michael Roberts</strong>
                  <span>Startup Founder</span>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">"No KYC required - exactly what I was looking for. Privacy matters, and iziPay delivers!"</p>
              <div className="testi-user">
                <div className="testi-avatar">JK</div>
                <div className="testi-info">
                  <strong>John Kim</strong>
                  <span>Privacy Advocate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" id="faq">
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">FAQ</h2>
          </div>
          <div className="faq-container">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  <span>{faq.question}</span>
                  <span className="faq-toggle">+</span>
                </button>
                {activeFaq === i && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section black">
        <div className="content-section">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="section-title mb-6">Ready to Start?</h2>
            <p className="section-desc text-gray-400 mb-10">Join 500,000+ users worldwide and start spending your crypto today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/login" className="cta-btn-dark">Create Free Account</a>
              <a href="#features" className="card-btn primary bg-transparent border border-white/20 text-white hover:bg-white/5">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-gray-800">
        <div className="content-section">
          <div className="company-main">
            <div className="company-links-grid">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%2388D65E'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='20' font-weight='bold' fill='%23121212'%3Ei%3C/text%3E%3C/svg%3E" alt="IZIPAY" className="w-10 h-10" />
                  <span className="text-xl font-extrabold text-white">IZIPAY</span>
                </div>
                <p className="text-gray-400 text-sm max-w-xs">Anonymous crypto debit cards for seamless global payments. No KYC required.</p>
              </div>
              <div className="flex gap-16">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">Product</h4>
                  <div className="flex flex-col gap-4">
                    <Link href="/virtual-card" className="text-gray-300 hover:text-[#88D65E] font-medium text-sm">Virtual Cards</Link>
                    <Link href="/physical-card" className="text-gray-300 hover:text-[#88D65E] font-medium text-sm">Physical Cards</Link>
                    <Link href="/pricing" className="text-gray-300 hover:text-[#88D65E] font-medium text-sm">Pricing</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">Support</h4>
                  <div className="flex flex-col gap-4">
                    <Link href="#faq" className="text-gray-300 hover:text-[#88D65E] font-medium text-sm">Help Center</Link>
                    <Link href="#faq" className="text-gray-300 hover:text-[#88D65E] font-medium text-sm">FAQ</Link>
                    <Link href="#" className="text-gray-300 hover:text-[#88D65E] font-medium text-sm">Telegram</Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">Legal</h4>
                  <div className="flex flex-col gap-4">
                    <Link href="/terms" className="text-gray-300 hover:text-[#88D65E] font-medium text-sm">Terms of Service</Link>
                    <Link href="/privacy" className="text-gray-300 hover:text-[#88D65E] font-medium text-sm">Privacy Policy</Link>
                    <Link href="/security" className="text-gray-300 hover:text-[#88D65E] font-medium text-sm">Security</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="company-footer-row">
              <p className="text-gray-500 text-sm">© 2026 IZIPAY. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#88D65E] hover:text-black transition-colors text-sm">𝕏</a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#88D65E] hover:text-black transition-colors text-sm">✈</a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#88D65E] hover:text-black transition-colors text-sm">in</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <div className="izi-chat-widget">
        <a href="https://t.me/izipay" target="_blank" rel="noopener noreferrer" className="izi-chat-item text-lg">✈</a>
        <button className="izi-chat-btn text-2xl">💬</button>
      </div>
    </div>
  );
}