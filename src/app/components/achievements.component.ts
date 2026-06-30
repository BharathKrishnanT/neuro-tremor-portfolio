import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { animate, inView, stagger } from 'motion';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-32 bg-zinc-50 relative border-t border-zinc-200" id="achievements-section">
      <div class="container mx-auto px-6 max-w-7xl">
        <div class="text-center mb-20 achieve-header opacity-0">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-200 mb-6 text-sm font-medium">
            Traction
          </div>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-6">Milestones & Achievements</h2>
          <p class="text-zinc-600 text-lg max-w-2xl mx-auto">Recognition, funding, and intellectual property backing the NeuroTremor platform.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Patent -->
          <div class="glass-card p-8 achieve-card opacity-0 border border-zinc-200 bg-white hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6">
              <mat-icon class="text-indigo-600">workspace_premium</mat-icon>
            </div>
            <div class="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold font-mono rounded-full border border-indigo-100 mb-4">
              PATENT PUBLISHED
            </div>
            <h3 class="text-2xl font-bold text-zinc-900 mb-2 font-display">AI Driven Dynamic Virtual Aperture mmWave Imaging System</h3>
            <p class="text-zinc-600 mb-6 text-sm leading-relaxed">
              A non-invasive, contactless tremor detection and monitoring system using phase-coherent millimeter-wave (mmWave) sensing and Multiple-Input Multiple-Output (MIMO) architecture for high precision tremor analysis.
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between border-b border-zinc-100 pb-2">
                <span class="text-zinc-500">Application No.</span>
                <span class="font-mono text-zinc-900 font-medium">202641068421 A</span>
              </div>
              <div class="flex justify-between border-b border-zinc-100 pb-2 pt-1">
                <span class="text-zinc-500">Publication Date</span>
                <span class="font-mono text-zinc-900 font-medium">12/06/2026</span>
              </div>
              <div class="flex justify-between pt-1">
                <span class="text-zinc-500">Inventor</span>
                <span class="font-mono text-zinc-900 font-medium">Bharath Krishnan.T</span>
              </div>
            </div>
          </div>

          <!-- MSME Fund -->
          <div class="glass-card p-8 achieve-card opacity-0 border border-zinc-200 bg-white hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <div class="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6">
              <mat-icon class="text-emerald-600">account_balance</mat-icon>
            </div>
            <div class="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold font-mono rounded-full border border-emerald-100 mb-4">
              GOVERNMENT GRANT
            </div>
            <h3 class="text-2xl font-bold text-zinc-900 mb-2 font-display">Ministry of MSME Idea Hackathon Funding</h3>
            <p class="text-zinc-600 mb-6 text-sm leading-relaxed">
              Awarded ₹9.5 Lakhs funding under the MSME Innovative Scheme for the project "Parkinson's Disease Detection in Handwriting Using Sequential CNN Classifiers".
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between border-b border-zinc-100 pb-2">
                <span class="text-zinc-500">Idea ID</span>
                <span class="font-mono text-zinc-900 font-medium">IDEATN018533</span>
              </div>
              <div class="flex justify-between border-b border-zinc-100 pb-2 pt-1">
                <span class="text-zinc-500">Category</span>
                <span class="font-mono text-zinc-900 font-medium">Frontier Technology in MSME</span>
              </div>
              <div class="flex justify-between pt-1">
                <span class="text-zinc-500">Institution</span>
                <span class="font-mono text-zinc-900 font-medium">M.Kumarasamy College of Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AchievementsComponent implements AfterViewInit {
  ngAfterViewInit() {
    inView('#achievements-section', () => {
      animate('.achieve-header', { opacity: [0, 1], y: [30, 0] }, { duration: 0.8 });
      animate(
        '.achieve-card',
        { opacity: [0, 1], y: [30, 0] },
        { delay: stagger(0.2, { startDelay: 0.2 }), duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      );
    }, { amount: 0.2 });
  }
}
