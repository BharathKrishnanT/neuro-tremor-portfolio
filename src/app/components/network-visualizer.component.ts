import { Component, ChangeDetectionStrategy, signal, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { animate, inView, stagger } from 'motion';

interface Node {
  id: string;
  layer: number;
  x: number;
  y: number;
  label?: string;
}

interface Link {
  id: string;
  source: Node;
  target: Node;
  isFlowing: boolean;
}

@Component({
  selector: 'app-network-visualizer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-32 bg-white relative border-t border-zinc-200" id="ai-engine-section">
      <!-- Background pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 pointer-events-none"></div>
      
      <div class="container mx-auto px-6 max-w-7xl relative z-10">
        <div class="text-center mb-16 nv-header opacity-0">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 mb-6 text-sm font-medium">
            Interactive Visualizer
          </div>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-6">Neural Network Inference</h2>
          <p class="text-zinc-600 text-lg max-w-2xl mx-auto">
            Hover over the nodes to trace the 1D-CNN data flow. Raw IMU signals are processed through hidden convolutional layers to classify tremor severity in real-time.
          </p>
        </div>

        <div class="glass-panel p-4 md:p-8 overflow-hidden relative w-full flex justify-center items-center shadow-2xl shadow-indigo-500/5 nv-canvas opacity-0 group bg-zinc-50 border-zinc-200">
          <svg viewBox="0 0 1000 500" class="w-full h-auto max-w-5xl" style="max-height: 600px;">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <!-- Base static links -->
            @for (link of links; track link.id) {
              <line 
                [attr.x1]="link.source.x" 
                [attr.y1]="link.source.y"
                [attr.x2]="link.target.x" 
                [attr.y2]="link.target.y"
                class="transition-all duration-300 pointer-events-none"
                [ngClass]="{
                  'stroke-indigo-500/60 stroke-[2px]': isLinkActive(link),
                  'stroke-zinc-200 stroke-[1px]': !isLinkActive(link)
                }"
              ></line>
            }

            <!-- Flowing particle links -->
            @for (link of flowingLinks; track link.id) {
              <line 
                [attr.x1]="link.source.x" 
                [attr.y1]="link.source.y"
                [attr.x2]="link.target.x" 
                [attr.y2]="link.target.y"
                class="flow-particle pointer-events-none"
                [style.display]="hoveredNode() ? 'none' : 'block'"
              ></line>
            }

            <!-- Nodes -->
            @for (node of nodes; track node.id) {
              <g 
                (mouseenter)="setHoveredNode(node.id)" 
                (mouseleave)="setHoveredNode(null)"
                class="cursor-crosshair transition-transform duration-300 origin-center"
                [style.transform-origin]="node.x + 'px ' + node.y + 'px'"
                [class.scale-150]="hoveredNode() === node.id"
              >
                <!-- Outer glow circle when active -->
                @if (hoveredNode() === node.id) {
                  <circle 
                    [attr.cx]="node.x" 
                    [attr.cy]="node.y" 
                    r="12" 
                    class="fill-indigo-500/20 animate-pulse pointer-events-none"
                  ></circle>
                }
                
                <circle 
                  [attr.cx]="node.x" 
                  [attr.cy]="node.y" 
                  r="6"
                  class="fill-white transition-colors duration-300"
                  [ngClass]="{
                    'stroke-emerald-500': node.layer === 0,
                    'stroke-cyan-500': node.layer > 0 && node.layer < layers.length - 1,
                    'stroke-indigo-500': node.layer === layers.length - 1,
                    'stroke-[3px] filter drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]': hoveredNode() === node.id || isActiveRelated(node.id),
                    'stroke-[2px]': hoveredNode() !== node.id && !isActiveRelated(node.id)
                  }"
                ></circle>

                <!-- Labels -->
                @if (node.label) {
                  <text 
                    [attr.x]="node.layer === 0 ? node.x - 20 : node.x + 20" 
                    [attr.y]="node.y + 4" 
                    [attr.text-anchor]="node.layer === 0 ? 'end' : 'start'"
                    class="text-xs font-mono transition-colors duration-300 select-none pointer-events-none"
                    [ngClass]="{
                      'fill-zinc-900 font-bold': hoveredNode() === node.id || isActiveRelated(node.id),
                      'fill-zinc-500': hoveredNode() !== node.id && !isActiveRelated(node.id)
                    }"
                  >
                    {{ node.label }}
                  </text>
                }
              </g>
            }

            <!-- Layer Titles -->
            <text x="166" y="40" class="fill-zinc-400 text-xs font-mono font-bold tracking-widest text-anchor-middle pointer-events-none">INPUT SENSORS</text>
            <text x="500" y="40" class="fill-zinc-400 text-xs font-mono font-bold tracking-widest text-anchor-middle pointer-events-none">HIDDEN LAYERS</text>
            <text x="833" y="40" class="fill-zinc-400 text-xs font-mono font-bold tracking-widest text-anchor-middle pointer-events-none">CLASSIFICATION</text>
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .flow-particle {
      stroke: #22d3ee;
      stroke-width: 1.5px;
      stroke-dasharray: 8 120;
      animation: flowAnim 2s linear infinite;
      opacity: 0.6;
    }
    
    @keyframes flowAnim {
      from { stroke-dashoffset: 128; }
      to { stroke-dashoffset: 0; }
    }
    
    .text-anchor-middle {
      text-anchor: middle;
    }
  `]
})
export class NetworkVisualizerComponent implements OnInit, AfterViewInit {
  layers = [6, 12, 14, 10, 4];
  inputLabels = ['Accel X', 'Accel Y', 'Accel Z', 'Gyro X', 'Gyro Y', 'Gyro Z'];
  outputLabels = ['Normal', 'Mild', 'Moderate', 'Severe'];
  
  nodes: Node[] = [];
  links: Link[] = [];
  flowingLinks: Link[] = [];
  
  hoveredNode = signal<string | null>(null);
  
  // Pre-compute active relations for fast template rendering
  private activeLinksMap = new Set<string>();
  private activeNodesMap = new Set<string>();

  ngOnInit() {
    this.generateNetwork();
  }

  ngAfterViewInit() {
    inView('#ai-engine-section', () => {
      animate('.nv-header', { opacity: [0, 1], y: [30, 0] }, { duration: 0.8 });
      animate('.nv-canvas', { opacity: [0, 1], scale: [0.95, 1] }, { delay: 0.2, duration: 0.8, ease: 'easeOut' });
    }, { amount: 0.2 });
  }

  generateNetwork() {
    const width = 1000;
    const height = 500;
    const padding = 80; // Top/Bottom padding
    
    const xStep = width / (this.layers.length + 1);

    // Generate Nodes
    this.layers.forEach((nodeCount, layerIdx) => {
      const yStep = (height - (padding * 2)) / (nodeCount - 1 > 0 ? nodeCount - 1 : 1);
      
      for (let i = 0; i < nodeCount; i++) {
        let label = undefined;
        if (layerIdx === 0) label = this.inputLabels[i];
        if (layerIdx === this.layers.length - 1) label = this.outputLabels[i];
        
        // Center vertically if there's only 1 node
        const yOffset = nodeCount === 1 ? height / 2 : padding + (yStep * i);

        this.nodes.push({
          id: `L${layerIdx}-N${i}`,
          layer: layerIdx,
          x: xStep * (layerIdx + 1),
          y: yOffset,
          label
        });
      }
    });

    // Generate Links
    for (let l = 0; l < this.layers.length - 1; l++) {
      const sourceNodes = this.nodes.filter(n => n.layer === l);
      const targetNodes = this.nodes.filter(n => n.layer === l + 1);

      sourceNodes.forEach(source => {
        targetNodes.forEach(target => {
          // Add some sparsity (dropout) to make the network look cooler, except for output layer
          if (l === this.layers.length - 2 || Math.random() > 0.45) {
            const link: Link = {
              id: `${source.id}-${target.id}`,
              source,
              target,
              isFlowing: Math.random() > 0.8 // ~20% of links show flowing data particles
            };
            this.links.push(link);
            if (link.isFlowing) this.flowingLinks.push(link);
          }
        });
      });
    }
  }

  setHoveredNode(id: string | null) {
    this.hoveredNode.set(id);
    this.activeLinksMap.clear();
    this.activeNodesMap.clear();

    if (id) {
      this.activeNodesMap.add(id);
      this.links.forEach(link => {
        if (link.source.id === id || link.target.id === id) {
          this.activeLinksMap.add(link.id);
          this.activeNodesMap.add(link.source.id);
          this.activeNodesMap.add(link.target.id);
        }
      });
    }
  }

  isLinkActive(link: Link): boolean {
    return this.activeLinksMap.has(link.id);
  }

  isActiveRelated(nodeId: string): boolean {
    return this.activeNodesMap.has(nodeId);
  }
}
