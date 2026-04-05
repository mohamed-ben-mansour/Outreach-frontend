interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div>
    <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
);

export default PageHeader;
