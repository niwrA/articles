export type AnalyticsData = Record<string, string | number | boolean>

export function trackAnalytics(name: string, data: AnalyticsData = {}) {
  if (!import.meta.client) return
  const analyticsWindow = window as typeof window & {
    umami?: { track: (event: string, data?: AnalyticsData) => void }
  }
  analyticsWindow.umami?.track(name, data)
}
