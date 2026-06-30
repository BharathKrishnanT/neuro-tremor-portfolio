import { ChangeDetectionStrategy, Component, AfterViewInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeroComponent } from './components/hero.component';
import { StatsComponent } from './components/stats.component';
import { ArchitectureComponent } from './components/architecture.component';
import { NetworkVisualizerComponent } from './components/network-visualizer.component';
import { DashboardPreviewComponent } from './components/dashboard-preview.component';
import { EvaluationComponent } from './components/evaluation.component';
import { AchievementsComponent } from './components/achievements.component';
import { ReferencesComponent } from './components/references.component';
import { FooterComponent } from './components/footer.component';
import { animate, inView } from 'motion';
import Lenis from 'lenis';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    MatIconModule,
    HeroComponent,
    StatsComponent,
    ArchitectureComponent,
    NetworkVisualizerComponent,
    DashboardPreviewComponent,
    EvaluationComponent,
    AchievementsComponent,
    ReferencesComponent,
    FooterComponent
  ],
  template: `
    <!-- Main Navbar -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 opacity-0 -translate-y-4" id="main-nav">
      <div class="container mx-auto px-6 h-16 flex items-center justify-between">
        <div class="font-display font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <mat-icon class="text-emerald-500">scatter_plot</mat-icon>
          NeuroTremor
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
          <a href="#stats-section" [class.text-zinc-900]="activeSection() === 'stats-section'" class="hover:text-zinc-900 transition-colors">Impact</a>
          <a href="#architecture-section" [class.text-zinc-900]="activeSection() === 'architecture-section'" class="hover:text-zinc-900 transition-colors">Architecture</a>
          <a href="#ai-engine-section" [class.text-zinc-900]="activeSection() === 'ai-engine-section'" class="hover:text-zinc-900 transition-colors">AI Engine</a>
          <a href="#dashboard-section" [class.text-zinc-900]="activeSection() === 'dashboard-section'" class="hover:text-zinc-900 transition-colors">Dashboard</a>
          <a href="#evaluation-section" [class.text-zinc-900]="activeSection() === 'evaluation-section'" class="hover:text-zinc-900 transition-colors">Evaluation</a>
          <a href="#achievements-section" [class.text-zinc-900]="activeSection() === 'achievements-section'" class="hover:text-zinc-900 transition-colors">Achievements</a>
          <a href="#references-section" [class.text-zinc-900]="activeSection() === 'references-section'" class="hover:text-zinc-900 transition-colors">References</a>
        </div>
        <div>
          <button class="px-4 py-2 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-full text-sm font-medium hover:bg-emerald-500/20 transition-colors">
            Connect Pen
          </button>
        </div>
      </div>
    </nav>
    
    <main class="min-h-screen bg-zinc-50 selection:bg-emerald-500/30 selection:text-emerald-900">
      <div class="section-container"><app-hero></app-hero></div>
      <div class="section-container"><app-stats></app-stats></div>
      <div class="section-container"><app-architecture></app-architecture></div>
      <div class="section-container"><app-network-visualizer></app-network-visualizer></div>
      <div class="section-container"><app-dashboard-preview></app-dashboard-preview></div>
      <div class="section-container"><app-evaluation></app-evaluation></div>
      <div class="section-container"><app-achievements></app-achievements></div>
      <div class="section-container"><app-references></app-references></div>
    </main>
    
    <div class="section-container"><app-footer></app-footer></div>
  `,
  styles: [`
    .section-container {
      opacity: 0;
      transform: translateY(30px);
      will-change: opacity, transform;
    }
  `]
})
export class App implements AfterViewInit {
  activeSection = signal<string>('');

  ngAfterViewInit() {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on('scroll', () => {
      const scrollY = window.scrollY;
      const parallaxEls = document.querySelectorAll('.hero-bg-parallax') as NodeListOf<HTMLElement>;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.3');
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Animate Navbar
    animate('#main-nav', { opacity: [0, 1], y: [-16, 0] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });

    // Animate all sections on scroll
    document.querySelectorAll('.section-container').forEach((section) => {
      inView(section, () => {
        animate(
          section,
          { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0px)'] },
          { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        );
      }, { margin: '-10% 0px -10% 0px' });
    });

    // Track active section for navigation highlighting
    const sections = ['stats-section', 'architecture-section', 'ai-engine-section', 'dashboard-section', 'evaluation-section', 'achievements-section', 'references-section'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, { threshold: 0.3 }); // Trigger when 30% of the section is visible

    // We use setTimeout to ensure child components have rendered their IDs
    setTimeout(() => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);
  }
}
