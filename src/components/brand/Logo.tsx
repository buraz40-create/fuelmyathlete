import Image from "next/image";
import logo from "../../../public/images/logo.png";

interface LogoProps {
  width?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({ width = 140, className, priority }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="FuelMyAthlete"
      width={width}
      height={Math.round((width * logo.height) / logo.width)}
      className={className}
      priority={priority}
      placeholder="blur"
    />
  );
}
