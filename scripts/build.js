const path = require('path')
const fs = require('fs-extra')
const { apps, runParallel } = require('./utils')
const ora = require('ora')
const execa = require('execa')

const args = require('minimist')(process.argv.slice(2))
const targets = args._
const formats = args.formats || args.f

run()

async function run () {
  await buildAll(targets.length ? targets : apps)
}

async function buildAll (targets) {
  await runParallel(require('os').cpus().length, targets, build)
}

async function build (target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const pkg = require(`${pkgDir}/package.json`)

  // allow packages to skip build
  if (pkg.skipBuild) return

  const spinner = ora(`Building ${pkg.name} \r`).start()

  try {
    if (!formats) {
      await fs.remove(`${pkgDir}/dist`)
    }

    await execa(
      'rollup',
      [
        '-c',
        '--environment',
        [
          `TARGET:${target}`,
          formats ? `FORMATS:${formats}` : ''
        ]
          .filter(Boolean)
          .join(',')
      ],
      { stdio: 'inherit' }
    )
    spinner.succeed()
  } catch (e) {
    spinner.fail()
    console.error(e.stack)
  }
}
