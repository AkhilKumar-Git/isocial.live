
export enum Platform {
  LinkedIn = 'LinkedIn',
  X = 'X',
  Instagram = 'Instagram',
}

export enum LinkedInPostType {
  Text = 'Text Post',
  Image = 'Image Post',
}

export enum XPostType {
  Tweet = 'Tweet',
  Thread = 'Thread',
}

export enum InstagramPostType {
  Post = 'Photo/Video Post (Caption)',
  Story = 'Story Idea',
  Reel = 'Reel Script/Idea',
}

export type PostType = LinkedInPostType | XPostType | InstagramPostType;

export interface ContentInput {
  mainIdea: string;
  userWritingSample: string;
  influencerStyles: string;
  sourceUrl: string;
  postType: PostType | null;
}

export interface GeneratedPost {
  platform: Platform;
  postType: PostType;
  content: string;
  imagePlaceholderUrl?: string; // For image-based posts
}

export interface PlatformConfig {
  name: Platform;
  // FIX: Specify that the icon is a ReactElement that accepts className
  icon: React.ReactElement<{ className?: string }>;
  logoColor: string; // Primary color for the platform, used in switch
  switchAccentColor: string; // Background for the active switch state if different from logoColor
  textColor: string; // Text color on switchAccentColor
  accentColor: string; // General accent border/ring color
  postTypes: PostType[];
  theme: 'light' | 'dark'; // UI theme for the content area
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}
export interface GroundingChunk {
  web: GroundingChunkWeb;
}
export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}

export interface GeneratedContentWithMetadata extends GeneratedPost {
  groundingMetadata?: GroundingMetadata;
}