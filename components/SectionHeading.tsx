type SectionHeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function SectionHeading({
  as: Tag = "h2",
  centered = true,
  className = "",
  children,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <Tag className={`text-neutral-900 ${className}`}>{children}</Tag>
      <span
        className={`mt-3 block h-1 w-16 rounded-full bg-accent ${
          centered ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
