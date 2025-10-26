const https = require('https')
const fs = require('fs')
const path = require('path')

const repos = [
  'richardar/DSML-Fin',
  'richardar/konectapp',
  'richardar/Gesture_based_Authentication',
  'richardar/facialAttendence'
]

function ghGet(pathname, accept){
  return new Promise((resolve,reject)=>{
    const opts = {hostname:'api.github.com', path: pathname, headers:{'User-Agent':'node.js'}}
    if(accept) opts.headers.Accept = accept
    https.get(opts, res=>{
      let data = ''
      res.on('data', c=> data+=c)
      res.on('end', ()=>{
        if(res.statusCode >= 400) return reject(new Error('HTTP '+res.statusCode+': '+data))
        resolve(data)
      })
    }).on('error', reject)
  })
}

async function fetchRepo(full){
  const [owner, repo] = full.split('/')
  const metaRaw = await ghGet(`/repos/${owner}/${repo}`)
  const meta = JSON.parse(metaRaw)
  let readme = ''
  try{
    readme = await ghGet(`/repos/${owner}/${repo}/readme`, 'application/vnd.github.v3.raw')
  }catch(e){ readme = '' }
  const excerpt = (readme || '').replace(/\r?\n/g,' ').slice(0,400)
  const image = `https://opengraph.githubassets.com/1/${owner}/${repo}`
  return {
    name: meta.name,
    full_name: meta.full_name,
    desc: meta.description || '',
    url: meta.html_url,
    language: meta.language,
    stars: meta.stargazers_count,
    forks: meta.forks_count,
    updated_at: meta.pushed_at,
    image,
    readme_excerpt: excerpt
  }
}

async function main(){
  const out = []
  for(const r of repos){
    try{
      console.log('Fetching', r)
      const data = await fetchRepo(r)
      out.push(data)
    }catch(err){
      console.error('Failed', r, err.message)
    }
  }
  const dir = path.resolve(__dirname, '..', 'data')
  if(!fs.existsSync(dir)) fs.mkdirSync(dir)
  fs.writeFileSync(path.join(dir,'projects.json'), JSON.stringify(out, null, 2))
  console.log('Wrote data/projects.json')
}

main()
