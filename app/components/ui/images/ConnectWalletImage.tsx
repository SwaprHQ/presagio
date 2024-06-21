import { useTheme } from 'next-themes';

export const ConnectWalletImage = ({ ...props }) => {
  const { resolvedTheme } = useTheme();

  const color1 = '#7755FF';
  const color2 = resolvedTheme === 'light' ? '#F4F3FF' : '#251255';

  return (
    <svg
      width="112"
      height="112"
      viewBox="0 0 112 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56 0C25.0721 0 0 25.0721 0 56C0 86.2585 23.9984 110.912 54 111.965V94H54.2C51.2002 94 49.7003 94 48.6489 93.2361C48.3093 92.9893 48.0107 92.6907 47.7639 92.3511C47 91.2997 47 89.7998 47 86.8V83C45.8954 83 45 82.1046 45 81C45 79.8954 45.8954 79 47 79H48V73H52V79H60V73H64V79H65C66.1046 79 67 79.8954 67 81C67 82.1046 66.1046 83 65 83V86.8C65 89.7998 65 91.2997 64.2361 92.3511C63.9893 92.6907 63.6907 92.9893 63.3511 93.2361C62.2997 94 60.7998 94 57.8 94H58V111.965C88.0016 110.912 112 86.2585 112 56C112 25.0721 86.9279 0 56 0ZM36 31.125C36 29.7443 37.1193 28.625 38.5 28.625H66.625C71.8027 28.625 76 32.8223 76 38V53C76 58.1777 71.8027 62.375 66.625 62.375H38.5C37.1193 62.375 36 61.2557 36 59.875V31.125ZM59.125 45.5C59.125 42.3934 61.6434 39.875 64.75 39.875H72.25V51.125H64.75C61.6434 51.125 59.125 48.6066 59.125 45.5ZM49.125 57.375C50.1605 57.375 51 56.5355 51 55.5C51 54.4645 50.1605 53.625 49.125 53.625H42.875C41.8395 53.625 41 54.4645 41 55.5C41 56.5355 41.8395 57.375 42.875 57.375H49.125ZM67.875 45.5C67.875 47.2259 66.4759 48.625 64.75 48.625C63.0241 48.625 61.625 47.2259 61.625 45.5C61.625 43.7741 63.0241 42.375 64.75 42.375C66.4759 42.375 67.875 43.7741 67.875 45.5Z"
        fill="url(#paint0_linear_6261_28643)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6261_28643"
          x1="56"
          y1="0"
          x2="56"
          y2="111.965"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
      </defs>
    </svg>
  );
};
