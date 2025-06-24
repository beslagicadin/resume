import { Injectable } from '@angular/core';

/**
 * Service for handling optimized images with modern format support
 */
@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {
  private supportsWebP: boolean | null = null;
  private supportsAVIF: boolean | null = null;

  constructor() {
    this.detectFormatSupport();
  }

  /**
   * Detect browser support for modern image formats
   */
  private async detectFormatSupport(): Promise<void> {
    // Detect WebP support
    this.supportsWebP = await this.canDisplayFormat('webp');
    
    // Detect AVIF support
    this.supportsAVIF = await this.canDisplayFormat('avif');
  }

  /**
   * Check if browser can display a specific image format
   */
  private canDisplayFormat(format: 'webp' | 'avif'): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      
      // Test images (1x1 pixel in each format)
      const testImages = {
        webp: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
        avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
      };
      
      img.src = testImages[format];
    });
  }

  /**
   * Get the optimal image source with fallbacks
   */
  getOptimizedImageSrc(basePath: string, filename: string): string {
    const filenameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    
    if (this.supportsAVIF) {
      return `${basePath}${filenameWithoutExt}.avif`;
    } else if (this.supportsWebP) {
      return `${basePath}${filenameWithoutExt}.webp`;
    } else {
      return `${basePath}${filename}`;
    }
  }

  /**
   * Create a picture element with multiple sources for optimal loading
   */
  createPictureElement(basePath: string, filename: string, alt: string, className?: string): HTMLPictureElement {
    const picture = document.createElement('picture');
    const filenameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const originalExt = filename.split('.').pop();

    // AVIF source (best compression)
    const avifSource = document.createElement('source');
    avifSource.srcset = `${basePath}${filenameWithoutExt}.avif`;
    avifSource.type = 'image/avif';
    picture.appendChild(avifSource);

    // WebP source (good compression, wide support)
    const webpSource = document.createElement('source');
    webpSource.srcset = `${basePath}${filenameWithoutExt}.webp`;
    webpSource.type = 'image/webp';
    picture.appendChild(webpSource);

    // Fallback img element
    const img = document.createElement('img');
    img.src = `${basePath}${filename}`;
    img.alt = alt;
    if (className) {
      img.className = className;
    }
    picture.appendChild(img);

    return picture;
  }

  /**
   * Get responsive image sizes for different viewports
   */
  getResponsiveImageSizes(basePath: string, filename: string): {
    small: string;
    medium: string;
    large: string;
  } {
    const filenameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const ext = this.supportsWebP ? 'webp' : filename.split('.').pop();

    return {
      small: `${basePath}${filenameWithoutExt}-300.${ext}`,
      medium: `${basePath}${filenameWithoutExt}-600.${ext}`,
      large: `${basePath}${filenameWithoutExt}-1200.${ext}`
    };
  }

  /**
   * Preload critical images
   */
  preloadImage(src: string, type?: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    if (type) {
      link.type = type;
    }
    document.head.appendChild(link);
  }

  /**
   * Lazy load images with intersection observer
   */
  lazyLoadImage(img: HTMLImageElement, src: string, threshold: number = 0.1): void {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, { threshold });

      observer.observe(img);
    } else {
      // Fallback for browsers without IntersectionObserver
      img.src = src;
    }
  }

  /**
   * Get format support status
   */
  getFormatSupport(): { webp: boolean | null; avif: boolean | null } {
    return {
      webp: this.supportsWebP,
      avif: this.supportsAVIF
    };
  }
}
