import competitionsData from '@/data/competitions.json';

export interface ClassEntry {
  id: string;
  name: string;
  description: string;
  folder: string;
  winner: string | null;
  entries: string[];
}

export interface Competition {
  id: string;
  name: string;
  date: string;
  closingDate?: string;
  description: string;
  status: 'completed' | 'upcoming' | 'ongoing' | 'open';
  banner: string;
  classes: ClassEntry[];
}

export interface Sponsor {
  name: string;
  logo: string;
  website: string;
  tier: 'gold' | 'silver' | 'bronze';
}

export interface CompetitionsData {
  competitions: Competition[];
  slideshow: string[];
  sponsors: Sponsor[];
}

const data = competitionsData as CompetitionsData;

export function getAllCompetitions(): Competition[] {
  return data.competitions;
}

export function getCompetition(id: string): Competition | undefined {
  return data.competitions.find((c) => c.id === id);
}

export function getClass(competitionId: string, classId: string): ClassEntry | undefined {
  const competition = getCompetition(competitionId);
  return competition?.classes.find((c) => c.id === classId);
}

export function getSlideshowImages(): string[] {
  return data.slideshow;
}

export function getSponsors(): Sponsor[] {
  return data.sponsors;
}
