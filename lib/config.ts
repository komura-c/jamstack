require('dotenv').config()

function getValidConfig(
  configEnv: {
    [x: string]: any
    CTF_BLOG_POST_TYPE_ID?: string | undefined
    CTF_SPACE_ID?: string | undefined
    CTF_CDA_ACCESS_TOKEN?: string | undefined
  },
  keys: any[]
) {
  const { config, missingKeys } = keys.reduce(
    (acc, key) => {
      if (!configEnv[key]) {
        acc.missingKeys.push(key)
      } else {
        acc.config[key] = configEnv[key]
      }
      return acc
    },
    { config: {}, missingKeys: [] }
  )

  if (missingKeys.length) {
    throw new Error(`Contentful key is missing : ${missingKeys.join(', ')}`)
  }
  return config
}

export function getConfigForKeys(keys: any[]) {
  const configEnv = {
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
  }
  return getValidConfig(configEnv, keys)
}
