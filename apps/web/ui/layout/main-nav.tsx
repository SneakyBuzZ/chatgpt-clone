import { Button } from "@chatgpt/ui";
import InfoDropDown from "@/ui/layout/drop-down/info";
import ModelDropDown from "@/ui/layout/drop-down/model";
import { SquarePen } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function MainNav() {
  return (
    <nav className="w-full flex justify-between items-center">
      <div className="flex items-center justify-center">
        <Button variant={"ghost"} className=" rounded-md">
          <SquarePen size={17} color="white" />
        </Button>
        <ModelDropDown />
      </div>
      <div className="flex items-center justify-center gap-2">
        <SignedOut>
          <SignInButton>
            <Button>Log in</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant={"outline"}>Sign up for free</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <InfoDropDown />
      </div>
    </nav>
  );
}
