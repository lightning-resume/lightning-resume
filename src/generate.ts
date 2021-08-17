#!/usr/bin/env node
import fs from 'fs';
import { convertResumeToJSON } from 'linkedin-resume-parser';
import path from 'path';
import shell from 'shelljs';
import yargs from 'yargs/yargs';
import templates from './templates.json';

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
const templatePath = path.resolve(`/tmp/linkedin-resume-templates/${argv.template}`);
const templateResumePath = path.resolve(`${templatePath}/src/parsed-resume.json`);
const inputHtmlPath = path.resolve(argv.input);
const outputPath = path.resolve(argv.output);

export async function run(): Promise<void> {
  const templateUrl = (templates as { [name: string]: string })[argv.template];

  // clone selected template
  console.info(`Setting up template: ${argv.template}`);
  if (fs.existsSync(templatePath)) {
    console.info(`Using cached template from: ${templatePath}`);
  } else {
    shell.exec(`git clone ${templateUrl} ${templatePath}`);
  }
  shell.cd(templatePath);

  // install template dependencies
  shell.exec(`yarn install`);

  // parse html input file into a json and save json inside template source
  console.info(`Parsing HTML resume`);
  await convertResumeToJSON(inputHtmlPath, templateResumePath);

  // build template
  console.info(`Generating your new amazing resume`);
  shell.exec(`yarn build`);

  // clean output directory
  shell.exec(`rm -rf ${outputPath}`);

  // move template build to output directory
  shell.exec(`mv ${templatePath}/build ${outputPath}`);
  console.info(`All done!`);
  console.info(`Files saved at: ${outputPath}`);
}

run();
