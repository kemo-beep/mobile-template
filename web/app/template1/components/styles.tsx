export function CustomStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(-2deg); }
            50% { transform: translateY(-20px) rotate(-1deg); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animate-pulse-glow {
            animation: pulse-glow 6s ease-in-out infinite;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
          }
          .dark-glass-card {
            background: rgba(20, 20, 20, 0.6);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          }
          .text-gradient {
            background: linear-gradient(135deg, #111 0%, #666 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .text-gradient-light {
            background: linear-gradient(135deg, #fff 0%, #a3a3a3 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `,
      }}
    />
  );
}
