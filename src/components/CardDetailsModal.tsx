"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";

interface CardDetailsModalProps {
  cardId: string;
  onClose: () => void;
}

const normalizeCard = (card: any) => ({
  id: card?.id || "",
  type: card?.type || "virtual",
  last4: card?.last4 || "0000",
  fullNumber: card?.fullNumber || "",
  expiryDate: card?.expiryDate || "12/28",
  cvv: card?.cvv || "000",
  cardholderName: card?.cardholderName || "IZIPAY USER",
  status: card?.status || "active",
  name: card?.name || "Virtual Card",
  isNumberVisible: card?.isNumberVisible || false,
  isCvvVisible: card?.isCvvVisible || false,
});

const formatCardNumber = (card: ReturnType<typeof normalizeCard>): string => {
  if (card.isNumberVisible && card.fullNumber) {
    return card.fullNumber.replace(/(\d{4})/g, "$1 ").trim();
  }
  return `•••• •••• •••• ${card.last4}`;
};

export function CardDetailsModal({ cardId, onClose }: CardDetailsModalProps) {
  const { cards, toggleCardNumberVisibility, toggleCardCvvVisibility, freezeCard, unfreezeCard } = useAuth();
  const rawCard = cards.find(c => c.id === cardId);
  const card = rawCard ? normalizeCard(rawCard) : null;
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
    navigator.clipboard.writeText(text || "");
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
            {formatCardNumber(card)}
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
                  {formatCardNumber(card)}
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
                <button onClick={() => copyToClipboard(card.cvv, "CVV")} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-medium text-gray-900">{card.status}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                card.status === "active" ? "bg-green-100 text-green-700" :
                card.status === "frozen" ? "bg-blue-100 text-blue-700" :
                "bg-orange-100 text-orange-700"
              }`}>
                {card.status}
              </span>
            </div>

            <div className="flex gap-3 pt-4">
              {card.status === "frozen" ? (
                <button onClick={() => unfreezeCard(card.id)} className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors">
                  Unfreeze Card
                </button>
              ) : (
                <button onClick={() => freezeCard(card.id)} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
                  Freeze Card
                </button>
              )}
              <button onClick={onClose} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-xl transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}