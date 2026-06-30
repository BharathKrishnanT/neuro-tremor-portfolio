import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { animate, inView, stagger } from 'motion';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-32 bg-zinc-900 relative" id="evaluation-section">
      <div class="container mx-auto px-6 max-w-7xl">
        <div class="text-center mb-20 eval-header opacity-0">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-white mb-6">Why NeuroTremor Wins</h2>
          <p class="text-zinc-400 text-lg max-w-2xl mx-auto">Engineered to exceed evaluation criteria across innovation, technical complexity, and societal impact.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (crit of criteria; track crit.title) {
            <div class="glass-card p-8 eval-card opacity-0 relative overflow-hidden group hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5 transition-all duration-300">
              <!-- Animated Background Gradient -->
              <div class="absolute inset-0 bg-gradient-to-br {{ crit.color }} opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <mat-icon class="text-3xl mb-4 text-white/80">{{ crit.icon }}</mat-icon>
                <h3 class="text-xl font-display font-bold text-white mb-3">{{ crit.title }}</h3>
                <p class="text-zinc-400 text-sm leading-relaxed mb-6">{{ crit.desc }}</p>
                
                <div class="space-y-2">
                  <div class="flex justify-between text-xs font-mono text-zinc-500">
                    <span>Score Potential</span>
                    <span>10/10</span>
                  </div>
                  <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-white/80 rounded-full" style="width: 100%"></div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class EvaluationComponent implements AfterViewInit {
  criteria = [
    { title: 'Innovation', icon: 'lightbulb', color: 'from-yellow-500 to-amber-500', desc: 'First multimodal sensing system utilizing completely browser-based AI inference, ensuring 100% patient data privacy.' },
    { title: 'Technical Complexity', icon: 'memory', color: 'from-cyan-500 to-blue-500', desc: 'Seamlessly integrates custom embedded hardware, signal processing, Bluetooth LE, and a custom Convolutional Neural Network.' },
    { title: 'Social Impact', icon: 'public', color: 'from-emerald-500 to-teal-500', desc: 'Democratizes neurological monitoring by replacing $50k clinical setups with an affordable, accessible smart device.' },
    { title: 'Scalability', icon: 'rocket_launch', color: 'from-indigo-500 to-purple-500', desc: 'Cloud-ready architecture capable of supporting thousands of patients concurrently without massive server overhead.' },
    { title: 'Commercial Viability', icon: 'storefront', color: 'from-rose-500 to-pink-500', desc: 'Clear B2B market entry for hospitals and clinics, alongside a B2C subscription model for remote home healthcare monitoring.' },
    { title: 'Research Validation', icon: 'biotech', color: 'from-blue-500 to-indigo-500', desc: 'Built strictly upon verified digital biomarker research and standard UPDRS clinical assessment methodologies.' }
  ];

  ngAfterViewInit() {
    inView('#evaluation-section', () => {
      animate('.eval-header', { opacity: [0, 1], y: [30, 0] }, { duration: 0.8 });
      animate(
        '.eval-card',
        { opacity: [0, 1], scale: [0.95, 1] },
        { delay: stagger(0.1), duration: 0.5, ease: 'easeOut' }
      );
    }, { amount: 0.1 });
  }
}
