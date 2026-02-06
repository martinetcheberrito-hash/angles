
export interface ProductData {
  name: string;
  description: string;
  price?: string;
  targetAudience?: string;
  images: string[]; // base64 strings
}

export interface CommunicationAngle {
  title: string;
  logic: string;
  psychologicalTrigger: string;
}

export interface AdSuggestion {
  id: string;
  hookType: string;
  headline: string;
  bodyCopy: string;
  visualScript: string;
  callToAction: string;
}

export interface GenerationResult {
  angles: CommunicationAngle[];
  ads: AdSuggestion[];
}

export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  BUILDER = 'BUILDER',
  LIBRARY = 'LIBRARY',
  HISTORY = 'HISTORY'
}
