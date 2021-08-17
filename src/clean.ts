#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const templatesPath = path.resolve('/tmp/linkedin-resume-templates');
fs.rmSync(templatesPath, { recursive: true, force: true });
console.info(`Cleaned templates directory: ${templatesPath}`);
