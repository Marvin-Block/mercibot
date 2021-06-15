import * as config from '../../config.json';
import * as _ from 'lodash';
import * as fs from 'fs';
import chalk from "chalk";

const locale: any = {};

export function init() {
  const localeFiles: string[] = fs.readdirSync('./locale').filter((file) => file.endsWith('.json'));
  if (localeFiles.includes(config.locale + '.json')) {
    import(`../../locale/${config.locale}.json`).then( obj => {
      Object.assign(locale, obj)
      console.log(`Loading: "${chalk.blue('Locale ' + config.locale)}"`);
    });
  } else {
    console.error('specified locale file could not be found');
    process.exit(1);
  }
}

export function t(...args: any[]) {
  const key = args[0];
  // const params = [].slice.call(args, 1);
  let i = 1;
  return _.get(locale, key).replace(/%s/g, () => args[i++]);
}
