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
      // Deliberately no placeholder="blur".
      //
      // The logo is a transparent PNG, and the blur placeholder Next generates from it is an
      // 8x4 bitmap whose average colour is (20, 15, 4) with pure black corners: the RGB sitting
      // underneath the transparent pixels. Blurred and stretched across the header, that is a
      // black box where the logo should be, for as long as the real file takes to arrive.
      // Reported as the logo loading slowly with a dark flash, and it was not slow. The webp
      // is 7 KB at header size and arrives in about 150ms. It just did it behind a black rectangle.
      //
      // Without a placeholder the space is reserved by width and height, so nothing shifts, and
      // the logo simply appears. A blur placeholder is for large photographs where the wait is
      // real, not for a small transparent mark that is already priority loaded.
    />
  );
}
