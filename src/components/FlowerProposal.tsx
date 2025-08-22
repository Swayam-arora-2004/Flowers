import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import singleRose from "@/assets/single-rose.jpg";

const FloatingPetals = () => {
  const petals = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className="absolute w-3 h-3 bg-primary/20 rounded-full animate-petal-fall opacity-70"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${8 + Math.random() * 4}s`,
      }}
    />
  ));
  
  return <div className="fixed inset-0 pointer-events-none overflow-hidden">{petals}</div>;
};

export const FlowerProposal = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const [showExtraText, setShowExtraText] = useState(false);
  const navigate = useNavigate();

  const moveNoButton = () => {
    // Keep button within safe viewport bounds
    const safeMargin = 100;
    const buttonWidth = 200;
    const buttonHeight = 80;
    
    const maxX = window.innerWidth - buttonWidth - safeMargin;
    const maxY = window.innerHeight - buttonHeight - safeMargin;
    
    const newX = Math.random() * Math.max(maxX - safeMargin, safeMargin) + safeMargin;
    const newY = Math.random() * Math.max(maxY - safeMargin, safeMargin) + safeMargin;
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoButtonClicks(prev => prev + 1);
    
    if (noButtonClicks >= 2) {
      setShowExtraText(true);
    }
  };

  const handleYes = () => {
    navigate("/thank-you");
  };

  useEffect(() => {
    // Initialize no button position - start together with Yes button (will be positioned normally in flex)
    setNoButtonPosition({ 
      x: 0, 
      y: 0
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-primary-soft/20 to-accent/30">
      <FloatingPetals />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-2xl mx-auto animate-slide-up">
          
          {/* Romantic Header */}
          <div className="mb-8 animate-float">
            <Heart className="w-16 h-16 mx-auto text-primary mb-4 animate-heartbeat" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-4 leading-tight">
              My Dear Princess
            </h1>
          </div>

          {/* Rose Image */}
          <div className="mb-8 animate-romantic-glow">
            <img 
              src={singleRose} 
              alt="A beautiful rose for you"
              className="w-80 h-60 mx-auto rounded-3xl shadow-romantic object-cover transform hover:scale-105 transition-all duration-500"
            />
          </div>

          {/* Proposal Text */}
          <div className="mb-12 space-y-4">
            <p className="text-2xl md:text-3xl text-foreground font-medium leading-relaxed">
              I have something special for you...
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Would you accept this beautiful flower from me?
            </p>
            
            {showExtraText && (
              <p className="text-lg text-primary animate-slide-up italic">
                Come on, you know you want to say yes! 💕
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative min-h-[200px]">
            <Button 
              variant="romantic-yes" 
              size="romantic"
              onClick={handleYes}
              className="shadow-romantic transform hover:scale-110 transition-all duration-300 z-20"
            >
              <Heart className="mr-2 animate-heartbeat" />
              Yes, of course! 💖
            </Button>

            {noButtonClicks === 0 ? (
              <Button
                variant="romantic-no"
                size="romantic"
                onClick={moveNoButton}
                className="shadow-soft transition-all duration-300"
              >
                No... 😢
              </Button>
            ) : (
              <Button
                variant="romantic-no"
                size="romantic"
                onClick={moveNoButton}
                className="fixed transition-all duration-500 ease-in-out z-10"
                style={{
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`,
                }}
              >
                No... 😢
              </Button>
            )}
          </div>

          {/* {noButtonClicks > 0 && (
            <p className="mt-8 text-sm text-muted-foreground animate-slide-up">
              The "No" button seems to be a bit shy! 😄
            </p>
          )} */}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-primary-glow/15 rounded-full animate-float" style={{ animationDelay: "4s" }} />
    </div>
  );
};