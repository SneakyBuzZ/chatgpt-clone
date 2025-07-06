import { Button, useSidebar } from "@chatgpt/ui";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { MessageCircleDashed, PanelRight } from "lucide-react";
import ModelDropdown from "./drop-down/model";
import SideSheet from "./sheet/side-sheet";

export default function PrivateNav() {
  const { open, setOpen } = useSidebar();
  return (
    <nav className="w-full z-50 absolute top-0 flex justify-between items-center p-2 bg-dark-300 border-b border-neutral-700/50">
      <SideSheet />
      <div className="w-full flex items-center justify-start gap-4">
        {!open && (
          <Button
            size={"icon"}
            className="hidden xl:flex bg-transparent rounded-lg shadow-none hover:bg-dark-200"
            onClick={() => setOpen(true)}
          >
            <PanelRight size={20} color="white" />
          </Button>
        )}
        <ModelDropdown />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button size={"icon"} variant={"ghost"}>
          <MessageCircleDashed size={20} />
        </Button>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
