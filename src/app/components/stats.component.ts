import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { animate, inView, stagger } from 'motion';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-24 bg-white relative border-t border-zinc-200" id="stats-section">
      <div class="container mx-auto px-6 max-w-7xl">
        <div class="text-center mb-16 stat-header opacity-0">
          <h2 class="text-3xl md:text-5xl font-display font-bold text-zinc-900 mb-4">Why This Matters</h2>
          <p class="text-zinc-600 text-lg">The global impact of Parkinson's Disease requires scalable, accessible solutions.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (stat of stats; track stat.title) {
            <div class="glass-card p-8 stat-card opacity-0 translate-y-8 flex flex-col justify-between border border-zinc-200 bg-zinc-50/50">
              <div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                <mat-icon class="text-emerald-600">{{ stat.icon }}</mat-icon>
              </div>
              <div class="text-4xl font-display font-bold text-zinc-900 mb-2">{{ stat.value }}</div>
              <div class="text-zinc-600 font-medium leading-tight">{{ stat.title }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class StatsComponent implements AfterViewInit {
  stats = [
    { icon: 'psychology', value: '10M+', title: 'People living with Parkinson\'s globally' },
    { icon: 'trending_up', value: 'Early', title: 'Detection significantly improves treatment' },
    { icon: 'local_hospital', value: 'Limited', title: 'Neurologist availability in rural regions' },
    { icon: 'account_balance_wallet', value: 'High', title: 'Diagnostic costs reduce accessibility' }
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    inView('#stats-section', () => {
      animate('.stat-header', { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, ease: 'easeOut' });
      animate(
        '.stat-card',
        { opacity: [0, 1], y: [30, 0] },
        { delay: stagger(0.1, { startDelay: 0.2 }), duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      );
    });
  }
}
