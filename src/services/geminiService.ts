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

      if (!response.ok) throw new Error('Failed to generate wallpaper');

      const data = await response.json();
      return data.imageUrl; // Returns the base64 string
    } catch (error) {
      console.error('Wallpaper generation failed:', error);
      return null;
    }
  }
}

export const geminiService = new GeminiService();