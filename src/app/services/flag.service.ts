import { Injectable } from '@angular/core';

/**
 * Service for managing flag icons using the flag-icons library
 * Provides easy access to country flags with proper sizing and styling
 */
@Injectable({
  providedIn: 'root'
})
export class FlagService {

  // Common country codes mapping
  private readonly countryMappings: Record<string, string> = {
    'slovenia': 'si',
    'bosnia': 'ba',
    'bosnia and herzegovina': 'ba',
    'united states': 'us',
    'usa': 'us',
    'united kingdom': 'gb',
    'uk': 'gb',
    'germany': 'de',
    'france': 'fr',
    'italy': 'it',
    'spain': 'es',
    'croatia': 'hr',
    'serbia': 'rs',
    'montenegro': 'me',
    'austria': 'at',
    'switzerland': 'ch',
    'netherlands': 'nl',
    'poland': 'pl',
    'czech republic': 'cz',
    'slovakia': 'sk',
    'hungary': 'hu',
    'romania': 'ro',
    'bulgaria': 'bg',
    'greece': 'gr',
    'turkey': 'tr',
    'sweden': 'se',
    'norway': 'no',
    'denmark': 'dk',
    'finland': 'fi',
    'ireland': 'ie',
    'portugal': 'pt',
    'belgium': 'be',
    'luxembourg': 'lu'
  };

  /**
   * Get flag classes for a country
   * @param countryCode ISO 3166-1 alpha-2 country code or country name
   * @param size Size of the flag (small, medium, large) or custom size
   * @returns String of CSS classes for the flag
   */
  getFlagClasses(countryCode: string, size: 'small' | 'medium' | 'large' | string = 'small'): string {
    const code = this.normalizeCountryCode(countryCode);
    const sizeClass = this.getSizeClass(size);
    
    return `fi fi-${code} ${sizeClass}`.trim();
  }

  /**
   * Get flag element as HTML string
   * @param countryCode ISO 3166-1 alpha-2 country code or country name
   * @param size Size of the flag
   * @param title Optional title/tooltip for the flag
   * @returns HTML string for the flag span element
   */
  getFlagHtml(countryCode: string, size: 'small' | 'medium' | 'large' | string = 'small', title?: string): string {
    const classes = this.getFlagClasses(countryCode, size);
    const titleAttr = title ? ` title="${title}"` : '';
    
    return `<span class="${classes}"${titleAttr}></span>`;
  }

  /**
   * Check if a country code is valid
   * @param countryCode Country code or name to check
   * @returns True if the country code is valid
   */
  isValidCountry(countryCode: string): boolean {
    const code = this.normalizeCountryCode(countryCode);
    return /^[a-z]{2}$/.test(code);
  }

  /**
   * Get all available country mappings
   * @returns Record of country names to country codes
   */
  getAvailableCountries(): Record<string, string> {
    return { ...this.countryMappings };
  }

  /**
   * Normalize country code (convert country name to ISO code if needed)
   * @param input Country code or country name
   * @returns ISO 3166-1 alpha-2 country code
   */
  private normalizeCountryCode(input: string): string {
    const normalized = input.toLowerCase().trim();
    
    // If it's already a 2-letter code, return it
    if (/^[a-z]{2}$/.test(normalized)) {
      return normalized;
    }
    
    // Try to find it in the mappings
    return this.countryMappings[normalized] || normalized;
  }

  /**
   * Get CSS size class for flags
   * @param size Size specification
   * @returns CSS class for flag sizing
   */
  private getSizeClass(size: string): string {
    switch (size) {
      case 'small':
        return 'flag-small'; // Will be defined in CSS
      case 'medium':
        return 'flag-medium';
      case 'large':
        return 'flag-large';
      default:
        return size; // Custom class name
    }
  }
}
