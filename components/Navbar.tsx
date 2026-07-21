'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LC</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white hidden sm:block">
              Lotería Cripto
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/play" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
              {t('navbar.play')}
            </Link>
            <Link href="/results" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
              {t('navbar.results')}
            </Link>
            <Link href="/winners" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
              {t('navbar.winners')}
            </Link>
            <Link href="/how-to-play" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
              {t('navbar.howToPlay')}
            </Link>
          </div>

          {/* User Menu (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/account" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition"
                >
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                  {t('auth.login')}
                </Link>
                <Link href="/auth/register" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition">
                  {t('auth.register')}
                </Link>
              </>
            )}
          </div>

          {/* Hamburger toggle (mobile) */}
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden p-2 -mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu panel */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-gray-200 dark:border-gray-800 pt-2">
            <Link
              href="/play"
              onClick={closeMenu}
              className="block px-2 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {t('navbar.play')}
            </Link>
            <Link
              href="/results"
              onClick={closeMenu}
              className="block px-2 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {t('navbar.results')}
            </Link>
            <Link
              href="/winners"
              onClick={closeMenu}
              className="block px-2 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {t('navbar.winners')}
            </Link>
            <Link
              href="/how-to-play"
              onClick={closeMenu}
              className="block px-2 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {t('navbar.howToPlay')}
            </Link>

            <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={closeMenu}
                    className="block px-2 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {user.name}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full text-left px-2 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {t('navbar.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className="block px-2 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {t('auth.login')}
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={closeMenu}
                    className="block px-2 py-2.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {t('auth.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
