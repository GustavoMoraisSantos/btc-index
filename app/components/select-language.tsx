import { Language } from "../types";

export default function SelectLanguage({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
    return (
        <div className="fixed top-3 right-3 z-50">
            <div className="bg-gray-900/80 border border-gray-700 rounded-xl px-3 py-2 backdrop-blur">
                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as Language)}
                    className="bg-transparent text-gray-200 text-sm outline-none"
                >
                    <option className='text-gray-900' value="pt">PT-BR</option>
                    <option className='text-gray-900' value="en">English</option>
                    <option className='text-gray-900' value="es">Español</option>
                </select>
            </div>
        </div>
    )
}
