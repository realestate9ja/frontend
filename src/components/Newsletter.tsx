import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const testimonials = [
  {
    text: "Dwello matched us with our dream home in just 2 weeks. The process was seamless and personalized.",
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    avatar: 15,
  },
  {
    text: "The neighborhood insights were invaluable. We knew exactly what we were getting before even visiting.",
    name: "Michael Chen",
    location: "San Francisco, CA",
    avatar: 32,
  },
  {
    text: "Best real estate experience ever. The recommendations were spot-on and saved us months of searching.",
    name: "Emily Rodriguez",
    location: "Austin, TX",
    avatar: 44,
  },
];

const Newsletter = () => {
  return (
    <>
      {/* Testimonials */}
      <section className="px-6 lg:px-16 xl:px-20 py-20">
        <div className="mb-14">
          <p className="text-xs font-medium text-primary uppercase tracking-[0.2em] font-mono mb-4">Testimonials</p>
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-xl p-7 border border-border/50">
              <div className="flex gap-0.5 mb-5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-16 xl:px-20 py-20 bg-[hsl(var(--dark-bg))]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl lg:text-4xl text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-white/40 mb-10 text-[15px] leading-relaxed">
            Join thousands of satisfied homeowners who found their perfect property with Dwello's platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" className="rounded-lg px-8 py-6 text-sm font-medium border-white/20 text-white hover:bg-white/5 gap-2">
              Get Started
            </Button>
            <Button className="rounded-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium gap-2">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
