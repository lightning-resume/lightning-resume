#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';

const templatesPath = path.resolve('/tmp/lightning-resume');
fs.removeSync(templatesPath);
console.info(`Cleaned templates directory: ${templatesPath}`);
