export interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-14 text-center">
      <h2 className="text-4xl font-black tracking-tight text-white">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-gray-400">{subtitle}</p>}
    </div>
  );
}