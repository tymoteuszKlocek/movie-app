import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "OMDb Movie App - Wyszukiwarka filmów",
  description:
    "Wyszukuj filmy, seriale i odkrywaj szczegóły swoich ulubionych tytułów. Przeglądaj bazę filmów OMDb.",
  keywords: ["filmy", "seriale", "wyszukiwarka filmów", "OMDb", "kino"],
  authors: [{ name: "OMDb Movie App" }],
  openGraph: {
    title: "OMDb Movie App - Wyszukiwarka filmów",
    description:
      "Wyszukuj filmy, seriale i odkrywaj szczegóły swoich ulubionych tytułów",
    type: "website",
    locale: "pl_PL",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              role="navigation"
              aria-label="Główna nawigacja"
            >
              <div className="flex justify-between items-center h-16">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-2xl font-bold text-primary-600 hover:text-primary-700 transition focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                >
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                  </svg>
                  <span>MovieApp</span>
                </Link>

                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-primary-600 font-medium transition focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-3 py-2"
                  >
                    Wyszukiwarka
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-3 py-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>Ulubione</span>
                  </Link>
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-gray-600 text-sm">
                <p>
                  Dane filmowe z{" "}
                  <a
                    href="http://www.omdbapi.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                  >
                    OMDb API
                  </a>
                </p>
                <p className="mt-2">© 2024 OMDb Movie App</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
