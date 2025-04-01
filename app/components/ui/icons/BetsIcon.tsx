interface BetsIconProps {
  className: string;
  width: number;
  height: number;
}

const BetsIcon = ({ className, width = 32, height = 32 }: BetsIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_22_3)">
        <path
          d="M15.2628 3.49163H8.73736C8.32567 3.49163 7.99155 3.15751 7.99155 2.74581C7.99155 2.33412 8.32567 2 8.73736 2H15.2628C15.6755 2 16.0085 2.33412 16.0085 2.74581C16.0085 3.15751 15.6755 3.49163 15.2628 3.49163Z"
          fill="currentColor"
          fill-opacity="0.72"
        />
        <path
          d="M6.21441 6.5866H17.7864C18.1982 6.5866 18.5323 6.25248 18.5323 5.84078C18.5323 5.42909 18.1982 5.09497 17.7864 5.09497H6.21441C5.80272 5.09497 5.4686 5.42909 5.4686 5.84078C5.4686 6.25248 5.80272 6.5866 6.21441 6.5866Z"
          fill="currentColor"
          fill-opacity="0.72"
        />
        <path
          d="M17.2083 8.42871H6.79173C4.70145 8.42871 3 10.1302 3 12.2205V17.3477C3 19.4389 4.70145 21.1404 6.79173 21.1404H17.2083C19.2996 21.1404 21 19.4389 21 17.3477V12.2205C21 10.1302 19.2996 8.42871 17.2083 8.42871Z"
          fill="currentColor"
          fill-opacity="0.72"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_22_3"
          x="1.66667"
          y="2"
          width="20.6667"
          height="21.807"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.33333" />
          <feGaussianBlur stdDeviation="0.666667" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_22_3"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_22_3"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
export default BetsIcon;
