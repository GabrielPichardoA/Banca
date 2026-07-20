'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function AccountPage() {
  const { user, balance } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showTwoFAModal, setShowTwoFAModal] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [email2FACode, setEmail2FACode] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [twoFAMethod, setTwoFAMethod] = useState('authenticator');
  const [twoFALoading, setTwoFALoading] = useState(false);
  const [twoFAMessage, setTwoFAMessage] = useState('');
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState('');

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Acceso denegado</h1>
            <p className="text-gray-600 mb-4">Debes iniciar sesión para ver tu cuenta</p>
            <Link href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Iniciar Sesión
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleEmailUpdate = async () => {
    setEmailLoading(true);
    setEmailMessage('');
    setEmailError('');

    try {
      // Validar que el email sea diferente
      if (newEmail === user.email) {
        setEmailError('El nuevo email debe ser diferente al actual');
        setEmailLoading(false);
        return;
      }

      // Si 2FA está habilitado, validar el código
      if (twoFAEnabled) {
        if (!email2FACode || email2FACode.trim() === '') {
          setEmailError('Se requiere el código de 2FA para cambiar el email');
          setEmailLoading(false);
          return;
        }

        // Validar que el código tenga al menos 6 caracteres
        if (email2FACode.length < 6) {
          setEmailError('El código de 2FA debe tener al menos 6 caracteres');
          setEmailLoading(false);
          return;
        }

        // Simular validación de código (en producción esto sería una llamada a API)
        // Por ahora aceptamos cualquier código de 6+ dígitos
        console.log('Código 2FA validado:', email2FACode);
      }

      // Simular envío de confirmación
      setEmailMessage(`Se ha enviado un correo de confirmación a ${newEmail}. Por favor, verifica tu nuevo email.`);
      setTimeout(() => {
        setShowEmailModal(false);
        setEmail2FACode('');
      }, 2000);
    } catch (error) {
      setEmailError('Error al actualizar el email. Intenta nuevamente.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    setTwoFALoading(true);
    setTwoFAMessage('');

    try {
      // Simular generación de QR y códigos de recuperación
      const codes = Array.from({ length: 8 }, () =>
        Math.random().toString(36).substring(2, 10).toUpperCase()
      );
      setRecoveryCodes(codes);
      setTwoFAEnabled(true);
      setTwoFAMessage('Se ha habilitado 2FA. Guarda tus códigos de recuperación en un lugar seguro.');
    } catch (error) {
      setTwoFAMessage('Error al configurar 2FA');
    } finally {
      setTwoFALoading(false);
    }
  };

  const handleDisable2FA = async () => {
    setTwoFALoading(true);
    try {
      setTwoFAEnabled(false);
      setTwoFAMessage('2FA ha sido deshabilitado');
      setTimeout(() => setShowTwoFAModal(false), 1500);
    } finally {
      setTwoFALoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
            {t('account.title')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* User Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">👤</span>
                {t('account.personalInfo')}
              </h2>
              <div className="space-y-5">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">{t('account.name')}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{user.name}</p>
                </div>
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">{t('account.email')}</p>
                    <button
                      onClick={() => {
                        setShowEmailModal(true);
                        setNewEmail(user.email);
                        setEmail2FACode('');
                        setEmailError('');
                        setEmailMessage('');
                      }}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-bold"
                    >
                      {t('account.edit')}
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white break-all">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">{t('account.joined')}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    {new Date(user.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                {t('account.cryptoBalance')}
              </h2>
              {balance ? (
                <div className="space-y-4">
                  {balance.balances.map((bal) => (
                    <div key={bal.crypto} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-gray-600 dark:text-gray-300 font-semibold text-sm">{bal.crypto}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">${bal.usdValue.toFixed(2)}</p>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">
                        {bal.amount.toFixed(4)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{t('account.totalValue')}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${balance.totalUsdValue.toFixed(2)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{t('account.loadingBalance')}</p>
              )}
            </div>

            {/* Security Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                {t('account.security')}
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg h-full">
                  <div className="w-full mb-4">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t('account.twoFactorAuth')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {twoFAEnabled ? `✅ ${t('account.enabled')}` : `❌ ${t('account.disabled')}`}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTwoFAModal(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
                  >
                    {t('account.configure')}
                  </button>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="font-semibold text-blue-900 dark:text-blue-300 mb-1">{t('account.tip')}</p>
                  <p>{t('account.protect2FA')}</p>
                </div>
              </div>
            </div>

            {/* Language Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                {t('account.language')}
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-4">{t('account.selectLanguage')}</p>
                  <div className="w-full space-y-2">
                    {['es', 'en', 'pt'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang as any)}
                        className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-sm ${
                          language === lang
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-500 hover:border-blue-400'
                        }`}
                      >
                        {lang === 'es' ? '🇪🇸 Español' : lang === 'en' ? '🇬🇧 English' : '🇧🇷 Português'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links / Actions */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-8 py-6">
              <h3 className="text-xl font-bold text-white mb-6">{t('account.quickActions')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/play"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg p-6 text-center font-semibold transition-all duration-300 border border-white/30 hover:border-white/50"
                >
                  {t('account.playNow')}
                </Link>
                <Link
                  href="/my-tickets"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg p-6 text-center font-semibold transition-all duration-300 border border-white/30 hover:border-white/50"
                >
                  {t('account.myTickets')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Update Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Actualizar Email
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Email Actual
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Nuevo Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    setEmailError('');
                    setEmailMessage('');
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="nuevo@email.com"
                />
              </div>

              {twoFAEnabled && (
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Código de 2FA
                  </label>
                  <input
                    type="text"
                    value={email2FACode}
                    onChange={(e) => {
                      setEmail2FACode(e.target.value);
                      setEmailError('');
                      setEmailMessage('');
                    }}
                    maxLength={10}
                    placeholder="Ingresa tu código de 2FA"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Este código se requiere para cambiar tu correo electrónico de forma segura.
                  </p>
                </div>
              )}

              {emailError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {emailError}
                </div>
              )}

              {emailMessage && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
                  {emailMessage}
                </div>
              )}

              <div className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-blue-900 dark:text-blue-300 mb-1">📧 Importante:</p>
                <p>Se enviará un correo de confirmación al nuevo email. Debes verificarlo para completar el cambio.{twoFAEnabled && ' También se requiere tu código de 2FA para validar esta operación segura.'}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleEmailUpdate}
                disabled={emailLoading}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
              >
                {emailLoading ? 'Enviando...' : 'Actualizar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Configuration Modal */}
      {showTwoFAModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Autenticación de 2 Factores
            </h3>

            {!twoFAEnabled ? (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    Elegir Método de 2FA
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50" style={{borderColor: twoFAMethod === 'authenticator' ? '#3b82f6' : undefined, backgroundColor: twoFAMethod === 'authenticator' ? '#eff6ff' : undefined}}>
                      <input
                        type="radio"
                        name="2fa-method"
                        value="authenticator"
                        checked={twoFAMethod === 'authenticator'}
                        onChange={(e) => setTwoFAMethod(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <div className="ml-3">
                        <p className="font-semibold text-gray-900 dark:text-white">Aplicación Autenticadora</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Google Authenticator, Authy, Microsoft Authenticator</p>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50" style={{borderColor: twoFAMethod === 'sms' ? '#3b82f6' : undefined, backgroundColor: twoFAMethod === 'sms' ? '#eff6ff' : undefined}}>
                      <input
                        type="radio"
                        name="2fa-method"
                        value="sms"
                        checked={twoFAMethod === 'sms'}
                        onChange={(e) => setTwoFAMethod(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <div className="ml-3">
                        <p className="font-semibold text-gray-900 dark:text-white">SMS</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Recibe códigos por mensaje de texto</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="font-semibold text-blue-900 dark:text-blue-300 mb-1">🔒 Seguridad:</p>
                  <p>La autenticación de 2 factores es esencial para proteger tu cuenta y tus fondos.</p>
                </div>

                {twoFAMessage && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm">
                    {twoFAMessage}
                  </div>
                )}

                {showRecoveryCodes && recoveryCodes.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">📋 Códigos de Recuperación:</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Guarda estos códigos en un lugar seguro. Puedes usarlos si pierdes acceso a tu autenticador.</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {recoveryCodes.map((code, idx) => (
                        <div key={idx} className="font-mono text-xs bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                          {code}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(recoveryCodes.join('\n'));
                        alert('Códigos copiados al portapapeles');
                      }}
                      className="w-full text-xs px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      Copiar Códigos
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="font-semibold text-green-900 dark:text-green-300">✅ 2FA Habilitado</p>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">Tu cuenta está protegida con autenticación de 2 factores usando {twoFAMethod === 'authenticator' ? 'una aplicación autenticadora' : 'SMS'}.</p>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="font-semibold text-blue-900 dark:text-blue-300 mb-1">📋 Códigos de Recuperación:</p>
                  <p className="mb-2">Tienes {recoveryCodes.length} códigos de recuperación disponibles.</p>
                  <button
                    onClick={() => setShowRecoveryCodes(!showRecoveryCodes)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    {showRecoveryCodes ? 'Ocultar' : 'Ver'} códigos de recuperación
                  </button>
                </div>

                {showRecoveryCodes && recoveryCodes.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {recoveryCodes.map((code, idx) => (
                        <div key={idx} className="font-mono text-xs bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                          {code}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setShowTwoFAModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Cerrar
              </button>
              {!twoFAEnabled ? (
                <button
                  onClick={handleEnable2FA}
                  disabled={twoFALoading}
                  className="flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {twoFALoading ? 'Habilitando...' : 'Habilitar 2FA'}
                </button>
              ) : (
                <button
                  onClick={handleDisable2FA}
                  disabled={twoFALoading}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {twoFALoading ? 'Deshabilitando...' : 'Deshabilitar 2FA'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
