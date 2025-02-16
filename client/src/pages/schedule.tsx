import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Schedule() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Stream Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <iframe
            src="https://calendar.google.com/calendar/embed"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            className="rounded-lg"
          />
        </CardContent>
      </Card>
    </div>
  );
}
