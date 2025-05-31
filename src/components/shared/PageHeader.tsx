interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={`mb-8 md:mb-12 text-center ${className}`}>
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
