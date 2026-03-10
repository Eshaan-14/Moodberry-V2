import { Buffer } from 'node:buffer';
import { GoogleGenAI, Type } from "@google/genai";

const PERSONA_ADJECTIVES = [
  "Able", "Absolute", "Abstract", "Academic", "Accessible", "Acclaimed", "Accomplished", "Accurate", "Ace", "Active",
  "Actual", "Adept", "Admirable", "Adored", "Advanced", "Adventurous", "Aesthetic", "Affable", "Affectionate", "Agile",
  "Agreeable", "Alert", "Alive", "Alluring", "Altruistic", "Amazing", "Ambitious", "Amenable", "Amicable", "Ample",
  "Amusing", "Angelic", "Animated", "Apex", "Appealing", "Ardent", "Artful", "Artistic", "Assertive", "Assured",
  "Astonishing", "Astute", "Athletic", "Atmospheric", "Attentive", "Attractive", "Audacious", "Authentic", "Awake", "Aware",
  "Awesome", "Balanced", "Beautiful", "Beloved", "Benevolent", "Best", "Big", "Blessed", "Blissful", "Bold",
  "Brave", "Bright", "Brilliant", "Brisk", "Broad", "Buoyant", "Calm", "Capable", "Captivating", "Carefree",
  "Careful", "Caring", "Casual", "Celestial", "Central", "Ceremonial", "Certain", "Champion", "Charming", "Cheerful",
  "Chief", "Chill", "Choice", "Classic", "Clean", "Clear", "Clever", "Close", "Cognizant", "Coherent",
  "Collected", "Colorful", "Colossal", "Comfortable", "Commanding", "Committed", "Complete", "Composed", "Comprehensive", "Confident",
  "Connected", "Conscious", "Considerate", "Consistent", "Constant", "Constructive", "Content", "Cool", "Cooperative", "Cordials",
  "Core", "Courageous", "Courteous", "Creative", "Credible", "Crisp", "Crucial", "Crystal", "Cultured", "Curious",
  "Current", "Cute", "Daring", "Dashing", "Dazzling", "Dear", "Decent", "Decisive", "Dedicated", "Deep",
  "Definitive", "Delicate", "Delicious", "Delightful", "Dependable", "Desirable", "Detailed", "Determined", "Devoted", "Dexterous",
  "Direct", "Discrete", "Distinct", "Divine", "Dominant", "Dreamy", "Driven", "Dynamic", "Eager", "Early",
  "Earnest", "Easy", "Eclectic", "Economic", "Ecstatic", "Effective", "Efficient", "Effortless", "Electric", "Elegant",
  "Elevated", "Elite", "Eloquent", "Empathic", "Empowered", "Enchanting", "Endearing", "Endless", "Energetic", "Engaging",
  "Enhanced", "Enigmatic", "Enlightened", "Enough", "Entertaining", "Enthusiastic", "Entire", "Epic", "Equal", "Essential",
  "Eternal", "Ethereal", "Ethical", "Euphoric", "Even", "Everlasting", "Evocative", "Exact", "Excellent", "Exciting",
  "Exclusive", "Executive", "Exemplary", "Exotic", "Expansive", "Expert", "Expressive", "Exquisite", "Extra", "Extraordinary",
  "Fabulous", "Fair", "Faithful", "Famous", "Fancy", "Fantastic", "Fast", "Favorite", "Fearless", "Feasible",
  "Fine", "First", "Fit", "Fixed", "Flamboyant", "Flashy", "Flawless", "Flexible", "Fluent", "Focused",
  "Fond", "Forthright", "Fortunate", "Forward", "Free", "Fresh", "Friendly", "Full", "Fun", "Functional",
  "Fundamental", "Funny", "Futuristic", "Gallant", "Game", "Generous", "Gentle", "Genuine", "Gifted", "Giving",
  "Glad", "Glamorous", "Glorious", "Glowing", "Gold", "Golden", "Good", "Gorgeous", "Graceful", "Grand",
  "Grateful", "Great", "Grounded", "Growing", "Guiding", "Happy", "Hardy", "Harmonious", "Healthy", "Hearty",
  "Heavenly", "Helpful", "Heroic", "High", "Holistic", "Holy", "Honest", "Honorable", "Hopeful", "Hot",
  "Huge", "Human", "Humble", "Humorous", "Hyper", "Ideal", "Idealistic", "Illuminated", "Illustrious", "Imaginative",
  "Immaculate", "Immense", "Impartial", "Important", "Impressive", "Incredible", "Independent", "Infinite", "Influential", "Ingenious",
  "Innocent", "Innovative", "Insightful", "Inspiring", "Instant", "Instinctive", "Intellectual", "Intense", "Intent", "Interesting",
  "Internal", "Intimate", "Intuitive", "Inventive", "Invincible", "Inviting", "Iron", "Irresistible", "Joyful", "Jubilant",
  "Judicious", "Juicy", "Just", "Keen", "Key", "Kind", "Kinetic", "Knowing", "Known", "Large",
  "Lasting", "Leading", "Lean", "Learned", "Legendary", "Legit", "Light", "Likeable", "Limitless", "Linear",
  "Lit", "Lively", "Logical", "Lovable", "Lovely", "Loving", "Loyal", "Lucid", "Lucky", "Luminous",
  "Lush", "Luxurious", "Lyrical", "Magical", "Magnetic", "Magnificent", "Main", "Majestic", "Major", "Manifest",
  "Many", "Marvelous", "Master", "Mature", "Maximum", "Meaningful", "Measured", "Melodic", "Memorable", "Mental",
  "Merciful", "Merry", "Mighty", "Mindful", "Minimal", "Miraculous", "Modern", "Modest", "Momentous", "Monumental",
  "Moonlit", "Moral", "Motion", "Moving", "Musical", "Mysterious", "Mystic", "Natural", "Neat", "Necessary",
  "New", "Nice", "Nimble", "Noble", "Noetic", "Nonstop", "Notable", "Noted", "Novel", "Nurturing",
  "Objective", "Observant", "Open", "Optimal", "Optimistic", "Opulent", "Orderly", "Organic", "Original", "Ornamental",
  "Outgoing", "Outstanding", "Overcoming", "Pacific", "Painstaking", "Paramount", "Passionate", "Patient", "Peaceful", "Peak",
  "Peerless", "Perfect", "Permanent", "Persistent", "Personable", "Phenomenal", "Philosophical", "Physical", "Picturesque", "Pioneering",
  "Pious", "Pithy", "Pivotal", "Placid", "Plain", "Planetary", "Playful", "Pleasant", "Pleased", "Pleasing",
  "Plentiful", "Plush", "Poetic", "Poised", "Polished", "Polite", "Popular", "Positive", "Possible", "Potent",
  "Powerful", "Practical", "Precious", "Precise", "Premium", "Prepared", "Present", "Prestigious", "Pretty", "Prevailing",
  "Primary", "Prime", "Principal", "Pristine", "Private", "Pro", "Probable", "Productive", "Proficient", "Profound",
  "Prolific", "Prominent", "Promising", "Proper", "Prophetic", "Prosperous", "Protective", "Proud", "Proven", "Prudent",
  "Public", "Pure", "Purposeful", "Quality", "Quick", "Quiet", "Quintessential", "Quirky", "Radiant", "Rapid", "Rare",
  "Rational", "Raw", "Ready", "Real", "Realistic", "Reasonable", "Reassuring", "Receptive", "Refined", "Refreshing",
  "Regal", "Regular", "Relaxed", "Relevant", "Reliable", "Remarkable", "Renowned", "Resilient", "Resolute", "Resonant",
  "Respectful", "Responsible", "Responsive", "Restful", "Restored", "Revealing", "Revered", "Rich", "Right", "Righteous",
  "Robust", "Romantic", "Rosy", "Royal", "Sacred", "Safe", "Sage", "Saintly", "Sanctified", "Sane",
  "Satisfied", "Saucy", "Saving", "Savvy", "Scenic", "Scholarly", "Scientific", "Seamless", "Secure", "Select",
  "Selfless", "Sensational", "Sensible", "Sensitive", "Sensual", "Sentimental", "Serene", "Serious", "Set", "Sharp",
  "Shining", "Silent", "Silky", "Sincere", "Singular", "Skillful", "Sleek", "Smart", "Smiling", "Smooth",
  "Social", "Soft", "Solar", "Solemn", "Solid", "Solitary", "Soothing", "Sophisticated", "Soulful", "Sound",
  "Sovereign", "Spacious", "Sparkling", "Special", "Spectacular", "Speedy", "Spicy", "Spiritual", "Splendid", "Spontaneous",
  "Sporty", "Spotless", "Stable", "Stainless", "Standard", "Star", "Stark", "State", "Statuesque", "Steadfast",
  "Steady", "Stellar", "Still", "Stimulating", "Stoic", "Strategic", "Strong", "Stunning", "Stupendous", "Stylish",
  "Suave", "Sublime", "Substantial", "Subtle", "Successful", "Succinct", "Sudden", "Sufficient", "Suitable", "Sunny",
  "Super", "Superb", "Superior", "Supple", "Supported", "Supportive", "Supreme", "Sure", "Surprising", "Surreal",
  "Sustainable", "Sweet", "Swift", "Sympathetic", "Systematic", "Tactful", "Talented", "Tall", "Tangible", "Tasteful",
  "Technical", "Temperate", "Tenacious", "Tender", "Terrific", "Thankful", "Therapeutic", "Thorough", "Thoughtful", "Thrilling",
  "Thriving", "Tidy", "Tight", "Timeless", "Timely", "Tireless", "Titan", "Together", "Tolerant", "Top",
  "Tough", "Traditional", "Tranquil", "Transcendent", "Transparent", "Treasured", "Tremendous", "True", "Trusting", "Trusty",
  "Truthful", "Typical", "Ultimate", "Ultra", "Unbiased", "Unbroken", "Uncommon", "Undeniable", "Understanding", "Understood",
  "Unequaled", "Unfailing", "Unified", "Unique", "United", "Universal", "Unlimited", "Unreal", "Unrivaled", "Unseen",
  "Unstoppable", "Unusual", "Upbeat", "Uplifting", "Upright", "Urban", "Urgent", "Usable", "Useful", "Utmost",
  "Valiant", "Valid", "Valuable", "Vast", "Velvet", "Venerable", "Verbal", "Verified", "Versatile",
  "Vertical", "Very", "Vibrant", "Victorious", "Vigilant", "Vigorous", "Virtuous", "Visible", "Visionary", "Vital",
  "Vivacious", "Vivid", "Vocal", "Voluntary", "Warm", "Wealthy", "Welcome", "Well", "Whole", "Wholesome",
  "Wide", "Wild", "Willing", "Winning", "Wise", "Witty", "Wonderful", "Worldly", "Worthy", "Young",
  "Zealous", "Zen", "Zestful"
];

const PERSONA_NOUNS = [
  "Ace", "Advocate", "Alchemist", "Ally", "Ambassador", "Angel", "Apex", "Architect", "Artist", "Aspirant",
  "Astronaut", "Author", "Authority", "Avatar", "Beacon", "Believer", "Benefactor", "Boss", "Builder", "Captain",
  "Catalyst", "Celebrity", "Champion", "Character", "Chief", "Citizen", "Coach", "Collaborator", "Collector", "Commander",
  "Companion", "Composer", "Comrade", "Conductor", "Confidant", "Connoisseur", "Conqueror", "Consultant", "Contributor", "Counselor", "Creator",
  "Curator", "Dancer", "Defender", "Designer", "Devotee", "Diplomat", "Director", "Discoverer", "Doctor", "Doer",
  "Dreamer", "Driver", "Dynamo", "Eagle", "Editor", "Educator", "Elder", "Emissary", "Emperor", "Empress",
  "Enchanter", "Engineer", "Enigma", "Enthusiast", "Entrepreneur", "Envoy", "Epicure", "Essence", "Example", "Executive",
  "Expert", "Explorer", "Exponent", "Facilitator", "Fan", "Favorite", "Fellow", "Figure", "Force", "Founder",
  "Friend", "Futurist", "Gardener", "Gem", "General", "Genius", "Giant", "Giver", "Gladiator", "Go-Getter",
  "God", "Goddess", "Graduate", "Guardian", "Guest", "Guide", "Guru", "Harbinger", "Healer", "Heart",
  "Heir", "Helper", "Hero", "Heroine", "Historian", "Host", "Human", "Humanist", "Hunter", "Icon",
  "Iconoclast", "Idealist", "Idol", "Illustrator", "Image", "Individual", "Influencer", "Initiator", "Innovator", "Inspiration",
  "Intellect", "Intellectual", "Inventor", "Investor", "Jewel", "Judge", "Keeper", "Key", "King", "Knight",
  "Leader", "Learner", "Legend", "Light", "Lion", "Listener", "Logic", "Lord", "Lover", "Luminary",
  "Machine", "Maestro", "Magician", "Magnate", "Maker", "Manager", "Marshal", "Master", "Mastermind", "Mate",
  "Matriarch", "Maverick", "Mayor", "Mediator", "Member", "Mentor", "Messenger", "Mind", "Minister", "Miracle",
  "Model", "Moderator", "Modernist", "Mogul", "Monarch", "Monitor", "Monk", "Muse", "Musician", "Mystic",
  "Narrator", "Natural", "Navigator", "Neighbor", "Networker", "Nomad", "Notable", "Novelist", "Nurse", "Observer",
  "Officer", "Official", "Operator", "Optimist", "Oracle", "Orator", "Organizer", "Original", "Originator", "Owner",
  "Painter", "Paladin", "Partner", "Patriarch", "Patron", "Peacemaker", "Peer", "Performer", "Personality", "Phenom",
  "Philosopher", "Photographer", "Physician", "Pilot", "Pioneer", "Planner", "Player", "Poet", "Polymath", "Power",
  "Practitioner", "Pragmatist", "Presence", "President", "Priest", "Priestess", "Prime", "Prince", "Princess", "Principal",
  "Pro", "Problem-Solver", "Prodigy", "Producer", "Professional", "Professor", "Promoter", "Prophet", "Proponent", "Protagonist",
  "Protector", "Provider", "Psychic", "Pupil", "Purist", "Queen", "Ranger", "Realist", "Rebel", "Receiver",
  "Record", "Referee", "Reformer", "Regent", "Regular", "Relative", "Representative", "Researcher", "Resident", "Resource",
  "Rider", "Ringloader", "Rising", "Rock", "Role Model", "Romantic", "Ruler", "Runner", "Sage", "Saint",
  "Samurai", "Savant", "Savior", "Scholar", "Scientist", "Scout", "Scribe", "Sculptor", "Seeker", "Senator",
  "Senior", "Sensation", "Sensei", "Sentinel", "Servant", "Setter", "Shaman", "Shepherd", "Sherpa", "Sign",
  "Singer", "Siren", "Sister", "Skipper", "Soldier", "Soloist", "Soul", "Source", "Sovereign", "Speaker",
  "Specialist", "Specimen", "Spectator", "Spirit", "Sponsor", "Sport", "Sprite", "Spy", "Staff", "Standard",
  "Star", "Starter", "Statesman", "Statistic", "Steward", "Storyteller", "Strategist", "Student", "Stylist", "Subject",
  "Success", "Superstar", "Supervisor", "Supporter", "Survivor", "Symbol", "Synthesis", "System", "Tactician", "Talent",
  "Teacher", "Technician", "Technologist", "Teen", "Teller", "Theorist", "Thinker", "Titan", "Tourist", "Trader",
  "Trainer", "Traveler", "Treasure", "Trustee", "Tutor", "Tycoon", "Type", "Umpire", "Unit", "User",
  "Vanguard", "Veteran", "Victor", "Viewer", "Viking", "VIP", "Virtuoso", "Visionary", "Visitor", "Voice",
  "Volunteer", "Voyager", "Walker", "Wanderer", "Warden", "Warrior", "Watcher", "Wayfarer", "Weaver", "Whiz",
  "Winner", "Witness", "Wizard", "Wonder", "Worker", "Writer", "Youth", "Zealot"
];

async function fetchWithRetry(fn: () => Promise<any>, retries = 3, delay = 1000): Promise<any> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && error?.status === 429) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

// Vercel uses a standard req/res format
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is missing in Vercel!");
    }
    const ai = new GoogleGenAI({ apiKey });

    const { action, payload } = req.body;

    // ROUTE 1: Synthesize Mood
    if (action === 'synthesizeMood') {
      const tags = payload.flatMap((img: any) => img.tags);
      const descriptions = payload.map((img: any) => img.description).join(', ');

      const prompt = `Synthesize a high-end personality-driven digital identity strictly using these visual anchors:
      Visual Data Tags: [${tags.join(', ')}]
      Content Descriptions: ${descriptions}.

      Guidelines for Synthesis:
      1. Define a "Persona Name" that MUST be strictly one Adjective + one Noun. 
          - The Adjective MUST be selected from the provided list: [${PERSONA_ADJECTIVES.join(', ')}].
          - The Noun MUST be selected from the provided list: [${PERSONA_NOUNS.join(', ')}].
      2. Write a poetic personality summary that is EXACTLY TWO SHORT LINES. It MUST be a direct, high-praise compliment starting with "You...".
      3. List exactly 3 "Archetype Traits" (single words).
      4. Define an "Identity Motif" (max 130 chars). Address the user directly.
      5. Provide an "Aesthetic Analysis" (max 130 chars).
      6. Select two high-contrast VIBRANT hex colors with poetic names.
      7. Determine the "Dominant Vibe": one of the provided list.
      8. Generate a strictly short and concise wallpaper prompt (MAXIMUM 100 CHARACTERS). Use ONLY comma-separated aesthetic keywords, colors, and the core subject (e.g. "neon cityscape, purple lighting, minimal aesthetic"). No full sentences, no fluff.

      Return JSON format.`;

      const response = await fetchWithRetry(() => ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              summary: { type: Type.STRING },
              archetypeTraits: { type: Type.ARRAY, items: { type: Type.STRING } },
              identityMotif: { type: Type.STRING },
              aestheticAnalysis: { type: Type.STRING },
              primaryColor: { type: Type.STRING },
              primaryColorName: { type: Type.STRING },
              secondaryColor: { type: Type.STRING },
              secondaryColorName: { type: Type.STRING },
              dominantVibe: { type: Type.STRING },
              wallpaperPrompt: { type: Type.STRING }
            },
            required: ['name', 'summary', 'archetypeTraits', 'identityMotif', 'aestheticAnalysis', 'primaryColor', 'primaryColorName', 'secondaryColor', 'secondaryColorName', 'dominantVibe', 'wallpaperPrompt']
          }
        }
      }));

      const data = JSON.parse(typeof response.text === 'function' ? response.text() : (response.text || '{}'));
      return res.status(200).json(data);
    }

    // ROUTE 2: Generate Wallpaper (Pollinations Turbo Model)
    if (action === 'generateWallpaper') {
      try {
        // Because of step 8 above, "payload" is now guaranteed to be short and comma-separated!
        const cleanPrompt = `high-end mobile wallpaper, 9:16 aspect ratio, ${payload}, cinematic lighting, minimalist aesthetic`;
        
        // Encode the prompt so the URL doesn't break
        const encodedPrompt = encodeURIComponent(cleanPrompt);
        
        // Pass the perfectly sized prompt directly to the stable flux model
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1080&height=1920&nologo=true&model=flux`;

        return res.status(200).json({ imageUrl });

      } catch (error: any) {
        console.error("Backend Error:", error);
        return res.status(500).json({ error: error.message || "Unknown backend error" });
      }
    }

    return res.status(400).json({ error: "Invalid Action" });

  } catch (error: any) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: error.message || "Server Error" });
  }
}
