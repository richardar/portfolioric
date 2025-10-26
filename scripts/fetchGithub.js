const https = require('https')
const fs = require('fs')
const path = require('path')

// Usage: node scripts/fetchGithub.js <github-username>
const username = process.argv[2] || 'richardar'
const per_page = 50

function fetchRepos(user){
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'api.github.com',
      path: `/users/${user}/repos?per_page=${per_page}&sort=pushed`,
      headers: { 'User-Agent': 'node.js' }
    }
    https.get(opts, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try{
          const json = JSON.parse(data)
          resolve(json)
        }catch(e){ reject(e) }
      })
    }).on('error', reject)
  })
}

async function main(){
  try{
    const repos = await fetchRepos(username)
    const projects = repos.filter(r => !r.fork).slice(0,12).map(r => ({
      name: r.name,
      desc: r.description || '',
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count
    }))
    const out = path.resolve(__dirname, '..', 'data')
    if(!fs.existsSync(out)) fs.mkdirSync(out)
    fs.writeFileSync(path.join(out, 'projects.json'), JSON.stringify(projects, null, 2))
    console.log('Wrote data/projects.json with', projects.length, 'projects')
  }catch(err){
    console.error('Failed to fetch repos:', err)
    process.exit(1)
  }
}

main()
