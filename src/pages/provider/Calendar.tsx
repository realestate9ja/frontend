import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

const bookings = [
  { day: 0, startHour: 2, duration: 2, guest: "Emeka N.", property: "2 Bed Serviced, VI", status: "Confirmed" },
  { day: 2, startHour: 0, duration: 3, guest: "Corporate Client", property: "2 Bed Serviced, VI", status: "Pending" },
  { day: 4, startHour: 4, duration: 1, guest: "Fatima A.", property: "2 Bed Serviced, VI", status: "Confirmed" },
  { day: 5, startHour: 1, duration: 4, guest: "Guest User", property: "2 Bed Serviced, VI", status: "Confirmed" },
];

const upcomingBookings = [
  { id: 1, guest: "Emeka Nwankwo", property: "2 Bed Serviced, VI", checkIn: "Mar 22", checkOut: "Mar 24", amount: "₦90,000", status: "Confirmed" },
  { id: 2, guest: "Corporate Client", property: "2 Bed Serviced, VI", checkIn: "Mar 25", checkOut: "Mar 28", amount: "₦135,000", status: "Pending" },
  { id: 3, guest: "Fatima Abdullahi", property: "2 Bed Serviced, VI", checkIn: "Mar 30", checkOut: "Mar 31", amount: "₦45,000", status: "Confirmed" },
];

export default function ProviderCalendar() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Short-let Calendar</h2>
        <p className="text-muted-foreground">Manage your short-let availability and bookings.</p>
      </div>

      {/* Simple week grid */}
      <Card>
        <CardHeader>
          <CardTitle>This Week — March 18-24, 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-px bg-border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-muted p-2 text-xs font-medium text-muted-foreground">Time</div>
            {days.map((d) => (
              <div key={d} className="bg-muted p-2 text-xs font-medium text-center text-muted-foreground">{d}</div>
            ))}
            {/* Rows */}
            {hours.map((hour, hi) => (
              <>
                <div key={`t-${hi}`} className="bg-background p-2 text-xs text-muted-foreground border-t">{hour}</div>
                {days.map((_, di) => {
                  const booking = bookings.find(b => b.day === di && b.startHour === hi);
                  return (
                    <div key={`${di}-${hi}`} className="bg-background border-t min-h-[40px] relative">
                      {booking && (
                        <div
                          className={`absolute inset-x-0.5 top-0.5 rounded p-1 text-xs ${
                            booking.status === "Confirmed" ? "bg-primary/15 text-primary border border-primary/30" : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          }`}
                          style={{ height: `${booking.duration * 40 - 4}px`, zIndex: 1 }}
                        >
                          <p className="font-medium truncate">{booking.guest}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming list */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingBookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-foreground">{b.guest}</p>
                <p className="text-sm text-muted-foreground">{b.checkIn} → {b.checkOut}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{b.amount}</p>
                <Badge variant={b.status === "Confirmed" ? "default" : "secondary"} className="text-xs">{b.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
