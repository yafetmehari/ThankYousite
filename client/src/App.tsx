import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import Home from "@/pages/home";
import About from "@/pages/about";
import Schedule from "@/pages/schedule";
import Merch from "@/pages/merch";
import StreamerPage from "@/pages/stream/[streamer]";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/merch" component={Merch} />
      <Route path="/stream/:streamer" component={StreamerPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <Router />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;