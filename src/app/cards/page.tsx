"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function CardsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const cards = [
    {
      id: "virtual",
      type: "Virtual Card",
      price: 49.99,
      description: "Instant delivery for online purchases",
      features: [
        "Instant digital delivery",
        "No shipping fees",
        "Apple Pay & Google Pay",
        "No monthly fees",
        "Works globally",
        "Anonymous - No KYC"
      ],
      cta: "Buy Virtual Card",
      ctaLink: "/checkout/virtual",
      badge: "MOST POPULAR",
      badgeColor: "bg-[#88D65E]"
    },
    {
      id: "physical",
      type: "Physical Metal Card",
      price: 459.99,
      description: "Premium stainless steel card for in-store purchases",
      features: [
        "Stainless steel metal design",
        "5-7 business days delivery",
        "Contactless payments",
        "Works worldwide",
        "Priority support",
        "Exclusive metal card holder"
      ],
      cta: "Buy Physical Card",
      ctaLink: "/checkout/physical",
      badge: "PREMIUM",
      badgeColor: "bg-gray-900"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#88D65E] flex items-center justify-center">
                <span className="text-xl font-bold text-black">i</span>
              </div>
              <span className="text-xl font-extrabold text-black">IZIPAY</span>
            </Link>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </Link>
            <Link href="/cards" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#88D65E]/10 text-[#88D65E] font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              My Cards
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Transactions
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Deposit
            </Link>
          </nav>
        </aside>

        <main className="flex-1">
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <h1 className="text-xl font-semibold text-gray-900">Cards</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#88D65E] flex items-center justify-center">
                  <span className="text-sm font-bold text-black">{user.name?.charAt(0) || "U"}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900">Choose Your Card</h2>
              <p className="text-gray-500 mt-1">Select the perfect card for your needs</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cards.map((card) => (
                <div key={card.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-4">
                      {card.badge && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${card.badgeColor}`}>
                          {card.badge}
                        </span>
                      )}
                      {card.id === "virtual" && (
                        <div className="w-20 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-3 flex flex-col justify-between">
                          <div className="flex justify-between">
                            <div className="w-4 h-3 bg-yellow-400 rounded-sm"></div>
                            <span className="text-white text-[8px] font-bold">VISA</span>
                          </div>
                          <div className="text-white text-[8px] font-mono">•••• 8831</div>
                        </div>
                      )}
                      {card.id === "physical" && (
                        <div className="w-20 h-12 rounded-lg bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-3 flex flex-col justify-between border border-gray-600">
                          <div className="flex justify-between">
                            <div className="w-4 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm"></div>
                            <span className="text-white text-[8px] font-bold">VISA</span>
                          </div>
                          <div className="text-white text-[8px] font-mono">•••• 9927</div>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">{card.type}</h3>
                    <p className="text-gray-500 mb-6">{card.description}</p>

                    <div className="text-3xl font-extrabold text-gray-900 mb-6">
                      ${card.price.toFixed(2)}
                      <span className="text-sm font-medium text-gray-500 ml-1">one-time</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {card.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                          <svg className="w-5 h-5 text-[#88D65E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={card.ctaLink}
                      className={`block w-full py-4 text-center font-semibold rounded-xl transition-colors ${
                        card.id === "virtual"
                          ? "bg-[#88D65E] text-black hover:bg-[#76C14D]"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      {card.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gray-900 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#88D65E]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#88D65E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Secure & Anonymous</h3>
                  <p className="text-gray-400 text-sm">All cards are issued without KYC. Your data is encrypted and never shared with third parties. Spend with complete privacy.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}