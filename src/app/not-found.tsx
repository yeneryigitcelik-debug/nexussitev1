import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-surface-warm relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 hero-grid-pattern opacity-50 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* 404 number */}
        <div className="font-[family-name:var(--font-syne)] text-[120px] sm:text-[160px] font-extrabold leading-none text-brand/15 select-none">
          404
        </div>

        {/* Shield icon */}
        <div className="w-16 h-16 mx-auto -mt-10 mb-6 rounded-2xl bg-brand/10 border border-brand/15 flex items-center justify-center text-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h1 className="font-[family-name:var(--font-syne)] text-2xl sm:text-3xl font-bold text-black mb-3">
          Sayfa Bulunamadı
        </h1>
        <p className="text-black/50 leading-relaxed mb-8">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Ana sayfaya dönerek devam edebilirsiniz.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Ana Sayfa
          </Link>
          <Link
            href="/hizmetler"
            className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            Hizmetlerimiz
          </Link>
        </div>
      </div>
    </main>
  );
}
