"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'bn';

interface Translations {
    [key: string]: {
        [K in Language]: string;
    };
}

const translations: Translations = {
    hub_title: {
        en: "SetuAI Hub",
        hi: "सेतुAI हब",
        bn: "সেতুAI হাব"
    },
    hub_tagline: {
        en: "Empowering Bharat via AI",
        hi: "AI द्वारा भारत का सशक्तिकरण",
        bn: "AI এর মাধ্যমে ভারতের ক্ষমতায়ন"
    },
    hub_description: {
        en: "The central bridge connecting citizens to advanced AI assistance across safety, law, and agriculture.",
        hi: "सुरक्षा, कानून और कृषि में नागरिकों को उन्नत AI सहायता से जोड़ने वाला केंद्रीय सेतु।",
        bn: "নিরাপত্তা, আইন এবং কৃষিতে নাগরিকদের উন্নত AI সহায়তার সাথে সংযোগকারী কেন্দ্রীয় সেতু।"
    },
    search_placeholder: {
        en: "How can I help you today?",
        hi: "मैं आज आपकी कैसे सहायता कर सकता हूँ?",
        bn: "আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি?"
    },
    security_title: {
        en: "SentriX Security",
        hi: "सेन्ट्रिक्स सुरक्षा",
        bn: "সেমট্রিক্স নিরাপত্তা"
    },
    legal_title: {
        en: "NyayaAgent",
        hi: "न्यायएजेंट",
        bn: "ন্যায়এজেন্ট"
    },
    agri_title: {
        en: "KrishiAgent",
        hi: "कृषि-एजेंट",
        bn: "কৃষি-এজেন্ট"
    },
    health_title: {
        en: "SwasthyaAgent",
        hi: "स्वास्थ्य-एजेंट",
        bn: "স্বাস্থ্য-এজেন্ট"
    },
    coming_soon: {
        en: "Coming Soon",
        hi: "जल्द आ रहा है",
        bn: "শীঘ্রই আসছে"
    },
    open_dashboard: {
        en: "Open Dashboard",
        hi: "डैशबोर्ड खोलें",
        bn: "ড্যাশবোর্ড খুলুন"
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string) => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
