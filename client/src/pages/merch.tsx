import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function Merch() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Thank You Podcast Merchandise</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder merchandise items */}
        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <CardContent className="pt-6">
              <div className="aspect-square bg-muted rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Merchandise details will be available soon...
              </p>
              <Button disabled className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Shop Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
