"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function VirtualCardPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const benefits = [
    {
      title: "Instant Activation",
      description: "Get your virtual card immediately after signup. No waiting, no approval delays.",
      icon: "⚡"
    },
    {
      title: "Anonymous Transactions",
      description: "No KYC required. Your privacy is protected with anonymous card transactions.",
      icon: "🔒"
    },
    {
      title: "Global Acceptance",
      description: "Use anywhere Visa/Mastercard is accepted. Online, in-app, and contactless payments.",
      icon: "🌍"
    },
    {
      title: "Apple Pay & Google Pay",
      description: "Link to mobile wallets for seamless payments at any physical terminal.",
      icon: "📱"
    },
    {
      title: "Multiple Currencies",
      description: "Spend in USD, EUR, GBP and 150+ currencies with real-time exchange rates.",
      icon: "💱"
    },
    {
      title: "Crypto-First Design",
      description: "Load with BTC, ETH, USDT and convert seamlessly at point of sale.",
      icon: "₿"
    }
  ];

  const features = [
    {
      title: "Virtual Card Number",
      description: "Complete 16-digit card number, CVV, and expiry for all online purchases."
    },
    {
      title: "Mobile Wallet Ready",
      description: "Add to Apple Pay and Google Pay instantly for contactless payments."
    },
    {
      title: "Spending Controls",
      description: "Set limits, block categories, and control where your card can be used."
    },
    {
      title: "Real-Time Alerts",
      description: "Get instant notifications for every transaction via Telegram or Email."
    },
    {
      title: "Virtual Cards",
      description: "Create unlimited virtual cards for different merchants and subscriptions."
    },
    {
      title: "Quick Freeze",
      description: "Freeze or unfreeze your card instantly from the app or dashboard."
    }
  ];

  const faqs = [
    {
      question: "How do I get a virtual card?",
      answer: "Simply sign up with your email, and your virtual card is issued instantly. No KYC required, no waiting period."
    },
    {
      question: "What can I use the virtual card for?",
      answer: "Use it for all online purchases: subscriptions (Netflix, Spotify, ChatGPT), e-commerce, gaming, software, and any merchant accepting Visa/Mastercard."
    },
    {
      question: "Does the virtual card support Apple Pay / Google Pay?",
      answer: "Yes! You can add your virtual card to Apple Pay and Google Pay. While it's a virtual card, the card details work with mobile wallets for contactless NFC payments."
    },
    {
      question: "What cryptocurrencies can I load?",
      answer: "We support BTC, ETH, USDT, and other major cryptocurrencies. Load your card with crypto and spend at any merchant."
    },
    {
      question: "Is there a monthly fee?",
      answer: "No monthly fees. Pay a one-time $49 fee for the card, and that's it. No maintenance costs ever."
    },
    {
      question: "How secure is the virtual card?",
      answer: "Your card uses bank-level encryption, 3D Secure for online purchases, and can be frozen instantly. Plus, no KYC means your personal data stays private."
    }
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
              <div className="page-badge">💳 Virtual Card</div>
              <h1 className="page-title">Instant Virtual Crypto Card</h1>
              <p className="page-subtitle">Get your virtual card instantly. No bank. No KYC. Just pure financial freedom.</p>
              <div className="page-price">
                <span className="price-amount">$49</span>
                <span className="price-label">one-time</span>
              </div>
              <div className="page-cta">
                <Link href="/login" className="btn-large">Get Your Card →</Link>
                <span className="cta-note">Instant issuance • No monthly fee</span>
              </div>
            </div>
            <div className="page-hero-visual">
              <div className="card-visual">
                <div className="card-visual-inner">
                  <div className="card-brand">IZIPAY</div>
                  <div className="card-number">**** **** **** 4283</div>
                  <div className="card-details">
                    <div className="card-name">IZIPAY USER</div>
                    <div className="card-expiry">12/28</div>
                  </div>
                  <div className="card-chip"></div>
                </div>
              </div>
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
            <h2 className="section-title">Why Choose Our Virtual Card</h2>
            <p className="section-subtitle">Everything you need for seamless crypto spending</p>
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
            <h2 className="section-title">Features Built for You</h2>
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
              <h2>Ready to Get Your Virtual Card?</h2>
              <p>Join thousands of users spending crypto globally. No bank account, no KYC, no limits.</p>
              <Link href="/login" className="btn-large">Get Started Now →</Link>
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
                <span>Instant Activation</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🌍</span>
                <span>150+ Countries</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">💳</span>
                <span>Visa & Mastercard</span>
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