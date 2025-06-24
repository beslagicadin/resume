import { Injectable } from '@angular/core';
import { ImageOptimizationService } from './image-optimization.service';

/**
 * Service for managing asset paths and providing centralized asset configuration
 * with image optimization support
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

  constructor(private imageOptimization: ImageOptimizationService) {
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
   * Get the profile image path with optimization
   */
  getProfileImage(filename: string = 'profile-optimized.jpeg', useOptimized: boolean = true): string {
    if (useOptimized) {
      const basePath = this.getAssetPath('profile', '');
      // Check for WebP support and return WebP if available
      const webpFilename = filename.replace(/\.(jpeg|jpg)$/i, '.webp');
      return this.imageOptimization.getOptimizedImageSrc(basePath, webpFilename);
    }
    return this.getAssetPath('profile', filename);
  }

  /**
   * Get optimized profile image with multiple format support
   */
  getOptimizedProfileImage(): HTMLPictureElement {
    const basePath = this.getAssetPath('profile', '');
    return this.imageOptimization.createPictureElement(
      basePath,
      'profile-optimized.jpeg',
      'Adin Bešlagić Profile Photo',
      'avatar'
    );
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
   * Preload critical assets with optimization
   */
  preloadCriticalAssets(): void {
    // Preload optimized profile image
    const profileImageSrc = this.getProfileImage();
    this.imageOptimization.preloadImage(profileImageSrc, 'image/jpeg');

    // Preload critical technology icons
    const criticalTechIcons = [
      this.getTechnologyIcon('angular'),
      this.getTechnologyIcon('typescript'),
      this.getTechnologyIcon('javascript'),
      this.getTechnologyIcon('react')
    ];

    criticalTechIcons.forEach(iconPath => {
      this.imageOptimization.preloadImage(iconPath, 'image/svg+xml');
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

  /**
   * Get responsive profile image sizes
   */
  getResponsiveProfileImages(): { small: string; medium: string; large: string } {
    const basePath = this.getAssetPath('profile', '');
    return this.imageOptimization.getResponsiveImageSizes(basePath, 'profile-optimized.jpeg');
  }

  /**
   * Get image optimization service for advanced use cases
   */
  getImageOptimizationService(): ImageOptimizationService {
    return this.imageOptimization;
  }
}
