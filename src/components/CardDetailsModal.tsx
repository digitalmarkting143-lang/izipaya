"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";

interface CardDetailsModalProps {
  cardId: string;
  onClose: () => void;
}

export function CardDetailsModal({ cardId, onClose }: CardDetailsModalProps) {
  const { cards, toggleCardNumberVisibility, toggleCardCvvVisibility, freezeCard, unfreezeCard } = useAuth();
  const card = cards.find(c => c.id === cardId);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!card) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div ref={modalRef} className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gray-900 p-6">
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-8 bg-yellow-400 rounded-sm"></div>
            <span className="text-white text-sm font-bold">VISA</span>
          </div>
          
          <div className="text-white text-xl font-mono tracking-widest mb-6">
            {card.isNumberVisible ? card.fullNumber.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• •••• " + card.last4}
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-gray-400 text-xs">Cardholder</div>
              <div className="text-white text-sm font-medium">{card.cardholderName}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs">Expires</div>
              <div className="text-white text-sm font-medium">{card.expiryDate}</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-sm text-gray-500">Card Type</div>
                <div className="font-medium text-gray-900">{card.name}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                card.type === "virtual" ? "bg-blue-100 text-blue-700" : "bg-gray-900 text-white"
              }`}>
                {card.type === "virtual" ? "Virtual" : "Physical"}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-sm text-gray-500">Card Number</div>
                <div className="font-medium text-gray-900 font-mono">
                  {card.isNumberVisible ? card.fullNumber : "•••• •••• •••• " + card.last4}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleCardNumberVisibility(card.id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                  {card.isNumberVisible ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
                <button onClick={() => copyToClipboard(card.fullNumber, "Card number")} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-sm text-gray-500">Expiry Date</div>
                <div className="font-medium text-gray-900">{card.expiryDate}</div>
              </div>
              <button onClick={() => copyToClipboard(card.expiryDate, "Expiry date")} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-sm text-gray-500">CVV</div>
                <div className="font-medium text-gray-900 font-mono">
                  {card.isCvvVisible ? card.cvv : "•••"}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleCardCvvVisibility(card.id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                  {card.isCvvVisible ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-sm text-gray-500">Cardholder Name</div>
                <div className="font-medium text-gray-900">{card.cardholderName}</div>
              </div>
              <button onClick={() => copyToClipboard(card.cardholderName, "Cardholder name")} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-medium">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    card.status === "active" ? "bg-green-100 text-green-700" :
                    card.status === "ordered" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">{card.issueDate}</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {card.status === "frozen" ? (
              <button onClick={() => unfreezeCard(card.id)} className="flex-1 py-3 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-100 transition-colors">
                Unfreeze Card
              </button>
            ) : (
              <button onClick={() => freezeCard(card.id)} className="flex-1 py-3 bg-red-50 text-red-700 font-semibold rounded-xl hover:bg-red-100 transition-colors">
                Freeze Card
              </button>
            )}
            <button onClick={onClose} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
              Close
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">Demo card - no real payment capability</p>
        </div>
      </div>
    </div>
  );
}