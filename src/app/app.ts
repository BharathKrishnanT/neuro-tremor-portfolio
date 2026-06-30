import { ChangeDetectionStrategy, Component, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeroComponent } from './components/hero.component';
import { StatsComponent } from './components/stats.component';
import { ArchitectureComponent } from './components/architecture.component';
import { DashboardPreviewComponent } from './components/dashboard-preview.component';
import { EvaluationComponent } from './components/evaluation.component';
import { FooterComponent } from './components/footer.component';
import { animate, inView } from 'motion';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    MatIconModule,
    HeroComponent,
    StatsComponent,
    ArchitectureComponent,
    DashboardPreviewComponent,
    EvaluationComponent,
    FooterComponent
  ],
  template: `
    <!-- Main Navbar -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 opacity-0 -translate-y-4" id="main-nav">
      <div class="container mx-auto px-6 h-16 flex items-center justify-between">
        <div class="font-display font-bold text-white tracking-tight flex items-center gap-2">
          <mat-icon class="text-emerald-400">scatter_plot</mat-icon>
          NeuroTremor
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#stats-section" class="hover:text-white transition-colors">Impact</a>
          <a href="#architecture-section" class="hover:text-white transition-colors">Architecture</a>
          <a href="#dashboard-section" class="hover:text-white transition-colors">Dashboard</a>
          <a href="#evaluation-section" class="hover:text-white transition-colors">Evaluation</a>
        </div>
        <div>
          <button class="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium hover:bg-emerald-500/20 transition-colors">
            Connect Pen
          </button>
        </div>
      </div>
    </nav>
    
    <main class="min-h-screen bg-zinc-950 selection:bg-emerald-500/30 selection:text-emerald-200">
      <div class="section-container"><app-hero></app-hero></div>
      <div class="section-container"><app-stats></app-stats></div>
      <div class="section-container"><app-architecture></app-architecture></div>
      <div class="section-container"><app-dashboard-preview></app-dashboard-preview></div>
      <div class="section-container"><app-evaluation></app-evaluation></div>
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
  ngAfterViewInit() {
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
  }
}
