import extract from 'extract-zip';
import fs from 'fs-extra';
import path from 'path';
import wget from 'wget-improved';

/**
 * Download repository without using git
 *
 * Example:
 *   url: https://github.com/myOrg/myRepo/archive/main.zip
 *   output: ~/my/path
 *
 * 1. download the repository as a zip to ~/my/path.zip
 * 2. unzip it to ~/my/path.
 * 3. delete this zip file
 *
 * The issue here is that the zip contains a root folder with the name of the repo
 * So the files will actually be inside ~/my/path/myRepo
 *
 * 4. move all the files up from ~/my/path/myRepo to ~/my/path
 *
 * @param url repository url
 * @param outputPath output path
 * @returns
 */
export async function downloadRepository(url: string, outputPath: string): Promise<void> {
  const zipPath = `${outputPath}.zip`;
  // download zip
  await httpDownload(url, zipPath);
  // unzip it
  await extract(zipPath, { dir: outputPath });
  // delete zip
  await fs.removeSync(zipPath);
  // move everything one directory up
  const repoName: string = fs.readdirSync(outputPath)[0];
  const deepPath = path.join(outputPath, repoName);
  const files = fs.readdirSync(deepPath);
  await Promise.all(files.map((file) => fs.move(path.join(deepPath, file), path.join(outputPath, file))));
  fs.removeSync(deepPath);
}

export function httpDownload(url: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.ensureDirSync(path.join(outputPath, '..'));

    const download = wget.download(url, outputPath);
    download.on('error', (err) => reject(err));
    download.on('end', async () => {
      resolve();
    });
  });
}
