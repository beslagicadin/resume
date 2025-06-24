import { 
  Directive, 
  ElementRef, 
  Input, 
  OnInit, 
  OnDestroy, 
  Renderer2,
  inject,
  TemplateRef,
  ViewContainerRef,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[appLazySection]',
  standalone: true
})
export class LazySectionDirective implements OnInit, OnDestroy {
  @Input() rootMargin = '100px'; // How early to start loading sections
  @Input() threshold = 0.1; // Percentage of element visible before loading
  @Output() sectionVisible = new EventEmitter<void>();

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private observer?: IntersectionObserver;
  private hasBeenVisible = false;

  ngOnInit() {
    // Add initial loading state
    this.renderer.addClass(this.elementRef.nativeElement, 'lazy-section');
    this.renderer.addClass(this.elementRef.nativeElement, 'lazy-section-loading');

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
      this.makeVisible();
      return;
    }

    const options: IntersectionObserverInit = {
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasBeenVisible) {
          this.makeVisible();
          // Continue observing for animations, but only trigger once
        }
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  private makeVisible() {
    if (this.hasBeenVisible) return;

    this.hasBeenVisible = true;
    const element = this.elementRef.nativeElement;

    // Remove loading state and add visible state
    this.renderer.removeClass(element, 'lazy-section-loading');
    this.renderer.addClass(element, 'lazy-section-visible');

    // Emit event for parent component to know section is visible
    this.sectionVisible.emit();

    // Trigger any CSS animations
    setTimeout(() => {
      this.renderer.addClass(element, 'lazy-section-animated');
    }, 50);
  }
}
