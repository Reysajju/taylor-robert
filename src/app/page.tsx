import { SiteNav } from "@/components/site/nav";
import { LoadingScreen } from "@/components/site/loading-screen";
import { BackToTop } from "@/components/site/back-to-top";
import { Hero } from "@/components/site/hero";
import { AboutAuthor } from "@/components/site/about-author";
import { BookShowcase } from "@/components/site/book-showcase";
import { StatsBar } from "@/components/site/stats-bar";
import { Newsletter } from "@/components/site/newsletter";
import { SiteFooter } from "@/components/site/site-footer";
import { ContactModal } from "@/components/site/contact-modal";
import { ThemeSwitcher } from "@/components/site/theme-switcher";
import { NoirToggle } from "@/components/site/noir-toggle";
import { ExploreGrid } from "@/components/site/explore-grid";

export default function Home() {
  return (
    <div className="page-frame flex min-h-screen flex-col bg-charcoal">
      <LoadingScreen />
      <SiteNav />
      <main className="flex-1">
        <Hero />\n        <BookShowcase />\n        <StatsBar />\n        <AboutAuthor />\n        <ExploreGrid />
        <Newsletter />
      </main>
      <SiteFooter />\n      <ContactModal />
      <BackToTop />
      <ThemeSwitcher />
      <NoirToggle />
    </div>
  );
}