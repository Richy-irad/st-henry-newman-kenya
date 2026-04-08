import Image from "next/image";
import Link from "next/link";

type CardProps = {
  href?: string;
  lang?: string;
  image?: { src: string; alt: string };
  padding?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  href,
  lang,
  image,
  padding = "md",
  className = "",
  children,
}: CardProps) {
  const content = (
    <>
      {image && (
        <div className="relative aspect-video w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </>
  );

  const base = `overflow-hidden rounded-[var(--radius)] bg-white shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)] ${className}`;

  if (href) {
    const resolvedHref = lang ? `/${lang}${href}` : href;
    return (
      <article className={base}>
        <Link href={resolvedHref} className="block">
          {content}
        </Link>
      </article>
    );
  }

  return <article className={base}>{content}</article>;
}
