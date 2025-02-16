import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiDiscord, SiReddit } from "react-icons/si";
import { Coins, CalendarDays, ShoppingCart, Users } from "lucide-react";

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
          <nav className="flex items-center space-x-4">
            <Link href="/stream/streamer1">
              <Button variant="ghost">Streamer 1</Button>
            </Link>
            <Link href="/stream/streamer2">
              <Button variant="ghost">Streamer 2</Button>
            </Link>
            <Link href="/stream/streamer3">
              <Button variant="ghost">Streamer 3</Button>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-4">
            <Link href="/about">
              <Button variant="ghost" size="icon">
                <Users className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/schedule">
              <Button variant="ghost" size="icon">
                <CalendarDays className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/merch">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2 border-l pl-4 ml-4">
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
              <Button variant="default" asChild>
                <a href="#donate" className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  <span>Donate</span>
                </a>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}