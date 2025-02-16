import { HeroSection } from "@/components/hero-section";
import { EpisodeList } from "@/components/episode-list";
import { NewsletterForm } from "@/components/newsletter-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <main className="container py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6">Latest Episodes</h2>
          <EpisodeList />
        </section>

        <section className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Subscribe to Our Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-4">
                Get notified about new episodes and exclusive content.
              </p>
              <NewsletterForm />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
