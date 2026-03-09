import React, { useState, useEffect } from 'react';
import { AppStep, CuratedImage, MoodKit } from './types';
import ImageGrid from '../components/ImageGrid';
import ResultView from '../components/ResultView';
import { geminiService } from './services/geminiService';
import { CURATED_IMAGES } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INTRO);
  const [selectedImages, setSelectedImages] = useState<CuratedImage[]>([]);
  const [moodKit, setMoodKit] = useState<MoodKit | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userName, setUserName] = useState('');
  const [archivedKits, setArchivedKits] = useState<MoodKit[]>([]);

  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    // Load archive from local storage
    const savedArchive = localStorage.getItem('moodberry_archive');
    if (savedArchive) {
      try {
        setArchivedKits(JSON.parse(savedArchive));
      } catch (e) {
        console.error("Failed to parse archive", e);
      }
    }

    // Check for tour
    const hasSeenTour = localStorage.getItem('moodberry_has_seen_tour');
    if (!hasSeenTour) {
      // Delay tour start slightly for smooth entry
      setTimeout(() => setShowTour(true), 1000);
    }
  }, []);

  const completeTour = () => {
    setShowTour(false);
    localStorage.setItem('moodberry_has_seen_tour', 'true');
  };

  const renderTour = () => {
    if (!showTour || step !== AppStep.SELECTION) return null;

    const tourSteps = [
      {
        target: "vibrary",
        title: "Curate Your Vibe",
        text: "Scroll through the Vibrary and select 3-5 images that resonate with you.",
        position: "top-1/4 left-1/2 -translate-x-1/2"
      },
      {
        target: "name",
        title: "Sign Your Work",
        text: "Enter your name to personalize your digital manifesto.",
        position: "top-32 right-10 md:right-40"
      },
      {
        target: "manifest",
        title: "Manifest Reality",
        text: "Once ready, click here to synthesize your unique digital identity.",
        position: "top-32 right-10"
      }
    ];

    const current = tourSteps[tourStep];

    return (
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 pointer-events-auto" onClick={completeTour} />
        
        <div className={`absolute ${current.position} transition-all duration-500 pointer-events-auto`}>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-indigo-500/30 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{current.title}</h3>
              <button onClick={completeTour} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{current.text}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {tourSteps.map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === tourStep ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                ))}
              </div>
              <button 
                onClick={() => {
                  if (tourStep < tourSteps.length - 1) {
                    setTourStep(prev => prev + 1);
                  } else {
                    completeTour();
                  }
                }}
                className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
              >
                {tourStep < tourSteps.length - 1 ? 'Next' : 'Got it'}
              </button>
            </div>
          </div>
          {/* Arrow/Pointer */}
          <div className="w-4 h-4 bg-white dark:bg-slate-900 transform rotate-45 absolute -bottom-2 left-8 border-r border-b border-indigo-500/30" />
        </div>
      </div>
    );
  };

  const saveToArchive = (kit: MoodKit) => {
    // Create a lightweight version for the archive (exclude base64 image)
    const archiveVersion: MoodKit = {
      ...kit,
      wallpaperUrl: null // Don't save the heavy image to local storage
    };
    
    const newArchive = [archiveVersion, ...archivedKits];
    setArchivedKits(newArchive);
    localStorage.setItem('moodberry_archive', JSON.stringify(newArchive));
  };

  const [showLimitWarning, setShowLimitWarning] = useState(false);

  const toggleImageSelection = (image: CuratedImage) => {
    setSelectedImages(prev => {
      const exists = prev.find(i => i.id === image.id);
      if (exists) return prev.filter(i => i.id !== image.id);
      
      if (prev.length >= 5) {
        setShowLimitWarning(true);
        setTimeout(() => setShowLimitWarning(false), 3000);
        return prev;
      }
      
      return [...prev, image];
    });
  };

  const generateKit = async () => {
    if (selectedImages.length < 3 || !userName.trim()) return;
    
    setIsGenerating(true);
    setStep(AppStep.GENERATING);
    
    try {
      const profile = await geminiService.synthesizeMood(selectedImages);
      const newKit = { profile, wallpaperUrl: null, userName: userName.trim() };
      setMoodKit(newKit);
      setStep(AppStep.RESULT);
      
      const wallpaperUrl = await geminiService.generateWallpaper(profile.wallpaperPrompt);
      const finalKit = { ...newKit, wallpaperUrl };
      setMoodKit(finalKit);
      saveToArchive(finalKit); // Save to archive automatically
    } catch (error) {
      console.error('Generation failed:', error);
      alert('The vibes were too complex for our AI. Please try again.');
      setStep(AppStep.SELECTION);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderIntro = () => (
    <div className="min-h-[92vh] flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden transition-colors duration-700">
      {/* Organic Berry Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-[120px] animate-blob" />
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-500/20 dark:bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-sky-500/20 dark:bg-sky-400/10 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000" />

      <div className="max-w-5xl w-full text-center space-y-16 relative z-10 fade-in">
        <div className="space-y-8">
          <span className="text-[10px] font-extrabold tracking-[0.5em] text-sky-600 dark:text-sky-300 uppercase block mb-4">
            A New Digital Era of Expression
          </span>
          <h1 className="text-7xl md:text-[11.5rem] font-black text-blue-950 dark:text-sky-50 tracking-[-0.05em] leading-[0.82] transition-colors drop-shadow-sm hover:text-amber-400 cursor-default">
            MOOD<span className="serif italic font-light text-blue-600 dark:text-blue-400 hover:text-amber-300 transition-colors">BERRY</span>
          </h1>
          <p className="text-xl md:text-3xl text-blue-800 dark:text-sky-200 font-normal max-w-3xl mx-auto leading-[1.4] tracking-tight">
            Curate a feeling through pure imagery. We'll manifest your entire digital identity—<span className="serif italic text-blue-950 dark:text-sky-50">instantly</span>.
          </p>
        </div>

        <div className="flex flex-col items-center gap-12 pt-6">
          <button 
            onClick={() => setStep(AppStep.SELECTION)}
            className="group relative px-16 py-7 bg-sky-50 text-blue-950 rounded-full text-2xl font-bold transition-all hover:scale-[1.03] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            <span className="relative z-10">Start Curating</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </button>

          {/* How It Works Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full text-left mt-12">
            {[
              { step: "01", title: "Select", desc: "Choose 3-5 images that resonate with your current vibe." },
              { step: "02", title: "Synthesize", desc: "Our AI analyzes the aesthetic DNA of your selection." },
              { step: "03", title: "Manifest", desc: "Receive a personalized kit: Wallpaper, Playlist, & Persona." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-500 group">
                <span className="text-xs font-black text-blue-400 dark:text-sky-600 mb-2 block">{item.step}</span>
                <h3 className="text-lg font-bold text-blue-950 dark:text-sky-100 mb-2">{item.title}</h3>
                <p className="text-sm text-blue-800/70 dark:text-sky-200/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-blue-200 dark:bg-blue-800" />
            <p className="text-blue-400 dark:text-sky-500 text-[9px] font-black tracking-[0.4em] uppercase">AI Powered Synthesis</p>
            <div className="h-px w-10 bg-blue-200 dark:bg-blue-800" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSelection = () => (
    <div className="max-w-7xl mx-auto py-24 px-6 md:px-12 space-y-20 fade-in transition-colors duration-700">
      <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 border-b border-slate-100 dark:border-slate-900 pb-16">
        <div className="space-y-6">
          <h2 className="text-6xl md:text-7xl font-black text-slate-950 dark:text-slate-50 tracking-tight leading-none">The Vibrary</h2>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-lg font-normal leading-relaxed">
            Select <span className="text-slate-950 dark:text-slate-100 font-bold border-b-2 border-indigo-200 dark:border-indigo-800 px-1">3 to 5</span> visual anchors that capture your current energy.
          </p>
        </div>
        
        <div className="sticky top-10 md:top-28 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 inline-flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.05)] w-full md:w-auto">
          <div className="pl-6 flex items-center gap-5 w-full md:w-auto justify-center">
            <span className="text-2xl font-black text-slate-950 dark:text-slate-100 leading-none">{selectedImages.length}</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${i <= selectedImages.length ? 'bg-indigo-600 scale-125' : 'bg-slate-200 dark:bg-slate-800'}`} />
              ))}
            </div>
          </div>

          <div className="h-px w-full md:w-px md:h-12 bg-slate-200 dark:bg-slate-800" />

          <input
            type="text"
            placeholder="YOUR NAME"
            value={userName}
            maxLength={10}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-transparent text-slate-950 dark:text-white font-black text-sm tracking-widest uppercase placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none w-full md:w-40 border-b-2 border-transparent focus:border-indigo-500 transition-all text-center pb-1"
          />

          <button 
            disabled={selectedImages.length < 3 || !userName.trim()}
            onClick={generateKit}
            className={`w-full md:w-auto px-10 py-5 rounded-3xl font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
              selectedImages.length >= 3 && userName.trim()
              ? 'bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 hover:scale-[1.02] shadow-xl' 
              : 'bg-slate-100 dark:bg-slate-900 text-slate-300 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            Manifest
          </button>
        </div>
      </header>

      <ImageGrid 
        images={CURATED_IMAGES}
        selectedIds={selectedImages.map(i => i.id)} 
        onToggle={toggleImageSelection} 
      />

      {/* Limit Warning Toast - Fixed to Viewport Bottom */}
      <div className={`!fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 ${showLimitWarning ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        <div className="bg-rose-600 text-white px-8 py-4 rounded-full shadow-[0_20px_50px_rgba(225,29,72,0.5)] flex items-center gap-4 border-2 border-white/20 backdrop-blur-md">
          <div className="bg-white/20 p-1 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <span className="font-black uppercase tracking-widest text-sm">Maximum 5 Vibes Selected</span>
        </div>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-12 fade-in transition-colors duration-700">
      <div className="relative w-36 h-36">
        <div className="absolute inset-0 border-[8px] border-slate-100 dark:border-slate-900 rounded-full" />
        <div className="absolute inset-0 border-t-[8px] border-indigo-600 dark:border-indigo-400 rounded-full animate-spin" />
      </div>
      
      <div className="text-center space-y-5">
        <h2 className="text-5xl font-black text-slate-950 dark:text-slate-50 uppercase tracking-tighter">Manifesting</h2>
        <div className="flex flex-col items-center gap-3">
          <p className="text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-[0.5em] animate-pulse">
            Synthesizing Digital DNA for {userName}
          </p>
          <div className="flex gap-2">
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderArchive = () => (
    <div className="max-w-7xl mx-auto py-24 px-6 md:px-12 space-y-16 fade-in">
      <div className="space-y-6 text-center">
        <h2 className="text-6xl md:text-8xl font-black text-slate-950 dark:text-slate-50 tracking-tighter leading-none">The Archive</h2>
        <p className="text-blue-400 dark:text-sky-500 text-xs font-black uppercase tracking-[0.4em]">Your Digital History</p>
      </div>

      {archivedKits.length === 0 ? (
        <div className="text-center py-20 space-y-6">
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium italic">No manifestations found yet.</p>
          <button 
            onClick={() => setStep(AppStep.SELECTION)}
            className="px-8 py-4 bg-blue-950 dark:bg-sky-50 text-white dark:text-blue-950 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all"
          >
            Create Your First
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archivedKits.map((kit, i) => (
            <div 
              key={i} 
              onClick={() => { setMoodKit(kit); setStep(AppStep.RESULT); }}
              className="group cursor-pointer bg-white/5 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden hover:border-blue-500 transition-all duration-500 hover:-translate-y-2"
            >
              <div 
                className="aspect-[4/5] relative overflow-hidden transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${kit.profile.primaryColor}, ${kit.profile.secondaryColor})`
                }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay" 
                     style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 50%)' }} 
                />

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight drop-shadow-lg">{kit.userName}</h3>
                  <p className="text-white/90 text-xs font-bold uppercase tracking-widest mt-2 line-clamp-2 shadow-black drop-shadow-md">{kit.profile.identityMotif}</p>
                  
                  <div className="mt-4 flex gap-2">
                    {kit.profile.archetypeTraits.map((trait, t) => (
                      <span key={t} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-[8px] font-black uppercase tracking-wider text-white">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderManifesto = () => (
    <div className="max-w-4xl mx-auto py-24 px-6 md:px-12 space-y-20 fade-in">
      <div className="space-y-6 text-center">
        <h2 className="text-6xl md:text-8xl font-black text-slate-950 dark:text-slate-50 tracking-tighter leading-none">Manifesto</h2>
        <p className="text-blue-400 dark:text-sky-500 text-xs font-black uppercase tracking-[0.4em]">Our Philosophy</p>
      </div>

      <div className="space-y-12 text-lg md:text-2xl leading-relaxed font-medium text-slate-700 dark:text-slate-300">
        <p>
          <span className="text-blue-950 dark:text-sky-50 font-bold text-3xl block mb-4">01. The Vibe is the Message.</span>
          In a world of infinite noise, the only true signal is how something makes you feel. We believe that aesthetics are not just decoration—they are a language. A way to communicate who you are without saying a word.
        </p>
        <p>
          <span className="text-blue-950 dark:text-sky-50 font-bold text-3xl block mb-4">02. Curate, Don't Consume.</span>
          You are not an algorithm. Your taste is unique, complex, and constantly evolving. Moodberry exists to help you capture that fleeting energy and crystallize it into something tangible.
        </p>
        <p>
          <span className="text-blue-950 dark:text-sky-50 font-bold text-3xl block mb-4">03. Digital Synthesis.</span>
          We use advanced intelligence not to replace human creativity, but to amplify it. To take the scattered fragments of your inspiration and weave them into a cohesive digital identity.
        </p>
      </div>

      <div className="pt-12 flex justify-center">
        <button 
          onClick={() => setStep(AppStep.SELECTION)}
          className="px-12 py-6 bg-blue-950 dark:bg-sky-50 text-white dark:text-blue-950 rounded-full text-lg font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
        >
          Join the Movement
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen transition-colors duration-700 dark">
      <nav className="fixed top-0 w-full z-50 py-8 px-10 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => { setStep(AppStep.INTRO); setSelectedImages([]); setUserName(''); }}
          >
            <div className="relative w-12 h-12">
              <img src="/logo.jpg" alt="Moodberry Logo" className="absolute inset-0 w-full h-full rounded-[16px] shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-300 group-hover:opacity-0" />
              <img src="/logo2.jpg" alt="Moodberry Logo Hover" className="absolute inset-0 w-full h-full rounded-[16px] shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-blue-950 dark:text-sky-100 transition-colors group-hover:text-amber-400">MOODBERRY</span>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-sky-500">
              <span onClick={() => setStep(AppStep.ARCHIVE)} className="cursor-pointer hover:text-sky-100 transition-colors">Archive</span>
              <span onClick={() => setStep(AppStep.MANIFESTO)} className="cursor-pointer hover:text-sky-100 transition-colors">Manifesto</span>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {step === AppStep.INTRO && renderIntro()}
        {step === AppStep.SELECTION && renderSelection()}
        {renderTour()}
        {step === AppStep.GENERATING && renderLoading()}
        {step === AppStep.RESULT && moodKit && (
          <ResultView 
            kit={moodKit} 
            selectedImages={selectedImages}
            onReset={() => {
              setStep(AppStep.INTRO);
              setSelectedImages([]);
              setMoodKit(null);
              setUserName('');
            }} 
          />
        )}
        {step === AppStep.ARCHIVE && renderArchive()}
        {step === AppStep.MANIFESTO && renderManifesto()}
      </main>

      <footer className="py-24 px-10 border-t border-blue-100 dark:border-blue-900 mt-20 transition-colors duration-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-4">
             <span className="font-black text-3xl tracking-tighter text-blue-950 dark:text-sky-50">MOODBERRY</span>
             <p className="text-blue-400 dark:text-sky-500 text-[10px] font-black uppercase tracking-[0.3em]">Digital Identity Synthesis.</p>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 dark:text-sky-500">
            Built by The Product Folks - NIT Trichy
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;