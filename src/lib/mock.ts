/**
 * Mock data layer for the DocuMed dashboard.
 * In production these would come from the EMR API; here they are static so the
 * dashboard is fully interactive and the visual/behavioral contract can be
 * validated against the PRD without a backend.
 */

export type VisitType =
  | 'Routine Checkup'
  | 'Follow-up'
  | 'Cardiology Consult'
  | 'Cardiac Screening'
  | 'Post-op Review'
  | 'Hypertension Management'

export interface Patient {
  id: string
  name: string
  mrn: string
  dob: string
  age: number
  sex: 'Male' | 'Female'
  lastVisit: string
  type: VisitType
  condition?: string
}

export interface Appointment {
  id: string
  patientId: string
  name: string
  type: VisitType
  time: string // "10:30AM"
  minutes: number // for sorting
  room: string
  status: 'confirmed' | 'pending' | 'completed'
}

export interface StatCards {
  totalPatients: number
  patientsDeltaPct: number
  todayAppointments: number
  pendingAppointments: number
  pendingLabs: number
  urgentLabs: number
  activePrescriptions: number
  expiringPrescriptions: number
}

export interface TrendPoint {
  label: string
  value: number
}

export interface HealthTrend {
  headline: number
  deltaPct: number
  '7d': TrendPoint[]
  '30d': TrendPoint[]
  '90d': TrendPoint[]
}

export interface MonthlyPatientStat {
  month: string
  newPatients: number
  followUps: number
}

export type ReferenceFlag = 'in' | 'elevated' | 'high'

export interface TestResult {
  id: string
  name: string
  patient: string
  date: string
  value: string
  unit: string
  flag: ReferenceFlag
  spark: number[]
  color: string
}

export interface AppNotification {
  id: string
  title: string
  body: string
  time: Date
  type: 'urgent' | 'appointment' | 'lab' | 'system'
  read: boolean
  to: string
}

export const clinician = {
  id: 'dr-sarah-wilson',
  name: 'Dr. Sarah Wilson',
  role: 'Cardiologist',
  email: 'sarah.wilson@documed.health',
  initials: 'SW',
}

export const kpiStats: StatCards = {
  totalPatients: 1248,
  patientsDeltaPct: 12,
  todayAppointments: 500,
  pendingAppointments: 3,
  pendingLabs: 389,
  urgentLabs: 2,
  activePrescriptions: 156,
  expiringPrescriptions: 12,
}

export const patients: Patient[] = [
  { id: 'p1', name: 'Jacob Jones', mrn: 'MRN-04821', dob: '1968-03-14', age: 58, sex: 'Male', lastVisit: '2024-04-04', type: 'Routine Checkup', condition: 'Hypertension' },
  { id: 'p2', name: 'Arlene McCoy', mrn: 'MRN-11290', dob: '1975-11-02', age: 48, sex: 'Female', lastVisit: '2024-04-04', type: 'Follow-up', condition: 'Atrial Fibrillation' },
  { id: 'p3', name: 'Kristin Watson', mrn: 'MRN-07714', dob: '1981-07-22', age: 43, sex: 'Female', lastVisit: '2024-04-03', type: 'Cardiac Screening' },
  { id: 'p4', name: 'Brooklyn Simmons', mrn: 'MRN-20455', dob: '1990-01-09', age: 34, sex: 'Female', lastVisit: '2024-04-02', type: 'Routine Checkup', condition: 'Asthma' },
  { id: 'p5', name: 'Ralph Edwards', mrn: 'MRN-03309', dob: '1958-09-30', age: 65, sex: 'Male', lastVisit: '2024-04-02', type: 'Post-op Review', condition: 'Coronary Artery Disease' },
  { id: 'p6', name: 'Theresa Webb', mrn: 'MRN-15066', dob: '1986-05-17', age: 38, sex: 'Female', lastVisit: '2024-04-01', type: 'Hypertension Management' },
  { id: 'p7', name: 'Marcus Bell', mrn: 'MRN-09921', dob: '1972-12-05', age: 51, sex: 'Male', lastVisit: '2024-03-30', type: 'Cardiology Consult', condition: 'Arrhythmia' },
  { id: 'p8', name: 'Priya Nair', mrn: 'MRN-18842', dob: '1993-08-28', age: 30, sex: 'Female', lastVisit: '2024-03-29', type: 'Routine Checkup' },
  { id: 'p9', name: 'David Okafor', mrn: 'MRN-06654', dob: '1964-02-11', age: 60, sex: 'Male', lastVisit: '2024-03-28', type: 'Follow-up', condition: 'Heart Failure' },
  { id: 'p10', name: 'Elena Rossi', mrn: 'MRN-13378', dob: '1979-06-03', age: 44, sex: 'Female', lastVisit: '2024-03-27', type: 'Cardiac Screening', condition: 'Hyperlipidemia' },
  { id: 'p11', name: 'Hassan Malik', mrn: 'MRN-02218', dob: '1988-10-19', age: 35, sex: 'Male', lastVisit: '2024-03-26', type: 'Routine Checkup' },
  { id: 'p12', name: 'Grace Adeyemi', mrn: 'MRN-16602', dob: '1970-04-25', age: 54, sex: 'Female', lastVisit: '2024-03-25', type: 'Hypertension Management', condition: 'Hypertension' },
]

export const appointments: Appointment[] = [
  { id: 'a1', patientId: 'p4', name: 'Brooklyn Simmons', type: 'Routine Checkup', time: '10:30AM', minutes: 630, room: 'Room 205', status: 'confirmed' },
  { id: 'a2', patientId: 'p5', name: 'Ralph Edwards', type: 'Routine Checkup', time: '10:30AM', minutes: 630, room: 'Room 205', status: 'pending' },
  { id: 'a3', patientId: 'p6', name: 'Theresa Webb', type: 'Routine Checkup', time: '10:30AM', minutes: 630, room: 'Room 205', status: 'confirmed' },
  { id: 'a4', patientId: 'p1', name: 'Jacob Jones', type: 'Hypertension Management', time: '11:15AM', minutes: 675, room: 'Room 210', status: 'confirmed' },
  { id: 'a5', patientId: 'p7', name: 'Marcus Bell', type: 'Arrhythmia Follow-up' as unknown as VisitType, time: '12:00PM', minutes: 720, room: 'Cath Lab B', status: 'pending' },
  { id: 'a6', patientId: 'p9', name: 'David Okafor', type: 'Heart Failure Review' as unknown as VisitType, time: '1:30PM', minutes: 780, room: 'Room 212', status: 'confirmed' },
]

const healthWeek: TrendPoint[] = [
  { label: 'Mon', value: 81.2 },
  { label: 'Tue', value: 82.5 },
  { label: 'Wed', value: 81.8 },
  { label: 'Thu', value: 83.4 },
  { label: 'Fri', value: 84.1 },
  { label: 'Sat', value: 84.6 },
  { label: 'Sun', value: 85.0 },
]

function genSeries(n: number, start: number, end: number, wobble: number, prefix: string): TrendPoint[] {
  const out: TrendPoint[] = []
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    const base = start + (end - start) * t
    const noise = Math.sin(i * 1.7) * wobble
    out.push({ label: `${prefix}${i + 1}`, value: +(base + noise).toFixed(1) })
  }
  return out
}

export const healthTrend: HealthTrend = {
  headline: 85,
  deltaPct: 0.75,
  '7d': healthWeek,
  '30d': genSeries(30, 79, 85, 1.4, 'D'),
  '90d': genSeries(90, 74, 85, 2.2, 'D'),
}

export const patientStats: MonthlyPatientStat[] = [
  { month: 'Jan', newPatients: 40, followUps: 78 },
  { month: 'Feb', newPatients: 55, followUps: 96 },
  { month: 'Mar', newPatients: 34, followUps: 70 },
  { month: 'Apr', newPatients: 105, followUps: 148 },
  { month: 'May', newPatients: 58, followUps: 92 },
  { month: 'Jun', newPatients: 66, followUps: 108 },
]

export const testResults: TestResult[] = [
  {
    id: 't1',
    name: 'Glucose',
    patient: 'Jacob Jones',
    date: '04/03/24',
    value: '111',
    unit: 'mg/dL',
    flag: 'elevated',
    spark: [96, 101, 98, 104, 108, 102, 110, 114, 109, 111],
    color: '#F43F5E',
  },
  {
    id: 't2',
    name: 'Glycosylated HGB',
    patient: 'Arlene McCoy',
    date: '04/04/24',
    value: '7.2',
    unit: '%',
    flag: 'elevated',
    spark: [5.8, 6.0, 6.1, 6.4, 6.6, 6.9, 7.0, 7.1, 7.0, 7.2],
    color: '#8B5CF6',
  },
  {
    id: 't3',
    name: 'Ketone Bodies',
    patient: 'Kristin Watson',
    date: '04/05/24',
    value: '12',
    unit: 'mg/dL',
    flag: 'in',
    spark: [4, 6, 5, 8, 7, 9, 10, 8, 11, 12],
    color: '#3B82F6',
  },
  {
    id: 't4',
    name: 'C-reactive protein',
    patient: 'Brooklyn Simmons',
    date: '06/03/24',
    value: '0.1',
    unit: 'mg/L',
    flag: 'in',
    spark: [0.3, 0.25, 0.4, 0.2, 0.15, 0.3, 0.2, 0.18, 0.14, 0.1],
    color: '#10B981',
  },
  {
    id: 't5',
    name: 'Blood Pressure',
    patient: 'David Okafor',
    date: '04/02/24',
    value: '140/87',
    unit: 'mmHg',
    flag: 'high',
    spark: [122, 128, 131, 135, 138, 133, 139, 142, 145, 140],
    color: '#EF4444',
  },
  {
    id: 't6',
    name: 'LDL Cholesterol',
    patient: 'Elena Rossi',
    date: '04/01/24',
    value: '98',
    unit: 'mg/dL',
    flag: 'in',
    spark: [140, 132, 128, 120, 114, 110, 104, 101, 100, 98],
    color: '#2F5AF0',
  },
]

export interface Prescription {
  id: string
  patientId: string
  patient: string
  medication: string
  dose: string
  frequency: string
  started: string
  refills: number
  status: 'active' | 'expiring'
  expires: string
}

export const prescriptions: Prescription[] = [
  { id: 'r1', patientId: 'p1', patient: 'Jacob Jones', medication: 'Lisinopril', dose: '10 mg', frequency: '1x / day', started: '02/11/24', refills: 3, status: 'active', expires: '06/11/24' },
  { id: 'r2', patientId: 'p5', patient: 'Ralph Edwards', medication: 'Atorvastatin', dose: '40 mg', frequency: '1x / day', started: '01/19/24', refills: 1, status: 'expiring', expires: '04/19/24' },
  { id: 'r3', patientId: 'p2', patient: 'Arlene McCoy', medication: 'Apixaban', dose: '5 mg', frequency: '2x / day', started: '03/02/24', refills: 4, status: 'active', expires: '05/02/24' },
  { id: 'r4', patientId: 'p9', patient: 'David Okafor', medication: 'Carvedilol', dose: '25 mg', frequency: '2x / day', started: '03/28/24', refills: 2, status: 'active', expires: '05/28/24' },
  { id: 'r5', patientId: 'p12', patient: 'Grace Adeyemi', medication: 'Metoprolol', dose: '50 mg', frequency: '2x / day', started: '02/25/24', refills: 1, status: 'expiring', expires: '04/25/24' },
  { id: 'r6', patientId: 'p10', patient: 'Elena Rossi', medication: 'Rosuvastatin', dose: '20 mg', frequency: '1x / day', started: '04/01/24', refills: 5, status: 'active', expires: '06/01/24' },
]

export function buildNotifications(): AppNotification[] {
  const now = Date.now()
  const min = 60 * 1000
  return [
    {
      id: 'n1',
      title: 'Urgent lab result',
      body: 'David Okafor — Blood Pressure 140/87 mmHg (High).',
      time: new Date(now - 18 * min),
      type: 'urgent',
      read: false,
      to: '/labs?filter=urgent',
    },
    {
      id: 'n2',
      title: 'Urgent lab result',
      body: 'Arlene McCoy — Glycosylated HGB 7.2% (Elevated).',
      time: new Date(now - 52 * min),
      type: 'urgent',
      read: false,
      to: '/labs?filter=urgent',
    },
    {
      id: 'n3',
      title: 'Appointment added',
      body: 'Marcus Bell — Arrhythmia follow-up at 12:00PM, Cath Lab B.',
      time: new Date(now - 3 * 60 * min),
      type: 'appointment',
      read: false,
      to: '/appointments',
    },
    {
      id: 'n4',
      title: 'New lab results ready',
      body: '3 new results for the morning panel are awaiting review.',
      time: new Date(now - 6 * 60 * min),
      type: 'lab',
      read: true,
      to: '/labs?filter=pending',
    },
    {
      id: 'n5',
      title: 'Prescription expiring',
      body: '12 active prescriptions expire within 14 days.',
      time: new Date(now - 26 * 60 * min),
      type: 'system',
      read: true,
      to: '/prescriptions',
    },
  ]
}
