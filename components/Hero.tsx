import Image from "next/image";
import Button from "./Button";

type HeroProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  portraitImage?: string;
  quote?: string;
  cta?: { label: string; href: string };
  lang?: string;
  variant?: "home" | "others";
};

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  portraitImage,
  quote,
  cta,
  lang,
  variant,
}: HeroProps) {
  return (
    <section
      className={`relative flex ${variant === "home" ? "min-h-screen" : ""} w-full items-center bg-primary`}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-repeat-x lg:bg-size-[auto_100%] lg:bg-top"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-center gap-10 ${portraitImage ? "md:justify-between" : ""}`}
        >
          <div
            className={`text-center ${portraitImage ? "md:text-left md:max-w-xl" : ""}`}
          >
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p
                className={`mt-6 text-lg text-white/90 md:text-xl ${portraitImage ? "" : "mx-auto max-w-2xl"}`}
              >
                {subtitle}
              </p>
            )}
            {quote && (
              <p className="mx-auto mt-8 max-w-xl text-base italic text-accent">
                {quote}
              </p>
            )}
            {cta && (
              <div className="mt-10">
                <Button variant="primary" size="lg" href={cta.href} lang={lang}>
                  {cta.label}
                </Button>
              </div>
            )}
          </div>
          {portraitImage && (
            <div className="hidden shrink-0 md:block">
              <Image
                src={portraitImage}
                alt="St. John Henry Newman"
                width={220}
                height={300}
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
