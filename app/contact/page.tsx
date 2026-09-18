import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { ArrowLeft, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Bog‘lanish va Studiya",
  description: "AURELIN Clothing & Co bilan bog‘lanish.",
};

export default function ContactPage() {
  return (
    <PageTransition className="w-full py-16 sm:py-24">
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-10">
        <div className="pb-8 mb-8 border-b border-[#D9D6CF]">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.2em] text-[#777777] hover:text-[#111111] uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ARXIVGA QAYTISH</span>
          </Link>
        </div>

        <div className="space-y-6 pb-12 border-b border-[#D9D6CF]">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#777777] uppercase">
            BOG‘LANISH
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-[0.08em] text-[#111111] uppercase">
            AURELIN
          </h1>
          <p className="text-[14px] text-[#777777] max-w-xl leading-relaxed">
            Kiyim relizlari, bichim xususiyatlari, buyurtmalarni yetkazish yoki
            hamkorlik loyihalari bo‘yicha murojaat qiling.
          </p>
          <Link href="https://t.me/Kimsanboyevkx">
            <span className="telegram_gradient-color">
              Telegram: @Kimsanboyevkx
            </span>
          </Link>{" "}
          <br />
          <Link href="https://t.me/Kimsanboyevkx">
            <span className="insta_gradient-color">
              Instagram: @Kimsanboyevkx
            </span>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
