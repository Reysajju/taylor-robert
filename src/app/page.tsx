import { SiteNav } from "@/components/site/nav";
import { LoadingScreen } from "@/components/site/loading-screen";
import { ReadingProgress } from "@/components/site/reading-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { Hero } from "@/components/site/hero";
import { AboutAuthor } from "@/components/site/about-author";
import { BookShowcase } from "@/components/site/book-showcase";
import { StatsBar } from "@/components/site/stats-bar";
import { ChapterPreview } from "@/components/site/chapter-preview";
import { Excerpt } from "@/components/site/excerpt";
import { Timeline } from "@/components/site/timeline";
import { KeyPlayers } from "@/components/site/key-players";
import { Endorsements } from "@/components/site/endorsements";
import { ReaderReviews } from "@/components/site/reader-reviews";
import { FAQ } from "@/components/site/faq";
import { PressKit } from "@/components/site/press-kit";
import { BuySection } from "@/components/site/buy-section";
import { EventsSection } from "@/components/site/events-section";
import { Newsletter } from "@/components/site/newsletter";
import { SiteFooter } from "@/components/site/site-footer";
import { ChapterIndicator } from "@/components/site/chapter-indicator";
import { ContactModal } from "@/components/site/contact-modal";
import { NoirToggle } from "@/components/site/noir-toggle";
import { ThemeSwitcher } from "@/components/site/theme-switcher";
import { CaseBoard } from "@/components/site/case-board";
import { AudioPreview } from "@/components/site/audio-preview";
import { RelatedWorks } from "@/components/site/related-works";
import { CursorTrail } from "@/components/site/micro-interactions";

export default function Home() {
  return (
    <div className="page-frame flex min-h-screen flex-col bg-charcoal">
      <LoadingScreen />
      <ReadingProgress />
      <SiteNav />
      <CursorTrail />
      <main className="flex-1">
        <Hero />
        <BookShowcase />
        <StatsBar />
        <ChapterPreview />
        <Excerpt />
        <Timeline />
        <CaseBoard />
        <KeyPlayers />
        <AboutAuthor />
        <Endorsements />
        <ReaderReviews />
        <AudioPreview />
        <FAQ />
        <PressKit />
        <BuySection />
        <RelatedWorks />
        <EventsSection />
        <Newsletter />
      </main>
      <SiteFooter />
      <ContactModal />
      <BackToTop />
      <ChapterIndicator />
      <ThemeSwitcher />
      <NoirToggle />
    </div>
  );
}