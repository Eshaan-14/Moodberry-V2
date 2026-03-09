import React from 'react';
import { MoodProfile } from '../src/types';

interface ShareCardProps {
  profile: MoodProfile;
  imageUrl?: string;
  userName: string;
  id?: string;
}

const ShareCard: React.FC<ShareCardProps> = ({ profile, imageUrl, userName, id }) => {
  const displayTraits = profile.archetypeTraits.slice(0, 2);
  // High-fidelity, detailed Resonance Module
  const SongAestheticDisplay = () => (
    <div className="w-full py-4 px-5 bg-white/20 rounded-[2rem] border border-white/40 shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:bg-white/25 transition-colors duration-500">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-black/40 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.3c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.8-9.3-1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 4-1 7.5-.5 10.3 1.2.3.2.4.6.3.8zm1.5-3.3c-.3.4-.8.5-1.1.3-2.8-1.7-7.1-2.2-10.4-1.2-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.8-1.1 8.5-.6 11.7 1.4.3.2.5.7.3 1zm.1-3.4c-3.4-2-9-2.2-12.2-1.2-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 3.8-1.1 10-1 14 1.3.4.3.6.9.3 1.3-.3.3-.9.5-1.5.2z"/>
            </svg>
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col items-start text-left space-y-0.5">
          <div className="flex items-center gap-2 w-full">
             <span className="text-[8px] font-bold text-white/70 uppercase tracking-[0.2em]">Resonance Aura</span>
          </div>
          <p className="text-[15px] font-black text-white leading-tight truncate w-full drop-shadow-md">{profile.songName}</p>
          <p className="text-[10px] font-medium text-white/80 uppercase tracking-widest truncate w-full">{profile.artist}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 w-full">
        <span className="text-[8px] font-mono text-white/60">0:00</span>
        <div className="h-[3px] flex-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/90 w-[65%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        </div>
        <span className="text-[8px] font-mono text-white/60">3:42</span>
      </div>
    </div>
  );

  return (
    <div 
      id={id}
      className="w-full max-w-[400px] aspect-[9/16] relative mx-auto group shadow-2xl md:shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] border border-white/70"
      style={{ borderRadius: '0px', overflow: 'hidden' }}
    >
      {/* Background Layer with stable saturation */}
      <div className="absolute inset-0 z-0">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Persona Background" 
            className="w-full h-full object-cover saturate-[1.8] brightness-[0.85]" 
          />
        ) : (
          <div 
            className="w-full h-full opacity-100" 
            style={{ background: `linear-gradient(135deg, ${profile.primaryColor}, ${profile.secondaryColor})` }} 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/90" />
      </div>

      {/* HEADER: Watermark - SMALLER & REFINED */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <div 
          className="bg-white/20 border border-white/60 py-2 px-4 flex items-center gap-3 shadow-2xl"
          style={{ borderRadius: '16px', overflow: 'hidden' }}
        >
          <div className="w-5 h-5 bg-white/50 rounded-lg flex items-center justify-center text-[8px] text-white font-black shadow-inner">
           AI
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">
            MOODBERRY
            </span>
            <span className="text-[5px] font-bold text-white/80 uppercase tracking-[0.3em]">
            MOODBERRY.AI
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT BOX */}
      <div className="absolute inset-x-4 bottom-6 top-[14%] md:inset-x-6 md:bottom-8 md:top-[15%] z-20">
        <div 
          className="w-full h-full bg-white/15 border border-white/20 p-6 md:p-8 flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden"
          style={{ borderRadius: '40px' }}
        >
          
          {/* Top Section: Title & Traits */}
          <div className="w-full pt-1 md:pt-2 text-center shrink-0">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.6em] text-white/80 uppercase block">Digital Manifest</span>
            {/* Increased line-height (leading) and padding to prevent clipping of ascenders/descenders */}
            <h2 className="text-[1.6rem] md:text-[2.2rem] font-black text-white tracking-tighter serif italic leading-[1.15] px-1 py-1 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] line-clamp-2">
              The {profile.name}
            </h2>
            <div className="mt-2 md:mt-3">
              <span className="text-[12px] md:text-[14px] font-bold text-white/90 tracking-[0.2em] uppercase italic">
                Curated for <span className="italic ml-1" style={{ 
                  color: profile.primaryColor,
                  filter: 'brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.5))' 
                }}>{userName}</span>
              </span>
            </div>

            {/* Archetype Traits - LIMITED TO 2 */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full mt-4 md:mt-5">
              {displayTraits.map((trait, i) => (
                <span key={i} className="px-4 py-1.5 md:px-5 md:py-2 bg-white/40 border border-white/70 rounded-full text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-2xl drop-shadow-md">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Middle Section: User Name / Prepared For */}
          <div className="w-full my-auto py-4 space-y-2 text-center px-2 flex flex-col justify-center shrink-0">
            <p className="text-white text-[14px] font-medium leading-relaxed italic serif tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] break-words line-clamp-3 opacity-100">
              {profile.identityMotif}
            </p>
          </div>

          {/* Bottom Module: Color Cloud Buttons and Song Resonance */}
          <div className="w-full pt-6 border-t border-white/40 space-y-6 mt-0 shrink-0">
            {/* Color Chips */}
            <div className="flex gap-4 w-full justify-center">
              <div className="flex-1 max-w-[130px] space-y-1.5 text-center">
                <div 
                  className="h-9 w-full rounded-[1rem] border-2 border-white/80 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                  style={{ backgroundColor: profile.primaryColor }}
                />
                <p className="text-[8px] font-black text-white uppercase tracking-widest truncate drop-shadow-md opacity-90">{profile.primaryColorName}</p>
              </div>
              <div className="flex-1 max-w-[130px] space-y-1.5 text-center">
                <div 
                  className="h-9 w-full rounded-[1rem] border-2 border-white/80 shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                  style={{ backgroundColor: profile.secondaryColor }}
                />
                <p className="text-[8px] font-black text-white uppercase tracking-widest truncate drop-shadow-md opacity-90">{profile.secondaryColorName}</p>
              </div>
            </div>

            <SongAestheticDisplay />
          </div>
        </div>
      </div>

      {/* Visual Texture Overlay - Removed external image to prevent CORS issues */}
      <div 
        className="absolute inset-0 z-40 pointer-events-none opacity-[0.1]" 
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 10%)", backgroundSize: "4px 4px" }} 
      />
    </div>
  );
};

export default ShareCard;