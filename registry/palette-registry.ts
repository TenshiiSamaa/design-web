export interface ThemeMetadataItem {
  id: string;
  name: string;
  category: string;
  inspiration: string;
  rank: number;
  reasonForSelection: string;
  isOfficialPreset: boolean;
}

export const TOP_RECOMMENDED_THEMES: ThemeMetadataItem[] = [
  {
    id: "obsidian-violet",
    name: "Obsidian Violet",
    category: "Professional",
    inspiration: "Linear app + Raycast Dark",
    rank: 1,
    reasonForSelection: "Stunning low-fatigue slate dark background coupled with clean neon violet accent colors. Optimal for modern technical profiles.",
    isOfficialPreset: true
  },
  {
    id: "midnight-indigo",
    name: "Midnight Indigo",
    category: "Corporate",
    inspiration: "Vercel + Tailwind CSS UI",
    rank: 2,
    reasonForSelection: "Timeless enterprise look with a deep indigo highlight. Highly accessible and looks extremely polished for SaaS landing layouts.",
    isOfficialPreset: true
  },
  {
    id: "graphite-blue",
    name: "Graphite Blue",
    category: "Minimal",
    inspiration: "Raycast Preferences UI",
    rank: 3,
    reasonForSelection: "Steel blue accents over neutral slate surfaces. The contrast feels balanced, professional, and very clean.",
    isOfficialPreset: true
  },
  {
    id: "aurora-emerald",
    name: "Aurora Emerald",
    category: "Green",
    inspiration: "Magic UI + Aceternity Green",
    rank: 4,
    reasonForSelection: "High-contrast neon green offsets. Excellent readability and dark mode depth, perfect for startup landing sites.",
    isOfficialPreset: true
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    category: "Purple",
    inspiration: "Clerk Auth UI + IBM Carbon",
    rank: 5,
    reasonForSelection: "Rich majestical orchid purple theme. Highly suitable for design agencies and developers looking to highlight their creative output.",
    isOfficialPreset: true
  },
  {
    id: "slate-mono",
    name: "Slate Monochrome",
    category: "Minimal",
    inspiration: "Tailwind CSS Mono palette",
    rank: 6,
    reasonForSelection: "Minimalism at its core. Pure grayscale values without pixel colors, directing focus entirely onto typography and structure.",
    isOfficialPreset: false
  },
  {
    id: "github-dark",
    name: "GitHub Dark",
    category: "Corporate",
    inspiration: "GitHub Primer Design System",
    rank: 7,
    reasonForSelection: "The most familiar developer theme on Earth. Extremely readable and standard layout patterns.",
    isOfficialPreset: false
  },
  {
    id: "supabase-green",
    name: "Supabase Green",
    category: "Startup",
    inspiration: "Supabase Developer Console",
    rank: 8,
    reasonForSelection: "Clean green highlights over dark slate base. Timeless community favorite.",
    isOfficialPreset: false
  },
  {
    id: "stripe-purple",
    name: "Stripe Purple",
    category: "Corporate",
    inspiration: "Stripe Developer Dashboard",
    rank: 9,
    reasonForSelection: "Fintech giant theme. Crisp contrast, bright purple accents, and highly polished geometry.",
    isOfficialPreset: false
  },
  {
    id: "dracula",
    name: "Dracula Official",
    category: "Popular",
    inspiration: "Zeno Rocha's Dracula theme",
    rank: 10,
    reasonForSelection: "Universally loved code editor color theme with vibrant neon pink and purple highlights.",
    isOfficialPreset: false
  }
];
