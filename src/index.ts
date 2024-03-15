#!/usr/bin/env node

import {program} from 'commander';
import fs from 'node:fs/promises';
import chalk from 'chalk';
import path from 'node:path';
import {glob} from 'glob';

type Config = {src: string | string[]; dest: string}[];

const PACKAGE_CONFIG_KEY = 'copy-files';

const LOG = {
	debug: (...params: any[]) => console.debug(chalk.cyan('[DEBUG]'), ...params),
	info: (...params: any[]) => console.info(chalk.blue('[INFO]'), ...params),
	log: (...params: any[]) => console.log(chalk.green('[DEBUG]'), ...params),
	error: (...params: any[]) => console.error(chalk.red('[ERROR]'), ...params),
};

(async function () {
	try {
		program.option('--package <path>');

		program.parse();

		const options = program.opts();

		LOG.info('CWD: ', process.cwd());
		LOG.info('OPTIONS: ', options);

		const pkg = await fs
			.readFile(options.package || path.join(process.cwd(), 'package.json'), 'utf-8')
			.then((res: string) => JSON.parse(res));

		if (!pkg[PACKAGE_CONFIG_KEY]) throw new Error(`package.json key "${PACKAGE_CONFIG_KEY}" not found`);

		const config = pkg[PACKAGE_CONFIG_KEY] as Config;

		await Promise.all(
			config.map(async (config) => {
				const sources = await glob(config.src);

				const statDest = await fs.stat(config.dest).catch(() => undefined);

				for (const source of sources) {
					const statSource = await fs.stat(source);

					if (statSource.isFile()) {
						const dest = statDest?.isDirectory() ? path.join(config.dest, path.basename(source)) : config.dest;

						LOG.debug('Copying', source, 'to', dest);
						await fs.cp(source, dest);
					}
				}
			}),
		);
	} catch (e: any) {
		LOG.error(e.message);
	}
})();
