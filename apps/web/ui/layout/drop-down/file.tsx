"use client";

import React, { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@chatgpt/ui";
import { FilePlus2, LayoutGrid, Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { api } from "@/lib/axios";
import axios from "axios";
import useFileStore from "@/lib/store/file-store";

export default function FileDropdown() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addFile } = useFileStore();

  async function handleFileUpload(file: File) {
    const response = await api.get("/file");
    const { cloudName, apiKey, timestamp, signature, folder } = response.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const mimeType = file.type;

    const resourceType = mimeType.startsWith("image/") ? "image" : "raw";

    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const url = uploadRes.data.secure_url;
    const extension = file.name.split(".").pop() || "";

    addFile({
      id: nanoid(),
      url,
      type: resourceType,
      name: file.name,
      format: extension,
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }

  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
      />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Plus size={20} color="white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-52 bg-dark-200 border-0 rounded-2xl shadow-2xl shadow-black/40 text-white p-[6px]"
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-dark-100 cursor-pointer border-0 focus:outline-none rounded-lg">
              <LayoutGrid size={17} />
              Add from apps
            </DropdownMenuSubTrigger>
          </DropdownMenuSub>

          <DropdownMenuItem
            className="rounded-lg"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <FilePlus2 />
            Add photo and files
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
