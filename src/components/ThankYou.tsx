import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import bouquet from "@/assets/bouquet.jpg";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => (
    <Heart
      key={i}
      className="absolute text-primary/30 animate-petal-fall"
      style={{
        left: `${Math.random() * 100}%`,
        fontSize: `${1 + Math.random() * 1.5}rem`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${6 + Math.random() * 4}s`,
      }}
    />
  ));
  
  return <div className="fixed inset-0 pointer-events-none overflow-hidden">{hearts}</div>;
};

export const ThankYou = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showBouquet, setShowBouquet] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(true), 500);
    const timer2 = setTimeout(() => setShowBouquet(true), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const goBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-accent/20 via-primary-soft/30 to-primary/10">
      <FloatingHearts />
      
      {/* Celebration Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-transparent animate-pulse" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Thank You Header */}
          {showMessage && (
            <div className="mb-8 animate-slide-up">
              <div className="flex justify-center items-center mb-6">
                <Sparkles className="w-12 h-12 text-accent animate-pulse" />
                <Heart className="w-16 h-16 mx-4 text-primary animate-heartbeat" />
                <Sparkles className="w-12 h-12 text-accent animate-pulse" />
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-6 leading-tight animate-romantic-glow">
                Thank You!
              </h1>
              
              <p className="text-2xl md:text-3xl text-foreground font-medium mb-4 leading-relaxed">
                For accepting my flower! 🌹
              </p>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Since you said yes, here's something even more special...
              </p>
            </div>
          )}

          {/* Bouquet Section */}
          {showBouquet && (
            <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="relative mb-8">
                <img 
                  src={bouquet} 
                  alt="A beautiful bouquet for you"
                  className="w-96 h-80 mx-auto rounded-3xl shadow-romantic object-cover transform animate-romantic-glow hover:scale-105 transition-all duration-500"
                />
                
                {/* Sparkle effects around bouquet */}
                <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-accent animate-pulse" />
                <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-primary animate-pulse" style={{ animationDelay: "1s" }} />
                <Heart className="absolute top-4 left-4 w-6 h-6 text-primary-glow animate-heartbeat" style={{ animationDelay: "2s" }} />
              </div>
              
              <div className="space-y-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                  A Beautiful Bouquet! 💐
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Each flower represents how much beautiful, smart, cute and hot you are.<br></br>
                  And petals of each flower represents my care for you.
                </p>
              </div>
              
              {/* <Button 
                variant="romantic" 
                size="romantic"
                onClick={goBack}
                className="shadow-romantic transform hover:scale-110 transition-all duration-300"
              >
                <Heart className="mr-2 animate-heartbeat" />
                You make me so happy! 💕
              </Button> */}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-16 w-24 h-24 bg-primary/10 rounded-full animate-float" />
      <div className="absolute bottom-20 right-16 w-20 h-20 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-primary-glow/15 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-20 right-1/3 w-12 h-12 bg-primary/20 rounded-full animate-float" style={{ animationDelay: "4s" }} />
    </div>
  );
};