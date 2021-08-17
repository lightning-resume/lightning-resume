#!/usr/bin/env node
import path from 'path';
import shell from 'shelljs';

const templatesPath = path.resolve('/tmp/linkedin-resume-templates');

shell.exec(`rm -rf ${templatesPath}`);
console.info(`Cleaned templates directory: ${templatesPath}`);
