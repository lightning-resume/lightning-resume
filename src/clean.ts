#!/usr/bin/env node
import path from 'path';
import fs from 'fs';


const templatesPath = path.resolve('/tmp/linkedin-resume-templates');
fs.rmSync(templatesPath, { recursive: true, force: true });
console.info(`Cleaned templates directory: ${templatesPath}`);
