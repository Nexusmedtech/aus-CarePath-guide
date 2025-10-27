import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, MapPin, Heart, AlertCircle, Phone } from "lucide-react";
import { useState } from "react";
import SymptomChecker from "@/components/SymptomChecker";

const Index = () => {
  const [showChecker, setShowChecker] = useState(false);

  if (showChecker) {
    return <SymptomChecker onBack={() => setShowChecker(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Emergency Banner */}
      <div className="bg-destructive text-destructive-foreground py-3">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">In an emergency, always call 000 immediately</span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">CarePath</h1>
            </div>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              HealthDirect: 1800 022 222
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <Shield className="h-4 w-4" />
            Aligned with HealthDirect Guidelines
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get the Right Care, Right Now
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Not sure if you should visit your GP or the Emergency Department? 
            CarePath provides trusted, clinically-aligned guidance to help you make the right decision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => setShowChecker(true)}
            >
              <Heart className="mr-2 h-5 w-5" />
              Check Your Symptoms
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <MapPin className="mr-2 h-5 w-5" />
              Find Nearby Care
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Assessment</h3>
                <p className="text-muted-foreground">
                  Get instant guidance on whether your symptoms need urgent attention or can wait for a GP appointment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clinically Verified</h3>
                <p className="text-muted-foreground">
                  Our AI-powered triage follows HealthDirect and ACSQHC standards, reviewed by healthcare professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Care Nearby</h3>
                <p className="text-muted-foreground">
                  Locate the nearest GP or Emergency Department with real-time information on availability and wait times.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-secondary/50 rounded-2xl p-8 md:p-12 text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Safe, Trusted, Confidential</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              CarePath provides general guidance only and does not replace professional medical advice. 
              Your privacy is protected under Australian Privacy Principles. If symptoms worsen, contact emergency services (000).
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                HealthDirect Aligned
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                ACSQHC Compliant
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Protected
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Find the Right Care?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Start your symptom assessment now and get personalized guidance in minutes.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => setShowChecker(true)}
          >
            <Heart className="mr-2 h-5 w-5" />
            Start Symptom Check
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">CarePath</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted healthcare guidance for all Australians.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Clinical Standards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Health Articles</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Disclaimers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 CarePath. All rights reserved. This service provides guidance only and does not replace professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
