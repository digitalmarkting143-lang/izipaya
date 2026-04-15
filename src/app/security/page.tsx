"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Bank-Level Encryption",
      description: "All data is encrypted using AES-256, the same standard used by top banks worldwide.",
      icon: "🔐"
    },
    {
      title: "Two-Factor Authentication",
      description: "Secure your account with 2FA via authenticator apps. Optional for added protection.",
      icon: "🔑"
    },
    {
      title: "Real-Time Monitoring",
      description: "24/7 fraud detection monitors every transaction for suspicious activity.",
      icon: "👁️"
    },
    {
      title: "Instant Freeze",
      description: "Freeze or unfreeze your card instantly from our app if anything seems off.",
      icon: "❄️"
    },
    {
      title: "No KYC Storage",
      description: "We don't require or store unnecessary personal data. Your privacy is protected.",
      icon: "📝"
    },
    {
      title: "3D Secure",
      description: "Additional authentication layer for online purchases protects against fraud.",
      icon: "🛡️"
    }
  ];

  const practices = [
    "AES-256 encryption for all data",
    "Hardware security modules (HSM)",
    "Regular third-party security audits",
    "Distributed redundant backups",
    "24/7 fraud monitoring",
    "Incident response team on standby",
    "Employee security training",
    "Bug bounty program"
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
        <section className="security-hero">
          <div className="container">
            <div className="security-hero-content">
              <div className="page-badge">🔒 Security</div>
              <h1 className="page-title">Your Security, Our Priority</h1>
              <p className="page-subtitle">Bank-level encryption and continuous monitoring protect your funds and data.</p>
            </div>
          </div>
        </section>

        <section className="security-features">
          <div className="container">
            <h2 className="section-title">Protection at Every Level</h2>
            <p className="section-subtitle">Multiple layers of security for complete peace of mind</p>
            <div className="features-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {features.map((feature, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="security-practices">
          <div className="container">
            <h2 className="section-title">Security Practices</h2>
            <div className="practices-grid">
              {practices.map((practice, i) => (
                <div key={i} className="practice-item">
                  <span className="practice-check">✓</span>
                  {practice}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="security-tips">
          <div className="container">
            <div className="tips-box">
              <h2>Stay Safe</h2>
              <ul>
                <li>Enable two-factor authentication</li>
                <li>Never share your account credentials</li>
                <li>Use unique, strong passwords</li>
                <li>Monitor your transactions regularly</li>
                <li>Freeze your card when not in use</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="security-cta">
          <div className="container">
            <div className="cta-box">
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of users who trust IZIPAY with their financial freedom.</p>
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