import type { SVGProps } from "react";
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Foleman Electricals"
      {...props}
    >
      <title>Foleman Electricals</title>
      <circle cx="60" cy="60" r="54" fill="currentColor" />
      <path
        d="M38 25h42V17l24 19-24 19v-9H36l-3 12H9v13h54c-2 11-11 17-26 17l-5 22H18l8-39H9V58h20Z"
        fill="#0a0a0a"
      />
    </svg>
  );
}
export const contact = {
  phone: "+2347034007635",
  phoneDisplay: "+234 703 400 7635",
  email: "eisrael378@gmail.com",
  instagram: "@foleman_electricals",
  instagramUrl: "https://www.instagram.com/foleman_electricals/",
  whatsapp: "https://wa.me/2347034007635",
};
