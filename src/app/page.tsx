import { SiteNav } from "@/components/site/nav";
import { ReadingProgress } from "@/components/site/reading-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { Hero } from "@/components/site/hero";
import { AboutAuthor } from "@/components/site/about-author";
import { BookShowcase } from "@/components/site/book-showcase";
import { StatsBar } from "@/components/site/stats-bar";
import { ChapterPreview } from "@/components/site/chapter-preview";
import { Excerpt } from "@/components/site/excerpt";
import { Endorsements } from "@/components/site/endorsements";
import { BuySection } from "@/components/site/buy-section";
import { Newsletter } from "@/components/site/newsletter";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-charcoal">
      <ReadingProgress />
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <BookShowcase />
        <StatsBar />
        <ChapterPreview />
        <Excerpt />
        <AboutAuthor />
        <Endorsements />
        <BuySection />
        <Newsletter />
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}