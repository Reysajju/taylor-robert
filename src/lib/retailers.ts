/**
 * Verified real purchase links for
 * "Where Evil Dwells: Perdition Awaits" by Robert B. Taylor.
 *
 * Sourced via web search (2026-07). ISBN/ASINs:
 *  - Paperback ASIN: B0H2KK7RJQ (Amazon US) / B0H2KXKWQC (Amazon CA)
 *  - Kindle ASIN:    B0H17JSQMK
 *  - Blackwell's:    paperback, published 02 Jun 2026, in stock
 */
export interface Retailer {
  name: string;
  note: string;
  href: string;
  /** primary = the headline buy button; secondary = smaller alternates */
  tier: "primary" | "secondary";
}

export const RETAILERS: Retailer[] = [
  {
    name: "Amazon",
    note: "Paperback · ships worldwide",
    href: "https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS/dp/B0H2KK7RJQ",
    tier: "primary",
  },
  {
    name: "Amazon Kindle",
    note: "eBook · instant download",
    href: "https://www.amazon.com/WHERE-EVIL-DWELLS-PERDITION-AWAITS-ebook/dp/B0H17JSQMK",
    tier: "secondary",
  },
  {
    name: "Blackwell's",
    note: "Paperback · UK & international",
    href: "https://blackwells.co.uk/bookshop/search/author/%20Robert%20Taylor",
    tier: "secondary",
  },
  {
    name: "Amazon Canada",
    note: "Paperback · CA shipping",
    href: "https://www.amazon.ca/gp/offer-listing/B0H2KXKWQC",
    tier: "secondary",
  },
];

/** Goodreads search — lets readers find & shelve the book. */
export const GOODREADS_URL =
  "https://www.goodreads.com/search?q=Where+Evil+Dwells+Perdition+Awaits";
