const fs = require('fs')
const path = require('path')
let pdf
try{ pdf = require('pdf-parse') }catch(e){ pdf = null }

async function main(){
  const pdfPath = path.resolve(__dirname, '..', 'public', 'resume.pdf')
  if(!fs.existsSync(pdfPath)){
    console.error('resume.pdf not found in public/ - aborting')
    process.exit(1)
  }

  const dataBuffer = fs.readFileSync(pdfPath)
  try{
    let result = {raw:'', skills:[], experience:[], source: 'public/resume.pdf'}
    if(pdf && typeof pdf === 'function'){
      const data = await pdf(dataBuffer)
      const text = data.text || ''
      result.raw = text
      // naive parsing: find sections by keywords
      const skillsMatch = text.match(/Skills?[\s\S]{0,200}/i)
      if(skillsMatch){
        const snippet = skillsMatch[0]
        const lines = snippet.split(/\r?\n/).slice(1).join(' ').split(/[;,|•]/)
        const cleaned = lines.map(s=>s.trim()).filter(Boolean).slice(0,20)
        cleaned.forEach(k => {
          const pct = 80
          result.skills.push({name:k.replace(/\s+\(.+\)/,'').trim(), level:pct})
        })
      }

      const expMatch = text.match(/Experience[\s\S]{0,1200}/i)
      if(expMatch){
        const expText = expMatch[0]
        const items = expText.split(/\n\s*\n/).slice(1,10)
        items.forEach(it => {
          const lines = it.split(/\r?\n/).map(s=>s.trim()).filter(Boolean)
          if(lines.length){
            const title = lines[0]
            const org = lines[1] || ''
            const bullets = lines.slice(2)
            result.experience.push({role:title, org:org, period:'', bullets:bullets.slice(0,5)})
          }
        })
      }
    } else {
      // Fallback: write minimal structure so the site can render
      result.raw = ''
      result.skills = [
        {name:'Python', level:90},
        {name:'Machine Learning', level:85},
        {name:'Data Engineering', level:78}
      ]
      result.experience = [
        {role:'Software / ML Engineer', org:'Your Company', period:'2020 - Present', bullets:['See resume PDF for full details.']}
      ]
      console.warn('pdf-parse not available - wrote fallback resume data. The resume PDF is still linked for download.')
    }

    const outPath = path.resolve(__dirname, '..', 'data')
    if(!fs.existsSync(outPath)) fs.mkdirSync(outPath)
    fs.writeFileSync(path.join(outPath, 'resume.json'), JSON.stringify(result, null, 2))
    console.log('Wrote data/resume.json')
  }catch(err){
    console.error('pdf parsing failed (caught) - writing fallback data', err)
    const outPath = path.resolve(__dirname, '..', 'data')
    if(!fs.existsSync(outPath)) fs.mkdirSync(outPath)
    const result = {raw:'', skills:[{name:'Python',level:90}], experience:[], source:'public/resume.pdf'}
    fs.writeFileSync(path.join(outPath, 'resume.json'), JSON.stringify(result, null, 2))
    process.exit(0)
  }
}

main()
