import process from 'node:process'
import boxen from 'boxen'
import chalk from 'chalk'

const NAME = 'Patrick Kahl'
const HANDLE = 'kahl-dev'
const TITLE = 'Senior Fullstack Developer'
const COMPANY = 'LOUIS INTERNET'
const COMMAND = 'npx kahl-dev'
const TAGLINE = 'Terminal-native. Writing code since 2002. Catppuccin everywhere.'

const catppuccin = {
  mauve: chalk.hex('#cba6f7'),
  text: chalk.hex('#cdd6f4'),
  lavender: chalk.hex('#b4befe'),
  green: chalk.hex('#a6e3a1'),
  subtext0: chalk.hex('#a6adc8'),
}

function hyperlink(url: string, label: string) {
  if (!process.stdout.isTTY)
    return label
  return `\x1B]8;;${url}\x07${label}\x1B]8;;\x07`
}

const links = [
  { label: 'GitHub', url: 'https://github.com/kahl-dev' },
  { label: 'Web', url: 'https://kahl.dev' },
  { label: 'CodePen', url: 'https://codepen.io/kahl-dev' },
]

const setup = [
  ['Editor', 'Neovim + LazyVim'],
  ['Terminal', 'Ghostty'],
  ['Shell', 'Zsh + Starship'],
  ['Theme', 'Catppuccin Mocha'],
  ['Font', 'JetBrains Mono Nerd Font'],
  ['AI', 'Claude Code'],
  ['Stack', 'TypeScript, Vue, Nuxt, Node'],
] as const

function displayUrl(url: string) {
  return url.replace('https://', '')
}

function renderLinks(padding: string, labelWidth: number) {
  return links.map(({ label, url }) =>
    `${padding}${catppuccin.mauve(label.padEnd(labelWidth))}${catppuccin.text(hyperlink(url, displayUrl(url)))}`,
  )
}

function renderCard() {
  const pad = '   '
  const content = [
    '',
    `${pad}${catppuccin.lavender.bold(NAME)} ${catppuccin.subtext0('/')} ${catppuccin.green(HANDLE)}`,
    `${pad}${catppuccin.text(TITLE)}`,
    `${pad}${catppuccin.subtext0('@')} ${catppuccin.text(COMPANY)}`,
    '',
    ...renderLinks(pad, 10),
    '',
    `${pad}${catppuccin.subtext0('Terminal-native. Writing code')}`,
    `${pad}${catppuccin.subtext0('   since 2002. Catppuccin everywhere.')}`,
    '',
    `${pad}${' '.repeat(8)}${catppuccin.green(`Card:  ${COMMAND}`)}`,
    '',
  ].join('\n')

  return boxen(content, {
    padding: 0,
    borderStyle: 'round',
    borderColor: '#45475a',
  })
}

function renderCompactCard() {
  return [
    '',
    catppuccin.lavender.bold(`${NAME} / ${HANDLE}`),
    catppuccin.text(TITLE),
    `${catppuccin.subtext0('@')} ${catppuccin.text(COMPANY)}`,
    '',
    ...renderLinks('', 10),
    '',
    catppuccin.subtext0(TAGLINE),
    '',
    catppuccin.green(`Card: ${COMMAND}`),
    '',
  ].join('\n')
}

function renderSetup() {
  return [
    '',
    catppuccin.lavender.bold('  Setup'),
    '',
    ...setup.map(([label, value]) =>
      `  ${catppuccin.mauve(label.padEnd(12))}${catppuccin.text(value)}`,
    ),
    '',
  ].join('\n')
}

function renderJson() {
  console.log(JSON.stringify({
    name: NAME,
    handle: HANDLE,
    title: TITLE,
    company: COMPANY,
    links: Object.fromEntries(links.map(({ label, url }) => [label.toLowerCase(), url])),
    command: COMMAND,
  }, null, 2))
}

function getCard() {
  const columns = process.stdout.columns ?? 80
  return columns < 60 ? renderCompactCard() : renderCard()
}

async function showMenu() {
  const { default: select } = await import('@inquirer/select')

  const answer = await select({
    message: catppuccin.mauve('What would you like to do?'),
    choices: [
      { name: 'Open GitHub', value: 'github' },
      { name: 'Open Web', value: 'web' },
      { name: 'Open CodePen', value: 'codepen' },
      { name: 'Show my setup', value: 'setup' },
      { name: 'Quit', value: 'quit' },
    ],
    theme: {
      prefix: '',
      style: {
        highlight: (text: string) => catppuccin.green(text),
      },
    },
  })

  if (answer === 'quit')
    return

  if (answer === 'setup') {
    console.log(renderSetup())
    return
  }

  const { default: open } = await import('open')
  const target = links.find(({ label }) => label.toLowerCase() === answer)
  if (!target)
    throw new Error(`Unknown link target: ${answer}`)
  await open(target.url)
}

async function main() {
  const flags = process.argv.slice(2)
  const knownFlags = ['--json', '--setup', '--no-interactive', '--help']
  const unknown = flags.find(flag => !knownFlags.includes(flag))
  if (unknown) {
    console.error(`Unknown flag: ${unknown}`)
    process.exit(1)
  }

  if (flags.includes('--help')) {
    console.log('Usage: npx kahl-dev [flags]')
    console.log('  --setup           Show dev setup')
    console.log('  --json            Structured JSON output')
    console.log('  --no-interactive  Card only, no menu')
    console.log('  --help            Show this help')
    return
  }

  if (flags.includes('--json')) {
    renderJson()
    return
  }

  console.log(getCard())

  if (flags.includes('--setup')) {
    console.log(renderSetup())
    return
  }

  if (flags.includes('--no-interactive'))
    return

  if (process.stdout.isTTY && process.stdin.isTTY)
    await showMenu()
}

main().catch((error: unknown) => {
  if (error instanceof Error && error.name === 'ExitPromptError')
    return
  console.error(error)
  process.exit(1)
})
