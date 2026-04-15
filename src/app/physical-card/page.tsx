"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PhysicalCardPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const benefits = [
    {
      title: "Premium Metal Card",
      description: "Crafted from stainless steel with a brushed metal finish. This is not plastic—this is luxury.",
      icon: "⚙️"
    },
    {
      title: "Contactless Payments",
      description: "Tap to pay anywhere contactless is accepted. No insertion or swiping required.",
      icon: "📳"
    },
    {
      title: "ATM Withdrawals",
      description: "Withdraw cash at ATMs worldwide. Your crypto, your money, any time.",
      icon: "🏧"
    },
    {
      title: "Apple Pay & Google Pay",
      description: "Add to mobile wallets for seamless in-store and online payments.",
      icon: "📱"
    },
    {
      title: "No Foreign Fees",
      description: "Zero foreign transaction fees. Spend globally at the exact exchange rate.",
      icon: "🌍"
    },
    {
      title: "Lifetime Durability",
      description: "Metal doesn't wear out. Your card endures for a lifetime of use.",
      icon: "♾️"
    }
  ];

  const features = [
    {
      title: "Stainless Steel Build",
      description: "Premium stainless steel card with brushed finish and engraved logo."
    },
    {
      title: "Contactless NFC",
      description: "Latest NFC technology for tap-to-pay at millions of terminals."
    },
    {
      title: "EMV Chip",
      description: "Embedded EMV chip for maximum security and global acceptance."
    },
    {
      title: "ATM Access",
      description: "Withdraw cash from any ATM accepting Visa cards worldwide."
    },
    {
      title: "Spending Controls",
      description: "Set limits, freeze/unfreeze, and manage spending from your dashboard."
    },
    {
      title: "Free Replacement",
      description: "Lost your card? We ship a replacement absolutely free."
    }
  ];

  const faqs = [
    {
      question: "How long does delivery take?",
      answer: "Physical cards are delivered within 5-7 business days via express shipping. Track your card in real-time from the dashboard."
    },
    {
      question: "Is the card really metal?",
      answer: "Yes! Your card is crafted from premium stainless steel with a brushed metal finish. It feels substantial in your hand and lasts a lifetime."
    },
    {
      question: "Can I withdraw from ATMs?",
      answer: "Absolutely. Your IZIPAY metal card works at any ATM worldwide. Withdraw cash in local currency using your crypto balance."
    },
    {
      question: "Does it work with Apple Pay / Google Pay?",
      answer: "Yes! Add your physical card to Apple Pay or Google Pay for tap-to-pay mobile payments. Works at any terminal accepting contactless."
    },
    {
      question: "What if I lose my card?",
      answer: "We provide free replacement cards. Simply freeze your card in the dashboard and order a new one. The replacement ships immediately."
    },
    {
      question: "Are there monthly fees?",
      answer: "No monthly fees. Pay the one-time $459 fee for your metal card, and enjoy unlimited use with no maintenance costs."
    }
  ];

  const specs = [
    { label: "Material", value: "Stainless Steel" },
    { label: "Weight", value: "18 grams" },
    { label: "Thickness", value: "0.84mm" },
    { label: "Finish", value: "Brushed Metal" },
    { label: "Chip", value: "EMV Contactless" },
    { label: "Network", value: "Visa" }
  ];

  const stats = [
    { value: "$2.4M+", label: "Processed" },
    { value: "12,450+", label: "Users" },
    { value: "1.2 min", label: "Avg. Issue Time" },
    { value: "150+", label: "Countries" }
  ];

  return (
    <div className="page-min-h">
      <header>
        <div className="header-container">
          <div className="header-left">
            <Link href="/" className="logo-link">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%2388D65E'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='20' font-weight='bold' fill='%23121212'%3Ei%3C/text%3E%3C/svg%3E" alt="IZIPAY" className="header-logo-img" />
              <span className="header-brand">IZIPAY</span>
            </Link>
          </div>
          <div className="header-right">
            <Link href="/login" className="btn-login">Log In</Link>
            <Link href="/login" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </header>

      <main className="page-main">
        <section className="page-hero">
          <div className="container">
            <div className="page-hero-content">
              <div className="page-badge">⚙️ Physical Metal Card</div>
              <h1 className="page-title">Premium Metal Card</h1>
              <p className="page-subtitle">Stainless steel. Lifetime durability. The last card you'll ever need.</p>
              <div className="page-price">
                <span className="price-amount">$459</span>
                <span className="price-label">one-time</span>
              </div>
              <div className="page-cta">
                <Link href="/login" className="btn-large">Order Your Card →</Link>
                <span className="cta-note">5-7 day delivery • Free replacement</span>
              </div>
            </div>
            <div className="page-hero-visual">
              <div className="metal-card-visual">
                <div className="metal-card-front">
                  <div className="metal-card-logo">IZIPAY</div>
                  <div className="metal-card-chip"></div>
                  <div className="metal-card-number">**** **** **** 8831</div>
                  <div className="metal-card-name">IZIPAY USER</div>
                  <div className="metal-card-expiry">12/28</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-specs">
          <div className="container">
            <div className="specs-grid">
              {specs.map((spec, i) => (
                <div key={i} className="spec-item">
                  <div className="spec-label">{spec.label}</div>
                  <div className="spec-value">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-stats">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-benefits">
          <div className="container">
            <h2 className="section-title">Why Metal?</h2>
            <p className="section-subtitle">This isn't your average credit card</p>
            <div className="benefits-grid">
              {benefits.map((benefit, i) => (
                <div key={i} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-features">
          <div className="container">
            <h2 className="section-title">Features</h2>
            <div className="features-grid">
              {features.map((feature, i) => (
                <div key={i} className="feature-item">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-cta-section">
          <div className="container">
            <div className="cta-box">
              <h2>Ready for the Ultimate Card?</h2>
              <p>Join the exclusive club of IZIPAY metal card holders. Limited to those who demand the best.</p>
              <Link href="/login" className="btn-large">Order Now →</Link>
            </div>
          </div>
        </section>

        <section className="page-faq">
          <div className="container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(i)}>
                    <span>{faq.question}</span>
                    <span className="faq-icon">{activeFaq === i ? '−' : '+'}</span>
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

        <section className="page-trust">
          <div className="container">
            <div className="trust-content">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span>Bank-level Security</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⚡</span>
                <span>5-7 Day Delivery</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🌍</span>
                <span>150+ Countries</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">💳</span>
                <span>Visa Network</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="page-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="logo-link">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%2388D65E'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='20' font-weight='bold' fill='%23121212'%3Ei%3C/text%3E%3C/svg%3E" alt="IZIPAY" className="header-logo-img" />
                <span className="header-brand">IZIPAY</span>
              </Link>
              <p>The future of crypto spending. No banks. No limits.</p>
            </div>
            <div className="footer-links">
              <h4>Product</h4>
              <Link href="/virtual-card">Virtual Card</Link>
              <Link href="/physical-card">Physical Card</Link>
              <Link href="/pricing">Pricing</Link>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/security">Security</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 IZIPAY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}