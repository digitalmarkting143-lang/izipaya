"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      title: "Privacy First",
      description: "Your financial data belongs to you. We never sell your information. No KYC required.",
      icon: "🔒"
    },
    {
      title: "Financial Freedom",
      description: "Access your money anywhere, anytime. No bank holidays, no borders, no limits.",
      icon: "🌍"
    },
    {
      title: "Transparency",
      description: "No hidden fees, no surprises. What you see is what you pay. Always.",
      icon: "💎"
    },
    {
      title: "Innovation",
      description: "We're building the future of finance. Constantly improving, always advancing.",
      icon: "⚡"
    }
  ];

  const stats = [
    { value: "$2.4M+", label: "Processed" },
    { value: "12,450+", label: "Users" },
    { value: "150+", label: "Countries" },
    { value: "99.9%", label: "Uptime" }
  ];

  const timeline = [
    { year: "2023", event: "IZIPAY founded with a vision to democratize finance" },
    { year: "2024 Q1", event: "Launched virtual cards with instant issuance" },
    { year: "2024 Q2", event: "Physical metal card goes live" },
    { year: "2024 Q3", event: "Reached 10,000 users milestone" },
    { year: "2024 Q4", event: "Expanded to 150+ countries" },
    { year: "2025", event: "Business solutions and API launching" }
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

      <main className="page-main" style={{ background: '#fafafa' }}>
        <section className="about-hero">
          <div className="container">
            <div className="about-hero-content">
              <div className="page-badge">👥 About Us</div>
              <h1 className="page-title">Building the Future of Finance</h1>
              <p className="page-subtitle">IZIPAY is on a mission to make financial freedom accessible to everyone, everywhere.</p>
            </div>
          </div>
        </section>

        <section className="about-story">
          <div className="container">
            <div className="story-grid">
              <div className="story-content">
                <h2>Our Story</h2>
                <p>IZIPAY was born from a simple frustration: traditional finance moves too slowly. Banks impose unnecessary barriers, charge excessive fees, and demand personal information that has no business being shared.</p>
                <p>We believed there had to be a better way. A financial system that puts users first, respects their privacy, and enables true global access.</p>
                <p>Today, IZIPAY serves thousands of users across 150+ countries. We're just getting started.</p>
              </div>
              <div className="story-stats">
                {stats.map((stat, i) => (
                  <div key={i} className="story-stat">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-values">
          <div className="container">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
            <div className="values-grid">
              {values.map((value, i) => (
                <div key={i} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-timeline">
          <div className="container">
            <h2 className="section-title">Our Journey</h2>
            <div className="timeline">
              {timeline.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-event">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="container">
            <div className="cta-box">
              <h2>Join Us</h2>
              <p>Be part of the financial revolution. Get your IZIPAY card today.</p>
              <Link href="/login" className="btn-large">Get Started →</Link>
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