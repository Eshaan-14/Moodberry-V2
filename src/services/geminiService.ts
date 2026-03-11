import { MoodProfile, CuratedImage } from "../types";
import { ALL_SONGS } from "../constants"; 

export class GeminiService {
  async synthesizeMood(selectedImages: CuratedImage[]): Promise<MoodProfile> {
    // 1. Send the data to your secure backend
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'synthesizeMood', payload: selectedImages })
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // --- ALWAYS CHOOSE A COMPLETELY RANDOM SONG ---
    // Pick ONE truly random song directly from the imported ALL_SONGS array
    const songData = ALL_SONGS[Math.floor(Math.random() * ALL_SONGS.length)];
    // ----------------------------------------------

    return {
      ...data,
      songName: songData.name,
      artist: songData.artist,
      spotifyUrl: songData.spotifyUrl,
      youtubeUrl: songData.youtubeUrl
    };
  }

  async generateWallpaper(prompt: string): Promise<string | null> {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generateWallpaper', payload: prompt })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error); 
      }

      const data = await response.json();
      console.log("SUCCESS! Here is the image link:", data.imageUrl); 
      return data.imageUrl; 
      
    } catch (error) {
      console.error('Wallpaper generation failed:', error);
      // Beautiful fallback image if the AI image generator times out
      return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1080&auto=format&fit=crop";
    }
  }
}

export const geminiService = new GeminiService();