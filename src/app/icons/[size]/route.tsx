import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// PWA icons have to be square and neither brand asset is. Generated here at build time from
// favicon.png, which is the flame-runner mark on its own: the full logo includes the wordmark,
// which renders as unreadable mush at 192px and disappeared into the olive background.
// Sized to 62% of the canvas so a maskable circle crop cannot clip the mark.
export const dynamic = "force-static";

const SIZES = [192, 512] as const;
// Warm white rather than the olive primary, because the mark is orange and needs a light
// ground to read on a home screen next to other icons.
const BACKGROUND = "#F5F4F1";

export function generateStaticParams() {
  return SIZES.map((size) => ({ size: String(size) }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> }
): Promise<Response> {
  const { size: rawSize } = await params;
  const size = Number(rawSize);
  if (!SIZES.includes(size as (typeof SIZES)[number])) {
    return new Response("Not found", { status: 404 });
  }

  const logo = await readFile(path.join(process.cwd(), "public", "images", "favicon.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BACKGROUND,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders through Satori, which supports a plain img and not next/image. */}
        <img src={src} width={Math.round(size * 0.62)} alt="" />
      </div>
    ),
    { width: size, height: size }
  );
}
