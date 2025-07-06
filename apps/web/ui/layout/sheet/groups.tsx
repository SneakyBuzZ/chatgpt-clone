"use client";

import { useGetChatSessions } from "@/lib/queries/chat-session";
import { Button } from "@chatgpt/ui";
import { cn } from "@chatgpt/utils";
import { CirclePlay, Grid2x2, Images, Search, SquarePen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ChatDropDown from "../drop-down/chat";
import { useNewSessionStore } from "@/lib/store/new-session-store";

export default function Groups() {
  const param = usePathname();
  const [path, setPath] = useState(param.split("/")[2] || "new");
  const { data, isPending } = useGetChatSessions();
  const { prompt, reset } = useNewSessionStore();

  useEffect(() => {
    setPath(param.split("/")[2] || "new");
  }, [param, prompt, reset]);

  return (
    <>
      <GroupOne />
      <GroupTwo />
      {isPending ? null : (
        <>
          {data && data.length > 0 && (
            <div className="flex flex-1 flex-col items-start justify-start w-full">
              <span className="text-sm font-normal text-neutral-400 mb-1 ml-3">
                Chats
              </span>
              {data && data.length > 0 && (
                <>
                  {data.map((session) => (
                    <Link
                      key={session.id}
                      href={`/c/${session.id}`}
                      className={cn(
                        "group/chat-session flex justify-between items-center w-full text-left text-sm py-2 px-3 rounded-xl transition-colors hover:bg-dark-300",
                        path === session.id && "bg-neutral-800 text-white"
                      )}
                    >
                      {session.title}

                      <ChatDropDown />
                    </Link>
                  ))}
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

function GroupOne() {
  const router = useRouter();
  return (
    <li className="text-sm font-normal text-neutral-400 mb-1 w-full list-none">
      <Button
        className="w-full rounded-xl bg-transparent hover:bg-dark-200 shadow-none text-white flex justify-start items-center text-sm font-normal"
        variant={"secondary"}
        onClick={() => router.push("/")}
      >
        <SquarePen size={17} />
        New chat
      </Button>
      <Button className="w-full rounded-xl bg-transparent hover:bg-dark-200 shadow-none text-white flex justify-start items-center text-sm font-normal">
        {" "}
        <Search size={17} />
        Search chats
      </Button>
      <Button className="w-full rounded-xl bg-transparent hover:bg-dark-200 shadow-none text-white flex justify-start items-center text-sm font-normal">
        <Images size={17} />
        Library
      </Button>
    </li>
  );
}

function GroupTwo() {
  return (
    <li className="text-sm font-normal text-neutral-400 mb-1 list-none w-full">
      <Button className="w-full rounded-xl bg-transparent hover:bg-dark-200 shadow-none text-white flex justify-start items-center text-sm font-normal">
        <CirclePlay size={17} />
        Sora
      </Button>
      <Button className="w-full rounded-xl bg-transparent hover:bg-dark-200 shadow-none text-white flex justify-start items-center text-sm font-normal">
        <Grid2x2 size={17} />
        GPTs
      </Button>
    </li>
  );
}
