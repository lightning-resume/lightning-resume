#!/usr/bin/env node
import fs from 'fs-extra';
import { convertResumeToJSON } from 'linkedin-resume-parser';
import fetch from 'node-fetch';
import path from 'path';
import shell from 'shelljs';
import yargs from 'yargs/yargs';
import { downloadRepository } from './utils';

const templatesUrl = 'https://raw.githubusercontent.com/lightning-resume/lightning-resume/main/src/templates.json';

export async function run(): Promise<void> {
  console.info('Downloading template list');
  const templates: { [name: string]: string } = await (await fetch(templatesUrl)).json();

  const argv = yargs(process.argv.slice(2))
    .options({
      input: {
        type: 'string',
        demandOption: true,
        alias: 'i',
        description: 'Global path to exported linkedin html file',
      },
      output: {
        type: 'string',
        demandOption: true,
        alias: 'o',
        description: 'Directory where build files will be created',
      },
      template: {
        type: 'string',
        demandOption: true,
        alias: 't',
        choices: Object.keys(templates),
        description: 'Template name to be used',
      },
      config: {
        type: 'string',
        demandOption: false,
        alias: 'c',
        description: 'Extra configuration json file',
      },
      debug: {
        type: 'boolean',
        alias: 'd',
        default: false,
        description: 'Show debug logs',
      },
    })
    .parseSync();

  shell.config.fatal = true;
  shell.config.silent = !argv.debug;

  // convert all paths from relative to absolute and normalize them in order to work in every OS
  const templatePath = path.resolve(`/tmp/lightning-resume/${argv.template}`);
  const templateResumePath = path.resolve(`${templatePath}/src/parsed-resume.json`);
  const templateBuildPath = path.resolve(`${templatePath}/build`);
  const inputHtmlPath = path.resolve(argv.input);
  const outputPath = path.resolve(argv.output);

  const templateUrl = (templates as { [name: string]: string })[argv.template];

  // download selected template
  if (fs.pathExistsSync(templatePath)) {
    console.info(`Using cached template from: ${templatePath}`);
  } else {
    console.info(`Downloading template: ${argv.template}`);
    await downloadRepository(templateUrl, templatePath);
    console.info(`Template cached at: ${templatePath}`);
  }
  shell.cd(templatePath);

  // install template dependencies
  console.info(`Installing template dependencies, go grab some coffee`);
  shell.exec(`npm install`);

  // parse html input file into a json and save json inside template source
  console.info(`Parsing HTML resume`);
  await convertResumeToJSON(inputHtmlPath, templateResumePath);

  // build template
  console.info(`Generating your new amazing resume`);
  shell.exec(`npm run build`);

  // clean output directory
  fs.removeSync(outputPath);

  // move template build to output directory
  fs.moveSync(templateBuildPath, outputPath);

  console.info(`All done!`);
  console.info(`Files saved at: ${outputPath}`);
}

run();
