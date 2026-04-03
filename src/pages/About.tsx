import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Users, Shield, Award, Target, Heart } from "lucide-react";

const values = [
  { icon: Shield, title: "Trust & Transparency", description: "Every listing is verified, every transaction is secure. We build trust through radical transparency." },
  { icon: Users, title: "Community First", description: "We're more than a platform — we're a community connecting seekers with the perfect homes." },
  { icon: Target, title: "Smart Matching", description: "Our intelligent algorithms match you with properties that fit your lifestyle, budget, and preferences." },
  { icon: Heart, title: "Human Touch", description: "Technology powers us, but people drive us. Real support from real humans, always." },
];

const stats = [
  { value: "10K+", label: "Properties Listed" },
  { value: "25K+", label: "Happy Tenants" },
  { value: "5K+", label: "Verified Agents" },
  { value: "98%", label: "Satisfaction Rate" },
];

const team = [
  { name: "Sarah Johnson", role: "CEO & Co-Founder", initials: "SJ" },
  { name: "Michael Chen", role: "CTO & Co-Founder", initials: "MC" },
  { name: "Amara Obi", role: "Head of Operations", initials: "AO" },
  { name: "David Park", role: "Head of Design", initials: "DP" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-6 lg:px-16 xl:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Home className="w-4 h-4" /> About Dwello
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Making Renting <span className="text-primary">Simple, Safe & Smart</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dwello was founded with a simple mission: to transform the rental experience for everyone. 
            We connect property seekers with verified providers through intelligent matching and seamless technology.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 lg:px-16 xl:px-20 bg-primary/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">Our Values</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            The principles that guide everything we do at Dwello.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="border-border/60 hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 lg:px-16 xl:px-20 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            The passionate people behind Dwello.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="border-border/60 text-center">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">{member.initials}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 lg:px-16 xl:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <Award className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To democratize the rental market by giving every seeker access to verified, quality housing 
            and every provider the tools to manage their properties efficiently. We believe finding a home 
            should be exciting, not exhausting.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
