import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@dwello.com", href: "mailto:hello@dwello.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, label: "Address", value: "123 Property Lane, Lagos, Nigeria", href: "#" },
  { icon: Clock, label: "Hours", value: "Mon - Fri: 9AM - 6PM", href: "#" },
];

const faqs = [
  { q: "How do I list my property?", a: "Sign up as a provider, complete verification, and use the 'Add Listing' feature from your dashboard." },
  { q: "Is Dwello free for seekers?", a: "Yes! Browsing, saving, and posting needs is completely free for property seekers." },
  { q: "How does the matching work?", a: "Our algorithm considers your budget, location preferences, amenities, and lifestyle to suggest the best matches." },
  { q: "How long does verification take?", a: "Provider verification typically takes 24-48 hours after submitting all required documents." },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-6 lg:px-16 xl:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" /> Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            We'd Love to <span className="text-primary">Hear From You</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or need support? Our team is here to help you with anything related to your rental journey.
          </p>
        </div>
      </section>

      <section className="pb-20 px-6 lg:px-16 xl:px-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <Card className="lg:col-span-3 border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Send className="w-5 h-5 text-primary" /> Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item) => (
              <Card key={item.label} className="border-border/60">
                <CardContent className="flex items-start gap-4 py-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-16 xl:px-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <Card key={faq.q} className="border-border/60">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
