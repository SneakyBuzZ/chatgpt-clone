"use client";

import React, { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Button,
} from "@chatgpt/ui";
import { FilePlus2, LayoutGrid, Plus, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import useFileStore from "@/lib/store/file-store";
import { uploadToCloudinary } from "@/lib/actions/file";

export default function FileDropdown() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addFile } = useFileStore();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const { url, type, format, name } = await uploadToCloudinary(file);

      addFile({
        id: nanoid(),
        url,
        type,
        name: name,
        format,
      });
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach(handleFileUpload);
    e.target.value = "";
  };

  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
        multiple
        accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,.csv"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Add file or image"
          >
            {uploading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Plus size={20} className="text-white" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-52 bg-dark-200 border-0 rounded-2xl shadow-xl p-1 text-white"
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:bg-dark-100 cursor-pointer rounded-lg">
              <LayoutGrid size={17} />
              Add from apps
            </DropdownMenuSubTrigger>
          </DropdownMenuSub>

          <DropdownMenuItem
            className="rounded-lg cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <FilePlus2 size={17} />
            Add photo or file
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
