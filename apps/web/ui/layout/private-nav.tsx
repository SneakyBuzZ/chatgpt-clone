import { Button } from "@chatgpt/ui";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { MessageCircleDashed } from "lucide-react";
import ModelDropdown from "./drop-down/model";

export default function PrivateNav() {
  return (
    <nav className="w-full z-50 absolute top-0 flex justify-between items-center p-2 bg-dark-300 border-b border-neutral-700/50">
      <ModelDropdown />
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
