import Link from "next/link";

type Dict = {
  nav: {
    home: string;
    about: string;
    news: string;
    events: string;
    resources: string;
    library: string;
    links: string;
    contact: string;
    membership: string;
  };
  footer: {
    about: string;
    quickLinks: string;
    contactUs: string;
    rights: string;
    partners: string;
  };
  common: {
    backToTop: string;
  };
};

export default function Footer({ dict, lang }: { dict: Dict; lang: string }) {
  const quickLinks = [
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.news, href: `/${lang}/news` },
    { label: dict.nav.events, href: `/${lang}/events` },
    { label: dict.nav.resources, href: `/${lang}/resources` },
    { label: dict.nav.library, href: `/${lang}/library` },
    { label: dict.nav.links, href: `/${lang}/links` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
    { label: dict.nav.membership, href: `/${lang}/membership` },
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-white">
              St. John Henry Newman & Friends Association Kenya
            </h3>
            <p className="text-sm leading-relaxed text-primary-light">
              {dict.footer.about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-white">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-light transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-white">
              {dict.footer.contactUs}
            </h3>
            <Link
              href={`/${lang}/contact`}
              className="text-sm text-primary-light transition-colors hover:text-white"
            >
              {dict.nav.contact} →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex items-center justify-between border-t border-white/20 pt-6 text-sm text-primary-light">
          <p>
            &copy; {new Date().getFullYear()} St. John Henry Newman &amp; Friends Association Kenya. {dict.footer.rights}
          </p>
          <a
            href="#main-content"
            className="transition-colors hover:text-white"
          >
            {dict.common.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
