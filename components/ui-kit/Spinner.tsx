export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-1 border-current border-t-transparent ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
