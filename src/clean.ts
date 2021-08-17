#!/usr/bin/env node
import shell from 'shelljs';
import path from 'path';

const templatesPath = path.resolve('/tmp/linkedin-resume-templates');

shell.exec(`rm -rf ${templatesPath}`);
console.info(`Cleaned templates directory: ${templatesPath}`);
