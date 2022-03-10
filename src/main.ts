const NAME = 'cognito'

function log(msg: string, output?: any): void {
  console.log(`<@${NAME}>: ${msg}`, output)
}

// @ts-ignore
async function start({arc, cloudformation, inventory, stage}): Promise<void> {
  const config = arc[NAME]

  if (config) {
    let defaultStages = ['staging']
    const configuredPragmas = []

    // Parse project manifest @cognito options
    for (const option of config) {
      if (Array.isArray(option)) {
        if (option[0] === 'environments') {
          defaultStages = [...option.slice(1)]
        } else {
          log('Invalid config:', option)
        }
      } else if (typeof option === 'string') {
        configuredPragmas.push(option)
      } else {
        log('Invalid config:', option)
      }
    }

    if (!defaultStages.includes(stage)) {
      log(`"${stage}" environment not included in configuration.`)
      return
    }
  }
}

export default {deploy: {start}}
