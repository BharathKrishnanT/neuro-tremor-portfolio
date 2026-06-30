import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-preview',
  standalone: true,
  imports: [CommonModule, MatIconModule, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-32 bg-zinc-950 relative border-t border-white/5" id="dashboard-section">
      <div class="container mx-auto px-6 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-white mb-6">Real-Time Clinical Dashboard</h2>
          <p class="text-zinc-400 text-lg max-w-2xl mx-auto">Visualize digital biomarkers instantly. Live IMU telemetry, spectral analysis, and severity prediction streaming directly from the smart pen via Web Bluetooth.</p>
        </div>

        <div class="glass-panel p-1 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10">
          <div class="bg-zinc-950 rounded-2xl p-6 lg:p-10 border border-white/5">
            <!-- Top Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div class="p-4 bg-white/5 rounded-xl border border-white/5">
                <div class="text-zinc-500 text-sm font-medium mb-1">Status</div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span class="text-emerald-400 font-mono font-bold">CONNECTED</span>
                </div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/5">
                <div class="text-zinc-500 text-sm font-medium mb-1">Sampling Rate</div>
                <div class="text-white font-mono font-bold text-xl">100 Hz</div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/5">
                <div class="text-zinc-500 text-sm font-medium mb-1">AI Confidence</div>
                <div class="text-white font-mono font-bold text-xl">94.2%</div>
              </div>
              <div class="p-4 bg-white/5 rounded-xl border border-white/5">
                <div class="text-zinc-500 text-sm font-medium mb-1">UPDRS Est. Score</div>
                <div class="text-cyan-400 font-mono font-bold text-xl">Stage 2</div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Charts Column -->
              <div class="lg:col-span-2 space-y-8">
                <!-- Accelerometer Chart -->
                <div class="space-y-4">
                  <div class="flex justify-between items-end">
                    <h4 class="text-white font-display font-bold flex items-center gap-2">
                      <mat-icon class="text-emerald-400">show_chart</mat-icon> Tremor Amplitude (Accel)
                    </h4>
                    <span class="text-xs font-mono text-zinc-500">X: red, Y: green, Z: blue</span>
                  </div>
                  <div class="h-48 bg-zinc-900/50 rounded-xl border border-white/5 relative overflow-hidden flex items-end">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full stroke-[0.5] fill-none">
                      <path [attr.d]="pathX()" class="stroke-red-500/80 transition-all duration-100 ease-linear"></path>
                      <path [attr.d]="pathY()" class="stroke-emerald-500/80 transition-all duration-100 ease-linear"></path>
                      <path [attr.d]="pathZ()" class="stroke-blue-500/80 transition-all duration-100 ease-linear"></path>
                    </svg>
                  </div>
                </div>

                <!-- Frequency Domain (FFT Mock) -->
                <div class="space-y-4">
                  <div class="flex justify-between items-end">
                    <h4 class="text-white font-display font-bold flex items-center gap-2">
                      <mat-icon class="text-cyan-400">bar_chart</mat-icon> Spectral Analysis (FFT)
                    </h4>
                    <span class="text-xs font-mono text-zinc-500">Peak: 4.5 Hz (Resting Tremor Range)</span>
                  </div>
                  <div class="h-32 bg-zinc-900/50 rounded-xl border border-white/5 relative overflow-hidden flex items-end gap-1 p-2">
                    @for (bar of fftBars(); track $index) {
                      <div class="flex-1 bg-cyan-500/40 rounded-t-sm transition-all duration-300" 
                           [style.height.%]="bar"
                           [class.bg-cyan-400]="bar > 70"></div>
                    }
                  </div>
                </div>
              </div>

              <!-- AI Analysis Column -->
              <div class="space-y-6">
                <div class="bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-2xl border border-white/10 h-full flex flex-col">
                  <h4 class="text-white font-display font-bold mb-6 flex items-center gap-2">
                    <mat-icon class="text-indigo-400">psychology</mat-icon> CNN Classification
                  </h4>
                  
                  <div class="space-y-4 flex-1">
                    @for (stage of stages; track stage.name; let i = $index) {
                      <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                          <span class="text-zinc-300">{{ stage.name }}</span>
                          <span class="font-mono text-zinc-400">{{ prob()[i] | number:'1.1-1' }}%</span>
                        </div>
                        <div class="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div class="h-full rounded-full transition-all duration-500"
                               [class.bg-emerald-500]="i === 0"
                               [class.bg-cyan-500]="i === 1"
                               [class.bg-indigo-500]="i === 2"
                               [class.bg-rose-500]="i === 3"
                               [style.width.%]="prob()[i]"></div>
                        </div>
                      </div>
                    }
                  </div>

                  <div class="mt-8 pt-6 border-t border-white/10">
                    <button class="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium border border-white/10 transition-colors flex justify-center items-center gap-2">
                      <mat-icon>picture_as_pdf</mat-icon> Generate Clinical Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class DashboardPreviewComponent implements OnInit, OnDestroy {
  // Signals for chart data
  pathX = signal('');
  pathY = signal('');
  pathZ = signal('');
  fftBars = signal<number[]>(Array(30).fill(10));
  prob = signal<number[]>([12.5, 65.2, 18.1, 4.2]);
  
  stages = [
    { name: 'Healthy / No Tremor' },
    { name: 'Stage 1 (Mild)' },
    { name: 'Stage 2 (Moderate)' },
    { name: 'Stage 3 (Severe)' }
  ];

  private intervalId: any;
  private dataX: number[] = Array(50).fill(50);
  private dataY: number[] = Array(50).fill(50);
  private dataZ: number[] = Array(50).fill(50);
  private t = 0;

  ngOnInit() {
    this.intervalId = setInterval(() => this.updateData(), 100);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private updateData() {
    this.t += 0.2;
    
    // Simulate Parkinsonian 4-6Hz resting tremor
    const tremor = Math.sin(this.t * 4) * 20 + Math.sin(this.t * 6) * 10;
    
    this.dataX.shift();
    this.dataX.push(50 + tremor + (Math.random() * 10 - 5));
    
    this.dataY.shift();
    this.dataY.push(50 + tremor * 0.5 + (Math.random() * 10 - 5));
    
    this.dataZ.shift();
    this.dataZ.push(50 + (Math.random() * 20 - 10));

    this.pathX.set(this.generateSvgPath(this.dataX));
    this.pathY.set(this.generateSvgPath(this.dataY));
    this.pathZ.set(this.generateSvgPath(this.dataZ));

    // Update FFT (mock a peak around 4-6Hz which is typical for PD)
    const bars = Array(30).fill(0).map((_, i) => {
      let val = Math.random() * 20 + 5;
      if (i >= 4 && i <= 7) val += Math.random() * 50 + 30; // The peak
      return Math.min(100, val);
    });
    this.fftBars.set(bars);
    
    // Slight jitter to probabilities
    const currentProbs = this.prob();
    const newProbs = currentProbs.map(p => Math.max(0, Math.min(100, p + (Math.random() * 2 - 1))));
    // Normalize
    const sum = newProbs.reduce((a, b) => a + b, 0);
    this.prob.set(newProbs.map(p => (p / sum) * 100));
  }

  private generateSvgPath(data: number[]): string {
    const width = 100; // viewBox width
    const step = width / (data.length - 1);
    return data.reduce((path, val, idx) => {
      const x = idx * step;
      const y = val;
      return `${path} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    }, '');
  }
}
