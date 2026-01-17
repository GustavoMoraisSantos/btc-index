"use client";

import { useState } from "react";
import Image from "next/image";
import btcQR from "@/public/address-btc.png";
import { I18N } from "../language";

const Copy = ({ className = "inline-block ml-2", ariaHidden = true }: { className?: string; ariaHidden?: boolean }) => (
    <svg
        className={className}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={ariaHidden}
    >
        <path d="M9 9H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


export default function DonationBox({ lang }: { lang: keyof typeof I18N }) {
    const btcAddress = "bc1q3h8dm5fdhwym252pjfvel972ydmj3t6tnpwv3f";
    const [copied, setCopied] = useState(false);
    const t = I18N[lang];

    function handleCopy() {
        navigator.clipboard.writeText(btcAddress);
        setCopied(true);

        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className="w-full flex justify-center p-4">
            <div className="text-center">
                <p className="text-lg font-bold mb-2 text-gray-100">Donations</p>

                <Image
                    src={btcQR}
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="mx-auto block mb-3"
                />

                {/* Container clicável */}
                <button
                    onClick={handleCopy}
                    className="
                    mx-auto
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-gray-600
                    bg-gray-900
                    text-gray-200
                    text-sm
                    break-all   
                    hover:bg-gray-800
                    active:scale-[0.98]
                    transition
                    "
                    title="Clique para copiar"
                >
                    {copied ? t.copiedAddress : `${btcAddress}`}
                    <Copy />
                </button>
            </div>
        </div>
    );
}
