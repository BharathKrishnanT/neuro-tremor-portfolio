import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-zinc-950 pt-24 pb-12 border-t border-white/10">
      <div class="container mx-auto px-6 max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="md:col-span-2">
            <h2 class="text-3xl font-display font-bold text-white mb-4">
              Neuro<span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Tremor</span>
            </h2>
            <p class="text-zinc-400 max-w-sm mb-6">
              AI-Powered Parkinson's Disease Detection & Recovery Monitoring Platform. Engineered for impact.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                <mat-icon>code</mat-icon>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                <mat-icon>science</mat-icon>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                <mat-icon>mail</mat-icon>
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="text-white font-bold mb-4 font-display">Resources</h4>
            <ul class="space-y-2 text-sm text-zinc-400">
              <li><a href="#architecture-section" class="hover:text-emerald-400 transition-colors">Architecture Documentation</a></li>
              <li><a href="#references-section" class="hover:text-emerald-400 transition-colors">Research Validation</a></li>
              <li><a href="#" class="hover:text-emerald-400 transition-colors">Hardware Schematics</a></li>
              <li><a href="#" class="hover:text-emerald-400 transition-colors">API Reference</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold mb-4 font-display">Project Info</h4>
            <ul class="space-y-2 text-sm text-zinc-400">
              <li><a href="#" class="hover:text-emerald-400 transition-colors">Hackathon Presentation</a></li>
              <li><a href="#" class="hover:text-emerald-400 transition-colors">Business Model</a></li>
              <li><a href="#" class="hover:text-emerald-400 transition-colors">Team & Mentors</a></li>
              <li><a href="#" class="hover:text-emerald-400 transition-colors">Patent Info</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>&copy; 2026 NeuroTremor Project. All rights reserved.</p>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            System Status: All Services Operational
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
