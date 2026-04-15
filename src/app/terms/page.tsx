"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using IZIPAY, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using IZIPAY services, you shall be subject to any posted guidelines or rules applicable to such services."
    },
    {
      title: "2. Description of Service",
      content: "IZIPAY provides users with access to a rich collection of resources, including various communications tools, forums, shopping services, personalized content, and branded programming through its network of properties. You also understand and agree that the service may include advertisements and that these advertisements are necessary for IZIPAY to provide the service."
    },
    {
      title: "3. Registration Obligations",
      content: "In consideration of your use of the Service, you agree to: (a) provide true, accurate, current, and complete information about yourself as prompted by the Service's registration form and (b) maintain and promptly update the registration data to keep it true, accurate, current, and complete. If you provide any information that is untrue, inaccurate, not current, or incomplete, IZIPAY has the right to suspend or terminate your account and refuse any and all current or future use of the Service."
    },
    {
      title: "4. Privacy Policy",
      content: "Registration data and certain other information about you is subject to our Privacy Policy. You understand that through your use of the Service, you consent to the collection and use of this information, including the transfer of this information to other countries for storage, processing, and use by IZIPAY and its affiliates."
    },
    {
      title: "5. Account Security",
      content: "You are solely responsible for maintaining the confidentiality of your account and password. You agree to notify IZIPAY immediately of any unauthorized use of your account. You acknowledge that IZIPAY cannot and will not be liable for any loss or damage arising from your failure to comply with these obligations."
    },
    {
      title: "6. User Conduct",
      content: "You agree not to use the Service to: upload, post, email, transmit, or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable; harm minors in any way; forge headers or otherwise manipulate identifiers in order to disguise the origin of any content transmitted through the Service."
    },
    {
      title: "7. Modifications to Service",
      content: "IZIPAY reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that IZIPAY shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service."
    },
    {
      title: "8. Termination",
      content: "You agree that IZIPAY may, in its sole discretion, terminate your access to or use of the Service, at any time, for any reason, including without limitation if IZIPAY believes that you have violated or acted inconsistently with the letter or spirit of the Terms of Service."
    },
    {
      title: "9. Limitation of Liability",
      content: "You agree that IZIPAY shall not be liable to you for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses (even if IZIPAY has been advised of the possibility of such damages), resulting from: (i) the use or the inability to use the Service."
    },
    {
      title: "10. Changes to Terms",
      content: "IZIPAY reserves the right to modify these Terms at any time. Your continued use of the Service following any such modification constitutes your agreement to be bound by the modified Terms."
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
              <div className="page-badge">📄 Terms of Service</div>
              <h1 className="page-title">Terms and Conditions</h1>
              <p className="page-subtitle">Please read these terms carefully before using IZIPAY.</p>
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
              <p>If you have any questions about these Terms, please contact us.</p>
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