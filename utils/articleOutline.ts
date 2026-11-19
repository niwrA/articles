// Partition whole Markdown blocks; inline links, footnotes, lists and models stay intact.
type Block = string | [string, Record<string, any>, ...Block[]]
type Point = { label: string; heading: string; detail?: string; [key: string]: any }
type Section = { point: Point; blocks: Block[] }
const tag = (n: Block) => typeof n === 'string' ? '' : n[0]
const children = (n: Block) => typeof n === 'string' ? [] : n.slice(2) as Block[]
function words(n: Block): string {
  if (typeof n === 'string') return n
  if (['sup','img'].includes(tag(n))) return ''
  return children(n).map(words).join('')
}
const heading = (n: Block) => /^h[1-6]$/.test(tag(n))
const sources = (n: Block) => heading(n) && /^(notes|noten|referenties|references|further (viewing and )?reading|bronnen)(\s|$)/i.test(words(n).trim())
function excerpt(blocks: Block[], locale: string) {
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(locale,{granularity:'sentence'}) : undefined
  for (const block of blocks) {
    if (tag(block) !== 'p') continue
    const paragraph = words(block).replace(/\s+/g, ' ').trim()
    for (const {segment} of segmenter?.segment(paragraph) ?? [{segment:paragraph}]) {
      const s = segment.trim()
      if (s.length >= 38 && s.length <= 240 && !s.endsWith(':') && !s.includes('://')) return s
    }
  }
  return ''
}
export function buildArticleOutline(article: any, locale: 'nl'|'en') {
  const root: Block[] = article.body.value
  const nl = locale === 'nl'
  const opening = {label:nl?'Vertrekpunt':'Starting point', heading:article.description || article.title}
  const authored = root.some(n => tag(n) === 'article-margin-track')
  let full = article
  if (!authored) {
    const groups: Block[][] = []
    let rest = root.length
    for (const [i,n] of root.entries()) {
      if (sources(n)) { rest=i; break }
      const last=groups.at(-1)
      if (!last || (heading(n) && last.some(b=>!heading(b)))) groups.push([])
      groups.at(-1)!.push(n)
    }
    const content: Block[] = []
    for (const [i,g] of groups.entries()) {
      const h=g.filter(heading).at(-1)
      const point = !i ? opening : {label:String(i+1).padStart(2,'0'),heading:h ? words(h) : article.title,detail:excerpt(g,locale)}
      // Anchor at the beginning, never swallow the next section's heading.
      content.push(['article-margin-note',{...point,locale},g[0]],...g.slice(1))
    }
    const wide=(n:Block):Block => {
      const t=tag(n)
      if(t==='article-margin-note' && typeof n!=='string') return [t,n[1],...children(n).map(wide)]
      return (t.includes('-') || ['table','figure','iframe'].includes(t))
        ? ['div',{class:'reading-breakout'},n] : n
    }
    full={...article,body:{...article.body,value:[['article-margin-track',{},...content.map(wide)],...root.slice(rest)]}}
  }
  const sections: Section[]=[]
  function add(point:Point,blocks:Block[]){sections.push({point,blocks})}
  const flat:Block[] = full.body.value.flatMap((n:Block)=>tag(n)==='article-margin-track'?children(n):[n])
  for(const n of flat){
    if(typeof n!=='string' && tag(n)==='article-margin-note'){
      const prior=sections.at(-1)
      const before:Block[]=[]
      while(prior?.blocks.length && heading(prior.blocks.at(-1)!)) before.unshift(prior.blocks.pop()!)
      const inner=children(n)
      const payload:Block[]=n[1].anchor ? [['div',{id:n[1].anchor},...inner]] : inner
      add(n[1] as Point,[...before,...payload])
    } else if(sources(n)) add({label:nl?'Achtergrond':'Background',heading:words(n)},[n])
    else {
      if(!sections.length)add(opening,[])
      sections.at(-1)!.blocks.push(n)
    }
  }
  return {full,sections:sections.filter(s=>s.blocks.length)}
}
