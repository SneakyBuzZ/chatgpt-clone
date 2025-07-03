"use client";

import useFileStore from "@/lib/store/file-store";
import { Button } from "@chatgpt/ui";
import { FileChartColumnIncreasing, FileText, Table2, X } from "lucide-react";

interface UploadedFileProps {
  id: string;
  type: string;
  url: string;
  name: string;
  format: string;
}

type FileFormat =
  | "Spreadsheet"
  | "Document"
  | "PDF"
  | "Presentation"
  | "Unknown File";

export default function UploadedFile({
  id,
  type,
  name,
  url,
  format,
}: UploadedFileProps) {
  const { removeFile } = useFileStore();

  const handleRemove = () => {
    removeFile(id);
  };

  const fileFormat: FileFormat = (() => {
    switch (format) {
      case "csv":
        return "Spreadsheet";
      case "txt":
        return "Document";
      case "pdf":
        return "PDF";
      case "doc":
        return "Document";
      case "docx":
        return "Document";
      case "pptx":
        return "Presentation";
      default:
        return "Unknown File";
    }
  })();

  if (type !== "image") {
    return (
      <li
        key={id}
        className="relative flex justify-start items-center gap-2 h-14 border border-dark-100 rounded-2xl min-w-80 p-2"
      >
        <FileIcon format={fileFormat} />
        <div className="h-10 flex-1 flex flex-col justify-center items-start text-white">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-sm">{fileFormat}</span>
        </div>
        <Button
          size={"icon"}
          className="rounded-full h-4 w-4 absolute right-[6px] top-[6px]"
          onClick={handleRemove}
        >
          <X />
        </Button>
      </li>
    );
  }

  return (
    <div className="cursor-pointer group/image h-14 w-14 flex justify-center items-center relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height={10}
        width={10}
        src={url}
        className="h-full w-full hover:opacity-75 rounded-xl object-cover"
        alt={name}
        loading="lazy"
      />
      <Button
        size={"icon"}
        className="opacity-0 group-hover/image:opacity-100 rounded-full h-4 w-4 absolute right-[6px] top-[6px]"
        onClick={handleRemove}
      >
        <X />
      </Button>
    </div>
  );
}

interface FileIconProps {
  format: FileFormat;
}

function FileIcon({ format }: FileIconProps) {
  if (format === "Document" || format === "PDF") {
    return (
      <div className="h-10 w-10 flex justify-center items-center bg-[#fd548c] rounded-lg">
        <FileText color="white" size={22} />
      </div>
    );
  } else if (format === "Spreadsheet") {
    return (
      <div className="h-10 w-10 flex justify-center items-center bg-[#189275] rounded-lg">
        <Table2 color="white" size={22} />
      </div>
    );
  } else if (format === "Presentation") {
    return (
      <div className="h-10 w-10 flex justify-center items-center bg-[#fbc53a] rounded-lg">
        <FileChartColumnIncreasing color="white" size={22} />
      </div>
    );
  }
}
