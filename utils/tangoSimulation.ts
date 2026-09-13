export type DancerId='a'|'b'
export type MovementId='side-step'|'forward-step'|'cruce'|'forward-ocho'|'backward-ocho'|'giro'
export type Point={x:number;y:number}
export type FootState=Point&{angle:number;load:number}
export type DancerState={torso:Point;angle:number;left:FootState;right:FootState}
export type Contact={type:'hand'|'arm'|'torso';a:Point;b:Point;active:number}
export type Phase='available'|'proposal'|'projection'|'transfer'|'pivot'|'arrival'
export type Embrace='open'|'half-open'|'closed'
export type TangoFrame={a:DancerState;b:DancerState;contacts:Contact[];phase:Phase;noteNl:string;noteEn:string;progress:number}
type Keyframe=Omit<TangoFrame,'progress'>&{at:number}
export type SequenceCheckpoint={at:number;nameNl:string;nameEn:string;supportNl:string;supportEn:string;techniquesNl:string[];techniquesEn:string[];routesNl:string[];routesEn:string[]}
export type Movement={id:MovementId;nameNl:string;nameEn:string;initiator:DancerId|'shared';systemNl:string;systemEn:string;sequenceNl:string[];sequenceEn:string[];keyframes:Keyframe[];next:MovementId[];checkpoints?:SequenceCheckpoint[]}

const f=(x:number,y:number,angle:number,load:number):FootState=>({x,y,angle,load})
const d=(x:number,y:number,angle:number,left:FootState,right:FootState):DancerState=>({torso:{x,y},angle,left,right})
const cs=(a:DancerState,b:DancerState,n=1):Contact[]=>[
 {type:'hand',a:{x:a.torso.x+8,y:a.torso.y-42},b:{x:b.torso.x-8,y:b.torso.y-42},active:n},
 {type:'arm',a:{x:a.torso.x+12,y:a.torso.y+34},b:{x:b.torso.x-12,y:b.torso.y+34},active:n*.85},
 {type:'torso',a:{x:a.torso.x+23,y:a.torso.y},b:{x:b.torso.x-23,y:b.torso.y},active:n*.45}]
const k=(at:number,phase:Phase,nl:string,en:string,a:DancerState,b:DancerState,n=1):Keyframe=>({at,phase,noteNl:nl,noteEn:en,a,b,contacts:cs(a,b,n)})
const sideA=d(330,250,0,f(310,232,0,0),f(310,268,0,1)),sideB=d(470,250,180,f(490,268,180,1),f(490,232,180,0))
const walkA=d(330,250,0,f(310,232,0,1),f(310,268,0,0)),walkB=d(470,250,180,f(490,268,180,0),f(490,232,180,1))

export const tangoMovements:Movement[]=[
 {id:'side-step',nameNl:'Zijstap',nameEn:'Side step',initiator:'a',systemNl:'parallel systeem',systemEn:'parallel system',sequenceNl:['A geeft torso-impuls links','B projecteert als antwoord','A projecteert en stapt','gewicht volgt','rechterbeen sluit aan'],sequenceEn:['A gives a leftward torso impulse','B projects in response','A projects and steps','weight follows','right leg closes'],next:['forward-step','forward-ocho','cruce'],keyframes:[
  k(0,'available','De stapvoeten zijn vrij: A draagt rechts, B links.','The stepping feet are free: A is supported on the right, B on the left.',sideA,sideB),
  k(.14,'proposal','Initiatief A: alleen A’s bovenlijf geeft een impuls naar links; de stapvoet blijft staan.','A initiates: only A’s upper body gives a leftward impulse; the stepping foot remains in place.',d(330,238,0,f(310,232,0,0),f(310,268,0,1)),sideB),
  k(.32,'projection','B antwoordt door de rechtervoet zijwaarts te projecteren, terwijl A nog niet stapt.','B responds by projecting the right foot sideways while A has not yet stepped.',d(330,234,0,f(310,232,0,0),f(310,268,0,1)),d(470,246,180,f(490,268,180,1),f(490,188,180,0))),
  k(.44,'proposal','Beslismoment: zonder vervolgimpuls kan B de projectie intrekken — een mogelijke amague. A zet hier het voorstel door.','Decision point: without a continuing impulse B can retract the projection—a possible amague. Here A continues the proposal.',d(330,224,0,f(310,232,0,0),f(310,268,0,1)),d(470,238,180,f(490,268,180,1),f(490,166,180,0))),
  k(.6,'projection','Nu projecteert A zelf links. Beide vrije voeten blijven in de lichaamsrichting georiënteerd.','A now projects the left foot. Both free feet remain oriented with the body.',d(330,214,0,f(310,164,0,0),f(310,268,0,1)),d(470,218,180,f(490,268,180,1),f(490,160,180,0))),
  k(.74,'projection','Beide stapvoeten zijn geplaatst, maar de oorspronkelijke standbenen dragen nog.','Both stepping feet are placed, but the original supporting legs still carry the weight.',d(330,202,0,f(310,160,0,.08),f(310,268,0,.92)),d(470,202,180,f(490,268,180,.92),f(490,160,180,.08))),
  k(.9,'transfer','Pas nu brengen beide dansers bovenlijf en gewicht volledig naar de nieuwe standvoet.','Only now do both dancers bring upper body and weight fully onto the new supporting foot.',d(330,178,0,f(310,160,0,.82),f(310,220,0,.18)),d(470,178,180,f(490,220,180,.18),f(490,160,180,.82))),
  k(1,'arrival','A staat links en B rechts. Als laatste sluiten de vrije benen aan, met voeten en knieën bij elkaar.','A arrives on the left and B on the right. Finally, the free legs close, with feet and knees together.',d(330,170,0,f(310,160,0,1),f(310,176,0,0)),d(470,170,180,f(490,176,180,0),f(490,160,180,1)))]},
 {id:'forward-step',nameNl:'Voorwaartse stap',nameEn:'Forward step',initiator:'a',systemNl:'parallel systeem',systemEn:'parallel system',sequenceNl:['A beweegt vanuit de as','B projecteert achterwaarts','A projecteert voorwaarts','gewicht volgt','vrije benen sluiten aan'],sequenceEn:['A moves from the axis','B projects backwards','A projects forwards','weight follows','free legs collect'],next:['side-step','cruce','backward-ocho'],keyframes:[
  k(0,'available','A draagt links en kan rechts vooruit; B draagt rechts en kan links achteruit.','A is supported on the left and can step forward with the right; B is supported on the right and can step back with the left.',walkA,walkB),
  k(.18,'proposal','A brengt eerst het lichaamscentrum naar voren, zonder de stapvoet te verplaatsen.','A first brings the body centre forward without moving the stepping foot.',d(344,250,0,f(310,232,0,1),f(310,268,0,0)),d(482,250,180,f(510,268,180,0),f(490,232,180,1))),
  k(.4,'projection','B projecteert links achterwaarts; de tenen blijven in de lichaamsrichting wijzen.','B projects the left foot backwards; the toes remain aligned with the body.',d(350,250,0,f(310,232,0,1),f(310,268,0,0)),d(492,250,180,f(548,268,180,0),f(490,232,180,1))),
  k(.62,'projection','Pas daarna projecteert A rechts voorwaarts. Beide standbenen dragen nog.','Only then does A project the right foot forwards. Both support legs still carry weight.',d(364,250,0,f(310,232,0,1),f(405,268,0,0)),d(506,250,180,f(558,268,180,0),f(490,232,180,1))),
  k(.82,'transfer','Na plaatsing dragen beiden over, afgestemd op B’s werkelijke aankomst.','After placement, both transfer, coordinated with B’s actual arrival.',d(396,250,0,f(330,232,0,.28),f(407,268,0,.72)),d(538,250,180,f(558,268,180,.72),f(500,232,180,.28))),
  k(1,'arrival','Beiden komen aan op de stapvoet en sluiten daarna het vrije been aan. Vanuit deze basishouding is een nieuwe projectie mogelijk, maar nog niet ingezet.','Both arrive on the stepping foot and then collect the free leg. A new projection is available from this neutral position but has not yet begun.',d(420,250,0,f(407,252,0,0),f(407,268,0,1)),d(560,250,180,f(548,268,180,1),f(548,252,180,0)))]},
 {id:'cruce',nameNl:'Cruce',nameEn:'Cross',initiator:'a',systemNl:'gekruist systeem → kruising',systemEn:'crossed system → cross',sequenceNl:['gekruist systeem','achterwaartse projectie','baan versmalt','links kruist voor rechts'],sequenceEn:['crossed system','backward projection','path narrows','left crosses in front of right'],next:['forward-ocho','side-step','forward-step'],keyframes:[
  k(0,'available','Beiden dragen rechts: in het gekruiste systeem zijn de gelijknamige voeten vrij.','Both are supported on the right: in crossed system the same-named feet are free.',d(330,250,0,f(310,232,0,0),f(310,268,0,1)),d(470,250,180,f(490,268,180,0),f(490,232,180,1))),
  k(.2,'proposal','A beweegt vooruit en iets buitenom; voor B ontstaat een smallere achterwaartse baan.','A moves forwards and slightly outside, creating a narrower backward path for B.',d(345,238,-5,f(310,232,0,0),f(310,268,0,1)),d(484,246,178,f(500,265,180,0),f(490,232,180,1))),
  k(.46,'projection','B projecteert links achterwaarts, zonder de voet naar de reisrichting te draaien.','B projects the left foot backwards without turning it towards the direction of travel.',d(360,232,-6,f(390,220,-5,0),f(325,268,0,1)),d(502,244,178,f(542,252,178,0),f(490,232,180,1))),
  k(.66,'projection','De veranderde lijn plaatst B’s linkervoet vóór en iets over rechts; rechts draagt nog.','The changed line places B’s left foot in front of and slightly across the right; the right still supports.',d(378,230,-5,f(410,216,-5,.05),f(340,268,0,.95)),d(520,244,178,f(505,226,178,.05),f(520,258,180,.95))),
  k(.86,'transfer','B neemt gewicht op links. De kruising volgt uit traject en systeem, niet uit actief omwikkelen.','B accepts weight on the left. The cross follows from trajectory and system, not active wrapping.',d(400,232,0,f(420,216,0,.72),f(370,268,0,.28)),d(528,244,180,f(512,226,180,.78),f(528,260,180,.22))),
  k(1,'arrival','B staat gekruist op links en kan wachten, ontkruisen of een ocho aannemen.','B is crossed on the left and can wait, uncross or accept an ocho.',d(412,236,0,f(420,216,0,1),f(390,268,0,0)),d(530,244,180,f(512,226,180,1),f(528,260,180,0)))]},
 {id:'forward-ocho',nameNl:'Voorwaartse ocho',nameEn:'Forward ocho',initiator:'a',systemNl:'zijstap + verborgen gewichtswissel bij A',systemEn:'side step + hidden weight change by A',sequenceNl:['A wisselt verborgen','B pivoteert op rechts','B projecteert links vooruit','B bepaalt overdracht'],sequenceEn:['A changes weight unseen','B pivots on right','B projects left forwards','B determines transfer'],next:['backward-ocho','giro','side-step'],keyframes:[
  k(0,'available','Na de zijstap draagt A links en B rechts.','After the side step, A is supported on the left and B on the right.',d(330,250,0,f(310,232,0,1),f(310,268,0,0)),d(470,250,180,f(490,268,180,0),f(490,232,180,1))),
  k(.2,'transfer','A wisselt verborgen naar rechts; B blijft op rechts.','A changes weight unseen to the right; B remains on the right.',d(330,250,-5,f(310,232,0,.05),f(310,268,0,.95)),d(470,250,170,f(490,268,175,0),f(490,232,170,1))),
  k(.4,'pivot','A opent de torso; B pivoteert eerst op het standbeen.','A opens through the torso; B first pivots on the supporting foot.',d(320,250,-12,f(310,232,-8,0),f(310,268,-10,1)),d(458,238,145,f(480,260,145,0),f(485,228,145,1))),
  k(.62,'projection','B projecteert links vooruit; A projecteert links achteruit om parallel te blijven.','B projects the left forward; A projects the left backwards to remain parallel.',d(292,252,-15,f(248,236,-15,0),f(310,268,-10,1)),d(430,215,138,f(392,180,138,0),f(475,230,145,1))),
  k(.82,'transfer','B bepaalt tempo en stapgrootte; A volgt die overdracht.','B determines timing and step size; A follows that transfer.',d(270,251,-14,f(240,232,-14,.7),f(298,268,-9,.3)),d(407,194,128,f(378,163,128,.7),f(452,221,145,.3))),
  k(1,'arrival','Beiden komen parallel aan; de vrije voeten laten vervolg of pauze toe.','They arrive in parallel; the free feet permit continuation or pause.',d(258,250,-12,f(240,232,-12,1),f(280,268,-8,0)),d(398,185,120,f(378,163,120,1),f(420,212,145,0)))]},
 {id:'backward-ocho',nameNl:'Achterwaartse ocho',nameEn:'Backward ocho',initiator:'a',systemNl:'gekruist systeem',systemEn:'crossed system',sequenceNl:['A opent rotatie','B pivoteert op links','B projecteert rechts achteruit','gewicht volgt'],sequenceEn:['A opens rotation','B pivots on left','B projects right backwards','weight follows'],next:['forward-ocho','giro','side-step'],keyframes:[
  k(0,'available','B draagt links; rechts is vrij voor de achterwaartse projectie.','B is supported on the left; the right is free for backward projection.',d(330,250,0,f(310,232,0,0),f(310,268,0,1)),d(470,250,180,f(490,268,180,1),f(490,232,180,0))),
  k(.28,'pivot','A opent de torso; B pivoteert op links terwijl rechts bij de as blijft.','A opens the torso; B pivots on the left while the right remains by the axis.',d(325,250,12,f(310,232,8,0),f(310,268,10,1)),d(462,252,215,f(482,270,215,1),f(495,238,215,0))),
  k(.56,'projection','B projecteert rechts achterwaarts; de voet blijft in de lichaamsrichting georiënteerd.','B projects the right backwards; the foot remains oriented with the body.',d(310,250,18,f(310,232,15,0),f(300,268,16,1)),d(445,270,222,f(475,278,220,1),f(395,318,222,0))),
  k(.74,'projection','De voet is geplaatst en de pivot afgerond, maar links draagt nog.','The foot is placed and the pivot completed, but the left still supports.',d(300,252,20,f(310,232,18,0),f(292,270,18,1)),d(425,288,225,f(458,282,225,.92),f(382,330,225,.08))),
  k(.9,'transfer','B draagt naar rechts over; A volgt B’s werkelijke timing.','B transfers to the right; A follows B’s actual timing.',d(286,255,22,f(300,236,20,.65),f(278,274,20,.35)),d(402,310,228,f(438,292,228,.3),f(374,338,228,.7))),
  k(1,'arrival','B arriveert op rechts met links weer vrij.','B arrives on the right with the left free again.',d(278,256,24,f(292,238,22,1),f(268,276,22,0)),d(388,324,230,f(418,304,230,0),f(370,340,230,1)))]},
 {id:'giro',nameNl:'Volledige giro',nameEn:'Complete giro',initiator:'a',systemNl:'cyclische molinete rond A',systemEn:'cyclic molinete around A',sequenceNl:['voorwaarts','zijwaarts','achterwaarts','zijwaarts'],sequenceEn:['forward','sideways','backward','sideways'],next:['forward-ocho','backward-ocho','side-step'],checkpoints:[
  {at:0,nameNl:'Beginpositie',nameEn:'Starting position',supportNl:'B staat op rechts; links is vrij.',supportEn:'B is supported on the right; the left is free.',techniquesNl:['Pivot op rechts','Linkervoet voorwaarts projecteren','Pauzeren zonder projectie'],techniquesEn:['Pivot on the right','Project the left foot forwards','Pause without projecting'],routesNl:['Voorwaartse stap in de molinete','Voorwaartse ocho','Een nieuw voorstel vanuit stilstand'],routesEn:['Forward step in the molinete','Forward ocho','A new proposal from stillness']},
  {at:.2,nameNl:'Voorwaarts voltooid',nameEn:'Forward completed',supportNl:'B staat op links; rechts is vrij.',supportEn:'B is supported on the left; the right is free.',techniquesNl:['Rechts zijwaarts projecteren','Pivot en richting herijken','Vrije voet verzamelen of versieren'],techniquesEn:['Project the right foot sideways','Pivot and redirect','Collect or embellish the free foot'],routesNl:['Zijstap in de molinete','Losse zijstap','Pauze of verandering van richting'],routesEn:['Side step in the molinete','Independent side step','Pause or change of direction']},
  {at:.42,nameNl:'Eerste zijstap voltooid',nameEn:'First side step completed',supportNl:'B staat op rechts; links is vrij.',supportEn:'B is supported on the right; the left is free.',techniquesNl:['Pivot op rechts','Links achterwaarts projecteren','Rotatie verkleinen of stoppen'],techniquesEn:['Pivot on the right','Project the left foot backwards','Reduce or stop the rotation'],routesNl:['Achterwaartse stap in de molinete','Achterwaartse ocho','Pauze of nieuw voorstel'],routesEn:['Backward step in the molinete','Backward ocho','Pause or new proposal']},
  {at:.66,nameNl:'Achterwaarts voltooid',nameEn:'Backward completed',supportNl:'B staat op links; rechts is vrij.',supportEn:'B is supported on the left; the right is free.',techniquesNl:['Rechts zijwaarts projecteren','Draairichting behouden of verlaten','Vrije voet verzamelen'],techniquesEn:['Project the right foot sideways','Maintain or leave the turn','Collect the free foot'],routesNl:['Laatste zijstap van deze giro','Losse zijstap','Pauze of andere looprichting'],routesEn:['Final side step of this giro','Independent side step','Pause or another walking direction']},
  {at:1,nameNl:'Tweede zijstap voltooid',nameEn:'Second side step completed',supportNl:'B staat op rechts; links is opnieuw vrij.',supportEn:'B is supported on the right; the left is free again.',techniquesNl:['Nieuwe pivot voorbereiden','Verbinding en oriëntatie herijken','Pauzeren op de nieuwe as'],techniquesEn:['Prepare a new pivot','Reorient the connection','Pause on the new axis'],routesNl:['Nieuwe cyclus vanaf voorwaarts','Voorwaartse of achterwaartse ocho','Zijstap, wandeling of pauze'],routesEn:['New cycle starting forwards','Forward or backward ocho','Side step, walk or pause']}
 ],keyframes:[
  k(0,'available','A vormt het centrum; B draagt rechts en heeft links vrij.','A forms the centre; B is supported on the right with the left free.',walkA,walkB),
  k(.07,'proposal','A begint: een rotatie van het bovenlijf biedt B de voorwaartse richting aan; beide voeten blijven nog staan.','A begins: rotation of the upper body offers B the forward direction; both dancers keep their feet in place.',d(330,250,12,f(310,232,8,1),f(318,270,12,0)),walkB),
  k(.12,'projection','B antwoordt met een pivot op rechts en projecteert links voorwaarts langs de cirkel.','B responds by pivoting on the right and projecting the left forwards along the circle.',d(330,250,18,f(310,232,12,1),f(320,271,18,0)),d(438,208,225,f(402,175,225,0),f(472,232,215,1))),
  k(.2,'transfer','B brengt het gewicht naar de voorwaartse linkervoet.','B transfers weight to the forward left foot.',d(330,250,28,f(310,232,20,.9),f(326,273,28,.1)),d(402,184,250,f(382,160,250,1),f(438,210,225,0))),
  k(.32,'projection','Vanuit links projecteert B rechts zijwaarts.','From the left support, B projects the right sideways.',d(330,250,48,f(310,232,35,.82),f(338,276,48,.18)),d(350,170,278,f(382,160,270,1),f(315,155,278,0))),
  k(.42,'transfer','B draagt over naar de zijwaarts geplaatste rechtervoet.','B transfers to the side-placed right foot.',d(330,250,68,f(310,232,50,.65),f(348,270,68,.35)),d(302,180,305,f(354,165,285,0),f(278,172,305,1))),
  k(.55,'projection','B pivoteert op rechts en projecteert links achterwaarts, met de tenen in de lichaamsrichting.','B pivots on the right and projects the left backwards, toes aligned with the body.',d(330,250,95,f(310,232,75,.45),f(350,258,95,.55)),d(266,224,345,f(218,240,345,0),f(280,190,330,1))),
  k(.66,'transfer','Na plaatsing neemt links het gewicht over.','After placement, the left receives the weight.',d(330,250,118,f(310,232,105,.25),f(347,246,118,.75)),d(250,270,12,f(222,286,12,1),f(270,226,350,0))),
  k(.78,'projection','B projecteert rechts zijwaarts voor het laatste deel van de molinete.','B projects the right sideways for the final part of the molinete.',d(330,250,142,f(310,232,135,.12),f(338,238,142,.88)),d(278,326,42,f(240,290,25,1),f(302,350,42,0))),
  k(.9,'transfer','B voltooit de overdracht naar rechts; A stemt de eigen draai af op B’s timing.','B completes the transfer to the right; A coordinates the turn with B’s timing.',d(330,250,165,f(310,232,160,.05),f(322,232,165,.95)),d(326,346,72,f(278,326,55,0),f(342,360,72,1))),
  k(1,'arrival','De tweede zijstap is voltooid. Links is opnieuw vrij: de cyclus kan doorgaan, afbuigen of stoppen.','The second side step is complete. The left is free again: the cycle can continue, branch or stop.',d(330,250,180,f(310,232,180,0),f(310,268,180,1)),d(380,330,92,f(350,344,90,0),f(400,322,92,1)))]}
]

const lerp=(a:number,b:number,t:number)=>a+(b-a)*t
const angleLerp=(a:number,b:number,t:number)=>a+(((b-a+540)%360)-180)*t
const pointLerp=(a:Point,b:Point,t:number):Point=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t)})
const footLerp=(a:FootState,b:FootState,t:number):FootState=>({...pointLerp(a,b,t),angle:angleLerp(a.angle,b.angle,t),load:lerp(a.load,b.load,t)})
const dancerLerp=(a:DancerState,b:DancerState,t:number):DancerState=>({torso:pointLerp(a.torso,b.torso,t),angle:angleLerp(a.angle,b.angle,t),left:footLerp(a.left,b.left,t),right:footLerp(a.right,b.right,t)})
export function frameAt(movement:Movement,progress:number):TangoFrame{const p=Math.max(0,Math.min(1,progress)),found=movement.keyframes.findIndex(x=>x.at>=p);if(found===0)return{...movement.keyframes[0],progress:p};const hi=found<0?movement.keyframes.length-1:Math.max(1,found),from=movement.keyframes[hi-1],to=movement.keyframes[hi],local=(p-from.at)/Math.max(.0001,to.at-from.at),nearer=local<.5?from:to;return{a:dancerLerp(from.a,to.a,local),b:dancerLerp(from.b,to.b,local),contacts:from.contacts.slice(0,Math.min(from.contacts.length,to.contacts.length)).map((c,i)=>({type:c.type,a:pointLerp(c.a,to.contacts[i].a,local),b:pointLerp(c.b,to.contacts[i].b,local),active:lerp(c.active,to.contacts[i].active,local)})),phase:nearer.phase,noteNl:nearer.noteNl,noteEn:nearer.noteEn,progress:p}}
export const centreOfMass=(x:DancerState):Point=>({x:x.torso.x*.78+x.left.x*.11+x.right.x*.11,y:x.torso.y*.78+x.left.y*.11+x.right.y*.11})
export const sharedCentre=(x:TangoFrame):Point=>{const a=centreOfMass(x.a),b=centreOfMass(x.b);return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}}

const direction=(from:Point,to:Point)=>Math.atan2(to.y-from.y,to.x-from.x)*180/Math.PI
const bodyPoint=(x:DancerState,forward:number,side:number):Point=>{
  const radians=x.angle*Math.PI/180
  return{x:x.torso.x+Math.cos(radians)*forward-Math.sin(radians)*side,y:x.torso.y+Math.sin(radians)*forward+Math.cos(radians)*side}
}
const moveDancer=(x:DancerState,dx:number,dy:number,shoulderAngle:number):DancerState=>({
  torso:{x:x.torso.x+dx,y:x.torso.y+dy},angle:shoulderAngle,
  left:{...x.left,x:x.left.x+dx,y:x.left.y+dy},right:{...x.right,x:x.right.x+dx,y:x.right.y+dy}
})

/** Presentation transform: the authored footwork remains unchanged while distance,
 * upper-body orientation and contact adapt to the selected abrazo. */
export function withEmbrace(frame:TangoFrame,embrace:Embrace,movementId:MovementId):TangoFrame{
  const midpoint={x:(frame.a.torso.x+frame.b.torso.x)/2,y:(frame.a.torso.y+frame.b.torso.y)/2}
  const distanceFactor={open:1.18,'half-open':.76,closed:.58}[embrace]
  const shoulderFollow={open:.24,'half-open':.68,closed:.94}[embrace]
  const adapt=(x:DancerState,other:DancerState,id:DancerId)=>{
    const baseTarget={x:midpoint.x+(x.torso.x-midpoint.x)*distanceFactor,y:midpoint.y+(x.torso.y-midpoint.y)*distanceFactor}
    const facing=direction(baseTarget,other.torso)
    // In half-open embrace both dancers shift slightly towards their own left.
    // This brings their right torso sides together while preserving space left.
    const lateral=embrace==='half-open'?20:0
    const radians=facing*Math.PI/180
    const target={x:baseTarget.x+Math.sin(radians)*lateral,y:baseTarget.y-Math.cos(radians)*lateral}
    const ochoExtra=(movementId==='forward-ocho'||movementId==='backward-ocho')&&embrace==='open'?.08:0
    // In a half-open embrace both chests turn slightly in the same stage
    // direction: their right side meets while the left side remains open.
    const halfOpenOffset=embrace==='half-open'?(id==='a'?10:-10):0
    return moveDancer(x,target.x-x.torso.x,target.y-x.torso.y,angleLerp(x.angle,facing,Math.min(1,shoulderFollow+ochoExtra))+halfOpenOffset)
  }
  const a=adapt(frame.a,frame.b,'a'),b=adapt(frame.b,frame.a,'b')
  const contacts:Contact[]=embrace==='open'?[{
    type:'hand',a:bodyPoint(a,16,-48),b:bodyPoint(b,16,48),active:1
  },{
    type:'arm',a:bodyPoint(a,12,34),b:bodyPoint(b,8,-30),active:.9
  }]:embrace==='half-open'?[{
    type:'hand',a:bodyPoint(a,12,-44),b:bodyPoint(b,12,44),active:1
  },{
    type:'arm',a:bodyPoint(a,-2,34),b:bodyPoint(b,-12,-34),active:.95
  },{
    type:'torso',a:bodyPoint(a,38,20),b:bodyPoint(b,38,20),active:.72
  }]:[{
    type:'hand',a:bodyPoint(a,8,-40),b:bodyPoint(b,8,40),active:1
  },{
    type:'arm',a:bodyPoint(a,-8,34),b:bodyPoint(b,-8,-34),active:1
  },{
    type:'torso',a:bodyPoint(a,38,0),b:bodyPoint(b,38,0),active:1
  }]
  return{...frame,a,b,contacts}
}
