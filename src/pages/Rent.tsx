import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, Shield, FileText, CheckCircle, Home, ArrowRight, Users, Clock, Sparkles, Key } from "lucide-react";

const steps = [
  { icon: Search, title: "Search & Discover", description: "Browse thousands of verified properties or post your specific housing need and let agents come to you." },
  { icon: Shield, title: "Verified Listings", description: "Every property is verified by our team. No scams, no fake listings — just genuine homes ready for you." },
  { icon: FileText, title: "Smart Offers", description: "Receive personalized offers from verified agents that match your preferences, budget, and timeline." },
  { icon: Key, title: "Move In", description: "Complete your booking securely through Dwello, sign your lease digitally, and get your keys." },
];

const benefits = [
  { icon: Shield, title: "Verified Properties", description: "100% of listings go through our verification process." },
  { icon: Sparkles, title: "Smart Matching", description: "AI-powered suggestions based on your lifestyle." },
  { icon: Clock, title: "Fast Process", description: "From search to move-in in as little as 48 hours." },
  { icon: Users, title: "Direct Communication", description: "Chat directly with verified agents and landlords." },
];

const categories = [
  { title: "Apartments", count: "3,200+", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop" },
  { title: "Duplexes", count: "1,800+", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop" },
  { title: "Studios", count: "2,100+", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
  { title: "Penthouses", count: "450+", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop" },
];

const Rent = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-6 lg:px-16 xl:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Home className="w-4 h-4" /> Rent with Confidence
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Find Your Next Home, <span className="text-primary">The Smart Way</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you're looking for a cozy studio or a spacious family home, Dwello makes renting simple, 
            secure, and stress-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link to="/properties">Browse Properties <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/signup">Post Your Need</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 lg:px-16 xl:px-20 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">How Renting Works</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Four simple steps to your new home.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <Badge variant="secondary" className="mb-3">Step {i + 1}</Badge>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">Browse by Category</h2>
          <p className="text-muted-foreground text-center mb-12">Find the perfect property type for your lifestyle.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link to="/properties" key={cat.title}>
                <Card className="overflow-hidden border-border/60 group hover:shadow-lg transition-all cursor-pointer">
                  <div className="relative">
                    <img src={cat.image} alt={cat.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="font-semibold text-primary-foreground">{cat.title}</h3>
                      <p className="text-xs text-primary-foreground/80">{cat.count} listings</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 lg:px-16 xl:px-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Rent with Dwello?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="border-border/60">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-16 xl:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Find Your Home?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of happy renters who found their perfect home through Dwello.</p>
          <Button size="lg" asChild>
            <Link to="/signup">Get Started Free <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rent;
