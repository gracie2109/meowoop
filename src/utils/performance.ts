// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Start timing a operation
  startTiming(label: string): void {
    if (typeof performance !== 'undefined') {
      this.metrics.set(`${label}_start`, performance.now())
    }
  }

  // End timing and log result
  endTiming(label: string): number {
    if (typeof performance !== 'undefined') {
      const startTime = this.metrics.get(`${label}_start`)
      if (startTime) {
        const duration = performance.now() - startTime
        this.metrics.set(label, duration)
        console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`)
        return duration
      }
    }
    return 0
  }

  // Get metric value
  getMetric(label: string): number | undefined {
    return this.metrics.get(label)
  }

  // Get all metrics
  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics.entries())
  }

  // Clear all metrics
  clear(): void {
    this.metrics.clear()
  }
}

// Debounce utility for performance
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: number | null = null

  return (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = window.setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for performance
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Memory usage monitoring
export function getMemoryUsage(): Record<string, number> | null {
  if (typeof performance !== 'undefined' && 'memory' in performance) {
    const memory = (
      performance as unknown as {
        memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number }
      }
    ).memory
    return {
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
    }
  }
  return null
}

// FPS monitoring
export class FPSMonitor {
  private fps: number = 0
  private frames: number = 0
  private lastTime: number = 0
  private isRunning: boolean = false

  start(): void {
    if (this.isRunning) return

    this.isRunning = true
    this.lastTime = performance.now()
    this.tick()
  }

  stop(): void {
    this.isRunning = false
  }

  getCurrentFPS(): number {
    return Math.round(this.fps)
  }

  private tick = (): void => {
    if (!this.isRunning) return

    const now = performance.now()
    this.frames++

    if (now >= this.lastTime + 1000) {
      this.fps = (this.frames * 1000) / (now - this.lastTime)
      this.frames = 0
      this.lastTime = now
    }

    requestAnimationFrame(this.tick)
  }
}
