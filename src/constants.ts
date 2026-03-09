import { CuratedImage } from './types';

// USER CONFIGURATION FOR UPLOADED IMAGES
// To add your own images:
// 1. Upload them to the /public folder
// 2. List your exact filenames in the array below with optional tags and descriptions
const USER_IMAGE_CONFIG: { filename: string; tags?: string[]; description?: string }[] = [
  { filename: '1-blueberry.jpg', tags: ['fruit', 'blue', 'fresh', 'morning', 'nature'], description: 'Fresh blueberries with morning dew' },
  { filename: '2-graffiti.jpg', tags: ['urban', 'art', 'colorful', 'street', 'creative'], description: 'Vibrant street art graffiti' },
  { filename: '3-club.jpg', tags: ['nightlife', 'neon', 'party', 'club', 'energy'], description: 'Energetic night club atmosphere' },
  { filename: '4-coffee.jpg', tags: ['cafe', 'drink', 'warm', 'cozy', 'morning'], description: 'Steaming cup of coffee' },
  { filename: '5-minimal.jpg', tags: ['clean', 'white', 'simple', 'minimal', 'interior'], description: 'Minimalist interior design' },
  { filename: '6-rooftop.jpg', tags: ['city', 'view', 'sky', 'urban', 'architecture'], description: 'City skyline from a rooftop' },
  { filename: '7-childhood.jpg', tags: ['nostalgia', 'play', 'memories', 'childhood', 'retro'], description: 'Nostalgic childhood scene' },
  { filename: '8-neon.jpg', tags: ['lights', 'cyberpunk', 'glow', 'night', 'futuristic'], description: 'Glowing neon signs at night' },
  { filename: '9-bowling.jpg', tags: ['retro', 'fun', 'game', 'bowling', 'arcade'], description: 'Retro bowling alley vibes' },
  { filename: '10-guitar.jpg', tags: ['music', 'instrument', 'acoustic', 'guitar', 'sound'], description: 'Acoustic guitar close-up' },
  { filename: '11-swimming.jpg', tags: ['water', 'blue', 'summer', 'pool', 'refreshing'], description: 'Refreshing swimming pool water' },
  { filename: '12-blossom.jpg', tags: ['nature', 'pink', 'spring', 'flowers', 'bloom'], description: 'Cherry blossoms in full bloom' },
  { filename: '13-phone.jpg', tags: ['tech', 'vintage', 'communication', 'phone', 'retro'], description: 'Vintage telephone aesthetic' },
  { filename: '14-storm.jpg', tags: ['weather', 'dark', 'moody', 'storm', 'clouds'], description: 'Dramatic stormy sky' },
  { filename: '15-detective.jpg', tags: ['mystery', 'noir', 'shadow', 'detective', 'crime'], description: 'Classic detective noir style' },
  { filename: '16-running.jpg', tags: ['fitness', 'energy', 'motion', 'running', 'sport'], description: 'Runner in motion' },
  { filename: '17-hotel.jpg', tags: ['travel', 'luxury', 'architecture', 'hotel', 'vacation'], description: 'Grand hotel architecture' },
  { filename: '18-polarbear.jpg', tags: ['nature', 'winter', 'wildlife', 'snow', 'animal'], description: 'Polar bear in snowy landscape' },
  { filename: '19-campfire.jpg', tags: ['warmth', 'night', 'camping', 'fire', 'outdoors'], description: 'Cozy campfire at night' },
  { filename: '20-forest.jpg', tags: ['nature', 'green', 'trees', 'forest', 'woods'], description: 'Dense green forest path' },
  { filename: '21-classroom.jpg', tags: ['school', 'learning', 'education', 'study', 'class'], description: 'Classic classroom setting' },
  { filename: '22-temple.jpg', tags: ['spiritual', 'ancient', 'architecture', 'peace', 'history'], description: 'Ancient temple architecture' },
  { filename: '23-cdplayer.jpg', tags: ['music', 'retro', '90s', 'audio', 'nostalgia'], description: 'Retro portable CD player' },
  { filename: '24-volcano.jpg', tags: ['nature', 'fire', 'eruption', 'power', 'landscape'], description: 'Active volcano eruption' },
  { filename: '25-plane.jpg', tags: ['travel', 'sky', 'flight', 'transport', 'clouds'], description: 'Airplane flying in the sky' },
  { filename: '26-snowy.jpg', tags: ['winter', 'cold', 'white', 'nature', 'ice'], description: 'Snowy winter landscape' },
  { filename: '27-umbrella.jpg', tags: ['rain', 'weather', 'protection', 'city', 'moody'], description: 'Colorful umbrella in rain' },
  { filename: '28-football.jpg', tags: ['sport', 'game', 'field', 'team', 'energy'], description: 'Football match in action' },
  { filename: '29-desert.jpg', tags: ['sand', 'heat', 'dry', 'nature', 'landscape'], description: 'Vast desert dunes' },
  { filename: '30-puppy.jpg', tags: ['animal', 'cute', 'dog', 'pet', 'love'], description: 'Adorable puppy close-up' },
  { filename: '31-mud.jpg', tags: ['messy', 'nature', 'earth', 'dirt', 'texture'], description: 'Muddy texture close-up' },
  { filename: '32-baking.jpg', tags: ['food', 'kitchen', 'cooking', 'sweet', 'home'], description: 'Baking fresh pastries' },
  { filename: '33-dance.jpg', tags: ['movement', 'art', 'performance', 'energy', 'music'], description: 'Dancer in motion' },
  { filename: '34-jewels.jpg', tags: ['luxury', 'shine', 'fashion', 'wealth', 'sparkle'], description: 'Sparkling jewelry display' },
  { filename: '35-candle.jpg', tags: ['light', 'warmth', 'cozy', 'fire', 'relax'], description: 'Lit candle in dark room' },
  { filename: '36-beach.jpg', tags: ['ocean', 'sand', 'summer', 'vacation', 'water'], description: 'Sunny beach landscape' },
  { filename: '37-geometry.jpg', tags: ['shapes', 'abstract', 'math', 'pattern', 'design'], description: 'Geometric architectural shapes' },
  { filename: '38-newspaper.jpg', tags: ['news', 'reading', 'paper', 'vintage', 'info'], description: 'Vintage newspaper stack' },
  { filename: '39-street.jpg', tags: ['city', 'urban', 'road', 'life', 'walk'], description: 'Busy city street scene' },
  { filename: '40-singer.jpg', tags: ['music', 'performance', 'microphone', 'stage', 'voice'], description: 'Singer performing on stage' },
  { filename: '41-books.jpg', tags: ['reading', 'library', 'knowledge', 'study', 'paper'], description: 'Stack of old books' },
  { filename: '42-skateboarding.jpg', tags: ['sport', 'urban', 'youth', 'action', 'street'], description: 'Skateboarder doing a trick' },
  { filename: '43-gaming.jpg', tags: ['tech', 'fun', 'play', 'screen', 'digital'], description: 'Video gaming setup' },
  { filename: '44-snacks.jpg', tags: ['food', 'eat', 'tasty', 'party', 'junk'], description: 'Variety of party snacks' },
  { filename: '45-racing.jpg', tags: ['speed', 'car', 'sport', 'fast', 'competition'], description: 'Race car on track' },
  { filename: '46-theatre.jpg', tags: ['drama', 'stage', 'performance', 'art', 'culture'], description: 'Classic theatre stage' },
  { filename: '47-letterbox.jpg', tags: ['mail', 'communication', 'post', 'red', 'vintage'], description: 'Red vintage letterbox' },
  { filename: '48-garden.jpg', tags: ['nature', 'flowers', 'green', 'plants', 'outdoors'], description: 'Beautiful flower garden' },
  { filename: '49-building.jpg', tags: ['architecture', 'city', 'tall', 'structure', 'urban'], description: 'Modern skyscraper building' },
  { filename: '50-galaxy.jpg', tags: ['space', 'stars', 'universe', 'night', 'astronomy'], description: 'Galaxy and starry night sky' },
];

const USER_IMAGES: CuratedImage[] = USER_IMAGE_CONFIG.map((config, i) => ({
  id: String(10000 + i),
  url: `/${config.filename}`,
  tags: config.tags || ['user-curated', 'personal', 'aesthetic'], 
  description: config.description || 'User uploaded personal aesthetic image'
}));

export const CURATED_IMAGES: CuratedImage[] = [
  ...USER_IMAGES
];

// Mapping to curated songs for each vibe
export const SONG_MAP: Record<string, { name: string, artist: string, spotifyUrl: string, youtubeUrl: string }[]> = {
  'calm': [
    { name: 'Sofia', artist: 'Clairo', spotifyUrl: 'https://open.spotify.com/track/7B3z0ySL9Rr0XvZEAjWZzM', youtubeUrl: 'https://www.youtube.com/watch?v=L9l8zCOwEII' },
    { name: 'Sunrise', artist: 'Norah Jones', spotifyUrl: 'https://open.spotify.com/track/7x5xXCwhsHgpnmLH9ybbIH', youtubeUrl: 'https://www.youtube.com/watch?v=fd02pGJx0s0' },
    { name: 'Dreams', artist: 'Fleetwood Mac', spotifyUrl: 'https://open.spotify.com/track/0ofHAox99v9MNcgtu3m4HS', youtubeUrl: 'https://www.youtube.com/watch?v=Y3ywicffOj4' },
    { name: 'The Lazy Song', artist: 'Bruno Mars', spotifyUrl: 'https://open.spotify.com/track/1ExfPZEiahqhLyajhybQQM', youtubeUrl: 'https://www.youtube.com/watch?v=fLexgOxsZu0' }
  ],
  'energetic': [
    { name: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', spotifyUrl: 'https://open.spotify.com/track/1WkMMavIMc4JZ8cfMmxHkI', youtubeUrl: 'https://www.youtube.com/watch?v=ru0K8uYEZWw' },
    { name: 'Levitating', artist: 'Dua Lipa', spotifyUrl: 'https://open.spotify.com/track/5nujrmhP9gOXMgIyE1qC2d', youtubeUrl: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw' },
    { name: 'Dancing Queen', artist: 'ABBA', spotifyUrl: 'https://open.spotify.com/track/0GjEhVFGZW8afUYGChu3Rr', youtubeUrl: 'https://www.youtube.com/watch?v=xFrGuyw1V8s' },
    { name: 'I Gotta Feeling', artist: 'Black Eyed Peas', spotifyUrl: 'https://open.spotify.com/track/4kLLWz7srcuLKA7Et40PQR', youtubeUrl: 'https://www.youtube.com/watch?v=uSD4vsh1zDA' },
    { name: 'Don\'t Stop Me Now', artist: 'Queen', spotifyUrl: 'https://open.spotify.com/track/5T8EDUDqKcs6OSOwEsfqG7', youtubeUrl: 'https://www.youtube.com/watch?v=HgzGwKwLmgM' },
    { name: 'Hot n Cold', artist: 'Katy Perry', spotifyUrl: 'https://open.spotify.com/track/1R2SZUOGJdvF7nZU8ca796', youtubeUrl: 'https://www.youtube.com/watch?v=kTHNpusq654' }
  ],
  'productive': [
    { name: 'Lose Yourself', artist: 'Eminem', spotifyUrl: 'https://open.spotify.com/track/5Z01UMMf7V1o0MzF86s6WJ', youtubeUrl: 'https://www.youtube.com/watch?v=_Yhyp-_hX2s' },
    { name: 'Eye of the Tiger', artist: 'Survivor', spotifyUrl: 'https://open.spotify.com/track/2KH16WveTKWTtMJPt4ctNO', youtubeUrl: 'https://www.youtube.com/watch?v=btPJPFnesV4' },
    { name: 'Stronger', artist: 'Kanye West', spotifyUrl: 'https://open.spotify.com/track/4fzsfWzXphWa7nzj18Mz82', youtubeUrl: 'https://www.youtube.com/watch?v=PsO6ZnUZI0g' },
    { name: 'Can\'t Hold Us', artist: 'Macklemore & Ryan Lewis', spotifyUrl: 'https://open.spotify.com/track/3bidbhpOYeV4knp8AIu8Xn', youtubeUrl: 'https://www.youtube.com/watch?v=2zNSgSzhBfM' },
    { name: 'Till I Collapse', artist: 'Eminem', spotifyUrl: 'https://open.spotify.com/track/4xkOaSrkexMciUU1um16Av', youtubeUrl: 'https://www.youtube.com/watch?v=Obim8BYGnOE' }
  ],
  'melancholic': [
    { name: 'drivers license', artist: 'Olivia Rodrigo', spotifyUrl: 'https://open.spotify.com/track/7lPN2DXiMsVn7XUKtOW1CS', youtubeUrl: 'https://www.youtube.com/watch?v=ZmDBbnmKpqQ' },
    { name: 'Someone Like You', artist: 'Adele', spotifyUrl: 'https://open.spotify.com/track/4kflIGfjdZJW4ot2ioixTB', youtubeUrl: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0' },
    { name: 'Someone You Loved', artist: 'Lewis Capaldi', spotifyUrl: 'https://open.spotify.com/track/7qEHsqek33rTcFNT9PFqLf', youtubeUrl: 'https://www.youtube.com/watch?v=zABLecsR5UE' },
    { name: 'Fix You', artist: 'Coldplay', spotifyUrl: 'https://open.spotify.com/track/7LVHVU3tWfcxj5aiPFEW4Q', youtubeUrl: 'https://www.youtube.com/watch?v=k4V3Mo61fJM' },
    { name: 'Let Her Go', artist: 'Passenger', spotifyUrl: 'https://open.spotify.com/track/2jyjhRf6DVAah0Z62W89Ff', youtubeUrl: 'https://www.youtube.com/watch?v=RBumgq5yVrA' },
    { name: 'Story of My Life', artist: 'One Direction', spotifyUrl: 'https://open.spotify.com/track/4nVBt6MZDDP66ULjSKPP90', youtubeUrl: 'https://www.youtube.com/watch?v=W-TE_Ys4iwM' },
    { name: 'when the party\'s over', artist: 'Billie Eilish', spotifyUrl: 'https://open.spotify.com/track/43zdsphuZLzwA9k4DJhU0I', youtubeUrl: 'https://www.youtube.com/watch?v=pbMwTqkKSps' }
  ],
  'romantic': [
    { name: 'Perfect', artist: 'Ed Sheeran', spotifyUrl: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v', youtubeUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g' },
    { name: 'Can\'t Help Falling in Love', artist: 'Elvis Presley', spotifyUrl: 'https://open.spotify.com/track/44AyOl4qVkzS48vBsbNXaC', youtubeUrl: 'https://www.youtube.com/watch?v=vGJTaP6anOU' },
    { name: 'All of Me', artist: 'John Legend', spotifyUrl: 'https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a', youtubeUrl: 'https://www.youtube.com/watch?v=450p7goxZqg' },
    { name: 'Lover', artist: 'Taylor Swift', spotifyUrl: 'https://open.spotify.com/track/1dGr1csetMY5SaJxeEU7MT', youtubeUrl: 'https://www.youtube.com/watch?v=-BjZmE2gtdo' },
    { name: 'Just the Way You Are', artist: 'Bruno Mars', spotifyUrl: 'https://open.spotify.com/track/7BqBn9nXd69PGtGrQXhy6J', youtubeUrl: 'https://www.youtube.com/watch?v=LjhCEhWiKXk' },
    { name: 'A Thousand Years', artist: 'Christina Perri', spotifyUrl: 'https://open.spotify.com/track/6lanRgr6wXibZr8KgzXxBl', youtubeUrl: 'https://www.youtube.com/watch?v=rtOvBOTyX00' },
    { name: 'Make You Feel My Love', artist: 'Adele', spotifyUrl: 'https://open.spotify.com/track/0INtJz8U15Q0QydZ9lF2bR', youtubeUrl: 'https://www.youtube.com/watch?v=0put0_a--Ng' }
  ],
  'nostalgic': [
    { name: 'Californication', artist: 'Red Hot Chili Peppers', spotifyUrl: 'https://open.spotify.com/track/48UPSzbZjgc449aqz8bxox', youtubeUrl: 'https://www.youtube.com/watch?v=YlUKcNNmywk' },
    { name: 'Bohemian Rhapsody', artist: 'Queen', spotifyUrl: 'https://open.spotify.com/track/6l8GvAyoUZwWDQF1e48j11', youtubeUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ' },
    { name: '22', artist: 'Taylor Swift', spotifyUrl: 'https://open.spotify.com/track/3B7lnK8x5bXRC945P3PFJ9', youtubeUrl: 'https://www.youtube.com/watch?v=AgFeZr5ptV8' },
    { name: 'Don\'t Stop Believin\'', artist: 'Journey', spotifyUrl: 'https://open.spotify.com/track/4bHsxqR3GMrXTxEPLuK5ue', youtubeUrl: 'https://www.youtube.com/watch?v=1k8craCGpgs' },
    { name: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', spotifyUrl: 'https://open.spotify.com/track/7o2CTH4ctstm8TNelqjb51', youtubeUrl: 'https://www.youtube.com/watch?v=1w7OgIMMRc4' },
    { name: 'Take On Me', artist: 'a-ha', spotifyUrl: 'https://open.spotify.com/track/2WfaOiMkCvy7F5fcp2zZ8L', youtubeUrl: 'https://www.youtube.com/watch?v=djV11Xbc914' },
    { name: 'Yellow', artist: 'Coldplay', spotifyUrl: 'https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg', youtubeUrl: 'https://www.youtube.com/watch?v=yKNxeF4KMsY' }
  ],
  'ethereal': [
    { name: 'Intro', artist: 'M83', spotifyUrl: 'https://open.spotify.com/track/0p62bQfB2D5D5D5D5D5D5D', youtubeUrl: 'https://www.youtube.com/watch?v=yQdC76gddIE' },
    { name: 'Space Song', artist: 'Beach House', spotifyUrl: 'https://open.spotify.com/track/7H0ya83CMmgFcOhw0UB6ow', youtubeUrl: 'https://www.youtube.com/watch?v=RBtlPT23PTM' }
  ],
  'industrial': [
     { name: 'Seven Nation Army', artist: 'The White Stripes', spotifyUrl: 'https://open.spotify.com/track/7i6r9KotUPt3yyr6UGr8c1', youtubeUrl: 'https://www.youtube.com/watch?v=0J2QdDbelmY' },
     { name: 'bad guy', artist: 'Billie Eilish', spotifyUrl: 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m', youtubeUrl: 'https://www.youtube.com/watch?v=DyDfgMOUjCI' }
  ],
  'organic': [
    { name: 'Sunrise', artist: 'Norah Jones', spotifyUrl: 'https://open.spotify.com/track/7x5xXCwhsHgpnmLH9ybbIH', youtubeUrl: 'https://www.youtube.com/watch?v=fd02pGJx0s0' },
    { name: 'Dreams', artist: 'Fleetwood Mac', spotifyUrl: 'https://open.spotify.com/track/0ofHAox99v9MNcgtu3m4HS', youtubeUrl: 'https://www.youtube.com/watch?v=Y3ywicffOj4' }
  ],
  'cyberpunk': [
    { name: '360', artist: 'Charli XCX', spotifyUrl: 'https://open.spotify.com/track/0WbMK4wrZ1wFSty9F7FCfc', youtubeUrl: 'https://www.youtube.com/watch?v=W-TE_Ys4iwM' }, // Placeholder YT
    { name: 'As It Was', artist: 'Harry Styles', spotifyUrl: 'https://open.spotify.com/track/4LRPiXqCikLlN15c3yImP7', youtubeUrl: 'https://www.youtube.com/watch?v=H5v3kku4y6Q' }
  ],
  'minimalist': [
    { name: 'Supercut', artist: 'Lorde', spotifyUrl: 'https://open.spotify.com/track/6Kkt27YmFyIFrcX3QX6qeE', youtubeUrl: 'https://www.youtube.com/watch?v=BtvJaNeELic' },
    { name: 'Sofia', artist: 'Clairo', spotifyUrl: 'https://open.spotify.com/track/7B3z0ySL9Rr0XvZEAjWZzM', youtubeUrl: 'https://www.youtube.com/watch?v=L9l8zCOwEII' }
  ],
  'luxury': [
    { name: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', spotifyUrl: 'https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS', youtubeUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0' },
    { name: 'Run the World (Girls)', artist: 'Beyoncé', spotifyUrl: 'https://open.spotify.com/track/1uXbwHHf484vD7KlG9SWnD', youtubeUrl: 'https://www.youtube.com/watch?v=VBmMU_iwe6U' }
  ],
  'gothic': [
    { name: 'Paint It, Black', artist: 'The Rolling Stones', spotifyUrl: 'https://open.spotify.com/track/63T7DJ1AFDD6Bn8VzG6JE8', youtubeUrl: 'https://www.youtube.com/watch?v=O4irXQhgMqg' },
    { name: 'when the party\'s over', artist: 'Billie Eilish', spotifyUrl: 'https://open.spotify.com/track/43zdsphuZLzwA9k4DJhU0I', youtubeUrl: 'https://www.youtube.com/watch?v=pbMwTqkKSps' }
  ],
  'retro': [
    { name: 'Take On Me', artist: 'a-ha', spotifyUrl: 'https://open.spotify.com/track/2WfaOiMkCvy7F5fcp2zZ8L', youtubeUrl: 'https://www.youtube.com/watch?v=djV11Xbc914' },
    { name: 'Don\'t Stop Believin\'', artist: 'Journey', spotifyUrl: 'https://open.spotify.com/track/4bHsxqR3GMrXTxEPLuK5ue', youtubeUrl: 'https://www.youtube.com/watch?v=1k8craCGpgs' }
  ],
  'futuristic': [
    { name: 'Levitating', artist: 'Dua Lipa', spotifyUrl: 'https://open.spotify.com/track/5nujrmhP9gOXMgIyE1qC2d', youtubeUrl: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw' },
    { name: 'Espresso', artist: 'Sabrina Carpenter', spotifyUrl: 'https://open.spotify.com/track/2qSkIjg5yLSqMCJNTasWHk', youtubeUrl: 'https://www.youtube.com/watch?v=eVli-tstM5E' }
  ],
  'zen': [
    { name: 'Sunrise', artist: 'Norah Jones', spotifyUrl: 'https://open.spotify.com/track/7x5xXCwhsHgpnmLH9ybbIH', youtubeUrl: 'https://www.youtube.com/watch?v=fd02pGJx0s0' },
    { name: 'Dreams', artist: 'Fleetwood Mac', spotifyUrl: 'https://open.spotify.com/track/0ofHAox99v9MNcgtu3m4HS', youtubeUrl: 'https://www.youtube.com/watch?v=Y3ywicffOj4' }
  ],
  'chaos': [
    { name: 'good 4 u', artist: 'Olivia Rodrigo', spotifyUrl: 'https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG', youtubeUrl: 'https://www.youtube.com/watch?v=gNi_6U5Pm_o' },
    { name: 'Seven Nation Army', artist: 'The White Stripes', spotifyUrl: 'https://open.spotify.com/track/7i6r9KotUPt3yyr6UGr8c1', youtubeUrl: 'https://www.youtube.com/watch?v=0J2QdDbelmY' }
  ],
  'dreamy': [
    { name: 'Space Song', artist: 'Beach House', spotifyUrl: 'https://open.spotify.com/track/7H0ya83CMmgFcOhw0UB6ow', youtubeUrl: 'https://www.youtube.com/watch?v=RBtlPT23PTM' },
    { name: 'Lover', artist: 'Taylor Swift', spotifyUrl: 'https://open.spotify.com/track/1dGr1csetMY5SaJxeEU7MT', youtubeUrl: 'https://www.youtube.com/watch?v=-BjZmE2gtdo' }
  ],
  'intense': [
    { name: 'Seven Nation Army', artist: 'The White Stripes', spotifyUrl: 'https://open.spotify.com/track/7i6r9KotUPt3yyr6UGr8c1', youtubeUrl: 'https://www.youtube.com/watch?v=0J2QdDbelmY' },
    { name: 'Stronger', artist: 'Kanye West', spotifyUrl: 'https://open.spotify.com/track/4fzsfWzXphWa7nzj18Mz82', youtubeUrl: 'https://www.youtube.com/watch?v=PsO6ZnUZI0g' }
  ],
  'mysterious': [
    { name: 'bad guy', artist: 'Billie Eilish', spotifyUrl: 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m', youtubeUrl: 'https://www.youtube.com/watch?v=DyDfgMOUjCI' },
    { name: 'Paint It, Black', artist: 'The Rolling Stones', spotifyUrl: 'https://open.spotify.com/track/63T7DJ1AFDD6Bn8VzG6JE8', youtubeUrl: 'https://www.youtube.com/watch?v=O4irXQhgMqg' }
  ],
  'playful': [
    { name: 'Espresso', artist: 'Sabrina Carpenter', spotifyUrl: 'https://open.spotify.com/track/2qSkIjg5yLSqMCJNTasWHk', youtubeUrl: 'https://www.youtube.com/watch?v=eVli-tstM5E' },
    { name: 'Can We Dance', artist: 'The Vamps', spotifyUrl: 'https://open.spotify.com/track/1lO9CZo6eDrIk097tp6k6f', youtubeUrl: 'https://www.youtube.com/watch?v=UqHj_5I8Ceg' },
    { name: 'As It Was', artist: 'Harry Styles', spotifyUrl: 'https://open.spotify.com/track/4LRPiXqCikLlN15c3yImP7', youtubeUrl: 'https://www.youtube.com/watch?v=H5v3kku4y6Q' },
    { name: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', spotifyUrl: 'https://open.spotify.com/track/1WkMMavIMc4JZ8cfMmxHkI', youtubeUrl: 'https://www.youtube.com/watch?v=ru0K8uYEZWw' }
  ],
  'sophisticated': [
    { name: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', spotifyUrl: 'https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS', youtubeUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0' },
    { name: 'Whenever, Wherever', artist: 'Shakira', spotifyUrl: 'https://open.spotify.com/track/2cCuCY2Lq05g0e2YyIqK8Q', youtubeUrl: 'https://www.youtube.com/watch?v=weRHyjj34ZE' }
  ],
  'raw': [
    { name: 'good 4 u', artist: 'Olivia Rodrigo', spotifyUrl: 'https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG', youtubeUrl: 'https://www.youtube.com/watch?v=gNi_6U5Pm_o' },
    { name: 'Baby', artist: 'Justin Bieber', spotifyUrl: 'https://open.spotify.com/track/6epn3r7S14KUqlReYr77hA', youtubeUrl: 'https://www.youtube.com/watch?v=kffacxfA7G4' }
  ],
  'celestial': [
    { name: 'A Thousand Years', artist: 'Christina Perri', spotifyUrl: 'https://open.spotify.com/track/6lanRgr6wXibZr8KgzXxBl', youtubeUrl: 'https://www.youtube.com/watch?v=rtOvBOTyX00' },
    { name: 'Yellow', artist: 'Coldplay', spotifyUrl: 'https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg', youtubeUrl: 'https://www.youtube.com/watch?v=yKNxeF4KMsY' }
  ],
  'lofi': [
    { name: 'Sofia', artist: 'Clairo', spotifyUrl: 'https://open.spotify.com/track/7B3z0ySL9Rr0XvZEAjWZzM', youtubeUrl: 'https://www.youtube.com/watch?v=L9l8zCOwEII' },
    { name: 'Treat You Better', artist: 'Shawn Mendes', spotifyUrl: 'https://open.spotify.com/track/3QGsuHI8jO1Rx4JWLUh9jd', youtubeUrl: 'https://www.youtube.com/watch?v=lY2yjAdbvdQ' }
  ],
  'cinematic': [
    { name: 'Yellow', artist: 'Coldplay', spotifyUrl: 'https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg', youtubeUrl: 'https://www.youtube.com/watch?v=yKNxeF4KMsY' },
    { name: 'Fix You', artist: 'Coldplay', spotifyUrl: 'https://open.spotify.com/track/7LVHVU3tWfcxj5aiPFEW4Q', youtubeUrl: 'https://www.youtube.com/watch?v=k4V3Mo61fJM' }
  ],
  'dark': [
    { name: 'Paint It, Black', artist: 'The Rolling Stones', spotifyUrl: 'https://open.spotify.com/track/63T7DJ1AFDD6Bn8VzG6JE8', youtubeUrl: 'https://www.youtube.com/watch?v=O4irXQhgMqg' },
    { name: 'bad guy', artist: 'Billie Eilish', spotifyUrl: 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m', youtubeUrl: 'https://www.youtube.com/watch?v=DyDfgMOUjCI' }
  ],
  'vibrant': [
    { name: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', spotifyUrl: 'https://open.spotify.com/track/1WkMMavIMc4JZ8cfMmxHkI', youtubeUrl: 'https://www.youtube.com/watch?v=ru0K8uYEZWw' },
    { name: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', spotifyUrl: 'https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS', youtubeUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0' }
  ],
  'hazy': [
    { name: 'Californication', artist: 'Red Hot Chili Peppers', spotifyUrl: 'https://open.spotify.com/track/48UPSzbZjgc449aqz8bxox', youtubeUrl: 'https://www.youtube.com/watch?v=YlUKcNNmywk' },
    { name: 'Dreams', artist: 'Fleetwood Mac', spotifyUrl: 'https://open.spotify.com/track/0ofHAox99v9MNcgtu3m4HS', youtubeUrl: 'https://www.youtube.com/watch?v=Y3ywicffOj4' }
  ],
  'classic': [
    { name: 'Bohemian Rhapsody', artist: 'Queen', spotifyUrl: 'https://open.spotify.com/track/6l8GvAyoUZwWDQF1e48j11', youtubeUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ' },
    { name: 'Don\'t Stop Me Now', artist: 'Queen', spotifyUrl: 'https://open.spotify.com/track/5T8EDUDqKcs6OSOwEsfqG7', youtubeUrl: 'https://www.youtube.com/watch?v=HgzGwKwLmgM' }
  ],
  'default': [
    { name: 'Espresso', artist: 'Sabrina Carpenter', spotifyUrl: 'https://open.spotify.com/track/2qSkIjg5yLSqMCJNTasWHk', youtubeUrl: 'https://www.youtube.com/watch?v=eVli-tstM5E' },
    { name: 'As It Was', artist: 'Harry Styles', spotifyUrl: 'https://open.spotify.com/track/4LRPiXqCikLlN15c3yImP7', youtubeUrl: 'https://www.youtube.com/watch?v=H5v3kku4y6Q' }
  ]
};