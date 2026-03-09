import React, { useRef, useState } from 'react';
import { MoodKit, CuratedImage } from '../src/types';
import ShareCard from './ShareCard';
import * as htmlToImage from 'html-to-image';

interface ResultViewProps {
  kit: MoodKit;
  selectedImages?: CuratedImage[];
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ kit, selectedImages = [], onReset }) => {
  const { profile, wallpaperUrl, userName } = kit;
  const exportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [readyBlob, setReadyBlob] = useState<Blob | null>(null);

  // Pre-generate the share image in the background for instant sharing
  React.useEffect(() => {
    let isMounted = true;
    
    const generateBlob = async () => {
      if (!exportRef.current) return;
      
      try {
        // Wait a moment for layout to settle
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!isMounted) return;

        const blob = await htmlToImage.toBlob(exportRef.current, {
          quality: 0.8,
          pixelRatio: 1.5,
          backgroundColor: '#000000',
          skipAutoScale: true,
          cacheBust: false,
          useCORS: true,
        });
        
        if (isMounted && blob) {
          setReadyBlob(blob);
        }
      } catch (err) {
        console.warn('Background generation failed:', err);
      }
    };

    generateBlob();

    return () => { isMounted = false; };
  }, [profile, wallpaperUrl, userName]);

  const handleDownloadWallpaper = () => {
    if (wallpaperUrl) {
      const link = document.createElement('a');
      link.href = wallpaperUrl;
      link.download = `wallpaper-${profile.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.click();
    }
  };

  const handleDownloadCard = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      await document.fonts.ready;

      // Use Jpeg for better compatibility and speed
      const dataUrl = await htmlToImage.toJpeg(exportRef.current, {
        quality: 0.95,
        pixelRatio: 2, // Consistent quality
        backgroundColor: '#000000',
        useCORS: true, // Ensure black background for transparency
        style: {
           transform: 'none'
        }
      });
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `manifest-${profile.name.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert('Generation failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleUniversalShare = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    
    try {
      let blob = readyBlob;

      // If background generation hasn't finished yet, generate it now
      if (!blob) {
        blob = await htmlToImage.toBlob(exportRef.current, {
          quality: 0.8, 
          pixelRatio: 1.5, 
          backgroundColor: '#000000',
          skipAutoScale: true, 
          cacheBust: false,
          useCORS: true, 
        });
      }

      if (!blob) throw new Error('Failed to generate image blob');

      const fileName = `manifest-${profile.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      const file = new File([blob], fileName, { type: 'image/jpeg' });

      const shareData = {
        files: [file],
        title: `My ${profile.name} Persona`,
        text: `I just manifested my digital aura on Moodberry. \n\n✨ Persona: The ${profile.name}\n🌊 Vibe: ${profile.dominantVibe}\n🎵 Anthem: ${profile.songName} by ${profile.artist}\n\nCreate yours at: ${window.location.origin}`,
      };

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share(shareData);
        } catch (shareError) {
          if ((shareError as Error).name !== 'AbortError') {
             console.warn('Navigator share failed, falling back to download', shareError);
             // Fallback to download
             const url = URL.createObjectURL(blob);
             const link = document.createElement('a');
             link.href = url;
             link.download = fileName;
             link.click();
             URL.revokeObjectURL(url);
          }
        }
      } else {
        // Fallback for desktop or unsupported browsers
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed', err);
        handleDownloadCard();
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handlePlatformDirectShare = (platform: 'x' | 'whatsapp' | 'instagram') => {
    const text = `The ${profile.name} Manifesto. Synthesized by MoodBoard AI. #MoodBoardAI`;
    const url = window.location.href;

    switch (platform) {
      case 'x':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'instagram':
        handleDownloadCard();
        alert("Manifest downloaded. Ready for your Story!");
        break;
    }
  };

  const getValidUrl = (url: string | undefined, type: 'spotify' | 'youtube') => {
    if (url && url.startsWith('http')) return url;
    const query = encodeURIComponent(`${profile.songName} ${profile.artist}`);
    return type === 'spotify' 
      ? `https://open.spotify.com/search/${query}`
      : `https://www.youtube.com/results?search_query=${query}`;
  };

  const spotifyLink = getValidUrl(profile.spotifyUrl, 'spotify');
  const youtubeLink = getValidUrl(profile.youtubeUrl, 'youtube');

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 space-y-40 fade-in">
      {/* ... header ... */}
      <header className="text-center space-y-12 no-print">
        <div className="flex flex-col items-center gap-6">
          <div className="h-px w-12 bg-blue-200 dark:bg-blue-800" />
          <div className="inline-block px-6 py-2 bg-blue-50 dark:bg-blue-900 border border-blue-200/50 dark:border-blue-800 rounded-full text-[10px] font-black tracking-[0.4em] text-blue-500 dark:text-sky-400 uppercase">
            Synthesis Resolution Complete
          </div>
        </div>
        
        <div className="space-y-8">
          <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black text-blue-950 dark:text-sky-50 leading-[0.85] tracking-tighter serif italic drop-shadow-sm transition-colors">
            The {profile.name}
          </h1>
          <div className="max-w-4xl mx-auto space-y-4">
             {profile.summary.split('\n').map((line, i) => (
                <p key={i} className="text-xl md:text-3xl text-blue-600 dark:text-sky-200 font-medium leading-relaxed italic tracking-tight">
                  {line}
                </p>
             ))}
          </div>
        </div>
      </header>

      <section id="identity-manifest-preview" className="space-y-16">
        {/* ... existing section content ... */}
        <div className="flex items-center gap-6 no-print">
          <span className="serif italic text-3xl text-slate-300 dark:text-slate-800">01</span>
          <h3 className="text-3xl font-black text-slate-950 dark:text-slate-50 uppercase tracking-tighter">Manifest Card</h3>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-900" />
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 xl:gap-24">
          {/* Visible Card (Responsive) */}
          <div className="w-full max-w-[400px] relative">
            <ShareCard 
              profile={profile} 
              imageUrl={wallpaperUrl} 
              userName={userName}
            />
          </div>

          {/* Hidden Card for Export (Fixed Size to prevent mobile wrapping) */}
          <div className="fixed left-[-9999px] top-0 pointer-events-none">
            <div ref={exportRef} className="w-[400px]">
              <ShareCard 
                profile={profile} 
                imageUrl={wallpaperUrl} 
                userName={userName}
              />
            </div>
          </div>

          <div className="w-full max-w-md space-y-12 no-print">
            <div className="space-y-8">
              <div className="space-y-4 text-center lg:text-left">
                <h4 className="text-xs font-black uppercase tracking-[0.5em] text-indigo-500 dark:text-indigo-400">Distribution Module</h4>
                <p className="text-slate-400 dark:text-slate-600 text-sm font-semibold italic leading-relaxed">Broadcast your synthesized identity.</p>
              </div>

              <div className="space-y-6">
                <button 
                  onClick={handleUniversalShare}
                  disabled={isExporting}
                  className="w-full py-6 md:py-8 bg-slate-950 dark:bg-slate-50 text-white dark:text-slate-950 rounded-[2.5rem] text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em] md:tracking-[0.5em] hover:scale-[1.02] transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-4 group"
                >
                  {isExporting ? (
                    <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  )}
                  {isExporting ? 'Synthesizing...' : 'Share Manifest .jpg'}
                </button>

                <button 
                  onClick={handleDownloadCard}
                  className="w-full py-5 border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  Manifest Card .jpg
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 md:gap-32 items-start no-print">
        <div className="lg:col-span-5 space-y-12">
          <div className="flex items-center gap-6">
             <span className="serif italic text-3xl text-slate-300 dark:text-slate-800">02</span>
             <h3 className="text-3xl font-black text-slate-950 dark:text-slate-50 uppercase tracking-tighter">Frequency</h3>
             <div className="h-px flex-1 bg-slate-100 dark:bg-slate-900" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href={spotifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 p-8 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-[2.5rem] hover:translate-y-[-5px] transition-all duration-500 group border-b-4 border-b-[#1DB954]/50 shadow-lg dark:shadow-none"
            >
              <div className="w-16 h-16 bg-[#1DB954] rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-[10deg] transition-transform duration-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.3c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.8-9.3-1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 4-1 7.5-.5 10.3 1.2.3.2.4.6.3.8zm1.5-3.3c-.3.4-.8.5-1.1.3-2.8-1.7-7.1-2.2-10.4-1.2-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.8-1.1 8.5-.6 11.7 1.4.3.2.5.7.3 1zm.1-3.4c-3.4-2-9-2.2-12.2-1.2-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 3.8-1.1 10-1 14 1.3.4.3.6.9.3 1.3-.3.3-.9.5-1.5.2z"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-lg text-slate-900 dark:text-slate-50 uppercase tracking-tighter truncate">Spotify</p>
                <p className="text-slate-400 dark:text-slate-500 font-bold text-[9px] uppercase tracking-[0.2em]">Listen Now</p>
              </div>
            </a>

            <a 
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 p-8 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-[2.5rem] hover:translate-y-[-5px] transition-all duration-500 group border-b-4 border-b-[#FF0000]/50 shadow-lg dark:shadow-none"
            >
              <div className="w-16 h-16 bg-[#FF0000] rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-[-10deg] transition-transform duration-500">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-lg text-slate-900 dark:text-slate-50 uppercase tracking-tighter truncate">YouTube</p>
                <p className="text-slate-400 dark:text-slate-500 font-bold text-[9px] uppercase tracking-[0.2em]">Watch Video</p>
              </div>
            </a>
          </div>
          
          <div className="mt-8 p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg className="w-24 h-24 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
             </div>
             <div className="flex-1 min-w-0 z-10">
               <div className="flex items-center gap-3 mb-2">
                 <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                   {profile.dominantVibe} Frequency
                 </span>
               </div>
               <p className="font-black text-2xl text-slate-900 dark:text-slate-50 uppercase tracking-tighter truncate">{profile.songName}</p>
               <p className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">{profile.artist}</p>
             </div>
             <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center animate-pulse z-10">
               <div className="w-2 h-2 bg-indigo-500 rounded-full" />
             </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div className="flex items-center gap-6">
            <span className="serif italic text-3xl text-slate-300 dark:text-slate-800">03</span>
            <h3 className="text-3xl font-black text-slate-950 dark:text-slate-50 uppercase tracking-tighter">Atmosphere</h3>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-900" />
          </div>

          <div className="group relative rounded-[4rem] overflow-hidden bg-white/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 transition-all duration-700 hover:border-indigo-500/30 shadow-xl dark:shadow-none">
            <div className="aspect-[16/9] w-full relative bg-slate-100 dark:bg-slate-800">
              {wallpaperUrl ? (
                <img 
                  src={wallpaperUrl} 
                  alt="Wallpaper" 
                  className="w-full h-full object-cover"             
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-indigo-400 rounded-full animate-spin" /></div>
              )}
            </div>
            <div className="p-10 flex justify-between items-center bg-white/40 dark:bg-black/40 backdrop-blur-xl">
               <div>
                 <p className="text-slate-900 dark:text-slate-50 font-black uppercase tracking-tighter text-xl">Asset Archive .png</p>
                 <p className="text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-1">High-Res Visual Frequency</p>
               </div>
               <button 
                 disabled={!wallpaperUrl}
                 onClick={handleDownloadWallpaper}
                 className="px-10 py-5 bg-slate-950 dark:bg-slate-50 text-white dark:text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95"
               >
                 Export Asset
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-20 no-print">
        <button onClick={onReset} className="group flex flex-col items-center gap-6 mx-auto">
          <div className="w-20 h-20 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center transition-all group-hover:bg-slate-950 dark:group-hover:bg-slate-50 group-hover:scale-110">
            <svg className="w-7 h-7 text-slate-400 group-hover:text-white dark:group-hover:text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Restart Manifestation</span>
        </button>
      </div>
    </div>
  );
};

export default ResultView;