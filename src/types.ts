export interface CuratedImage {
  id: string;
  url: string;
  tags: string[];
  description: string;
}

export interface MoodProfile {
  name: string;
  summary: string;
  aestheticAnalysis: string;
  primaryColor: string;
  secondaryColor: string;
  primaryColorName?: string;
  secondaryColorName?: string;
  spotifySongUrl: string;
  songName: string;
  artist: string;
  wallpaperPrompt: string;
  archetypeTraits: string[];
  identityMotif: string;
  dominantVibe: string;
}

export interface MoodKit {
  profile: MoodProfile;
  wallpaperUrl: string | null;
  userName: string;
}

export enum AppStep {
  INTRO = 'INTRO',
  SELECTION = 'SELECTION',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
  ARCHIVE = 'ARCHIVE',
  MANIFESTO = 'MANIFESTO'
}