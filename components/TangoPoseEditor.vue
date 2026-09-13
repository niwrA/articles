<script setup lang="ts">
type Side='left'|'right'
type DancerId='a'|'b'
type PhaseName='available'|'proposal'|'projection'|'transfer'|'pivot'|'arrival'
type Foot={x:number;y:number;angle:number;load:number}
type Dancer={torso:{x:number;y:number};angle:number;pelvisAngle:number;left:Foot;right:Foot}
type Pose={id:string;at:number;duration:number;stanceHeight:number;phase:PhaseName;note:string;a:Dancer;b:Dancer}
type LoadMode='manual'|'suggest'|'auto'
type LoadIssue={fromIndex:number;toIndex:number;id:DancerId;side:Side;travel:number;text:string}
type StoredMovement={id:string;name:string;updatedAt:string;data:{format:string;version:number;timing:string;coordinateSystem:Record<string,string>;poses:Omit<Pose,'id'>[]}}

const props=withDefaults(defineProps<{locale?:'nl'|'en'}>(),{locale:'nl'})
const nl=computed(()=>props.locale==='nl')
const clone=<T,>(value:T):T=>JSON.parse(JSON.stringify(value))
const foot=(x:number,y:number,angle:number,load:number):Foot=>({x,y,angle,load})
const dancer=(x:number,y:number,angle:number,left:Foot,right:Foot):Dancer=>({torso:{x,y},angle,pelvisAngle:angle,left,right})
const initial=():Pose[]=>[
 {id:crypto.randomUUID(),at:0,duration:0,stanceHeight:.5,phase:'available',note:'',a:dancer(330,250,0,foot(310,232,0,0),foot(310,268,0,1)),b:dancer(470,250,180,foot(490,268,180,0),foot(490,232,180,1))},
 {id:crypto.randomUUID(),at:1,duration:1,stanceHeight:.5,phase:'arrival',note:'',a:dancer(330,250,0,foot(310,232,0,0),foot(310,268,0,1)),b:dancer(470,250,180,foot(490,268,180,0),foot(490,232,180,1))}
]
const poses=ref<Pose[]>(initial())
const selected=ref(0)
const progress=ref(0)
const playing=ref(false)
const jsonInput=ref('')
const message=ref('')
const loadMode=ref<LoadMode>('suggest')
const undoPoses=ref<Pose[]|null>(null)
const movementName=ref('')
const savedMovementId=ref<string|null>(null)
const savedMovements=ref<StoredMovement[]>([])
const sessionKey='tango-editor-movements-v1'
let timer:ReturnType<typeof setInterval>|undefined

const phaseLabels:Record<PhaseName,{nl:string;en:string}>={available:{nl:'beschikbaar',en:'available'},proposal:{nl:'voorstel',en:'proposal'},projection:{nl:'projectie',en:'projection'},transfer:{nl:'gewichtsoverdracht',en:'weight transfer'},pivot:{nl:'pivot',en:'pivot'},arrival:{nl:'aankomst',en:'arrival'}}
const phaseOptions=Object.keys(phaseLabels) as PhaseName[]
const current=computed(()=>poses.value[selected.value])
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t
const angleLerp=(a:number,b:number,t:number)=>a+(((b-a+540)%360)-180)*t
const interpolateFoot=(a:Foot,b:Foot,t:number):Foot=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),angle:angleLerp(a.angle,b.angle,t),load:lerp(a.load,b.load,t)})
const interpolateDancer=(a:Dancer,b:Dancer,t:number):Dancer=>({torso:{x:lerp(a.torso.x,b.torso.x,t),y:lerp(a.torso.y,b.torso.y,t)},angle:angleLerp(a.angle,b.angle,t),pelvisAngle:angleLerp(a.pelvisAngle,b.pelvisAngle,t),left:interpolateFoot(a.left,b.left,t),right:interpolateFoot(a.right,b.right,t)})
const preview=computed(()=>{
 const p=progress.value/100,ordered=[...poses.value].sort((a,b)=>a.at-b.at),hi=ordered.findIndex(x=>x.at>=p)
 if(hi<=0)return clone(ordered[0]);if(hi<0)return clone(ordered.at(-1)!)
 const from=ordered[hi-1],to=ordered[hi],t=(p-from.at)/Math.max(.001,to.at-from.at)
 return{...clone(t<.5?from:to),stanceHeight:lerp(from.stanceHeight??.5,to.stanceHeight??.5,t),a:interpolateDancer(from.a,to.a,t),b:interpolateDancer(from.b,to.b,t)}
})
const display=computed(()=>playing.value?preview.value:current.value)
const transform=(x:{x:number;y:number;angle:number})=>`translate(${x.x} ${x.y}) rotate(${x.angle})`
const distance=(a:{x:number;y:number},b:{x:number;y:number})=>Math.hypot(a.x-b.x,a.y-b.y)
const direction=(a:{x:number;y:number},b:{x:number;y:number})=>Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI
const angleError=(a:number,b:number)=>Math.abs(((a-b+540)%360)-180)
const checks=computed(()=>{
 const x=display.value,separation=distance(x.a.torso,x.b.torso),aFacing=angleError(x.a.angle,direction(x.a.torso,x.b.torso)),bFacing=angleError(x.b.angle,direction(x.b.torso,x.a.torso))
 return[
  {ok:separation>=75&&separation<=205,nl:`Bovenlijfafstand ${Math.round(separation)}`,en:`Upper-body distance ${Math.round(separation)}`},
  {ok:aFacing<=85&&bFacing<=85,nl:`Naar elkaar gericht: afwijking ${Math.round(aFacing)}° / ${Math.round(bFacing)}°`,en:`Mutual orientation: error ${Math.round(aFacing)}° / ${Math.round(bFacing)}°`},
  {ok:(['a','b'] as DancerId[]).every(id=>Math.abs(x[id].left.load+x[id].right.load-1)<.02),nl:'Voetbelasting sluit op 100%',en:'Foot loads sum to 100%'}
 ]
})
const sequenceChecks=computed<LoadIssue[]>(()=>{const issues:LoadIssue[]=[];for(let i=1;i<poses.value.length;i++)for(const id of ['a','b'] as DancerId[])for(const side of ['left','right'] as Side[]){const from=poses.value[i-1][id][side],to=poses.value[i][id][side],travel=distance(from,to);if(from.load>=.85&&to.load>=.85&&travel>4)issues.push({fromIndex:i-1,toIndex:i,id,side,travel,text:nl.value?`Fase ${i}→${i+1}: ${id.toUpperCase()} ${side==='left'?'links':'rechts'} schuift ${Math.round(travel)} terwijl die belast blijft.`:`Phase ${i}→${i+1}: ${id.toUpperCase()} ${side} slides ${Math.round(travel)} while remaining loaded.`})}return issues})
const trace=computed(()=>poses.value.flatMap(p=>{const feet=(['left','right'] as Side[]).filter(s=>p.b[s].load<.25);return feet.map(s=>`${p.b[s].x},${p.b[s].y}`)}).join(' '))

const choose=(index:number)=>{selected.value=index;progress.value=Math.round(poses.value[index].at*100);playing.value=false}
const recalculateTimes=()=>{const total=poses.value.slice(1).reduce((sum,p)=>sum+Math.max(.25,p.duration||1),0);let elapsed=0;poses.value.forEach((p,index)=>{if(index===0){p.at=0;p.duration=0}else{elapsed+=Math.max(.25,p.duration||1);p.at=elapsed/total}})}
const duplicate=()=>{const source=clone(current.value);source.id=crypto.randomUUID();source.duration=1;poses.value.splice(selected.value+1,0,source);selected.value++;recalculateTimes();choose(selected.value)}
const remove=()=>{if(poses.value.length<=2)return;poses.value.splice(selected.value,1);selected.value=Math.min(selected.value,poses.value.length-1);recalculateTimes()}
const updateDuration=()=>{recalculateTimes();progress.value=Math.round(current.value.at*100)}
const remember=()=>{undoPoses.value=clone(poses.value)}
const undo=()=>{if(!undoPoses.value)return;poses.value=undoPoses.value;undoPoses.value=null;message.value=nl.value?'Laatste correctie ongedaan gemaakt':'Last correction undone'}
const inferLoad=(issue:Pick<LoadIssue,'fromIndex'|'toIndex'|'id'|'side'>,rememberFirst=true)=>{if(rememberFirst)remember();const other:Side=issue.side==='left'?'right':'left';for(const index of [issue.fromIndex,issue.toIndex]){poses.value[index][issue.id][issue.side].load=0;poses.value[index][issue.id][other].load=1}message.value=nl.value?'Belasting gecorrigeerd; de bewegende voet is vrijgemaakt.':'Load corrected; the moving foot was made free.'}
const restoreFoot=(issue:LoadIssue)=>{remember();const from=poses.value[issue.fromIndex][issue.id][issue.side],to=poses.value[issue.toIndex][issue.id][issue.side];Object.assign(to,{x:from.x,y:from.y,angle:from.angle});message.value=nl.value?'De standvoet is naar zijn vorige positie hersteld.':'The support foot was restored to its previous position.'}
const autoCorrectAll=()=>{const issues=[...sequenceChecks.value];if(!issues.length)return;remember();for(const issue of issues)inferLoad(issue,false);message.value=nl.value?`${issues.length} belastingsconflict(en) automatisch gecorrigeerd.`:`${issues.length} load conflict(s) corrected automatically.`}
watch(loadMode,mode=>{if(mode==='auto')autoCorrectAll()})
onMounted(()=>{const saved=localStorage.getItem('tango-editor-load-mode') as LoadMode|null;if(saved&&['manual','suggest','auto'].includes(saved))loadMode.value=saved;try{const collection=JSON.parse(sessionStorage.getItem(sessionKey)||'[]');if(Array.isArray(collection))savedMovements.value=collection}catch{sessionStorage.removeItem(sessionKey)}})
watch(loadMode,mode=>{if(import.meta.client)localStorage.setItem('tango-editor-load-mode',mode)})
const togglePlay=()=>{if(progress.value>=100)progress.value=0;playing.value=!playing.value}
watch(playing,on=>{if(timer)clearInterval(timer);if(!on)return;timer=setInterval(()=>{progress.value=Math.min(100,progress.value+.6);if(progress.value>=100)playing.value=false},30)})
onBeforeUnmount(()=>{if(timer)clearInterval(timer)})

type DragTarget={id:DancerId;part:'torso'|Side;start:{x:number;y:number};pointer:{x:number;y:number}}
const drag=ref<DragTarget|null>(null)
const svg=ref<SVGSVGElement>()
const svgPoint=(event:PointerEvent)=>{const box=svg.value!.getBoundingClientRect();return{x:80+(event.clientX-box.left)/box.width*640,y:70+(event.clientY-box.top)/box.height*360}}
const startDrag=(event:PointerEvent,id:DancerId,part:'torso'|Side)=>{if(playing.value)return;const p=svgPoint(event),target=part==='torso'?current.value[id].torso:current.value[id][part];if(part!=='torso'&&loadMode.value==='auto')remember();drag.value={id,part,start:{x:target.x,y:target.y},pointer:p};(event.currentTarget as Element).setPointerCapture(event.pointerId)}
const moveDrag=(event:PointerEvent)=>{if(!drag.value)return;const p=svgPoint(event),dx=p.x-drag.value.pointer.x,dy=p.y-drag.value.pointer.y,target=drag.value.part==='torso'?current.value[drag.value.id].torso:current.value[drag.value.id][drag.value.part];target.x=Math.round(drag.value.start.x+dx);target.y=Math.round(drag.value.start.y+dy)}
const stopDrag=()=>{const completed=drag.value;drag.value=null;if(!completed||completed.part==='torso'||loadMode.value!=='auto'||selected.value===0)return;const travel=distance(poses.value[selected.value-1][completed.id][completed.part],poses.value[selected.value][completed.id][completed.part]);if(travel>4)inferLoad({fromIndex:selected.value-1,toIndex:selected.value,id:completed.id,side:completed.part},false)}

const snap=(value:number,step:number)=>Math.round(value/step)*step
const quantise=(level:'fine'|'medium'|'coarse')=>{const settings={fine:{position:5,angle:5,load:.05,height:.05},medium:{position:10,angle:15,load:.1,height:.25},coarse:{position:20,angle:45,load:.5,height:.5}}[level];for(const pose of poses.value){pose.stanceHeight=Math.max(0,Math.min(1,snap(pose.stanceHeight,settings.height)));for(const id of ['a','b'] as DancerId[]){const d=pose[id];d.torso.x=snap(d.torso.x,settings.position);d.torso.y=snap(d.torso.y,settings.position);d.angle=snap(d.angle,settings.angle);d.pelvisAngle=snap(d.pelvisAngle,settings.angle);for(const side of ['left','right'] as Side[]){d[side].x=snap(d[side].x,settings.position);d[side].y=snap(d[side].y,settings.position);d[side].angle=snap(d[side].angle,settings.angle);d[side].load=Math.max(0,Math.min(1,snap(d[side].load,settings.load)))}const sum=d.left.load+d.right.load;if(sum){d.left.load=Number((d.left.load/sum).toFixed(2));d.right.load=Number((1-d.left.load).toFixed(2))}}}message.value=nl.value?`Alle fasen zijn ${level==='fine'?'fijn':level==='medium'?'middelgrof':'grof'} uitgelijnd`:`All phases snapped to the ${level} grid`}
const payload=()=>({format:'tango-pose-sequence',version:3,timing:'relative-duration',coordinateSystem:{view:'top',origin:'stage',angleDegrees:'clockwise',units:'model',stanceHeight:'0=low, 0.5=neutral, 1=extended'},poses:poses.value.map(({id,...p})=>p)})
const persistMovements=()=>{sessionStorage.setItem(sessionKey,JSON.stringify(savedMovements.value))}
const loadSequence=(incoming:Omit<Pose,'id'>[])=>{if(!Array.isArray(incoming)||incoming.length<2)throw new Error('poses');poses.value=incoming.map((p,index)=>({...p,id:crypto.randomUUID(),stanceHeight:p.stanceHeight??.5,duration:index===0?0:(p.duration??Math.max(.25,(p.at-(incoming[index-1]?.at??0))*incoming.length))}));selected.value=0;progress.value=0;playing.value=false;recalculateTimes()}
const newMovement=()=>{poses.value=initial();selected.value=0;progress.value=0;playing.value=false;movementName.value='';savedMovementId.value=null;undoPoses.value=null;jsonInput.value='';message.value=nl.value?'Nieuwe lege beweging gestart':'New blank movement started'}
const saveMovement=()=>{const name=movementName.value.trim();if(!name){message.value=nl.value?'Geef de beweging eerst een naam.':'Name the movement first.';return}const id=savedMovementId.value??crypto.randomUUID(),entry:StoredMovement={id,name,updatedAt:new Date().toISOString(),data:payload()};const index=savedMovements.value.findIndex(item=>item.id===id);if(index<0)savedMovements.value.push(entry);else savedMovements.value[index]=entry;savedMovementId.value=id;movementName.value=name;persistMovements();message.value=nl.value?'Beweging in deze sessie opgeslagen':'Movement saved in this session'}
const loadMovement=(id:string)=>{const entry=savedMovements.value.find(item=>item.id===id);if(!entry)return;loadSequence(entry.data.poses);savedMovementId.value=id;movementName.value=entry.name;message.value=nl.value?`‘${entry.name}’ geladen`:`‘${entry.name}’ loaded`}
const deleteMovement=(id:string)=>{savedMovements.value=savedMovements.value.filter(item=>item.id!==id);if(savedMovementId.value===id)newMovement();persistMovements();message.value=nl.value?'Opgeslagen beweging verwijderd':'Saved movement removed'}
const copyJson=async()=>{await navigator.clipboard.writeText(JSON.stringify(payload(),null,2));message.value=nl.value?'JSON gekopieerd':'JSON copied'}
const download=(data:unknown,filename:string)=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)}
const slug=(value:string)=>value.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const downloadJson=()=>download({...payload(),name:movementName.value.trim()||undefined},`${slug(movementName.value)||'tango-bewegingssequentie'}.json`)
const exportSet=()=>download({format:'tango-movement-set',version:1,exportedAt:new Date().toISOString(),movements:savedMovements.value.map(({name,data})=>({name,...data}))},'tango-bewegingsset.json')
const importJson=()=>{try{const parsed=JSON.parse(jsonInput.value);if(parsed.format==='tango-movement-set'&&Array.isArray(parsed.movements)){const imported:StoredMovement[]=parsed.movements.map((item:any)=>{if(!Array.isArray(item.poses)||item.poses.length<2)throw new Error('poses');const {name='Naamloze beweging',...data}=item;return{id:crypto.randomUUID(),name:String(name),updatedAt:new Date().toISOString(),data}});savedMovements.value=[...savedMovements.value,...imported];persistMovements();message.value=nl.value?`${imported.length} beweging(en) aan de sessie toegevoegd`:`${imported.length} movement(s) added to the session`;return}const incoming=Array.isArray(parsed)?parsed:parsed.poses;loadSequence(incoming);movementName.value=parsed.name??'';savedMovementId.value=null;message.value=nl.value?'Sequentie geladen':'Sequence loaded'}catch{message.value=nl.value?'Ongeldige JSON':'Invalid JSON'}}
</script>

<template>
 <section class="pose-editor">
  <header><p class="eyebrow">{{nl?'TANGOSEQUENTIE-EDITOR':'TANGO SEQUENCE EDITOR'}}</p><h3>{{nl?'Modelleer de beweging fase voor fase':'Model the movement phase by phase'}}</h3><p>{{nl?'Plaats de bovenlijven en voeten in ieder sleutelmoment. De editor berekent de beweging ertussen en exporteert de sequentie als JSON. Dit is een experimenteel beschrijvingsinstrument, geen dansinstructie.':'Place the upper bodies and feet at each key moment. The editor calculates the motion between them and exports the sequence as JSON. This is an experimental description tool, not dance instruction.'}}</p></header>
  <section class="movement-workspace">
   <div class="movement-current"><label>{{nl?'Naam beweging':'Movement name'}} <input v-model="movementName" type="text" :placeholder="nl?'bijvoorbeeld: Kruispas':'for example: Cross'"></label><button @click="saveMovement">{{savedMovementId?(nl?'Wijzigingen opslaan':'Save changes'):(nl?'Opslaan in sessie':'Save in session')}}</button><button @click="newMovement">+ {{nl?'Nieuwe beweging':'New movement'}}</button></div>
   <div v-if="savedMovements.length" class="movement-library"><strong>{{nl?'Bewegingen in deze sessie':'Movements in this session'}}</strong><div v-for="item in savedMovements" :key="item.id" :class="{active:item.id===savedMovementId}"><button @click="loadMovement(item.id)">{{item.name}}</button><button class="delete" :aria-label="(nl?'Verwijder ':'Delete ')+item.name" @click="deleteMovement(item.id)">×</button></div><button class="export-set" @click="exportSet">{{nl?'Exporteer hele set':'Export full set'}}</button></div>
   <p>{{nl?'Sessiebewegingen blijven beschikbaar zolang dit browsertabblad geopend is. Exporteer de set om ze blijvend te bewaren.':'Session movements remain available while this browser tab is open. Export the set to keep them permanently.'}}</p>
  </section>
  <div class="editor-grid">
   <div class="canvas-card">
    <div class="canvas-toolbar"><button @click="togglePlay">{{playing?'Ⅱ':'▶'}} {{playing?(nl?'Pauze':'Pause'):(nl?'Animeer':'Animate')}}</button><label>{{nl?'animatie':'animation'}} <input v-model.number="progress" type="range" min="0" max="100"></label><output>{{progress}}%</output></div>
    <svg ref="svg" viewBox="80 70 640 360" @pointermove="moveDrag" @pointerup="stopDrag" @pointercancel="stopDrag">
     <rect x="80" y="70" width="640" height="360" rx="20" class="floor"/><line :x1="display.a.torso.x" :y1="display.a.torso.y" :x2="display.b.torso.x" :y2="display.b.torso.y" class="embrace-axis"/>
     <polyline v-if="trace" :points="trace" class="trace"/>
     <g v-for="id in (['a','b'] as DancerId[])" :key="id" :class="['dancer',`dancer-${id}`]">
      <g v-for="side in (['left','right'] as Side[])" :key="side" :transform="transform(display[id][side])" class="foot" @pointerdown="startDrag($event,id,side)"><circle r="25" :style="{opacity:.08+display[id][side].load*.28}"/><path d="M-21-9H8Q25 0 8 9H-21Q-27 0-21-9Z"/><text y="4">{{side==='left'?'L':'R'}}</text></g>
      <g :transform="transform({...display[id].torso,angle:display[id].pelvisAngle})" class="pelvis"><path d="M-5-16Q4-23 13-16L13 16Q4 23-5 16Z"/></g>
      <g :transform="`${transform({...display[id].torso,angle:display[id].angle})} scale(${.9+display.stanceHeight*.2})`" class="torso" @pointerdown="startDrag($event,id,'torso')"><path d="M-8-31C8-42 28-38 42-24L42 24C28 38 8 42-8 31Z"/><path class="gaze" d="M15 0H34M27-6 34 0 27 6"/><text x="5" y="5">{{id.toUpperCase()}}</text></g>
     </g>
    </svg>
    <p class="hint">{{nl?'Sleep de bovenlijven en voeten. De stippellijn toont de verbinding; de dunne lijn volgt geprojecteerde vrije voeten van B.':'Drag upper bodies and feet. The dashed line shows the connection; the thin line follows B’s projected free feet.'}}</p>
   </div>
   <aside class="controls">
    <div class="phase-tabs"><button v-for="(pose,index) in poses" :key="pose.id" :class="{active:index===selected}" @click="choose(index)"><span>{{index+1}}</span>{{Math.round(pose.at*100)}}%</button></div>
    <div class="phase-actions"><button @click="duplicate">+ {{nl?'fase dupliceren':'duplicate phase'}}</button><button :disabled="poses.length<=2" @click="remove">{{nl?'verwijderen':'remove'}}</button></div>
    <fieldset class="load-mode"><legend>{{nl?'Voetbelasting':'Foot load'}}</legend><label v-for="mode in (['manual','suggest','auto'] as LoadMode[])" :key="mode"><input v-model="loadMode" type="radio" :value="mode">{{mode==='manual'?(nl?'handmatig':'manual'):mode==='suggest'?(nl?'voorstellen':'suggest'):(nl?'automatisch':'automatic')}}</label><button v-if="undoPoses" @click="undo">↶ {{nl?'ongedaan maken':'undo'}}</button></fieldset>
    <label>{{nl?'Relatieve duur':'Relative duration'}} <input v-model.number="current.duration" type="range" min=".25" max="3" step=".25" :disabled="selected===0" @input="updateDuration"><output>{{selected===0?'—':`${current.duration}×`}}</output></label>
    <label>{{nl?'Fase':'Phase'}} <select v-model="current.phase"><option v-for="name in phaseOptions" :key="name" :value="name">{{phaseLabels[name][nl?'nl':'en']}}</option></select></label>
    <div class="shared-height"><strong>{{nl?'Basishouding':'Base stance'}}</strong><input v-model.number="current.stanceHeight" type="range" min="0" max="1" step=".05"><div><span>{{nl?'laag':'low'}}</span><b>{{nl?'normaal':'normal'}}</b><span>{{nl?'hoog':'high'}}</span></div><output>{{Math.round(current.stanceHeight*100)}}%</output></div>
    <label>{{nl?'Notitie':'Note'}} <input v-model="current.note" type="text"></label>
    <details v-for="id in (['a','b'] as DancerId[])" :key="id" :open="id==='b'"><summary>{{nl?'Danser':'Dancer'}} {{id.toUpperCase()}}</summary>
     <div class="angle-grid"><AngleDial v-model="current[id].angle" :label="nl?'bovenlijf':'upper body'"/><AngleDial v-model="current[id].pelvisAngle" :label="nl?'bekken':'pelvis'"/></div>
     <div v-for="side in (['left','right'] as Side[])" :key="side" class="foot-controls"><strong>{{side==='left'?(nl?'Linkervoet':'Left foot'):(nl?'Rechtervoet':'Right foot')}}</strong><label>x <input v-model.number="current[id][side].x" type="number"></label><label>y <input v-model.number="current[id][side].y" type="number"></label><AngleDial v-model="current[id][side].angle" :label="nl?'voetrichting':'foot direction'"/><label>{{nl?'gewicht':'load'}} <input v-model.number="current[id][side].load" type="range" min="0" max="1" step=".05"><output>{{Math.round(current[id][side].load*100)}}%</output></label></div>
    </details>
    <ul class="checks"><li v-for="check in checks" :key="check.nl" :class="{ok:check.ok}">{{check.ok?'✓':'!'}} {{nl?check.nl:check.en}}</li></ul>
    <div class="sequence-check"><strong>{{nl?'Hele sequentie':'Whole sequence'}}</strong><p v-if="!sequenceChecks.length" class="ok">✓ {{nl?'Geen schuivende standvoet gevonden.':'No sliding support foot found.'}}</p><ul v-else><li v-for="issue in sequenceChecks" :key="`${issue.toIndex}-${issue.id}-${issue.side}`"><span>! {{issue.text}}</span><div v-if="loadMode!=='manual'"><button @click="inferLoad(issue)">{{nl?'Maak voet vrij':'Make foot free'}}</button><button @click="restoreFoot(issue)">{{nl?'Herstel voet':'Restore foot'}}</button></div></li></ul><button v-if="loadMode==='auto'&&sequenceChecks.length" @click="autoCorrectAll">{{nl?'Corrigeer alle belasting':'Correct all loads'}}</button></div>
   </aside>
  </div>
  <div class="snap-card"><div><h4>{{nl?'Handwerk normaliseren':'Normalise manual input'}}</h4><p>{{nl?'Rond alle fasen trapsgewijs af. Fijn gebruikt 5 modelelementen en 5°, middel 10 en 15°, grof 20 en 45°. Gewicht wordt mee afgerond en daarna weer tot 100% genormaliseerd.':'Snap all phases in stages. Fine uses 5 model units and 5°, medium 10 and 15°, coarse 20 and 45°. Loads are rounded and then normalised back to 100%.'}}</p></div><div><button @click="quantise('fine')">{{nl?'Fijn':'Fine'}}</button><button @click="quantise('medium')">{{nl?'Middel':'Medium'}}</button><button @click="quantise('coarse')">{{nl?'Grof':'Coarse'}}</button></div></div>
  <div class="io"><div><h4>{{nl?'Beweging of set delen':'Share movement or set'}}</h4><p>{{nl?'Download de huidige beweging afzonderlijk, of bewaar meerdere benoemde bewegingen in de sessie en exporteer die hierboven als één set.':'Download the current movement separately, or keep several named movements in the session and export them above as one set.'}}</p><button @click="copyJson">{{nl?'Kopieer huidige JSON':'Copy current JSON'}}</button><button @click="downloadJson">{{nl?'Download huidige beweging':'Download current movement'}}</button><span role="status">{{message}}</span></div><details><summary>{{nl?'Beweging of set importeren':'Import movement or set'}}</summary><textarea v-model="jsonInput" rows="8" spellcheck="false"/><button @click="importJson">{{nl?'Importeren':'Import'}}</button></details></div>
 </section>
</template>

<style scoped>
.pose-editor{--a:#c75032;--b:#256d72;margin:4rem calc((780px - min(1180px,calc(100vw - 48px)))/2) 1rem;width:min(1180px,calc(100vw - 48px));padding-top:2rem;border-top:2px solid #d9dfdc}.pose-editor header{max-width:780px}.pose-editor h3{font-size:clamp(1.7rem,3vw,2.5rem);margin:.2rem 0 .7rem}.eyebrow{font-size:.72rem;letter-spacing:.12em;font-weight:800;color:#a64a34}.editor-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(320px,.8fr);gap:1rem;margin-top:1.4rem}.canvas-card,.controls,.io{background:#fff;border:1px solid #dce2de;border-radius:16px;box-shadow:0 8px 28px rgba(22,42,37,.07)}.canvas-toolbar{display:flex;gap:.7rem;align-items:center;padding:.8rem 1rem;border-bottom:1px solid #e4e8e5}.canvas-toolbar label{display:flex;align-items:center;gap:.5rem;flex:1}.canvas-toolbar input{width:100%}button{border:1px solid #cad3cf;background:#fff;color:#213a36;border-radius:8px;padding:.5rem .7rem;cursor:pointer}button:disabled{opacity:.4}.canvas-card svg{display:block;width:100%;touch-action:none}.floor{fill:#f7f5ef}.embrace-axis{stroke:#c38a42;stroke-width:3;stroke-dasharray:6 6}.trace{fill:none;stroke:#8b6a48;stroke-width:2;stroke-dasharray:3 5;opacity:.55}.dancer-a{color:var(--a)}.dancer-b{color:var(--b)}.foot,.torso{cursor:grab}.foot:active,.torso:active{cursor:grabbing}.foot circle,.foot path,.torso path,.pelvis path{fill:currentColor}.foot>path{stroke:#fff;stroke-width:1.5}.foot text,.torso text{fill:#fff;text-anchor:middle;font:700 12px system-ui;pointer-events:none}.torso>path:first-child{fill:#c49a50;stroke:#fff;stroke-width:1.5}.torso .gaze{fill:none;stroke:#fff;stroke-width:2.5}.pelvis path{opacity:.55;stroke:#fff}.hint{font-size:.78rem;color:#68746f;padding:0 1rem 1rem}.controls{padding:1rem}.phase-tabs{display:flex;gap:.35rem;overflow-x:auto}.phase-tabs button{min-width:58px}.phase-tabs button span{display:block;font-weight:800}.phase-tabs button.active{background:#243e39;color:#fff}.phase-actions{display:flex;gap:.5rem;margin:.7rem 0 1rem}.controls>label{display:grid;grid-template-columns:75px 1fr auto;gap:.5rem;align-items:center;margin:.7rem 0;font-size:.82rem}.controls details{border-top:1px solid #e1e5e2;margin-top:.8rem;padding-top:.7rem}.controls summary{font-weight:750;cursor:pointer}.angle-grid,.foot-controls{display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem;margin-top:.6rem}.angle-grid label,.foot-controls label{font-size:.72rem}.angle-grid input,.foot-controls input[type=number],.controls>label input[type=text],select{width:100%;box-sizing:border-box;border:1px solid #ccd4d0;border-radius:6px;padding:.38rem}.foot-controls{padding:.6rem;background:#f7f8f6;border-radius:8px}.foot-controls strong{grid-column:1/-1;font-size:.76rem}.foot-controls label:last-child{grid-column:1/-1;display:grid;grid-template-columns:55px 1fr auto;align-items:center;gap:.4rem}.checks{list-style:none;padding:0;margin:1rem 0 0}.checks li{color:#9b4332;font-size:.77rem;margin:.3rem 0}.checks li.ok{color:#286159}.io{margin-top:1rem;padding:1rem 1.2rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem}.io h4{margin:.1rem 0}.io p{font-size:.82rem;color:#68746f}.io button+button{margin-left:.5rem}.io span{margin-left:.7rem;font-size:.78rem;color:#286159}.io textarea{width:100%;box-sizing:border-box;margin:.7rem 0;font:12px ui-monospace,monospace}@media(max-width:800px){.pose-editor{margin-inline:calc(50% - 50vw + 16px);width:calc(100vw - 32px)}.editor-grid,.io{grid-template-columns:1fr}.canvas-card svg{min-width:560px}.canvas-card{overflow-x:auto}}
.snap-card{display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-top:1rem;padding:1rem 1.2rem;background:#fff;border:1px solid #dce2de;border-radius:16px;box-shadow:0 8px 28px rgba(22,42,37,.07)}.snap-card h4{margin:.1rem 0}.snap-card p{font-size:.8rem;color:#68746f;margin:.3rem 0}.snap-card>div:last-child{display:flex;gap:.4rem}.angle-grid :deep(.angle-dial){min-width:0}.foot-controls :deep(.angle-dial){grid-row:2/4;grid-column:2}.foot-controls>label:last-child{grid-column:1/-1}.summary-view .pose-editor{margin-top:3rem}@media(max-width:800px){.snap-card{align-items:flex-start;flex-direction:column}}
.height-label{fill:#596762;text-anchor:middle;font:700 10px system-ui}.height-control{display:grid;grid-template-columns:80px 1fr auto;align-items:center;gap:.4rem;margin-top:.65rem;font-size:.72rem}.sequence-check{margin-top:.8rem;padding:.7rem;background:#f7f8f6;border-radius:8px;font-size:.74rem}.sequence-check p{margin:.3rem 0 0}.sequence-check ul{margin:.35rem 0 0;padding-left:1rem;color:#9b4332}.sequence-check .ok{color:#286159}
.shared-height{position:relative;margin:.9rem 0;padding:.75rem;background:#f5f7f5;border-radius:9px}.shared-height strong{display:block;font-size:.78rem}.shared-height input{width:100%;margin:.45rem 0 .1rem;accent-color:#315f58}.shared-height::after{content:'';position:absolute;left:50%;top:38px;width:2px;height:13px;background:#315f58;pointer-events:none}.shared-height>div{display:grid;grid-template-columns:1fr 1fr 1fr;font-size:.68rem;color:#697570}.shared-height>div b{text-align:center;color:#26433d}.shared-height>div span:last-child{text-align:right}.shared-height output{display:block;text-align:center;font-size:.68rem;color:#52605b}
.load-mode{display:flex;align-items:center;gap:.45rem;flex-wrap:wrap;border:0;padding:0;margin:.8rem 0}.load-mode legend{font-size:.75rem;font-weight:750;margin-bottom:.35rem}.load-mode label{font-size:.69rem;border:1px solid #d5dcd8;border-radius:999px;padding:.3rem .45rem}.load-mode input{accent-color:#315f58}.load-mode button{margin-left:auto;font-size:.68rem;padding:.3rem .45rem}.sequence-check li{margin:.5rem 0}.sequence-check li div{display:flex;gap:.3rem;margin-top:.3rem}.sequence-check li button{font-size:.65rem;padding:.25rem .4rem}
.movement-workspace{margin-top:1.4rem;padding:1rem 1.2rem;background:#f4f6f3;border:1px solid #d9dfdc;border-radius:12px}.movement-current{display:flex;align-items:end;gap:.6rem;flex-wrap:wrap}.movement-current label{display:grid;gap:.3rem;flex:1;min-width:220px;font-size:.72rem;font-weight:750}.movement-current input{box-sizing:border-box;width:100%;padding:.55rem .65rem;border:1px solid #c8d1cc;border-radius:7px;font:inherit}.movement-library{display:flex;align-items:center;gap:.4rem;flex-wrap:wrap;margin-top:.8rem;padding-top:.8rem;border-top:1px solid #d9dfdc}.movement-library>strong{width:100%;font-size:.75rem}.movement-library>div{display:flex}.movement-library>div button:first-child{border-radius:8px 0 0 8px}.movement-library>div.active button:first-child{background:#243e39;color:#fff}.movement-library .delete{border-left:0;border-radius:0 8px 8px 0}.movement-library .export-set{margin-left:auto}.movement-workspace>p{margin:.65rem 0 0;color:#68746f;font-size:.72rem}@media(max-width:600px){.movement-current{align-items:stretch;flex-direction:column}.movement-current label{min-width:0}.movement-library .export-set{margin-left:0;width:100%}}
</style>
