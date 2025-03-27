
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification set",
        description: "We'll let you know when the site launches!",
      });
      setEmail("");
      setLoading(false);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-10">
      <div className="glass-card p-1 flex rounded-full overflow-hidden">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base placeholder:text-foreground/50"
        />
        <Button 
          type="submit"
          disabled={loading}
          className={cn(
            "rounded-full px-6 text-sm sm:text-base bg-purplish-blue hover:bg-purplish-blue/90 transition-all duration-300",
            loading && "opacity-70"
          )}
        >
          {loading ? "Subscribing..." : "Notify Me"}
        </Button>
      </div>
      <p className="text-xs text-center mt-2 text-foreground/60">We'll notify you when the site launches.</p>
    </form>
  );
};

export default EmailSignup;
