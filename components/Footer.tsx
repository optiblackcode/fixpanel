import Link from "next/link";
import { Button } from "@/components/ui/button";
//@ts-ignore
import mixpanel from "mixpanel-browser";

export function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row py-6 w-full items-center justify-between px-4 md:px-6 border-t">
      <div className="w-1/3">
        <p className="text-xs text-gray-500">© FixPanel since 2025. All hail the thief.</p>
      </div>

      <div className="w-1/3 flex justify-center">
        <Button
          id="theResetButton"
          onClick={() => {
            if (window.RESET && typeof window.RESET === "function") {
              window.RESET();
            }
          }}
        >
          reset mixpanel
        </Button>
      </div>

      <nav className="w-1/3 flex justify-end gap-4">
        <Link className="text-xs hover:underline underline-offset-4" href="https://www.youtube.com/watch?v=2qBlE2-WL60">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="https://www.youtube.com/watch?v=2qBlE2-WL60">
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
