interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  gradientClass?: string;
}

const ResultCard = ({ title, value, subtitle, gradientClass = "gradient-primary" }: ResultCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-card animate-scale-in">
      <p className="text-xs font-medium text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {subtitle && (
        <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${gradientClass} text-primary-foreground`}>
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default ResultCard;
