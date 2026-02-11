
import React, { useRef, useEffect, useState } from 'react';

interface CameraFeedProps {
  camera: any;
  onCapture?: (base64: string) => void;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ camera, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    startCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current && onCapture) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
      onCapture(base64);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-black aspect-video">
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-widest text-white uppercase mono">
        <div className={`w-1.5 h-1.5 rounded-full ${camera.status === 'ALERT' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
        {camera.id} // {camera.name}
      </div>
      
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-gray-400 mono">
        {camera.resolution} // {camera.fps} FPS
      </div>

      <div className="scanline"></div>
      
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      />
      
      <canvas ref={canvasRef} className="hidden" />

      {onCapture && (
        <button 
          onClick={captureFrame}
          className="absolute bottom-4 right-4 z-30 bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all transform scale-0 group-hover:scale-100 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
        >
          Analyze with AI
        </button>
      )}

      {/* Decorative Overlays */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent group-hover:border-green-500/10 transition-all"></div>
      <div className="absolute bottom-3 left-3 z-20 text-[9px] mono text-green-500/50">
        REC [●] {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default CameraFeed;
