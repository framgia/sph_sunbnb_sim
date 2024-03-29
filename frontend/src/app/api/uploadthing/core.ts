import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 }
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file);
    console.log(metadata);
  })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
