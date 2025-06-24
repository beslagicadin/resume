import { 
  Directive, 
  ElementRef, 
  Input, 
  OnInit, 
  OnDestroy, 
  Renderer2,
  inject
} from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
  @Input() appLazyLoad!: string; // The actual src to load
  @Input() placeholder?: string; // Optional placeholder image
  @Input() rootMargin = '50px'; // How early to start loading
  @Input() threshold = 0.1; // Percentage of element visible before loading

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private observer?: IntersectionObserver;
  private loaded = false;

  ngOnInit() {
    // Set initial placeholder if provided
    if (this.placeholder) {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'src', this.placeholder);
    }

    // Add loading state class
    this.renderer.addClass(this.elementRef.nativeElement, 'lazy-loading');

    // Set up intersection observer
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver support
      this.loadImage();
      return;
    }

    const options: IntersectionObserverInit = {
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.loaded) {
          this.loadImage();
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  private loadImage() {
    if (this.loaded) return;

    const img = this.elementRef.nativeElement;
    const actualSrc = this.appLazyLoad;

    // Create a new image to preload
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      // Image loaded successfully
      this.renderer.setAttribute(img, 'src', actualSrc);
      this.renderer.removeClass(img, 'lazy-loading');
      this.renderer.addClass(img, 'lazy-loaded');
      this.loaded = true;
    };

    imageLoader.onerror = () => {
      // Handle loading error
      this.renderer.removeClass(img, 'lazy-loading');
      this.renderer.addClass(img, 'lazy-error');
      console.warn('Failed to load image:', actualSrc);
    };

    // Start loading the image
    imageLoader.src = actualSrc;
  }
}
