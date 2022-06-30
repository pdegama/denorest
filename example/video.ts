import * as colors from "https://deno.land/std/fmt/colors.ts";
import { serve } from "https://deno.land/std/http/mod.ts";

const port = 9000,
  videoPath = "./testdata/",
  numBlocksPerRequest = 30,
  blockSize = 16_384,
  videoBlockSize = blockSize * numBlocksPerRequest;

function logHttpTxn(req: Request, resp: Response) {
  const g = colors.green, gr = colors.gray, c = colors.cyan;
  const u = new URL(req.url);
  const qs = u.searchParams.toString();
  const reqRange = req.headers.get("range")?.split("=")[1] || "";
  const rspCtRange = resp.headers.get("content-range")?.split(" ")[1] || "";
  const rspCtl = resp.headers.get("content-length") || "0";
  console.log(
    `${g(req.method)} ${c(u.pathname + (qs ? "?" + qs : ""))} ${
      gr(reqRange)
    } - ${g(resp.status.toString())} ${c(rspCtl)} ${gr(rspCtRange)}`,
  );
}

async function getVideoSize(videoName: string) {
  return (await Deno.stat(videoName)).size;
}

function baseHtml(videoName: string) {
  return new Response(
    `
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Test video streaming with Deno</title>
    </head>
    <body>
        <video id="videoPlayer" width="100%" controls muted autoplay>
            <source src="/getVideo?videoName=${videoName}" type="video/mp4"/>
        </video>
    </body>
    </html>`,
    {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    },
  );
}

function getStream(video: Deno.File) {
  let readBlocks = numBlocksPerRequest;
  return new ReadableStream({
    async pull(controller) {
      const chunk = new Uint8Array(blockSize);
      try {
        const read = await video.read(chunk);
        if (read) {
          controller.enqueue(chunk.subarray(0, read));
        }
        readBlocks--;
        if (readBlocks === 0) {
          video.close();
          controller.close();
        }
      } catch (e) {
        controller.error(e);
        video.close();
      }
    },
  });
}

async function getVideo(headers: Headers, videoName: string) {
  let videoSize = 0;
  try {
    videoSize = await getVideoSize(videoName);
  } catch (_err) {
    return new Response(null, { status: 500 });
  }
  console.log(headers.has("range"));

  const startIndex = headers.has("range")
    ? Number(headers.get("range")?.replace(/\D/g, "")?.trim())
    : 0;
  const endIndex = Math.min(startIndex + videoBlockSize, videoSize);
  console.log(videoName);

  const video = await Deno.open(videoName);
  if (startIndex > 0) {
    await Deno.seek(video.rid, startIndex, Deno.SeekMode.Start);
  }

  return new Response(getStream(video), {
    status: 206,
    headers: {
      "Content-Range": `bytes ${startIndex}-${endIndex}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": `${endIndex - startIndex}`,
      "Content-Type": "video/mp4",
    },
  });
}

async function handleRequest(req: Request) {
  let resp: Response | undefined;
  const u = new URL(req.url);
  const videoName = u.searchParams.get("videoName") || "video.mp4";
  if (req.method !== "GET") {
    resp = new Response(null, { status: 405 });
  }
  switch (u.pathname) {
    case "/": {
      resp = baseHtml(videoName);
      break;
    }
    case "/getVideo": {
      if (!videoName) {
        console.log(234234);

        resp = new Response(null, { status: 400 });
      } else {
        resp = await getVideo(req.headers, videoName);
      }
    }
  }
  if (!resp) {
    resp = new Response(null, { status: 404 });
  }
  logHttpTxn(req, resp);
  return resp;
}

serve(handleRequest, { port });
console.log(`Video server listening on http://localhost:${port}`);
