import { Injectable } from '@angular/core';

/**
 * Service for managing asset paths and providing centralized asset configuration
 */
@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private readonly assetPaths = {
    // Technology icons
    technologies: '/assets/icons/technologies/',
    
    // App icons (favicons, PWA icons)
    appIcons: '/assets/icons/app/',
    
    // Profile images
    profile: '/assets/images/profile/',
    
    // Open Graph images
    og: '/assets/images/og/',
    
    // Public assets (served from public folder)
    public: '/'
  };

  // Technology icon mapping
  private readonly technologyIcons: Record<string, string> = {
    'angular': 'angular.svg',
    'react': 'react.svg',
    'react native': 'react.svg',
    'python': 'python.svg',
    'flask': 'flask.svg',
    'html': 'html5-original-wordmark.svg',
    'html and css': 'html5-original-wordmark.svg',
    'php': 'php.svg',
    'java': 'java.svg',
    'javascript': 'javascript.svg',
    'typescript': 'typescript.svg',
    'css': 'css3-original-wordmark.svg',
    'vue': 'vuejs.svg',
    'vue.js': 'vuejs.svg',
    'node': 'nodejs.svg',
    'node.js': 'nodejs.svg',
    'c#': 'csharp.svg',
    'visual c#': 'csharp.svg',
    'c++': 'cplusplus.svg',
    'c': 'c.svg',
    'android': 'android.svg',
    'spring boot': 'spring.svg',
    'spring security': 'spring.svg',
    'mysql': 'mysql.svg',
    'firebase': 'firebase.svg',
    'qt': 'qt.svg',
    '.net framework': 'dot-net.svg',
    'winforms': 'dot-net.svg',
    'scss': 'sass.svg',
    'arduino': 'arduino.svg'
  };

  private basePath: string = '';

  constructor() {
    this.initializeBasePath();
  }

  /**
   * Initialize base path from base href tag
   */
  private initializeBasePath(): void {
    const baseTag = document.querySelector('base');
    if (baseTag && baseTag.getAttribute('href')) {
      this.basePath = baseTag.getAttribute('href')!.replace(/\/$/, '');
    }
  }

  /**
   * Get the full path for a technology icon
   */
  getTechnologyIcon(technology: string): string {
    const techLower = technology.toLowerCase();
    const iconFile = this.technologyIcons[techLower] || 'git.svg';
    return this.getAssetPath('technologies', iconFile);
  }

  /**
   * Get the profile image path
   */
  getProfileImage(filename: string = 'profile.jpeg'): string {
    return this.getAssetPath('profile', filename);
  }

  /**
   * Get app icon path
   */
  getAppIcon(filename: string): string {
    return this.getAssetPath('appIcons', filename);
  }

  /**
   * Get public asset path
   */
  getPublicAsset(filename: string): string {
    return this.getAssetPath('public', filename);
  }

  /**
   * Get Open Graph image path
   */
  getOGImage(filename: string): string {
    return this.getAssetPath('og', filename);
  }

  /**
   * Build full asset path with base path support
   */
  private getAssetPath(category: keyof typeof this.assetPaths, filename: string): string {
    const path = this.assetPaths[category] + filename;
    
    if (path.startsWith('/') && this.basePath) {
      return `${this.basePath}${path}`;
    }
    
    return path;
  }

  /**
   * Preload critical assets
   */
  preloadCriticalAssets(): void {
    const criticalAssets = [
      this.getProfileImage(),
      this.getTechnologyIcon('angular'),
      this.getTechnologyIcon('typescript'),
      this.getTechnologyIcon('javascript')
    ];

    criticalAssets.forEach(assetPath => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = assetPath;
      document.head.appendChild(link);
    });
  }

  /**
   * Get all available technology icons
   */
  getAvailableTechnologyIcons(): string[] {
    return Object.keys(this.technologyIcons);
  }

  /**
   * Check if technology icon exists
   */
  hasTechnologyIcon(technology: string): boolean {
    return technology.toLowerCase() in this.technologyIcons;
  }
}
