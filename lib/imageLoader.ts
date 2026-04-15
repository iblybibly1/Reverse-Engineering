/**
 * Image loader utilities for the horse show platform.
 * Images are loaded from the /public/images directory using folder paths
 * defined in data/competitions.json.
 */

export function getImageUrl(folder: string, filename: string): string {
  // Normalize the folder path
  const normalizedFolder = folder.endsWith('/') ? folder : `${folder}/`;
  return `${normalizedFolder}${filename}`;
}

export function getWinnerImage(folder: string, winnerFilename: string): string {
  return getImageUrl(folder, winnerFilename);
}

export function getEntryImages(folder: string, entries: string[]): string[] {
  return entries.map((entry) => getImageUrl(folder, entry));
}

export function getSlideshowImages(paths: string[]): string[] {
  return paths;
}

// Placeholder image for when actual images are not yet uploaded
export function getPlaceholderImage(width: number = 800, height: number = 600): string {
  return `https://placehold.co/${width}x${height}/e8f4f8/4a90a4?text=Horse+Show`;
}

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>): void {
  const target = e.currentTarget;
  target.src = getPlaceholderImage(800, 600);
}
