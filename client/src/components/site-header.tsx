import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiSpotify, SiYoutube, SiX } from "react-icons/si";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/">
            <div className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                Thank You Podcast
              </span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                <SiSpotify className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <SiYoutube className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <SiX className="h-5 w-5" />
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}