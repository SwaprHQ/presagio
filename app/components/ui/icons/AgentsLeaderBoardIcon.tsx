interface IconProps {
  className: string;
  width?: number;
  height?: number;
}

export const AgentsLeaderBoardIcon = ({
  className,
  width = 24,
  height = 24,
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_508_2006)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.56 2H16.4389C19.7653 2 22 4.33789 22 7.81684V16.1832C22 19.6621 19.7642 22 16.4379 22H7.56C4.23474 22 2 19.6621 2 16.1832V7.81684C2 4.33789 4.23474 2 7.56 2ZM11.0937 8.62H17.6547C18.0905 8.62 18.4442 8.26632 18.4442 7.83053C18.4442 7.39474 18.0905 7.04105 17.6547 7.04105H11.0937C10.6579 7.04105 10.3042 7.39474 10.3042 7.83053C10.3042 8.26632 10.6579 8.62 11.0937 8.62ZM10.0937 12.7884H17.6547C18.0905 12.7884 18.4442 12.4347 18.4442 11.9989C18.4442 11.5632 18.0905 11.2095 17.6547 11.2095H10.0937C9.65789 11.2095 9.30421 11.5632 9.30421 11.9989C9.30421 12.4347 9.65789 12.7884 10.0937 12.7884ZM10.0937 16.9568H17.6547C18.0905 16.9568 18.4442 16.6032 18.4442 16.1674C18.4442 15.7316 18.0905 15.3779 17.6547 15.3779H10.0937C9.65789 15.3779 9.30421 15.7316 9.30421 16.1674C9.30421 16.6032 9.65789 16.9568 10.0937 16.9568ZM6.34526 12.7884H6.66632C7.10211 12.7884 7.45579 12.4347 7.45579 11.9989C7.45579 11.5632 7.10211 11.2095 6.66632 11.2095H6.34526C5.90947 11.2095 5.55579 11.5632 5.55579 11.9989C5.55579 12.4347 5.90947 12.7884 6.34526 12.7884ZM6.34526 16.9568H6.66632C7.10211 16.9568 7.45579 16.6032 7.45579 16.1674C7.45579 15.7316 7.10211 15.3779 6.66632 15.3779H6.34526C5.90947 15.3779 5.55579 15.7316 5.55579 16.1674C5.55579 16.6032 5.90947 16.9568 6.34526 16.9568ZM6.59424 9.6319C6.95924 8.5272 7.32712 8.15924 8.43189 7.79425C8.52271 7.76423 8.52271 7.6358 8.43189 7.60577C7.32718 7.24077 6.95923 6.87289 6.59424 5.76813C6.56421 5.67731 6.43579 5.67731 6.40576 5.76813C6.04076 6.87283 5.67288 7.24078 4.56811 7.60577C4.4773 7.6358 4.4773 7.76422 4.56811 7.79425C5.67282 8.15926 6.04077 8.52713 6.40576 9.6319C6.43579 9.72272 6.56421 9.72272 6.59424 9.6319Z"
        fill="currentColor"
        fillOpacity="0.72"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_508_2006"
        x="-0.5"
        y="0"
        width="25"
        height="25.5"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="0.5"
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow_508_2006"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_508_2006"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_508_2006"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
