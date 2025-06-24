import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <picture>
      <!-- WebP format for modern browsers -->
      <source 
        *ngIf="webpSrc" 
        [srcset]="webpSrc" 
        type="image/webp">
      
      <!-- AVIF format for cutting-edge browsers -->
      <source 
        *ngIf="avifSrc" 
        [srcset]="avifSrc" 
        type="image/avif">
      
      <!-- Fallback JPEG -->
      <img 
        [src]="fallbackSrc" 
        [alt]="alt"
        [class]="className"
        [loading]="loading"
        (load)="onImageLoad()"
        (error)="onImageError($event)">
    </picture>
  `,
  styles: [`
    picture {
      display: block;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease;
    }
    
    img.loading {
      opacity: 0.5;
    }
    
    img.loaded {
      opacity: 1;
    }
  `]
})
export class OptimizedImageComponent implements OnInit {
  @Input() src!: string;
  @Input() alt: string = '';
  @Input() className: string = '';
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() enableWebP: boolean = true;
  @Input() enableAVIF: boolean = true;

  webpSrc: string | null = null;
  avifSrc: string | null = null;
  fallbackSrc: string = '';

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    this.setupImageSources();
  }

  private setupImageSources() {
    if (!this.src) return;

    // Set fallback source
    this.fallbackSrc = this.src;

    // Generate optimized format sources
    const basePath = this.getBasePath(this.src);
    const filename = this.getFilename(this.src);
    const filenameWithoutExt = this.getFilenameWithoutExtension(filename);

    if (this.enableWebP) {
      this.webpSrc = `${basePath}${filenameWithoutExt}.webp`;
    }

    if (this.enableAVIF) {
      this.avifSrc = `${basePath}${filenameWithoutExt}.avif`;
    }
  }

  private getBasePath(fullPath: string): string {
    const lastSlashIndex = fullPath.lastIndexOf('/');
    return lastSlashIndex !== -1 ? fullPath.substring(0, lastSlashIndex + 1) : '';
  }

  private getFilename(fullPath: string): string {
    const lastSlashIndex = fullPath.lastIndexOf('/');
    return lastSlashIndex !== -1 ? fullPath.substring(lastSlashIndex + 1) : fullPath;
  }

  private getFilenameWithoutExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename;
  }

  onImageLoad() {
    // Image loaded successfully
    console.log('Image loaded:', this.fallbackSrc);
  }

  onImageError(event: any) {
    console.warn('Failed to load image:', event.target.src);
    // Could implement fallback logic here
  }
}
