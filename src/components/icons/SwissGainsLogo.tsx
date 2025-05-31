import type { SVGProps } from 'react';

const SwissGainsLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 50"
    className="h-8 w-auto"
    {...props}
  >
    <rect width="200" height="50" fill="transparent" />
    <text
      x="10"
      y="35"
      fontFamily="Space Grotesk, sans-serif"
      fontSize="30"
      fontWeight="bold"
      fill="hsl(var(--foreground))"
    >
      Swiss
    </text>
    <text
      x="105"
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

export default SwissGainsLogo;
