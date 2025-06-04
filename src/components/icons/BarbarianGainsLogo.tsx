import type { SVGProps } from 'react';

const BarbarianGainsLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 50"
    className="h-8 w-auto"
    {...props}
  >
    <rect width="300" height="50" fill="transparent" />
    <text
      x="10"
      y="35"
      fontFamily="Space Grotesk, sans-serif"
      fontSize="30"
      fontWeight="bold"
      fill="hsl(var(--foreground))"
    >
      Barbarian
    </text>
    <text
      x="160"
      y="35"
      fontFamily="Space Grotesk, sans-serif"
      fontSize="30"
      fontWeight="bold"
      fill="hsl(var(--primary))"
    >
      Gains
    </text>
  </svg>
);

export default BarbarianGainsLogo;
