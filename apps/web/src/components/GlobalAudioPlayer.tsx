import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export function GlobalAudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.05; // 5% volume

    const handleTimeUpdate = () => {
      // If audio is within last 30 seconds, restart
      if (audio.duration && audio.currentTime >= audio.duration - 30) {
        audio.currentTime = 0;
        audio.play().catch(() => { });
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    if (!isMuted) {
      audio.play().catch(e => console.log("Autoplay blocked:", e));
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    if (isMuted) {
      audio.play().catch(() => { });
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/video/asur_sound.webm"
        muted={isMuted}
        preload="auto"
      />

      <Button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-[9999] rounded-full w-14 h-14 p-0 bg-red-600/90 hover:bg-red-700 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
      >
        {isMuted ? "🔇" : "🔊"}
      </Button>
    </>
  );
}
