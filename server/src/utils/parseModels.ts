import fs from 'fs/promises'
import Path from 'path'
const parseDir = async (path: string): Promise<string[]> => {
  const result: string[] = []
  const files: string[] = await fs.readdir(path)
  for await (const file of files) {
    const splitedFileName = file.split('.')
    if (splitedFileName[splitedFileName.length - 2] === 'model') {
      splitedFileName.pop()
      result.push(Path.join(path, splitedFileName.join('.')))
    }
    const filePath = Path.join(path, file)
    const fileStat = await fs.stat(filePath)
    if (fileStat.isDirectory()) {
      result.push(...(await parseDir(filePath)))
    }
  }
  return result
}

const parseMongooseModels = async (): Promise<void> => {
  const modelsPaths = await parseDir(Path.resolve(__dirname, '../'))
  await Promise.all(modelsPaths.map(module => import(module)))
}

export default parseMongooseModels
