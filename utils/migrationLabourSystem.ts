export type MigrationView = 'migration'|'demography'|'labour'|'sectors'|'agriculture'|'resources'|'feedback'|'full'

export type ModelParams = {
  endYear:number; netMigration:number; participation:number; weeklyHours:number
  productivityGrowth:number; sectorGrowth:number; careGrowth:number
  housingBuild:number; gridGrowth:number; unpaidDisplacement:number
  automation:number
  migrationMode:'manual'|'responsive'; migrationResponse:number
  sectorScales:Record<string,number>; sectorProductivity:Record<string,number>
  taxCapture:number; publicAllocation:Record<string,number>
  landConversionShare:number; releasedLandHousingShare:number; infrastructureReadiness:number; nitrogenPermitSensitivity:number
}

export type SectorResult = { potentialOutput:number; output:number; labourDemand:number; realisedLabourUse:number; resourceDemand:number; directScale:number; chainEffect:number; resourceConstraint:number; bottleneck:string; publicRevenue:number; subsidies:number; publicCost:number; publicInvestment:number; fiscalBalance:number }

export type YearResult = {
  year:number; population:number; children:number; workingAge:number; older:number
  labourSupply:number; labourDemand:number; shortage:number; careDemand:number
  households:number; homes:number; housingGap:number; gdp:number; gdpPerCapita:number
  gridDemand:number; realisedGridDemand:number; gridCapacity:number; landDemand:number; realisedLandUse:number; ecologyPressure:number
  territorialEmissions:number; consumptionFootprint:number; netMigration:number
  sectors:Record<string,SectorResult>
  publicRevenue:number; publicCosts:number; publicInvestment:number; fiscalBalance:number; fiscalSpaceIndex:number
  releasedAgriculturalLand:number; housingLandCapacity:number; permitCapacity:number; infrastructureCapacity:number; availableHousebuildingCapacity:number; desiredHousebuilding:number; realisedHousebuilding:number; housingConstraint:string
  resourceAvailability:Record<'labour'|'grid'|'land'|'ecology'|'infrastructure',number>
}

export const sectorDefinitions = [
  {id:'care',nl:'Zorg',en:'Healthcare',labour:.19,resource:.20,domestic:1,productivity:.35,revenue:.18,subsidy:.05,cost:.34,investment:.05},
  {id:'education',nl:'Onderwijs',en:'Education',labour:.11,resource:.12,domestic:1,productivity:.45,revenue:.16,subsidy:.05,cost:.38,investment:.04},
  {id:'construction',nl:'Bouw',en:'Construction',labour:.09,resource:.42,domestic:.96,productivity:1.1,revenue:.28,subsidy:.025,cost:.10,investment:.14},
  {id:'crops',nl:'Akker- en tuinbouw',en:'Crops and horticulture',labour:.035,resource:.82,domestic:.35,productivity:1.4,revenue:.22,subsidy:.08,cost:.10,investment:.05},
  {id:'livestock',nl:'Veehouderij',en:'Livestock farming',labour:.025,resource:1,domestic:.28,productivity:1.2,revenue:.20,subsidy:.10,cost:.20,investment:.08},
  {id:'industry',nl:'Industrie',en:'Industry',labour:.105,resource:.38,domestic:.38,productivity:1.35,revenue:.31,subsidy:.035,cost:.13,investment:.12},
  {id:'logistics',nl:'Logistiek',en:'Logistics',labour:.09,resource:.46,domestic:.48,productivity:1.05,revenue:.25,subsidy:.025,cost:.18,investment:.12},
  {id:'hospitalityRetail',nl:'Horeca en detailhandel',en:'Hospitality and retail',labour:.14,resource:.20,domestic:.88,productivity:.65,revenue:.25,subsidy:.025,cost:.10,investment:.04},
  {id:'business',nl:'Zakelijke dienstverlening',en:'Business services',labour:.095,resource:.10,domestic:.58,productivity:1.25,revenue:.34,subsidy:.015,cost:.06,investment:.025},
  {id:'hightech',nl:'ICT en hightech',en:'ICT and high-tech',labour:.045,resource:.08,domestic:.25,productivity:1.75,revenue:.36,subsidy:.035,cost:.08,investment:.06},
  {id:'government',nl:'Overheid en veiligheid',en:'Government and safety',labour:.07,resource:.14,domestic:1,productivity:.45,revenue:.08,subsidy:0,cost:.55,investment:.04}
] as const

const resourceSensitivity:Record<string,{labour:number;grid:number;land:number;ecology:number;infrastructure:number}> = {
  care:{labour:1,grid:.08,land:0,ecology:0,infrastructure:.25}, education:{labour:.9,grid:.08,land:.05,ecology:0,infrastructure:.2},
  construction:{labour:.85,grid:.35,land:.5,ecology:.25,infrastructure:.65}, crops:{labour:.45,grid:.25,land:1,ecology:.45,infrastructure:.35},
  livestock:{labour:.4,grid:.3,land:1,ecology:1,infrastructure:.35}, industry:{labour:.55,grid:.85,land:.2,ecology:.5,infrastructure:.65},
  logistics:{labour:.7,grid:.35,land:.35,ecology:.25,infrastructure:1}, hospitalityRetail:{labour:.9,grid:.18,land:.1,ecology:.08,infrastructure:.45},
  business:{labour:.8,grid:.12,land:.05,ecology:.02,infrastructure:.3}, hightech:{labour:.75,grid:.55,land:.08,ecology:.08,infrastructure:.45},
  government:{labour:.9,grid:.08,land:.05,ecology:0,infrastructure:.3}
}

const defaultSectorScales=Object.fromEntries(sectorDefinitions.map(s=>[s.id,100]))
const defaultSectorProductivity=Object.fromEntries(sectorDefinitions.map(s=>[s.id,s.productivity]))

export const defaults:ModelParams = {
  endYear:2050, netMigration:95000, participation:73.2, weeklyHours:30.5,
  productivityGrowth:1.0, sectorGrowth:1.35, careGrowth:1.1,
  housingBuild:85000, gridGrowth:1.8, unpaidDisplacement:22,
  automation:1,
  migrationMode:'manual', migrationResponse:18,
  sectorScales:defaultSectorScales, sectorProductivity:defaultSectorProductivity,
  taxCapture:100, publicAllocation:{housing:20,grid:20,care:15,education:12,safety:12,nature:11,reserve:10},
  landConversionShare:18, releasedLandHousingShare:30, infrastructureReadiness:100, nitrogenPermitSensitivity:55
}

export const presets:Record<string,Partial<ModelParams>> = {
  baseline:{}, lowerPopulation:{netMigration:35000}, higherPopulation:{netMigration:150000},
  productivity:{productivityGrowth:2.0,automation:2}, moreHours:{weeklyHours:33},
  techAgriculture:{sectorScales:{...defaultSectorScales,crops:108},sectorProductivity:{...defaultSectorProductivity,crops:2.2,livestock:2}}, lessLivestock:{sectorScales:{...defaultSectorScales,livestock:65}},
  hightechGrowth:{sectorScales:{...defaultSectorScales,hightech:140},sectorProductivity:{...defaultSectorProductivity,hightech:2.2}}, lessLogistics:{sectorScales:{...defaultSectorScales,logistics:65}}
}

export const register = [
  {kind:'observation',key:'population',value:'18.13 mln',source:'CBS, bevolkingsontwikkeling 2025'},
  {kind:'observation',key:'netMigration',value:'94,600',source:'CBS, bevolkingsontwikkeling 2025'},
  {kind:'observation',key:'participation',value:'73.2%',source:'CBS, Arbeidsmarkt in cijfers 2025'},
  {kind:'derived',key:'age stocks',value:'illustrative starting distribution',source:'derived/model baseline'},
  {kind:'model relation',key:'labour demand',value:'sector growth minus productivity growth, plus population demand',source:'transparent simplified relation'},
  {kind:'model assumption',key:'unpaid displacement',value:'22%',source:'user-adjustable; not an empirical estimate'},
  {kind:'model assumption',key:'resource intensities',value:'indexed sector profiles',source:'illustrative until calibrated per sector'}
  ,{kind:'model assumption',key:'fiscal intensities',value:'sector-specific revenue, subsidy, public-cost and investment indices',source:'illustrative; not euro forecasts'}
  ,{kind:'model relation',key:'public investment feedback',value:'relative fiscal space changes later housing, grid and public-service capacity',source:'bounded transparent feedback'}
  ,{kind:'model relation',key:'potential versus realised output',value:'sector demand is calculated first; the tightest weighted resource constraint then limits realised output',source:'transparent city-builder-style bottleneck relation'}
  ,{kind:'model assumption',key:'sector resource sensitivity',value:'separate weights for labour, grid, land, ecology and infrastructure',source:'illustrative and user-inspectable; not calibrated forecasts'}
  ,{kind:'model assumption',key:'land conversion',value:'only an adjustable share of released agricultural land is suitable and allocated to housing',source:'illustrative policy and suitability assumption'}
  ,{kind:'model assumption',key:'nitrogen and permits',value:'lower ecological pressure can increase permit capacity, but never bypasses other bottlenecks',source:'simplified relation; not a legal permit forecast'}
  ,{kind:'model assumption',key:'agricultural environmental path',value:'100% livestock, 100% crops and zero technology form a flat reference path; visible settings create deviations',source:'transparent didactic baseline, not an emissions forecast'}
  ,{kind:'model relation',key:'resource rationing',value:'requested capacity is calculated before proportional constraints; realised use cannot exceed available capacity',source:'transparent allocation rule, not observed market allocation'}
  ,{kind:'model relation',key:'responsive migration',value:'one tenth of the selected share of the previous year labour shortage is added annually, representing a ten-year adjustment horizon within explicit bounds',source:'scenario rule, not a behavioural estimate'}
  ,{kind:'derived',key:'housing balance timing',value:'households minus end-of-year housing stock after construction and demolition',source:'consistent annual stock-flow convention'}
]

export const parameterMetadata = {
  netMigration:{unit:'people/year',baseline:95000,validRange:[-30000,180000],directEffects:['population','working-age population'],indirectEffects:['households','housing demand','consumption','labour demand'],delayedEffects:['age structure','care demand'],assumptions:['75% of the balance enters the working-age stock'],sources:['CBS population 2025'],articleSections:['Migration is a flow','Ageing works in two directions']},
  productivityGrowth:{unit:'%/year',baseline:1,validRange:[0,3],directEffects:['output per worker'],indirectEffects:['labour demand','GDP per capita'],delayedEffects:['sector competitiveness'],assumptions:['uniform rate in the compact view'],sources:['user setting'],articleSections:['Different economies require different amounts of labour']},
  housingBuild:{unit:'homes/year',baseline:85000,validRange:[30000,150000],directEffects:['housing stock'],indirectEffects:['housing shortage'],delayedEffects:['capacity for population'],assumptions:['demolition equals 0.15% of stock'],sources:['model relation'],articleSections:['Building capacity first requires capacity']}
}

export function simulate(input:Partial<ModelParams> = {}):YearResult[] {
  const p={...defaults,...input,sectorScales:{...defaults.sectorScales,...input.sectorScales},sectorProductivity:{...defaults.sectorProductivity,...input.sectorProductivity},publicAllocation:{...defaults.publicAllocation,...input.publicAllocation}}; const out:YearResult[]=[]
  let children=3.72e6, working=10.78e6, older=3.63e6, homes=8.35e6
  let gridCapacity=100, gdp=100
  let priorShortage=0
  let priorFiscalSpace=1
  let baselineFiscalBalance:number|undefined
  for(let year=2025;year<=p.endYear;year++){
    const population=children+working+older
    const responsive=p.migrationMode==='responsive' ? Math.max(-30000,Math.min(170000,p.netMigration+priorShortage*p.migrationResponse/100/10)) : p.netMigration
    const migrants=Math.max(-working*.01,responsive)
    const births=population*.00915, deaths=children*.0003+working*.0022+older*.039
    const toWorking=children/20, toOlder=working/47
    const migrantChildren=migrants*.17, migrantWorking=migrants*.75, migrantOlder=migrants*.08
    const hoursFactor=p.weeklyHours/30.5
    const grossSupply=working*(p.participation/100)*hoursFactor
    // A share of paid capacity displaces care and other unpaid work that must
    // be replaced elsewhere. The 0.12 factor is an explicit model assumption,
    // not an empirical coefficient. It deliberately operates at all hour levels
    // so the visible control never becomes a no-op.
    const labourSupply=grossSupply*(1-p.unpaidDisplacement/100*.12)
    const popDemand=1+(population/18.13e6-1)*.55
    const ageingDemand=1+(older/3.63e6-1)*.24
    const progress=(year-2025)/(p.endYear-2025)
    const sectorIndex=Math.pow(1+p.sectorGrowth/100,year-2025)
    const sectorResults:Record<string,SectorResult>={}
    for(const s of sectorDefinitions){
      const directScale=1+((p.sectorScales[s.id]??100)/100-1)*progress
      let demandDriver=1+(popDemand-1)*s.domestic
      const allocationTotal=Object.values(p.publicAllocation).reduce((a,b)=>a+b,0)||1
      const allocation=(key:string)=>(p.publicAllocation[key]||0)/allocationTotal
      const investBoost=Math.max(-.2,Math.min(.3,priorFiscalSpace-1))
      if(s.id==='care') demandDriver*=ageingDemand*Math.pow(1+p.careGrowth/100,year-2025)*(1+investBoost*allocation('care'))
      if(s.id==='education') demandDriver*=children/3.72e6*(1+investBoost*allocation('education'))
      if(s.id==='construction') demandDriver*=.7+.3*(p.housingBuild/defaults.housingBuild)
      if(s.id==='government') demandDriver*=1+investBoost*allocation('safety')
      const scales=p.sectorScales
      let chainEffect=1
      if(s.id==='logistics') chainEffect+=(((scales.livestock??100)-100)*.0012+((scales.crops??100)-100)*.0009+((scales.industry??100)-100)*.0014)*progress
      if(s.id==='business') chainEffect+=(((scales.hightech??100)-100)*.0011+((scales.industry??100)-100)*.0006)*progress
      if(s.id==='industry') chainEffect+=((scales.construction??100)-100)*.0008*progress
      const potentialOutput=100*sectorIndex*directScale*demandDriver*Math.max(.6,chainEffect)
      const prodRate=p.productivityGrowth+(p.sectorProductivity[s.id]??s.productivity)+p.automation*.08
      const productivity=Math.pow(1+prodRate/100,year-2025)
      const labourDemand=9.42e6*s.labour*(potentialOutput/100)/productivity
      const economicBase=potentialOutput*s.labour
      const publicRevenue=economicBase*s.revenue*(p.taxCapture/100)
      const subsidies=economicBase*s.subsidy
      const publicCost=economicBase*s.cost
      const publicInvestment=economicBase*s.investment
      sectorResults[s.id]={potentialOutput,output:potentialOutput,labourDemand,realisedLabourUse:labourDemand,resourceDemand:potentialOutput*s.labour*s.resource,directScale,chainEffect,resourceConstraint:1,bottleneck:'none',publicRevenue,subsidies,publicCost,publicInvestment,fiscalBalance:publicRevenue-subsidies-publicCost-publicInvestment}
    }
    const labourDemand=Object.values(sectorResults).reduce((sum,s)=>sum+s.labourDemand,0)
    const shortage=labourDemand-labourSupply; priorShortage=shortage
    const households=population/2.12
    const careDemand=(working*.32+older*2.55+children*.42)/6e6*Math.pow(1+p.careGrowth/100,year-2025)
    // Sector targets are end-year levels. Resource and environmental effects
    // must follow the same gradual path rather than jumping to that level in 2025.
    const livestockPath=100+((p.sectorScales.livestock??100)-100)*progress
    const cropsPath=100+((p.sectorScales.crops??100)-100)*progress
    const effectiveLivestock=livestockPath
    const effectiveCrops=cropsPath
    // Agriculture is an index with 2025 = 100. Keep that scale explicit:
    // released land is otherwise accidentally calculated as if baseline were 1.
    const agri=effectiveLivestock*.65+effectiveCrops*.35
    const baselineResourceDemand=sectorDefinitions.reduce((sum,s)=>sum+100*s.labour*s.resource,0)
    const potentialResourceDemand=Object.values(sectorResults).reduce((sum,s)=>sum+s.resourceDemand,0)
    const gridDemand=96*potentialResourceDemand/baselineResourceDemand
    const landDemand=43.2*agri/100
    const technologyReduction=Math.pow(1+p.automation*.12/100,year-2025)
    const allocationTotalForImpact=Object.values(p.publicAllocation).reduce((a,b)=>a+b,0)||1
    const defaultAllocationTotal=Object.values(defaults.publicAllocation).reduce((a,b)=>a+b,0)||1
    const natureAllocationDelta=(p.publicAllocation.nature||0)/allocationTotalForImpact-(defaults.publicAllocation.nature||0)/defaultAllocationTotal
    const explicitNatureEffect=Math.max(.85,Math.min(1.15,1-natureAllocationDelta*.35))
    const agriculturalPressure=effectiveLivestock*.8+effectiveCrops*.2
    const ecologyPressure=agriculturalPressure/technologyReduction*explicitNatureEffect
    const territorialEmissions=(50+effectiveLivestock*.35+effectiveCrops*.15)/technologyReduction
    const displacedProduction=Math.max(0,100-effectiveLivestock)*.35+Math.max(0,100-effectiveCrops)*.15
    const consumptionFootprint=territorialEmissions+displacedProduction*.45
    const available={
      labour:Math.min(1,labourSupply/Math.max(1,labourDemand)),
      grid:Math.min(1,gridCapacity/Math.max(1,gridDemand)),
      land:Math.min(1,43.2/Math.max(.1,landDemand)),
      ecology:Math.min(1,100/Math.max(1,ecologyPressure)),
      infrastructure:Math.min(1,p.infrastructureReadiness/100)
    }
    for(const s of sectorDefinitions){
      const sensitivity=resourceSensitivity[s.id]
      const factors=Object.entries(available).map(([key,value])=>[key,1-sensitivity[key as keyof typeof sensitivity]*(1-value)] as const)
      const [bottleneck,resourceConstraint]=factors.sort((a,b)=>a[1]-b[1])[0]
      const result=sectorResults[s.id]
      result.resourceConstraint=Math.max(.35,Math.min(1,resourceConstraint))
      result.bottleneck=result.resourceConstraint<.995?bottleneck:'none'
      result.output=result.potentialOutput*result.resourceConstraint
      result.realisedLabourUse=result.labourDemand*result.resourceConstraint
      const economicBase=result.output*s.labour
      result.publicRevenue=economicBase*s.revenue*(p.taxCapture/100)
      result.subsidies=economicBase*s.subsidy
      result.publicCost=economicBase*s.cost
      result.publicInvestment=economicBase*s.investment
      result.fiscalBalance=result.publicRevenue-result.subsidies-result.publicCost-result.publicInvestment
    }
    const weightedPotential=Object.values(sectorResults).reduce((sum,s)=>sum+s.resourceDemand,0)
    const weightedRealised=Object.values(sectorResults).reduce((sum,s)=>sum+s.resourceDemand*s.resourceConstraint,0)
    const realisedResourceRatio=weightedPotential?weightedRealised/weightedPotential:1
    const realisedGridDemand=Math.min(gridCapacity,gridDemand*realisedResourceRatio)
    const realisedLandUse=Math.min(43.2,landDemand*realisedResourceRatio)
    const publicRevenue=Object.values(sectorResults).reduce((sum,s)=>sum+s.publicRevenue,0)
    const publicCosts=Object.values(sectorResults).reduce((sum,s)=>sum+s.publicCost+s.subsidies,0)
    const publicInvestment=Object.values(sectorResults).reduce((sum,s)=>sum+s.publicInvestment,0)
    const fiscalBalance=publicRevenue-publicCosts-publicInvestment
    baselineFiscalBalance??=fiscalBalance
    const fiscalSpaceIndex=1+(fiscalBalance-baselineFiscalBalance)/Math.max(1,Math.abs(baselineFiscalBalance))
    gdp=sectorDefinitions.reduce((sum,s)=>sum+sectorResults[s.id].output*s.labour,0)
    const releasedAgriculturalLand=Math.max(0,100-agri)
    const housingLandCapacity=90000+releasedAgriculturalLand*(p.landConversionShare/100)*(p.releasedLandHousingShare/100)*6500
    const permitCapacity=Math.max(30000,85000*(1+(100-ecologyPressure)/100*(p.nitrogenPermitSensitivity/100)))
    const infrastructureCapacity=90000*(p.infrastructureReadiness/100)*Math.max(.65,Math.min(1.25,gridCapacity/Math.max(1,gridDemand)))
    const allocationTotal=Object.values(p.publicAllocation).reduce((a,b)=>a+b,0)||1
    const fiscalBoost=Math.max(-.2,Math.min(.3,fiscalSpaceIndex-1))
    const desiredHousebuilding=p.housingBuild*(1+fiscalBoost*(p.publicAllocation.housing||0)/allocationTotal)
    const technicalCapacity=105000*Math.max(.7,Math.min(1.15,labourSupply/Math.max(1,labourDemand)))
    const availableHousebuildingCapacity=Math.min(permitCapacity,housingLandCapacity,infrastructureCapacity,technicalCapacity)
    const capacities={permit:permitCapacity,land:housingLandCapacity,infrastructure:infrastructureCapacity,labour:technicalCapacity,ambition:desiredHousebuilding}
    const realisedHousebuilding=Math.min(...Object.values(capacities))
    const housingConstraint=Object.entries(capacities).sort((a,b)=>a[1]-b[1])[0][0]
    const endHomes=homes+realisedHousebuilding-homes*.0015
    // Signed end-of-year balance: positive means a shortage, negative a surplus.
    const housingGap=households-endHomes
    out.push({year,population,children,workingAge:working,older,labourSupply,labourDemand,shortage,careDemand,households,homes:endHomes,housingGap,gdp,gdpPerCapita:gdp/(population/18.13e6),gridDemand,realisedGridDemand,gridCapacity,landDemand,realisedLandUse,ecologyPressure,territorialEmissions,consumptionFootprint,netMigration:responsive,sectors:sectorResults,publicRevenue,publicCosts,publicInvestment,fiscalBalance,fiscalSpaceIndex,releasedAgriculturalLand,housingLandCapacity,permitCapacity,infrastructureCapacity,availableHousebuildingCapacity,desiredHousebuilding,realisedHousebuilding,housingConstraint,resourceAvailability:available})
    children=Math.max(0,children+births-toWorking+migrantChildren)
    working=Math.max(0,working+toWorking-toOlder-working*.0022+migrantWorking)
    older=Math.max(0,older+toOlder-older*.039+migrantOlder)
    homes=endHomes
    gridCapacity*=1+(p.gridGrowth+fiscalBoost*(p.publicAllocation.grid||0)/allocationTotal)/100
    priorFiscalSpace=fiscalSpaceIndex
  }
  return out
}

export function causalPaths(key:string, p:ModelParams){
  const paths:Record<string,string[]>={
    housingGap:['bevolking / population → huishoudens / households','minder landbouw → potentieel beschikbare grond / less agriculture → potentially available land','minder stikstofdruk → meer potentiële vergunningruimte / lower nitrogen pressure → more potential permit capacity','minimum van ambitie, grond, vergunningen, ontsluiting en bouwcapaciteit → gerealiseerde bouw / minimum of ambition, land, permits, servicing and delivery → realised building','huishoudens − woningen → tekort / shortage'],
    shortage:['werkzame leeftijd × participatie × uren → aanbod / supply','sectorvraag ÷ productiviteit → vraag / demand','vraag − aanbod → tekort / shortage'],
    ecologyPressure:['sectoromvang × resource-intensiteit','veehouderij → lokale/regionale druk','krimp kan territoriale druk verlagen maar invoer verschuiven'],
    fiscalBalance:['sectorproductie × fiscale opbrengstintensiteit','− subsidies en lopende publieke lasten','− benodigde publieke investeringen','saldo beïnvloedt toekomstige capaciteit, niet automatisch maatschappelijke waarde'],
    population:[p.migrationMode==='responsive'?'arbeidskrapte → gedeeltelijke migratierespons':'ingesteld migratiesaldo','geboorte − sterfte + migratiesaldo','leeftijdsovergangen veranderen de samenstelling']
  }; return paths[key]||paths.shortage
}
