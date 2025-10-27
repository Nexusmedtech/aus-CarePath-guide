import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Send, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SymptomCheckerProps {
  onBack: () => void;
}

type Step = "intro" | "symptoms" | "severity" | "duration" | "result";
type Urgency = "emergency" | "urgent" | "routine" | null;

const SymptomChecker = ({ onBack }: SymptomCheckerProps) => {
  const [step, setStep] = useState<Step>("intro");
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState("");
  const [duration, setDuration] = useState("");
  const [urgency, setUrgency] = useState<Urgency>(null);
  const { toast } = useToast();

  const handleSubmit = () => {
    // Simple triage logic (in production, this would use AI/LLM)
    if (severity === "severe" || symptoms.toLowerCase().includes("chest") || 
        symptoms.toLowerCase().includes("breathing") || symptoms.toLowerCase().includes("bleeding")) {
      setUrgency("emergency");
    } else if (severity === "moderate" && duration === "sudden") {
      setUrgency("urgent");
    } else {
      setUrgency("routine");
    }
    setStep("result");
  };

  const renderStep = () => {
    switch (step) {
      case "intro":
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Symptom Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning mb-1">Important Reminder</p>
                  <p className="text-muted-foreground">
                    If you're experiencing severe chest pain, difficulty breathing, severe bleeding, 
                    sudden weakness, or loss of consciousness, call 000 immediately.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  This assessment will help determine whether you should:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Visit the Emergency Department immediately
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    See your GP within 24 hours
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Book a routine GP appointment
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground">
                <p>
                  This guidance is based on HealthDirect clinical standards but does not replace 
                  professional medical advice. It typically takes 3-5 minutes to complete.
                </p>
              </div>

              <Button onClick={() => setStep("symptoms")} className="w-full" size="lg">
                Begin Assessment
              </Button>
            </CardContent>
          </Card>
        );

      case "symptoms":
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">What Are Your Symptoms?</CardTitle>
              <p className="text-muted-foreground">Describe what you're experiencing in your own words</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="symptoms">Your Symptoms</Label>
                <textarea
                  id="symptoms"
                  className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="For example: headache, fever, stomach pain, cough..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("intro")} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={() => symptoms.trim() ? setStep("severity") : toast({ 
                    title: "Please describe your symptoms", 
                    variant: "destructive" 
                  })} 
                  className="flex-1"
                  disabled={!symptoms.trim()}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "severity":
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">How Severe Are Your Symptoms?</CardTitle>
              <p className="text-muted-foreground">Rate the intensity of your symptoms</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={severity} onValueChange={setSeverity}>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="mild" id="mild" className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">Mild</div>
                      <p className="text-sm text-muted-foreground">
                        Noticeable but not interfering with daily activities
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="moderate" id="moderate" className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">Moderate</div>
                      <p className="text-sm text-muted-foreground">
                        Uncomfortable and affecting some activities
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="severe" id="severe" className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">Severe</div>
                      <p className="text-sm text-muted-foreground">
                        Very painful or distressing, difficult to function
                      </p>
                    </div>
                  </label>
                </div>
              </RadioGroup>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("symptoms")} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={() => severity ? setStep("duration") : toast({ 
                    title: "Please select severity", 
                    variant: "destructive" 
                  })} 
                  className="flex-1"
                  disabled={!severity}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "duration":
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">When Did This Start?</CardTitle>
              <p className="text-muted-foreground">How long have you had these symptoms?</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={duration} onValueChange={setDuration}>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="sudden" id="sudden" className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">Just started (within last hour)</div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="today" id="today" className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">Started today</div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="days" id="days" className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">A few days</div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="week" id="week" className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">A week or more</div>
                    </div>
                  </label>
                </div>
              </RadioGroup>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("severity")} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={() => duration ? handleSubmit() : toast({ 
                    title: "Please select duration", 
                    variant: "destructive" 
                  })} 
                  className="flex-1"
                  disabled={!duration}
                >
                  Get Guidance
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "result":
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Your Care Guidance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {urgency === "emergency" && (
                <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-8 w-8 text-destructive flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-destructive mb-2">
                        Seek Emergency Care Now
                      </h3>
                      <p className="text-foreground mb-4">
                        Based on your symptoms, you should visit the Emergency Department immediately 
                        or call 000 for an ambulance.
                      </p>
                      <Button className="bg-destructive hover:bg-destructive/90">
                        Call 000 Now
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {urgency === "urgent" && (
                <div className="bg-warning/10 border-2 border-warning rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="h-8 w-8 text-warning flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-warning mb-2">
                        See a GP Within 24 Hours
                      </h3>
                      <p className="text-foreground mb-4">
                        Your symptoms suggest you should see your GP soon, ideally within the next 24 hours. 
                        If symptoms worsen, consider emergency care.
                      </p>
                      <Button className="bg-warning hover:bg-warning/90 text-warning-foreground">
                        Find GP Near Me
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {urgency === "routine" && (
                <div className="bg-accent/10 border-2 border-accent rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-8 w-8 text-accent flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-accent mb-2">
                        Book a Routine GP Appointment
                      </h3>
                      <p className="text-foreground mb-4">
                        Your symptoms can likely be managed with a routine GP appointment. 
                        Book when convenient in the next few days.
                      </p>
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Find GP Near Me
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">What You Told Us:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Symptoms: {symptoms}</li>
                  <li>• Severity: {severity}</li>
                  <li>• Duration: {duration}</li>
                </ul>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground">
                <p className="font-medium mb-2">Important Reminder:</p>
                <p>
                  This guidance is based on the information you provided and HealthDirect standards. 
                  It does not replace professional medical advice. If your condition changes or worsens, 
                  seek immediate medical attention.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={onBack} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setStep("intro");
                    setSymptoms("");
                    setSeverity("");
                    setDuration("");
                    setUrgency(null);
                  }} 
                  className="flex-1"
                >
                  New Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

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
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="py-12 px-4">
        {renderStep()}
      </div>
    </div>
  );
};

export default SymptomChecker;
