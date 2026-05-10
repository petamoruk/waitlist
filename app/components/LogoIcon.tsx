export default function LogoIcon({ size = 26 }: Readonly<{ size?: number }>) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 34C20 34 5 22 5 12.5C5 7.25 9.25 3 14.5 3C17.12 3 20 4.8 20 4.8C20 4.8 22.88 3 25.5 3C30.75 3 35 7.25 35 12.5C35 22 20 34 20 34Z" fill="#E85D75"/>
      <circle cx="13" cy="4.5" r="3" fill="#E85D75" opacity="0.5"/>
      <circle cx="27" cy="4.5" r="3" fill="#E85D75" opacity="0.5"/>
      <circle cx="7.5" cy="11" r="2.5" fill="#E85D75" opacity="0.4"/>
      <circle cx="32.5" cy="11" r="2.5" fill="#E85D75" opacity="0.4"/>
    </svg>
  );
}
