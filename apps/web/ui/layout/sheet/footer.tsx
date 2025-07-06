import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { CircleFadingArrowUp } from "lucide-react";

export default function Footer() {
  const { user } = useUser();
  return (
    <ul className="w-full flex flex-col items-start justify-start gap-1 place-self-end">
      <li className="list-none flex w-full items-center gap-2 p-2 py-1 rounded-lg hover:bg-dark-200 cursor-pointer">
        <CircleFadingArrowUp
          className="border border-neutral-700 rounded-full text-white p-1"
          size={28}
        />
        <div className="flex flex-col justify-center items-start">
          <span className="text-sm font-semibold text-neutral-200">
            Upgrade plans
          </span>
          <span className="text-xs text-neutral-400">
            More access to best models
          </span>
        </div>
      </li>
      <li className="list-none flex w-full items-center gap-2 p-2 py-1 rounded-lg hover:bg-dark-200 cursor-pointer">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="flex flex-col justify-center items-start">
          <span className="text-sm font-semibold text-neutral-200">
            {user?.fullName}
          </span>
          <span className="text-xs text-neutral-400">FREE</span>
        </div>
      </li>
    </ul>
  );
}
