import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import * as Sentry from '@sentry/nextjs';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth();
      
      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");

      console.info("middleware");
      //Sentry.captureMessage("Teste1", "info");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {     
      
      console.info("onUploadComplete");
      console.info(metadata);
      console.info(file);
      //Sentry.captureMessage("Teste2", "info");

      try {
        await db.insert(images).values({
          name: file.name,
          url: file.url,
          userId: metadata.userId
        })  
      } catch (error) {
        console.error(error);
        //Sentry.captureException(error);        
      }
            
      console.info("OK");

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
