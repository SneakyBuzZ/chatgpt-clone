import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@chatgpt/ui";
import { ChartNoAxesGantt } from "lucide-react";
import Header from "./header";
import Groups from "./groups";
import Footer from "./footer";

export default function SideSheet() {
  return (
    <Sheet>
      <SheetTrigger className="xl:hidden">
        <ChartNoAxesGantt color="white" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="absolute w-[260px] h-full bg-dark-500 flex flex-col items-center justify-start border-0 text-white p-0 py-0 -translate-y-2 px-2"
      >
        <SheetTitle />
        <Header />
        <Groups />
        <Footer />
      </SheetContent>
    </Sheet>
  );
}
