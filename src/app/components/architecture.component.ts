import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { animate, inView, stagger } from 'motion';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-32 bg-zinc-900 relative overflow-hidden" id="architecture-section">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgoJCTxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0ME0xMCAwdjQwTTIwIDB2NDBNezAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KCTwvc3ZnPg==')] opacity-50"></div>
      
      <div class="container mx-auto px-6 max-w-7xl relative z-10">
        <div class="text-center mb-24 arch-header opacity-0">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6 text-sm font-medium">
            System Architecture
          </div>
          <h2 class="text-4xl md:text-6xl font-display font-bold text-white mb-6">Hardware Meets Edge AI</h2>
          <p class="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto">An end-to-end pipeline from physical biomotor capture to neural network inference, entirely without cloud dependencies.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Hardware Column -->
          <div class="space-y-6">
            <h3 class="text-2xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">Hardware Stack</h3>
            
            @for (hw of hardware; track hw.title) {
              <div class="glass-card p-6 arch-card opacity-0 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                    <mat-icon class="text-zinc-400 group-hover:text-cyan-400 transition-colors">{{ hw.icon }}</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-white mb-2 font-display">{{ hw.title }}</h4>
                    <p class="text-zinc-400 text-sm mb-4 leading-relaxed">{{ hw.desc }}</p>
                    <div class="flex flex-wrap gap-2">
                      @for (tag of hw.tags; track tag) {
                        <span class="text-xs font-mono px-2 py-1 bg-white/5 rounded text-zinc-300 border border-white/5">{{ tag }}</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Software Column -->
          <div class="space-y-6 lg:mt-24">
            <h3 class="text-2xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4 flex justify-end">Software & AI Stack</h3>
            
            @for (sw of software; track sw.title) {
              <div class="glass-card p-6 arch-card opacity-0 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
                <div class="flex items-start gap-4 flex-row-reverse text-right">
                  <div class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                    <mat-icon class="text-zinc-400 group-hover:text-emerald-400 transition-colors">{{ sw.icon }}</mat-icon>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-white mb-2 font-display">{{ sw.title }}</h4>
                    <p class="text-zinc-400 text-sm mb-4 leading-relaxed">{{ sw.desc }}</p>
                    <div class="flex flex-wrap gap-2 justify-end">
                      @for (tag of sw.tags; track tag) {
                        <span class="text-xs font-mono px-2 py-1 bg-white/5 rounded text-zinc-300 border border-white/5">{{ tag }}</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class ArchitectureComponent implements AfterViewInit {
  hardware = [
    { title: 'ESP32-S3 Microcontroller', icon: 'memory', desc: 'Dual-core Xtensa LX7 MCU with vector instructions for edge AI, handling sensor polling and BLE transmission.', tags: ['240MHz', 'Bluetooth LE 5.0', 'Ultra-low Power'] },
    { title: 'ICM-20948 9-Axis IMU', icon: 'explore', desc: 'Precision motion tracking capturing micro-tremors with high fidelity and extremely low noise.', tags: ['Accelerometer', 'Gyroscope', 'Magnetometer'] },
    { title: 'Force Sensitive Resistor', icon: 'touch_app', desc: 'Measures dynamic grip and writing pressure, crucial for detecting bradykinesia and micrographia.', tags: ['Analog ADC', 'Pressure Curve'] }
  ];

  software = [
    { title: 'Browser-Based Inference', icon: 'web', desc: 'No cloud server required. TensorFlow.js runs the deep learning model directly in the browser via Web Bluetooth.', tags: ['TensorFlow.js', 'Web Bluetooth API', 'Zero Latency'] },
    { title: 'Convolutional Neural Network', icon: 'psychology', desc: '1D-CNN architecture optimized for multi-channel time-series data to classify severity stages.', tags: ['Conv1D', 'Softmax', '92% Accuracy'] },
    { title: 'Clinical Dashboard', icon: 'dashboard', desc: 'Real-time visualization of digital biomarkers, recovery tracking, and automated PDF report generation.', tags: ['D3.js', 'Firebase', 'Data Vis'] }
  ];

  ngAfterViewInit() {
    inView('#architecture-section', () => {
      animate('.arch-header', { opacity: [0, 1], y: [30, 0] }, { duration: 0.8 });
      animate(
        '.arch-card',
        { opacity: [0, 1], x: [0, 0], scale: [0.95, 1] },
        { delay: stagger(0.15, { startDelay: 0.3 }), duration: 0.6, ease: 'easeOut' }
      );
    }, { amount: 0.2 });
  }
}
