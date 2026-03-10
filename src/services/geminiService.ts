import { MoodProfile, CuratedImage } from "../types";
import { SONG_MAP } from "../constants";

export class GeminiService {
  async synthesizeMood(selectedImages: CuratedImage[]): Promise<MoodProfile> {
    // 1. Send the data to your secure Netlify backend
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'synthesizeMood', payload: selectedImages })
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // 2. Map the dominant vibe to a curated song on the frontend
    const vibeKey = (data.dominantVibe || 'default').toLowerCase();
    const songList = SONG_MAP[vibeKey] || SONG_MAP['default'];
    const songData = songList[Math.floor(Math.random() * songList.length)];

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
        throw new Error(errData.error); // Prints the exact backend error!
      }

      const data = await response.json();
      return data.imageUrl; 
      
    } catch (error) {
      console.error('Wallpaper generation failed:', error);
      return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1080&auto=format&fit=crop";
    }
  }
}

export const geminiService = new GeminiService();