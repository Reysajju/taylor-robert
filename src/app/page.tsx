import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { AboutAuthor } from "@/components/site/about-author";
import { BookShowcase } from "@/components/site/book-showcase";
import { Excerpt } from "@/components/site/excerpt";
import { Endorsements } from "@/components/site/endorsements";
import { BuySection } from "@/components/site/buy-section";
import { Newsletter } from "@/components/site/newsletter";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-charcoal">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <BookShowcase />
        <Excerpt />
        <AboutAuthor />
        <Endorsements />
        <BuySection />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}