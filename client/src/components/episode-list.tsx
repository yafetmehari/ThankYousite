import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { Episode } from "@shared/schema";
import { format } from "date-fns";

export function EpisodeList() {
  const { data: episodes, isLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {episodes?.map((episode) => (
          <Card key={episode.id}>
            <CardHeader>
              <CardTitle className="line-clamp-2">{episode.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(new Date(episode.publishedAt), "MMMM d, yyyy")}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {episode.description}
              </p>
              <div className="aspect-video">
                <iframe
                  src={episode.embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}