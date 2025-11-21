import * as React from "react";

type CreditIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const CreditIcon: React.FC<CreditIconProps> = ({
    size = 24,
    color = "currentColor",
    ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="s2"
    width={size}
    height={size}
    viewBox="0 0 300 510"
    version="1"
    {...props}
  >
    <g fill={color}>
      <g
        transform="translate(-78.375 -195.29)"
      >
        <path
          d="M127.519 210.443v92.55h-26.484v105.908h26.77v92.265h19.648V408.9h39.869v92.808h19.648v-92.808h46.361L135.654 686.927l73.09.027 151.067-383.96H206.97v-92.551h-19.65v92.55H147.74v-92.55z"
        ></path>
      </g>
    </g>
  </svg>
);

export default CreditIcon;
