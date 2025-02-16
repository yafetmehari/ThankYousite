import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">About Thank You Podcast</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert">
          <p className="text-lg text-muted-foreground">
            Thank You Podcast brings together three unique voices in streaming for insightful
            conversations, compelling stories, and thoughtful discussions that will leave you
            saying "Thank You" for listening.
          </p>
          
          <h3>Our Hosts</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Add host cards here once you have their information */}
            {["Host 1", "Host 2", "Host 3"].map((host, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h4 className="text-xl font-bold mb-2">{host}</h4>
                  <p className="text-sm text-muted-foreground">
                    Bio coming soon...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
