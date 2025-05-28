export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="QuickIntro Logo"
    >
      <rect width="40" height="40" rx="8" fill="currentColor" />
      {/* A simple 'QI' monogram style */}
      <path
        d="M12 14H18V16H14V20H17V22H14V26H12V14Z"
        fill="hsl(var(--background))" 
      />
      <path
        d="M17 24H19L21 26H15L17 24Z"
        fill="hsl(var(--background))"
      />
      <path
        d="M22 14H28V24H26V16H24V24H22V14Z"
        fill="hsl(var(--background))"
      />
       <path
        d="M27 22L28 24L29 22H27Z"
        fill="hsl(var(--background))"
      />
    </svg>
  );
}
