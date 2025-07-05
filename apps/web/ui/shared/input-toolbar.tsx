import { Button } from "@chatgpt/ui";
import { ArrowUp, AudioLines, Mic, Square, Settings2 } from "lucide-react";
import FileDropdown from "@/ui/layout/drop-down/file";

export default function InputToolbar({
  isPending,
  prompt,
}: {
  isPending: boolean;
  prompt: string;
}) {
  return (
    <div className="flex justify-between items-center mt-3">
      <div className="flex items-center gap-2">
        <FileDropdown />
        <Button variant="ghost" className="rounded-full">
          <Settings2 size={18} />
          Tools
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Mic size={17} />
        </Button>
        {prompt.length > 0 ? (
          isPending ? (
            <Button size="icon" className="bg-white rounded-full">
              <Square fill="#000" size={17} />
            </Button>
          ) : (
            <Button type="submit" size="icon" className="rounded-full">
              <ArrowUp size={17} strokeWidth={4} />
            </Button>
          )
        ) : (
          <Button size="icon" variant="secondary" className="rounded-full">
            <AudioLines size={17} />
          </Button>
        )}
      </div>
    </div>
  );
}
