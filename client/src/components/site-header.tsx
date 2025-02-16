import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiTwitch, SiDiscord, SiReddit, SiKick } from "react-icons/si";
import { Coins } from "lucide-react";

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
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer">
                <SiTwitch className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://kick.com" target="_blank" rel="noopener noreferrer">
                <SiKick className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
                <SiDiscord className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://reddit.com" target="_blank" rel="noopener noreferrer">
                <SiReddit className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="default" className="ml-4" asChild>
              <a href="#donate" className="flex items-center gap-2">
                <Coins className="h-4 w-4" />
                <span>Donate</span>
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}