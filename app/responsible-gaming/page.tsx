import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResponsibleGamingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">
            🛡️ Juego Responsable
          </h1>
          <p className="text-gray-300 mb-8">
            En Lotería Cripto queremos que jugar siga siendo divertido. Esta página resume nuestro
            compromiso y algunos consejos para mantener el juego bajo control.
          </p>

          <div className="space-y-8">
            {/* Compromiso */}
            <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20 dark:border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">🔞 Nuestro Compromiso</h2>
              <p className="text-gray-300 mb-4">
                El juego de azar está reservado para personas mayores de 18 años. Nos reservamos el
                derecho de solicitar verificación de identidad y edad en cualquier momento, y de
                restringir el acceso a cuentas que no cumplan con este requisito.
              </p>
              <p className="text-gray-300">
                La lotería debe ser una forma de entretenimiento, nunca una fuente de ingresos ni una
                solución a problemas financieros.
              </p>
            </section>

            {/* Señales de alerta */}
            <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20 dark:border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">⚠️ Señales de Alerta</h2>
              <p className="text-gray-300 mb-4">
                Presta atención si el juego empieza a mostrar alguna de estas señales:
              </p>
              <div className="bg-red-500/20 dark:bg-red-500/10 p-4 rounded-lg border border-red-500/30 dark:border-red-500/20">
                <ul className="list-disc list-inside space-y-2 text-red-200">
                  <li>Jugar más dinero o tiempo del que puedes permitirte perder</li>
                  <li>Intentar recuperar pérdidas jugando aún más ("perseguir las pérdidas")</li>
                  <li>Pedir dinero prestado o vender pertenencias para poder jugar</li>
                  <li>Descuidar el trabajo, los estudios o las relaciones personales por jugar</li>
                  <li>Sentir ansiedad, irritabilidad o culpa relacionada con el juego</li>
                  <li>Mentir sobre cuánto tiempo o dinero se ha gastado jugando</li>
                </ul>
              </div>
            </section>

            {/* Consejos */}
            <section className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20 dark:border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">✅ Consejos para Jugar con Control</h2>
              <div className="bg-green-500/20 dark:bg-green-500/10 p-4 rounded-lg border border-green-500/30 dark:border-green-500/20">
                <ul className="list-disc list-inside space-y-2 text-green-200">
                  <li>Define un presupuesto antes de jugar y respétalo, sin excepciones</li>
                  <li>Establece un límite de tiempo para tus sesiones de juego</li>
                  <li>Nunca juegues para recuperar pérdidas anteriores</li>
                  <li>No juegues bajo los efectos del alcohol u otras sustancias</li>
                  <li>Toma descansos regulares y no juegues como escape de otros problemas</li>
                  <li>Nunca uses dinero destinado a gastos esenciales (renta, comida, deudas)</li>
                </ul>
              </div>
            </section>

            {/* Buscar ayuda */}
            <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 shadow-2xl text-white">
              <h2 className="text-2xl font-bold mb-4">🤝 ¿Necesitas Ayuda?</h2>
              <p className="mb-4">
                Si sientes que el juego está afectando tu vida, la de tu familia o tus finanzas, no
                estás solo. Habla con un profesional de la salud o con una organización local de apoyo
                al juego responsable en tu país — muchas ofrecen orientación confidencial y gratuita.
              </p>
              <p className="text-purple-100">
                También puedes escribirnos a través de nuestras redes sociales si deseas solicitar la
                suspensión temporal o permanente de tu cuenta.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
