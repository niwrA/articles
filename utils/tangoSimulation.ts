export type DancerId='a'|'b'
export type MovementId='side-step'|'forward-step'|'cruce'|'forward-ocho'|'backward-ocho'|'giro'
export type Point={x:number;y:number}
export type FootState=Point&{angle:number;load:number}
export type DancerState={torso:Point;angle:number;pelvisAngle:number;left:FootState;right:FootState}
export type Contact={type:'hand'|'arm'|'torso';a:Point;b:Point;active:number}
export type Phase='available'|'proposal'|'projection'|'transfer'|'pivot'|'arrival'
export type Embrace='open'|'half-open'|'closed'
export type TangoFrame={a:DancerState;b:DancerState;contacts:Contact[];phase:Phase;noteNl:string;noteEn:string;progress:number}
type Keyframe=Omit<TangoFrame,'progress'>&{at:number}
export type SequenceCheckpoint={at:number;nameNl:string;nameEn:string;supportNl:string;supportEn:string;techniquesNl:string[];techniquesEn:string[];routesNl:string[];routesEn:string[]}
export type Movement={id:MovementId;nameNl:string;nameEn:string;initiator:DancerId|'shared';systemNl:string;systemEn:string;sequenceNl:string[];sequenceEn:string[];keyframes:Keyframe[];next:MovementId[];checkpoints?:SequenceCheckpoint[]}

const f=(x:number,y:number,angle:number,load:number):FootState=>({x,y,angle,load})
const d=(x:number,y:number,angle:number,left:FootState,right:FootState,pelvisAngle=angle):DancerState=>({torso:{x,y},angle,pelvisAngle,left,right})
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
 {id:'cruce',nameNl:'Cruce',nameEn:'Cross',initiator:'a',systemNl:'gekruist systeem → kruisen → verzamelen',systemEn:'crossed system → cross → collect',sequenceNl:['links ligt op A’s rechterbaan','A tordeert rechtsvoor','A houdt in en lost deels op','B kruist links voor rechts','gewicht naar links','rechts verzamelt'],sequenceEn:['left is on A’s right track','A twists forwards-right','A pauses and partly releases','B crosses left in front of right','weight moves left','right collects'],next:['forward-ocho','side-step','forward-step'],keyframes:[
  k(0,'available','De dansers staan in het gekruiste systeem. B draagt rechts; haar vrije linkervoet ligt op de baan van A’s rechtervoet.','The dancers are in crossed system. B is supported on the right; her free left foot is on the track of A’s right foot.',d(330,250,0,f(310,232,0,0),f(310,268,0,1)),d(470,250,180,f(490,268,180,0),f(490,232,180,1))),
  k(.16,'proposal','A geeft vanuit een lichte torsie naar rechts een voorwaartse impuls. De voeten blijven nog staan; B neemt de veranderde baan waar.','A gives a forward impulse from a slight twist to the right. The feet remain in place; B perceives the altered track.',d(344,246,10,f(310,232,4,0),f(310,268,4,1)),d(478,248,184,f(490,268,180,0),f(490,232,180,1))),
  k(.32,'proposal','A houdt de voorwaartse beweging in en lost de torsie gedeeltelijk op. Daarmee ontstaat voor B de uitnodiging om voorlangs te kruisen.','A checks the forward movement and partly releases the twist. This creates the invitation for B to cross in front.',d(350,244,5,f(310,232,3,0),f(310,268,3,1)),d(482,246,181,f(490,268,180,0),f(490,232,180,1))),
  k(.52,'projection','B beweegt links voor de rechtervoet langs. Rechts blijft het standbeen; er is nog geen gewicht overgedragen.','B moves the left foot in front of the right. The right remains the supporting foot; no weight has transferred yet.',d(366,242,3,f(310,232,2,0),f(395,268,2,.08)),d(490,244,180,f(470,220,180,0),f(490,238,180,1))),
  k(.68,'projection','B plaatst links voorbij en aan de rechterzijde van haar rechtervoet. De gekruiste positie is gevormd, maar rechts draagt nog volledig.','B places the left foot beyond and to the right of her right foot. The crossed position has formed, but the right still carries all the weight.',d(384,242,1,f(360,232,1,0),f(405,268,1,.08)),d(482,242,180,f(458,220,180,0),f(486,242,180,1))),
  k(.84,'transfer','A heft de torsie volledig op en draait iets verder mee. B verplaatst daardoor het gewicht van rechts naar de gekruiste linkervoet.','A fully releases the twist and turns slightly farther with the movement. B consequently transfers weight from the right to the crossed left foot.',d(404,244,-3,f(390,232,-2,.18),f(418,268,-2,.82)),d(466,240,176,f(450,220,176,.82),f(480,242,178,.18))),
  k(1,'arrival','B staat ontspannen op links en verzamelt de vrije rechtervoet rechts naast links. De kruising is opgeheven; vanuit deze basishouding kan een nieuw voorstel volgen.','B settles on the left and collects the free right foot to the right of it. The crossed position has been released; a new proposal can follow from this neutral stance.',d(420,246,0,f(408,232,0,0),f(418,268,0,1)),d(452,240,180,f(442,248,180,1),f(442,232,180,0)))]},
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
 {id:'giro',nameNl:'Volledige giro',nameEn:'Complete giro',initiator:'a',systemNl:'A opent en pivoteert; B voltooit 360° rond A',systemEn:'A opens and pivots; B completes 360° around A',sequenceNl:['A opent rechtsvoor','zijstap + 90°','voorwaartse ocho','zijstap + 90°','achterwaartse ocho','A verzamelt rechts'],sequenceEn:['A opens forwards-right','side step + 90°','forward ocho','side step + 90°','backward ocho','A collects right'],next:['forward-ocho','backward-ocho','side-step'],checkpoints:[
  {at:0,nameNl:'Beginpositie',nameEn:'Starting position',supportNl:'A en B staan op links; hun rechtervoet is vrij.',supportEn:'A and B are supported on the left; their right foot is free.',techniquesNl:['A opent rechts iets naar voren','Rotatie vanuit het bovenlijf voorstellen','De straal van B’s cirkel bepalen'],techniquesEn:["A opens the right slightly forwards",'Propose rotation from the upper body',"Determine the radius of B's circle"],routesNl:['Eerste zijstap rond A','Kleinere of ruimere cirkel','Pauze vóór de giro'],routesEn:['First side step around A','Smaller or wider circle','Pause before the giro']},
  {at:.25,nameNl:'Eerste zijstap voltooid',nameEn:'First side step completed',supportNl:'B staat na 90° op rechts en blijft naar A georiënteerd.',supportEn:'After 90°, B is supported on the right and remains oriented towards A.',techniquesNl:['Pivot op rechts','Voorwaartse ocho met links','Afstand tot A moduleren'],techniquesEn:['Pivot on the right','Forward ocho with the left','Modulate distance from A'],routesNl:['Voorwaartse ocho rond A','Losse ocho of zijstap','Pauze op de nieuwe as'],routesEn:['Forward ocho around A','Independent ocho or side step','Pause on the new axis']},
  {at:.5,nameNl:'Voorwaartse ocho voltooid',nameEn:'Forward ocho completed',supportNl:'B staat op links, 180° rond A; rechts is vrij.',supportEn:'B is supported on the left, 180° around A; the right is free.',techniquesNl:['Rechts zijwaarts projecteren','Front naar A behouden','Rotatie doseren'],techniquesEn:['Project the right foot sideways','Keep the front towards A','Modulate rotation'],routesNl:['Tweede zijstap rond A','Losse zijstap','Pauze of andere richting'],routesEn:['Second side step around A','Independent side step','Pause or another direction']},
  {at:.75,nameNl:'Tweede zijstap voltooid',nameEn:'Second side step completed',supportNl:'B staat na 270° op rechts; links is vrij voor de achterwaartse ocho.',supportEn:'After 270°, B is supported on the right; the left is free for the backward ocho.',techniquesNl:['Pivot op rechts','Achterwaartse ocho met links','A’s opgebouwde torsie volgen'],techniquesEn:['Pivot on the right','Backward ocho with the left',"Follow A's accumulated torsion"],routesNl:['Achterwaartse ocho naar het einde','Losse ocho','Pauze vóór het sluiten'],routesEn:['Backward ocho to the end','Independent ocho','Pause before closing']},
  {at:1,nameNl:'Giro voltooid',nameEn:'Giro completed',supportNl:'B staat op links; A heeft rechts naast links verzameld. Beiden staan weer tegenover elkaar.',supportEn:'B is supported on the left; A has collected right beside left. Both face each other again.',techniquesNl:['B’s rechtervoet verzamelen','Verbinding ontspannen','Nieuw voorstel beginnen'],techniquesEn:["Collect B's right foot",'Relax the connection','Begin a new proposal'],routesNl:['Zijstap, ocho of wandeling','Nieuwe giro met andere straal','Pauze in basishouding'],routesEn:['Side step, ocho or walk','New giro with another radius','Pause in neutral stance']}
 ],keyframes:[
  k(0,'available','A en B dragen links. A kan rechts iets naar voren openen en daarmee de cirkel voorstellen.','A and B are supported on the left. A can open the right slightly forwards and propose the circle.',walkA,sideB),
  k(.08,'proposal','A begint met het bovenlijf en opent de vrije rechtervoet iets naar voren. B houdt rechts nog vrij.','A begins with the upper body and opens the free right foot slightly forwards. B keeps the right free.',d(330,250,-18,f(310,232,0,1),f(352,268,-8,0),-6),sideB),
  k(.16,'projection','A’s rechtervoet is geplaatst. B antwoordt met een zijwaartse projectie naar de eerste kwartcirkel en draait mee naar A.','A’s right foot is placed. B responds with a side projection into the first quarter-circle while turning towards A.',d(330,250,-42,f(310,232,-24,.72),f(352,268,-24,.28),-24),d(412,188,135,f(490,268,155,1),f(350,126,110,0),120)),
  k(.25,'transfer','B voltooit de zijstap op rechts en is 90° rond A gedraaid. A’s voetposities blijven vanaf hier staan.','B completes the side step on the right and has turned 90° around A. From here, A’s foot positions remain fixed.',d(330,250,-90,f(310,232,-62,.58),f(352,268,-62,.42),-62),d(330,116,90,f(346,132,90,0),f(314,132,90,1),90)),
  k(.36,'pivot','B pivoteert op rechts voor de voorwaartse ocho. A draait verder zonder de voeten te verplaatsen.','B pivots on the right for the forward ocho. A continues rotating without moving the feet.',d(330,250,-138,f(310,232,-103,.48),f(352,268,-103,.52),-103),d(282,130,150,f(242,174,170,0),f(314,132,150,1),138)),
  k(.43,'projection','B projecteert links voorwaarts langs de cirkel en heroriënteert het bovenlijf naar A.','B projects the left forwards along the circle and reorients the upper body towards A.',d(330,250,-166,f(310,232,-126,.43),f(352,268,-126,.57),-126),d(236,178,70,f(194,232,35,.08),f(300,132,145,.92),105)),
  k(.5,'transfer','B voltooit de voorwaartse ocho op links, halverwege de cirkel. Rechts is vrij.','B completes the forward ocho on the left, halfway around the circle. The right is free.',d(330,250,-180,f(310,232,-148,.4),f(352,268,-148,.6),-148),d(190,250,0,f(212,234,0,1),f(212,266,0,0),0)),
  k(.64,'projection','B projecteert rechts zijwaarts naar de derde kwartcirkel en blijft naar A georiënteerd.','B projects the right sideways into the third quarter-circle and remains oriented towards A.',d(330,250,-238,f(310,232,-198,.36),f(352,268,-198,.64),-198),d(238,326,-45,f(212,234,-20,1),f(302,382,-70,0),-45)),
  k(.75,'transfer','B voltooit de tweede zijstap op rechts na 270°. Bij A neemt de torsie tussen voeten, bekken en bovenlijf toe.','B completes the second side step on the right after 270°. Torsion between A’s feet, pelvis and upper body increases.',d(330,250,-270,f(310,232,-230,.32),f(352,268,-230,.68),-230),d(330,384,-90,f(314,368,-90,0),f(346,368,-90,1),-90)),
  k(.84,'pivot','B pivoteert op rechts voor de achterwaartse ocho. A behoudt de voetposities en leidt vanuit de opgebouwde torsie.','B pivots on the right for the backward ocho. A retains the foot positions and leads from the accumulated torsion.',d(330,250,-310,f(310,232,-265,.28),f(352,268,-265,.72),-265),d(382,350,-155,f(438,302,-165,0),f(346,368,-140,1),-135)),
  k(.92,'projection','B projecteert links achterwaarts naar de eindpositie. A begint de spanning op te heffen door rechts te verzamelen.','B projects the left backwards towards the end position. A begins releasing the tension by collecting the right.',d(330,250,-342,f(310,232,-315,.7),f(330,252,-315,.3),-315),d(438,302,-205,f(474,258,-190,.08),f(382,350,-155,.92),-175)),
  k(1,'arrival','B voltooit 360° en staat weer tegenover A. A heeft rechts naast links verzameld; B kan rechts ontspannen aansluiten.','B completes 360° and faces A again. A has collected right beside left; B can relax and collect the right.',d(330,250,-360,f(310,232,-360,1),f(310,248,-360,0),-360),d(470,250,-180,f(490,268,-180,1),f(490,252,-180,0),-180))]}
]

const lerp=(a:number,b:number,t:number)=>a+(b-a)*t
const angleLerp=(a:number,b:number,t:number)=>a+(((b-a+540)%360)-180)*t
const pointLerp=(a:Point,b:Point,t:number):Point=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t)})
const footLerp=(a:FootState,b:FootState,t:number):FootState=>({...pointLerp(a,b,t),angle:angleLerp(a.angle,b.angle,t),load:lerp(a.load,b.load,t)})
const dancerLerp=(a:DancerState,b:DancerState,t:number):DancerState=>({torso:pointLerp(a.torso,b.torso,t),angle:angleLerp(a.angle,b.angle,t),pelvisAngle:angleLerp(a.pelvisAngle,b.pelvisAngle,t),left:footLerp(a.left,b.left,t),right:footLerp(a.right,b.right,t)})
export function frameAt(movement:Movement,progress:number):TangoFrame{const p=Math.max(0,Math.min(1,progress)),found=movement.keyframes.findIndex(x=>x.at>=p);if(found===0)return{...movement.keyframes[0],progress:p};const hi=found<0?movement.keyframes.length-1:Math.max(1,found),from=movement.keyframes[hi-1],to=movement.keyframes[hi],local=(p-from.at)/Math.max(.0001,to.at-from.at),nearer=local<.5?from:to;return{a:dancerLerp(from.a,to.a,local),b:dancerLerp(from.b,to.b,local),contacts:from.contacts.slice(0,Math.min(from.contacts.length,to.contacts.length)).map((c,i)=>({type:c.type,a:pointLerp(c.a,to.contacts[i].a,local),b:pointLerp(c.b,to.contacts[i].b,local),active:lerp(c.active,to.contacts[i].active,local)})),phase:nearer.phase,noteNl:nearer.noteNl,noteEn:nearer.noteEn,progress:p}}
export const centreOfMass=(x:DancerState):Point=>({x:x.torso.x*.78+x.left.x*.11+x.right.x*.11,y:x.torso.y*.78+x.left.y*.11+x.right.y*.11})
export const sharedCentre=(x:TangoFrame):Point=>{const a=centreOfMass(x.a),b=centreOfMass(x.b);return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}}

const direction=(from:Point,to:Point)=>Math.atan2(to.y-from.y,to.x-from.x)*180/Math.PI
const bodyPoint=(x:DancerState,forward:number,side:number):Point=>{
  const radians=x.angle*Math.PI/180
  return{x:x.torso.x+Math.cos(radians)*forward-Math.sin(radians)*side,y:x.torso.y+Math.sin(radians)*forward+Math.cos(radians)*side}
}
const moveDancer=(x:DancerState,dx:number,dy:number,shoulderAngle:number):DancerState=>({
  torso:{x:x.torso.x+dx,y:x.torso.y+dy},angle:shoulderAngle,pelvisAngle:x.pelvisAngle,
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
