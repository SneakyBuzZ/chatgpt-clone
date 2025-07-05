import { UploadedFile } from "@/lib/types/file";
import UploadedFileComponent from "./uploaded-file";

export default function FilePreviewBar({ files }: { files: UploadedFile[] }) {
  return (
    <ul className="flex gap-2 overflow-x-auto hide-scrollbar mb-3">
      {files.map((file) => (
        <UploadedFileComponent
          key={file.id}
          id={file.id}
          type={file.type}
          format={file.format}
          name={file.name}
          url={file.url}
        />
      ))}
    </ul>
  );
}
