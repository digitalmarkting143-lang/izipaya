"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as your email address when creating an account. We do not require KYC or collect personal identification information. We also collect usage data and device information automatically when you use our service."
    },
    {
      title: "2. How We Use Information",
      content: "We use the information we collect to provide, maintain, and improve our services. We also use the information to communicate with you about your account and to send you important notices about our service."
    },
    {
      title: "3. Information Sharing",
      content: "We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share anonymized, aggregated information that does not identify you personally. We may share information with service providers who assist us in operating our website."
    },
    {
      title: "4. Data Security",
      content: "We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems."
    },
    {
      title: "5. Cookies",
      content: "We use cookies to enhance your experience. Cookies are small files that a site transfers to your computer's hard drive through your web browser (if you allow) that enables the site to recognize your browser and capture certain information."
    },
    {
      title: "6. Third-Party Links",
      content: "Our service may include third-party links. We have no control over these third-party sites and their privacy practices. We encourage you to review the privacy policy of any site you visit."
    },
    {
      title: "7. Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You may also request that we stop using your information. To exercise these rights, please contact us at support@izipay.me"
    },
    {
      title: "8. Children's Privacy",
      content: "Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us."
    },
    {
      title: "9. Changes to Privacy Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date. Your continued use of the service constitutes acceptance of the updated policy."
    },
    {
      title: "10. Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at support@izipay.me"
    }
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
        <section className="legal-hero">
          <div className="container">
            <div className="legal-hero-content">
              <div className="page-badge">🔐 Privacy Policy</div>
              <h1 className="page-title">Privacy Policy</h1>
              <p className="page-subtitle">Your privacy is important to us. This policy outlines our practices.</p>
              <p className="last-updated">Last updated: January 2025</p>
            </div>
          </div>
        </section>

        <section className="legal-content">
          <div className="container">
            <div className="legal-sections">
              {sections.map((section, i) => (
                <div key={i} className="legal-section">
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="legal-cta">
          <div className="container">
            <div className="cta-box" style={{ textAlign: 'center' }}>
              <h2>Questions?</h2>
              <p>If you have any questions about this Privacy Policy, please contact us.</p>
              <Link href="/contact" className="btn-large">Contact Us →</Link>
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