'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold mb-4">{t('footer.title')}</h3>
            <p className="text-sm">{t('footer.description')}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.gamesTitle')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/play/loto" className="hover:text-white transition">LOTO</Link></li>
              <li><Link href="/play/kino" className="hover:text-white transition">KinoTV</Link></li>
              <li><Link href="/play/pool" className="hover:text-white transition">Loto Pool</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.helpTitle')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-to-play" className="hover:text-white transition">{t('footer.howToPlay')}</Link></li>
              <li><Link href="/responsible-gaming" className="hover:text-white transition">{t('footer.responsibleGaming')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.socialTitle')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Discord</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Telegram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-sm">
          <p>{t('footer.copyright')}</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-white transition">{t('footer.terms')}</Link>
            <Link href="/privacy" className="hover:text-white transition">{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
