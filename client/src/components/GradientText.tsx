interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText = ({ children, className  }: GradientTextProps) => {
  return (
    <span
      className={`bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent animate-gradient-x ${className} text-primary-900`}
    >
      {children}
    </span>
  );
};
