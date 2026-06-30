import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { animate, stagger } from 'motion';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      <!-- Background Effects -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] hero-bg-parallax" data-speed="0.4"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] hero-bg-parallax" data-speed="-0.2"></div>
        
        <!-- Grid pattern -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] hero-bg-parallax" data-speed="0.15"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 mb-8 hero-element opacity-0">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-sm font-medium tracking-wide text-zinc-700">Phase 2 Clinical Trials Active</span>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-display font-bold tracking-tight text-zinc-900 mb-6 hero-element opacity-0 leading-tight">
          Neuro<span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Tremor</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-zinc-600 mb-10 hero-element opacity-0 max-w-3xl mx-auto font-light leading-relaxed">
          A multimodal AI-IoT healthcare platform combining wearable sensors, browser-based deep learning, and real-time analytics to objectively detect Parkinson's disease, estimate severity, and monitor long-term recovery.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 hero-element opacity-0">
          <a href="#dashboard-section" class="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
            <mat-icon>play_circle</mat-icon>
            View Live Demo
          </a>
          <a href="#references-section" class="px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-100 transition-colors border border-zinc-200 w-full sm:w-auto flex items-center justify-center gap-2 shadow-sm">
            <mat-icon>science</mat-icon>
            Research Validation
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent implements OnInit {
  ngOnInit() {
    setTimeout(() => {
      animate(
        '.hero-element',
        { opacity: [0, 1], y: [40, 0] },
        { 
          delay: stagger(0.15),
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1] 
        }
      );
    }, 100);
  }
}
