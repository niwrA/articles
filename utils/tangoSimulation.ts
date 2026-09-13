export type DancerId = 'a' | 'b'
export type Foot = 'left' | 'right'
export type MovementId = 'side-step' | 'outside-walk' | 'forward-ocho' | 'giro-entry'
export type Point = { x: number; y: number }
export type FootState = Point & { angle: number; load: number }
export type DancerState = {
  torso: Point
  angle: number
  left: FootState
  right: FootState
}
export type Contact = { type: 'hand' | 'arm' | 'torso'; a: Point; b: Point; active: number }
export type TangoFrame = {
  a: DancerState
  b: DancerState
  contacts: Contact[]
  phase: 'available' | 'proposal' | 'transfer' | 'arrival'
  progress: number
}

type Keyframe = Omit<TangoFrame, 'progress'> & { at: number }
export type Movement = {
  id: MovementId
  nameNl: string
  nameEn: string
  initiator: DancerId | 'shared'
  keyframes: Keyframe[]
  next: MovementId[]
}

const foot = (x: number, y: number, angle: number, load: number): FootState => ({ x, y, angle, load })
const dancer = (x: number, y: number, angle: number, left: FootState, right: FootState): DancerState => ({ torso: { x, y }, angle, left, right })
const contacts = (aY: number, bY: number, openness = 1): Contact[] => [
  { type: 'hand', a: { x: 338, y: aY - 42 }, b: { x: 462, y: bY - 42 }, active: openness },
  { type: 'arm', a: { x: 342, y: aY + 34 }, b: { x: 458, y: bY + 34 }, active: openness * .85 },
  { type: 'torso', a: { x: 353, y: aY }, b: { x: 447, y: bY }, active: openness * .45 }
]

const neutralA = dancer(330, 250, 0, foot(310, 232, 0, .5), foot(310, 268, 0, .5))
const neutralB = dancer(470, 250, 180, foot(490, 268, 180, .5), foot(490, 232, 180, .5))

export const tangoMovements: Movement[] = [
  {
    id: 'side-step', nameNl: 'Zijstap', nameEn: 'Side step', initiator: 'a', next: ['outside-walk', 'forward-ocho'],
    keyframes: [
      { at: 0, phase: 'available', a: neutralA, b: neutralB, contacts: contacts(250, 250) },
      { at: .25, phase: 'proposal', a: dancer(330, 244, -4, foot(310, 224, -5, .15), foot(310, 267, 0, .85)), b: dancer(470, 247, 176, foot(490, 269, 180, .85), foot(490, 228, 176, .15)), contacts: contacts(244, 247) },
      { at: .62, phase: 'transfer', a: dancer(330, 210, 0, foot(310, 176, 0, .55), foot(310, 267, 0, .45)), b: dancer(470, 210, 180, foot(490, 268, 180, .45), foot(490, 175, 180, .55)), contacts: contacts(210, 210) },
      { at: 1, phase: 'arrival', a: dancer(330, 170, 0, foot(310, 160, 0, 1), foot(310, 204, 0, 0)), b: dancer(470, 170, 180, foot(490, 204, 180, 0), foot(490, 160, 180, 1)), contacts: contacts(170, 170) }
    ]
  },
  {
    id: 'outside-walk', nameNl: 'Buitenom lopen', nameEn: 'Outside walk', initiator: 'a', next: ['side-step', 'giro-entry'],
    keyframes: [
      { at: 0, phase: 'available', a: neutralA, b: neutralB, contacts: contacts(250, 250) },
      { at: .25, phase: 'proposal', a: dancer(338, 248, -3, foot(310, 232, 0, .85), foot(322, 272, 0, .15)), b: dancer(478, 248, 177, foot(490, 268, 180, .15), foot(490, 232, 180, .85)), contacts: contacts(248, 248, .95) },
      { at: .62, phase: 'transfer', a: dancer(382, 244, 0, foot(310, 232, 0, .35), foot(405, 273, 0, .65)), b: dancer(520, 244, 180, foot(548, 268, 180, .65), foot(490, 232, 180, .35)), contacts: [{ type: 'hand', a: { x: 391, y: 203 }, b: { x: 511, y: 203 }, active: 1 }, { type: 'arm', a: { x: 395, y: 278 }, b: { x: 507, y: 278 }, active: .8 }] },
      { at: 1, phase: 'arrival', a: dancer(420, 242, 0, foot(397, 228, 0, 0), foot(405, 273, 0, 1)), b: dancer(558, 242, 180, foot(548, 268, 180, 1), foot(578, 226, 180, 0)), contacts: [{ type: 'hand', a: { x: 429, y: 201 }, b: { x: 549, y: 201 }, active: 1 }, { type: 'arm', a: { x: 433, y: 276 }, b: { x: 545, y: 276 }, active: .8 }] }
    ]
  },
  {
    id: 'forward-ocho', nameNl: 'Voorwaartse ocho', nameEn: 'Forward ocho', initiator: 'a', next: ['giro-entry', 'side-step'],
    keyframes: [
      { at: 0, phase: 'available', a: neutralA, b: neutralB, contacts: contacts(250, 250) },
      { at: .25, phase: 'proposal', a: dancer(330, 250, -12, foot(310, 232, 0, .2), foot(310, 268, 0, .8)), b: dancer(470, 250, 160, foot(490, 268, 175, .9), foot(490, 232, 150, .1)), contacts: contacts(250, 250, .9) },
      { at: .58, phase: 'transfer', a: dancer(330, 250, -18, foot(310, 232, 0, .35), foot(310, 268, 0, .65)), b: dancer(438, 210, 130, foot(490, 268, 170, .35), foot(420, 188, 130, .65)), contacts: [{ type: 'hand', a: { x: 328, y: 207 }, b: { x: 441, y: 172 }, active: .9 }, { type: 'arm', a: { x: 350, y: 282 }, b: { x: 463, y: 238 }, active: .7 }] },
      { at: 1, phase: 'arrival', a: dancer(330, 250, -8, foot(310, 232, 0, .5), foot(310, 268, 0, .5)), b: dancer(405, 185, 112, foot(430, 214, 112, 0), foot(390, 158, 112, 1)), contacts: [{ type: 'hand', a: { x: 323, y: 207 }, b: { x: 408, y: 145 }, active: .85 }, { type: 'arm', a: { x: 350, y: 282 }, b: { x: 431, y: 211 }, active: .65 }] }
    ]
  },
  {
    id: 'giro-entry', nameNl: 'Ingang van een giro', nameEn: 'Giro entry', initiator: 'b', next: ['forward-ocho', 'side-step'],
    keyframes: [
      { at: 0, phase: 'available', a: neutralA, b: neutralB, contacts: contacts(250, 250) },
      { at: .2, phase: 'proposal', a: dancer(330, 250, 8, foot(310, 232, 0, .65), foot(310, 268, 0, .35)), b: dancer(470, 250, 192, foot(490, 268, 180, .8), foot(490, 232, 195, .2)), contacts: contacts(250, 250, .9) },
      { at: .58, phase: 'transfer', a: dancer(335, 250, 32, foot(310, 232, 15, .8), foot(324, 276, 20, .2)), b: dancer(430, 320, 245, foot(490, 268, 205, .25), foot(405, 338, 245, .75)), contacts: [{ type: 'hand', a: { x: 355, y: 214 }, b: { x: 444, y: 281 }, active: .9 }, { type: 'arm', a: { x: 350, y: 286 }, b: { x: 406, y: 337 }, active: .55 }] },
      { at: 1, phase: 'arrival', a: dancer(340, 255, 58, foot(315, 236, 45, 1), foot(345, 286, 55, 0)), b: dancer(360, 365, 280, foot(390, 338, 265, 0), foot(342, 388, 280, 1)), contacts: [{ type: 'hand', a: { x: 372, y: 226 }, b: { x: 387, y: 333 }, active: .8 }, { type: 'arm', a: { x: 345, y: 292 }, b: { x: 334, y: 372 }, active: .4 }] }
    ]
  }
]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const pointLerp = (a: Point, b: Point, t: number): Point => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) })
const footLerp = (a: FootState, b: FootState, t: number): FootState => ({ ...pointLerp(a, b, t), angle: lerp(a.angle, b.angle, t), load: lerp(a.load, b.load, t) })
const dancerLerp = (a: DancerState, b: DancerState, t: number): DancerState => ({ torso: pointLerp(a.torso, b.torso, t), angle: lerp(a.angle, b.angle, t), left: footLerp(a.left, b.left, t), right: footLerp(a.right, b.right, t) })

export function frameAt(movement: Movement, progress: number): TangoFrame {
  const p = Math.min(1, Math.max(0, progress))
  const upperIndex = Math.max(1, movement.keyframes.findIndex(frame => frame.at >= p))
  const from = movement.keyframes[upperIndex - 1]
  const to = movement.keyframes[upperIndex] || movement.keyframes.at(-1)!
  const local = from === to ? 0 : (p - from.at) / Math.max(.0001, to.at - from.at)
  const contactCount = Math.min(from.contacts.length, to.contacts.length)
  return {
    a: dancerLerp(from.a, to.a, local), b: dancerLerp(from.b, to.b, local),
    contacts: Array.from({ length: contactCount }, (_, index) => ({ type: from.contacts[index].type, a: pointLerp(from.contacts[index].a, to.contacts[index].a, local), b: pointLerp(from.contacts[index].b, to.contacts[index].b, local), active: lerp(from.contacts[index].active, to.contacts[index].active, local) })),
    phase: local < .5 ? from.phase : to.phase, progress: p
  }
}

export const centreOfMass = (dancerState: DancerState): Point => ({
  x: dancerState.torso.x * .78 + dancerState.left.x * .11 + dancerState.right.x * .11,
  y: dancerState.torso.y * .78 + dancerState.left.y * .11 + dancerState.right.y * .11
})

export const sharedCentre = (frame: TangoFrame): Point => {
  const a = centreOfMass(frame.a), b = centreOfMass(frame.b)
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}
