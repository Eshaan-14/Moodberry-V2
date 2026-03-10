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
      const seed = Math.floor(Math.random() * 1000000);
      const cleanPrompt = encodeURIComponent(`high-end mobile wallpaper, 9:16 aspect ratio, ${prompt}, cinematic lighting, 4k, minimalist aesthetic`);
      
      // We are back to the high-quality FLUX model!
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1080&height=1920&nologo=true&seed=${seed}&model=flux`;

      // 1. Browser fetches directly from Pollinations (bypassing Vercel bot-blocks)
      const response = await fetch(pollinationsUrl);
      if (!response.ok) throw new Error(`Pollinations failed: ${response.status}`);

      // 2. Convert to a secure Blob
      const blob = await response.blob();
      
      // 3. Convert Blob to Base64 text so html-to-image doesn't crash from CORS
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

    } catch (error) {
      console.error('Wallpaper generation failed:', error);
      return null;
    }
  }
}

export const geminiService = new GeminiService();