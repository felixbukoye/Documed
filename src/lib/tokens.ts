/**
 * Chart-specific color constants, derived from the design-system tokens.
 * Kept as plain hex values so Recharts / inline SVG can use them directly.
 */
export const chart = {
  primary: '#2F5AF0',
  primarySoft: '#C3D0FC',
  success: '#16A34A',
  successSoft: '#A7F3D0',
  warning: '#D97706',
  danger: '#DC2626',
  accent: '#8B5CF6',
  grid: '#EEF2F7',
  axis: '#94A3B8',
  tooltipBg: '#0F172A',
  tooltipFg: '#F8FAFC',
} as const

/** Per-metric sparkline colors (metric-specific, not semantic — PRD §6.11). */
export const sparkColor = {
  glucose: '#F43F5E',
  hgb: '#8B5CF6',
  ketone: '#3B82F6',
  crp: '#10B981',
  bp: '#EF4444',
  default: '#2F5AF0',
} as const
