import Link from "next/link";
import { Button } from "@/components/ui/button";
import mixpanel from "mixpanel-browser";

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500">© FixPanel since 2025. All hail the thief.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="https://www.youtube.com/watch?v=2qBlE2-WL60">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="https://www.youtube.com/watch?v=2qBlE2-WL60">
          Privacy
        </Link>
        <Button
          id="theResetButton"
          onClick={() => {
            mixpanel.track("END OF SESSION");
            mixpanel.reset();
            mixpanel.track("NEW SESSION");			
			window.scrollTo(0, 0);
            window.location.reload();
          }}
        >
          reset
        </Button>
      </nav>
    </footer>
  );
}
