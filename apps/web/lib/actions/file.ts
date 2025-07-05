import axios from "axios";
import { api } from "../axios";

export async function uploadToCloudinary(
  file: File
): Promise<{ url: string; type: string; format: string; name: string }> {
  const res = await api.get("/file");
  const { cloudName, apiKey, timestamp, signature, folder } = res.data;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  const resourceType = file.type.startsWith("image/") ? "image" : "raw";

  const uploadRes = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    formData
  );

  return {
    url: uploadRes.data.secure_url,
    type: resourceType,
    format: file.name.split(".").pop() || "",
    name: file.name,
  };
}
