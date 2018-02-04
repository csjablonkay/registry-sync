import {expect} from 'chai'
import rimraf from 'rimraf'
import {synchronize} from '../src/sync'

const rootFolder = `${__dirname}/.download`

const prebuiltBinaryProperties = [
  {abi: 57, arch: 'x64', platform: 'darwin'},
  {abi: 57, arch: 'x64', platform: 'linux'},
  {abi: 48, arch: 'x64', platform: 'darwin'},
  {abi: 48, arch: 'x64', platform: 'linux'}
]

const options = {
  localUrl: 'https://localhost:8443',
  manifest: `${__dirname}/package-lock.json`,
  registryUrl: 'https://registry.npmjs.org',
  rootFolder,
  prebuiltBinaryProperties
}

describe('synchronize', () => {
  before(done => rimraf(rootFolder, done))

  it('Should download a bunch of packages', async () => {
    const downloaded = await synchronize(options)
    expect(downloaded).to.have.lengthOf(141)
  })

  it('Should already have all of the packages', async () => {
    const downloaded = await synchronize(options)
    expect(downloaded).to.have.lengthOf(0)
  })
})


