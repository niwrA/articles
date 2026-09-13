export type SportDividendParams={revenue:number;dividend:number;tolerance:number;sensitivity:number;shape:number;sponsorLift:number;coverage:number;mobility:number;absorption:number;socialMultiplier:number;crowdingOut:number;administration:number;fanSensitivity:number}
export type SportDividendResult={rate:number;revenue:number;gross:number;net:number;effective:number;professional:number;grassroots:number;fan:number;total:number;marketLoss:number}

const clamp=(value:number,min=0,max=1)=>Math.max(min,Math.min(max,value))

export function calculateSportDividend(input:SportDividendParams,rate=input.dividend):SportDividendResult{
  const d=clamp(rate/100)
  const tolerance=clamp(input.tolerance/100)
  const coverage=clamp(input.coverage/100)
  const leakage=d<=tolerance?0:1-Math.exp(-input.sensitivity*Math.pow((d-tolerance)*(1+input.mobility*(1-coverage)),input.shape))
  const sponsorBonus=(input.sponsorLift/100)*d*Math.exp(-2*d)
  const revenue=input.revenue*(1-clamp(leakage,0,.98))*(1+sponsorBonus)
  const gross=d*revenue
  const net=Math.max(0,gross*(1-clamp(input.crowdingOut/100))*(1-clamp(input.administration/100)))
  const absorption=Math.max(.05,input.absorption)
  const effective=absorption*(1-Math.exp(-net/absorption))
  const professional=(1-d)*revenue
  const grassroots=input.socialMultiplier*effective
  const fan=input.revenue*.22*Math.pow(Math.max(.02,revenue/input.revenue),input.fanSensitivity)
  return{rate:rate,revenue,gross,net,effective,professional,grassroots,fan,total:professional+grassroots+fan,marketLoss:1-revenue/input.revenue}
}

export function sportDividendCurve(params:SportDividendParams){
  return Array.from({length:71},(_,rate)=>calculateSportDividend(params,rate))
}

export function sportDividendOptima(params:SportDividendParams){
  const curve=sportDividendCurve(params)
  const funding=curve.reduce((best,row)=>row.net>best.net?row:best)
  const social=curve.reduce((best,row)=>row.total>best.total?row:best)
  return{curve,funding,social}
}
