import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import config from "@/app/config/config";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: config.uploadthingId,
    uploadthingSecret: config.uploadthingSecret
  }
});
