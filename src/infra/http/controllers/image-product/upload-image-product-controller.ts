import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, streamToUint8Array } from "../../../../utils/firebase";

export const UploadImageProductController = async (request: FastifyRequest, reply: FastifyReply) => {
  const upload = await request.file({
    limits: {
      fileSize: 5_242_880, // 5MB
    }
  });

  if (!upload) {
    return reply.status(400).send({ message: "Invalid file" });
  }

  try {
    const mimeTypeRegex = /^image\/(jpeg|png)$/;
    const isValidMimeType = mimeTypeRegex.test(upload.mimetype);
    if (!isValidMimeType) {
      return reply.status(400).send({ message: "Invalid file type" });
    }

    const fileId = randomUUID();
    const extension = extname(upload.filename);
    const fileName = fileId.concat(extension);

    const storageRef = ref(storage, `images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, await streamToUint8Array(upload.file));
    await uploadTask;
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    reply.status(200).send(downloadURL);

  } catch (error) {
    console.log(error);
    reply.status(500).send({ message: "Internal server error" });
  }
};
