interface IIconProps {
  stroke?: string;
  fill?: string;
  height?: number;
  width?: number;
  strokeWidth?: number;
  className?: string;

}

const MenuCloseIcon: React.FC<IIconProps> = ({
  stroke = "#000",
  fill = "none",
  height = 20,
  width = 20,
  strokeWidth = 1,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
};

const MenuOpenIcon: React.FC<IIconProps> = ({
  stroke = "#000",
  fill = "none",
  height = 20,
  width = 20,
  strokeWidth = 1,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  );
};

const HomeIcon: React.FC<IIconProps> = ({
  stroke = "#000",
  fill = "none",
  height = 20,
  width = 20,
  strokeWidth = 1,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </svg>
  );
};

const OfficeIcon: React.FC<IIconProps> = ({
  stroke = "#000",
  fill = "none",
  height = 20,
  width = 20,
  strokeWidth = 1,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 21h18" />
      <path d="M19 21v-4" />
      <path d="M19 17a2 2 0 0 0 2 -2v-2a2 2 0 1 0 -4 0v2a2 2 0 0 0 2 2z" />
      <path d="M14 21v-14a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v14" />
      <path d="M9 17v4" />
      <path d="M8 13h2" />
      <path d="M8 9h2" />
    </svg>
  );
};

const CarpetIcon: React.FC<IIconProps> = ({
  stroke = "#000",
  fill = "none",
  height = 20,
  width = 20,
  strokeWidth = 1,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3l3 6l6 3l-6 3l-3 6l-3 -6l-6 -3l6 -3z" />
    </svg>
  );
};

const EnterpriseIcon: React.FC<IIconProps> = ({
  stroke = "#000",
  fill = "none",
  height = 20,
  width = 20,
  strokeWidth = 1,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 21l18 0" />
      <path d="M9 8l1 0" />
      <path d="M9 12l1 0" />
      <path d="M9 16l1 0" />
      <path d="M14 8l1 0" />
      <path d="M14 12l1 0" />
      <path d="M14 16l1 0" />
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
    </svg>
  );
};

const AboutIcon: React.FC<IIconProps> = ({
  stroke = "#000",
  fill = "none",
  height = 20,
  width = 20,
  strokeWidth = 1,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 9h.01" />
      <path d="M11 12h1v4h1" />
    </svg>
  );
};

const ContactIcon: React.FC<IIconProps> = ({
  stroke = "#000",
  fill = "none",
  height = 20,
  width = 20,
  strokeWidth = 1,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
      <path d="M13 18l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" />
      <path d="M19 16l-2 3h4l-2 3" />
    </svg>
  );
};


const ServicesIcon: React.FC<IIconProps> = ({
  stroke = "#000",
  fill = "none",
  height = 20,
  width = 20,
  strokeWidth = 1,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M5.931 6.936l1.275 4.249m5.607 5.609l4.251 1.275" />
  <path d="M11.683 12.317l5.759 -5.759" />
  <path d="M5.5 5.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
  <path d="M18.5 5.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
  <path d="M18.5 18.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" />
  <path d="M8.5 15.5m-4.5 0a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0" />
    </svg>
  );
};

export {
  MenuCloseIcon,
  MenuOpenIcon,
  HomeIcon,
  OfficeIcon,
  CarpetIcon,
  EnterpriseIcon,
  AboutIcon,
  ContactIcon,
  ServicesIcon,
};
