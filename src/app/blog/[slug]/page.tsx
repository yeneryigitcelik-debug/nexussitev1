import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, getPostBySlug, getPostsByCategory } from "@/lib/blog";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  createArticleMetadata,
  createArticleJsonLd,
  createBreadcrumbJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  return createArticleMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    date: post.date,
    author: post.author,
    tags: post.tags,
    category: post.category,
  });
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main>
      <JsonLd data={createArticleJsonLd(post)} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Ana Sayfa", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ])}
      />
      {/* Hero */}
      <section className="relative pt-0 pb-0 overflow-hidden">
        <div className="relative h-[400px] md:h-[500px]">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          <div className="absolute inset-0 hero-grid-pattern opacity-20 pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl pb-14">
              <Link href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Tüm Yazılar
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-4 py-1.5 bg-brand/20 backdrop-blur-sm border border-brand/30 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {post.readTime} okuma
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-bold max-w-4xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Article */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-[family-name:var(--font-syne)] prose-headings:text-black prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-p:text-black/50 prose-p:leading-relaxed
                  prose-li:text-black/50 prose-li:leading-relaxed
                  prose-strong:text-black/70 prose-strong:font-semibold
                  prose-ul:my-4 prose-ul:space-y-2
                  prose-a:text-brand prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-16 pt-8 border-t border-black/[0.06]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-black/50 mr-2">Etiketler:</span>
                  {post.tags.map((tag) => (
                    <span key={tag}
                      className="px-3 py-1.5 bg-black/[0.03] border border-black/[0.06] text-black/60 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Author Card */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/15 flex items-center justify-center text-brand">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black/80 text-sm">{post.author}</h4>
                      <p className="text-xs text-black/35">Sigorta Danışmanı</p>
                    </div>
                  </div>
                  <p className="text-sm text-black/60 leading-relaxed">
                    10 yılı aşkın sektör deneyimimizle, bireysel ve kurumsal sigorta ihtiyaçlarınıza en uygun çözümler sunuyoruz.
                  </p>
                </div>

                {/* CTA Card */}
                <div className="relative rounded-3xl overflow-hidden p-8 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-dark" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className="relative z-10">
                    <h3 className="font-[family-name:var(--font-syne)] text-xl text-white font-bold mb-3">Ücretsiz Teklif Alın</h3>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      Size en uygun sigorta teklifini hemen alın.
                    </p>
                    <a href="tel:+905332516773"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all mb-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Hemen Arayın
                    </a>
                    <a href="https://wa.me/905332516773" target="_blank"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                      WhatsApp ile Yazın
                    </a>
                  </div>
                </div>

                {/* Related Posts in Sidebar */}
                {relatedPosts.length > 0 && (
                  <div className="glass-card rounded-2xl p-6">
                    <h4 className="font-semibold text-black/80 mb-4">İlgili Yazılar</h4>
                    <div className="space-y-4">
                      {relatedPosts.map((rp) => (
                        <Link key={rp.slug} href={`/blog/${rp.slug}`}
                          className="group flex items-start gap-3 py-2 border-b border-black/[0.06] last:border-0 last:pb-0">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={rp.image} alt={rp.title} fill className="object-cover" unoptimized />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-medium text-black/70 group-hover:text-brand transition-colors leading-snug line-clamp-2">
                              {rp.title}
                            </h5>
                            <p className="text-xs text-black/50 mt-1">{rp.readTime} okuma</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Related Posts Grid */}
      {relatedPosts.length > 0 && (
        <section className="py-20 lg:py-28 bg-surface-warm">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-[family-name:var(--font-syne)] text-3xl text-black font-bold">İlgili Yazılar</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-brand/20 to-transparent" />
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}
                  className="group block rounded-2xl overflow-hidden card-image-zoom bg-white border border-black/[0.06] hover:border-brand/25 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-lg">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={rp.image} alt={rp.title} fill className="object-cover card-img" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-brand/20 backdrop-blur-sm border border-brand/30 text-white text-[10px] font-medium uppercase tracking-wider rounded-full">
                      {rp.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-black/80 mb-1 group-hover:text-brand transition-colors leading-snug">
                      {rp.title}
                    </h3>
                    <p className="text-sm text-black/60 line-clamp-2 mb-3">{rp.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-black/50">
                      <span>{formatDate(rp.date)}</span>
                      <span>{rp.readTime} okuma</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
