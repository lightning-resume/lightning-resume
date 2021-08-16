#!/usr/bin/env node
import shell from 'shelljs';

shell.exec('rm -rf /tmp/linkedin-resume-templates');
console.info('Cleaned!');
