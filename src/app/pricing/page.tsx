"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PricingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: "Virtual Card",
      tagline: "For online purchases & subscriptions",
      price: "$49",
      priceType: "one-time",
      badge: "Most Popular",
      features: [
        "Instant virtual card issuance",
        "No KYC required",
        "Apple Pay & Google Pay",
        "150+ currencies",
        "Real-time alerts",
        "Spending controls",
        "Instant freeze/unfreeze",
        "Unlimited virtual cards"
      ],
      cta: "Get Virtual Card",
      link: "/login",
      highlight: false
    },
    {
      name: "Physical Metal Card",
      tagline: "For in-store & ATM withdrawals",
      price: "$459",
      priceType: "one-time",
      badge: "Premium",
      features: [
        "Stainless steel card",
        "5-7 day delivery",
        "Contactless payments",
        "ATM withdrawals",
        "No foreign fees",
        "Free replacement",
        "Lifetime durability",
        "Priority support"
      ],
      cta: "Order Metal Card",
      link: "/login",
      highlight: true
    }
  ];

  const fees = [
    { category: "Card Issuance", virtual: "$49 (one-time)", physical: "$459 (one-time)" },
    { category: "Monthly Maintenance", virtual: "Free", physical: "Free" },
    { category: "ATM Withdrawal", virtual: "N/A", physical: "$4.50 + 1%" },
    { category: "Foreign Transaction", virtual: "Zero", physical: "Zero" },
    { category: "Load Crypto", virtual: "Free", physical: "Free" },
    { category: "Card Replacement", virtual: "$15", physical: "Free" },
    { category: "Currency Conversion", virtual: "1%", physical: "1%" }
  ];

  const faqs = [
    {
      question: "Is there a monthly fee?",
      answer: "No monthly fees ever. Pay once for your card, and use it forever with no maintenance costs."
    },
    {
      question: "Can I have both virtual and physical cards?",
      answer: "Yes! You can order both cards. Many users get a virtual card for online purchases and a physical card for everyday spending."
    },
    {
      question: "What happens if I lose my physical card?",
      answer: "Simply freeze your card in the dashboard and order a replacement. We ship a new card free of charge."
    },
    {
      question: "Do the cards expire?",
      answer: "Cards are valid for 3 years from issue date. We automatically send a replacement before expiration at no extra cost."
    },
    {
      question: "Can I get a refund if I don't use it?",
      answer: "Your card fee is non-refundable once issued. However, you can freeze your card at any time with no further charges."
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

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

      <main className="page-main" style={{ background: '#fafafa' }}>
        <section className="pricing-hero">
          <div className="container">
            <div className="pricing-hero-content">
              <div className="page-badge">💰 Pricing</div>
              <h1 className="page-title">Simple, Transparent Pricing</h1>
              <p className="page-subtitle">No hidden fees. No surprises. Just one payment, unlimited use.</p>
            </div>
          </div>
        </section>

        <section className="pricing-plans">
          <div className="container">
            <div className="plans-grid">
              {plans.map((plan, i) => (
                <div key={i} className={`plan-card ${plan.highlight ? 'highlight' : ''}`}>
                  {plan.badge && <div className="plan-badge">{plan.badge}</div>}
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-tagline">{plan.tagline}</p>
                  <div className="plan-price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-label">{plan.priceType}</span>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feature, j) => (
                      <li key={j}>
                        <span className="check-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.link} className="plan-cta">{plan.cta}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pricing-fees">
          <div className="container">
            <h2 className="section-title">Fee Schedule</h2>
            <p className="section-subtitle">Complete breakdown of all fees</p>
            <div className="fees-table">
              <div className="fees-header">
                <div className="fees-category">Service</div>
                <div className="fees-virtual">Virtual Card</div>
                <div className="fees-physical">Physical Card</div>
              </div>
              {fees.map((fee, i) => (
                <div key={i} className="fees-row">
                  <div className="fees-category">{fee.category}</div>
                  <div className="fees-virtual">{fee.virtual}</div>
                  <div className="fees-physical">{fee.physical}</div>
                </div>
              ))}
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

        <section className="pricing-cta">
          <div className="container">
            <div className="cta-box">
              <h2>Ready to Get Started?</h2>
              <p>Choose your card and start spending crypto globally. No bank account, no KYC required.</p>
              <Link href="/login" className="btn-large">Create Account →</Link>
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