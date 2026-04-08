import Image from "next/image";
import Button from "./Button";

type HeroProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  cta?: { label: string; href: string };
  lang?: string;
};

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  cta,
  lang,
}: HeroProps) {
  return (
    <section
      className={`relative flex min-h-[400px] w-full items-center md:min-h-[500px] ${
        !backgroundImage ? "bg-primary" : ""
      }`}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          preload
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-primary/70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
            {subtitle}
          </p>
        )}
        {cta && (
          <div className="mt-8">
            <Button variant="gold" size="lg" href={cta.href} lang={lang}>
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
