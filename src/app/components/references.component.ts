import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { animate, inView, stagger } from 'motion';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-32 bg-zinc-950 relative border-t border-white/5" id="references-section">
      <div class="container mx-auto px-6 max-w-7xl">
        <div class="text-center mb-20 ref-header opacity-0">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-white mb-6">Research Validation</h2>
          <p class="text-zinc-400 text-lg max-w-3xl mx-auto">NeuroTremor is built upon peer-reviewed clinical research, digital biomarker studies, and state-of-the-art machine learning architectures.</p>
        </div>

        <div class="mb-24">
          <h3 class="text-2xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-2">
            <mat-icon class="text-emerald-400">menu_book</mat-icon> Core Literature
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (paper of papers; track paper.title) {
              <a [href]="paper.link" target="_blank" rel="noopener noreferrer" class="glass-card p-6 ref-card opacity-0 group block cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{{ paper.title }}</h4>
                  <mat-icon class="text-zinc-500 group-hover:text-emerald-400 transition-colors">open_in_new</mat-icon>
                </div>
                <div class="text-sm text-zinc-400 mb-4">{{ paper.authors }}</div>
                <div class="flex flex-wrap gap-2">
                  @for (tag of paper.tags; track tag) {
                    <span class="text-xs font-mono px-2 py-1 bg-white/5 rounded text-zinc-300 border border-white/10">{{ tag }}</span>
                  }
                </div>
              </a>
            }
          </div>
        </div>

        <div>
          <h3 class="text-2xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-2">
            <mat-icon class="text-cyan-400">stacked_bar_chart</mat-icon> Literature Comparison
          </h3>
          <div class="overflow-x-auto glass-panel">
            <table class="w-full text-left text-sm whitespace-nowrap">
              <thead class="bg-white/5 border-b border-white/10 text-zinc-300">
                <tr>
                  <th class="px-6 py-4 font-medium">Study</th>
                  <th class="px-6 py-4 font-medium">Method</th>
                  <th class="px-6 py-4 font-medium">Sensors</th>
                  <th class="px-6 py-4 font-medium">Limitations</th>
                  <th class="px-6 py-4 font-medium text-emerald-400">Our Improvement</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5 text-zinc-400">
                @for (comp of comparisons; track comp.study) {
                  <tr class="hover:bg-white/5 transition-colors comp-row opacity-0">
                    <td class="px-6 py-4 font-medium text-zinc-200">{{ comp.study }}</td>
                    <td class="px-6 py-4">{{ comp.method }}</td>
                    <td class="px-6 py-4">{{ comp.sensors }}</td>
                    <td class="px-6 py-4 whitespace-normal min-w-[200px]">{{ comp.limitations }}</td>
                    <td class="px-6 py-4 text-emerald-400/90 whitespace-normal min-w-[250px]">{{ comp.improvement }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ReferencesComponent implements AfterViewInit {
  papers = [
    { 
      title: 'Characterization of the Handwriting Skills as a Biomarker for Parkinson Disease',
      authors: 'arXiv:1903.08226',
      link: 'https://arxiv.org/abs/1903.08226',
      tags: ['Handwriting biomarkers', 'Kinematic features']
    },
    { 
      title: 'Evaluation of Handwriting Kinematics and Pressure for Differential Diagnosis',
      authors: 'arXiv:2411.03044',
      link: 'https://arxiv.org/abs/2411.03044',
      tags: ['Pressure features', 'Grip force', 'SVM']
    },
    { 
      title: 'Contribution of Different Handwriting Modalities to Differential Diagnosis',
      authors: 'arXiv:2203.11269',
      link: 'https://arxiv.org/abs/2203.11269',
      tags: ['Pressure', 'In-air movement', 'Entropy']
    },
    { 
      title: 'LSTM-CNN: An Efficient Diagnostic Network Utilizing Dynamic Handwriting Analysis',
      authors: 'arXiv:2311.11756',
      link: 'https://arxiv.org/abs/2311.11756',
      tags: ['CNN', 'LSTM', 'Time-series']
    },
    { 
      title: 'Digital Biomarkers in Parkinson\'s Disease',
      authors: 'Frontiers in Aging Neuroscience',
      link: 'https://www.frontiersin.org/journals/aging-neuroscience/articles/10.3389/fnagi.2021.633752/full',
      tags: ['Digital biomarkers', 'Remote healthcare']
    },
    { 
      title: 'Update on the Diagnosis and Management of Parkinson\'s Disease',
      authors: 'Christopher Kobylecki (Clinical Medicine 2020)',
      link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7385761/',
      tags: ['Pathophysiology', 'Clinical assessment']
    }
  ];

  comparisons = [
    { study: '2025 Shokrpour et al.', method: 'ML Review', sensors: 'Multiple', limitations: 'Not a hardware implementation', improvement: 'Integrate multimodal sensing in a portable smart pen' },
    { study: '2024 Drotár et al.', method: 'Handwriting', sensors: 'Graphics tablet + pressure', limitations: 'Tablet-based, not portable', improvement: 'Replace tablet with IMU + FSR smart pen' },
    { study: '2020 Rios-Urrego et al.', method: 'Handwriting', sensors: 'Digital handwriting', limitations: 'Offline analysis', improvement: 'Real-time embedded inference in browser' },
    { study: '2020 San-Segundo et al.', method: 'Tremor Detection', sensors: 'Wrist accelerometer', limitations: 'Focuses only on tremor', improvement: 'Add handwriting and grip-force analysis' },
    { study: '2022 Trabassi et al.', method: 'Gait Analysis', sensors: 'Single lumbar IMU', limitations: 'No handwriting analysis', improvement: 'Combine gait-independent handwriting biomarkers' },
    { study: '2025 Sáez et al.', method: 'IoT Tremor Monitor', sensors: 'ESP32 + MPU6050', limitations: 'Tremor only', improvement: 'Extend to multimodal handwriting AI' }
  ];

  ngAfterViewInit() {
    inView('#references-section', () => {
      animate('.ref-header', { opacity: [0, 1], y: [30, 0] }, { duration: 0.8 });
      animate(
        '.ref-card',
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1, { startDelay: 0.2 }), duration: 0.5, ease: 'easeOut' }
      );
      animate(
        '.comp-row',
        { opacity: [0, 1], x: [-10, 0] },
        { delay: stagger(0.05, { startDelay: 0.4 }), duration: 0.4, ease: 'easeOut' }
      );
    }, { amount: 0.1 });
  }
}
