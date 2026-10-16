// Prints /resume/ from the static build (out/) to public/resume.pdf with headless Chrome, so the
// PDF is the page itself. Run after `npm run build`: `npm run resume:pdf`.
import { spawn } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'

const root = resolve('out')
const target = resolve('public/resume.pdf')
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain',
}

const chromes = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const chrome = chromes.find((path) => existsSync(path))
if (!chrome) throw new Error('No Chrome found. Set CHROME_PATH.')
if (!existsSync(join(root, 'resume/index.html'))) throw new Error('Run `npm run build` first.')

const server = createServer((req, res) => {
  let path = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname))
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html')
  if (!path.startsWith(root) || !existsSync(path)) {
    res.writeHead(404).end()
    return
  }
  res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' }).end(readFileSync(path))
})

server.listen(0, '127.0.0.1', () => {
  const { port } = server.address()
  // Async, so this process keeps serving the page while Chrome loads it.
  const child = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=8000',
      `--print-to-pdf=${target}`,
      `http://127.0.0.1:${port}/resume/`,
    ],
    { stdio: 'inherit' },
  )
  child.on('exit', (code) => {
    server.close()
    if (code !== 0 || !existsSync(target)) {
      console.error('Chrome did not write the PDF.')
      process.exit(1)
    }
    console.log(`Wrote ${target}`)
  })
})
