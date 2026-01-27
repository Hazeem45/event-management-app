import cloudinary from "../config/cloudinary";

const toDataURL = (file: Express.Multer.File) => {
  const base64 = Buffer.from(file.buffer).toString("base64");
  const dataURL = `data:${file.mimetype};base64,${base64}`;
  return dataURL;
};

const getPublicIdFromFileUrl = (fileUrl: string) => {
  const fileNameUsingSubstring = fileUrl.substring(
    fileUrl.lastIndexOf("/") + 1
  );

  const publicID = fileNameUsingSubstring.substring(
    0,
    fileNameUsingSubstring.lastIndexOf(".")
  );
  return publicID;
};

export const uploadSingle = async (file: Express.Multer.File) => {
  const fileDataURL = toDataURL(file);
  const result = await cloudinary.uploader.upload(fileDataURL, {
    resource_type: "auto",
  });
  return result;
};

export const uploadMultiple = async (files: Express.Multer.File[]) => {
  const uploadBatch = files.map((item) => {
    const result = uploadSingle(item);

    return result;
  });

  const results = await Promise.all(uploadBatch);
  return results;
};

export const remove = async (fileUrl: string) => {
  const publicID = getPublicIdFromFileUrl(fileUrl);
  const result = await cloudinary.uploader.destroy(publicID);
  return result;
};
