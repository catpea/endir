import { writeFile, readFile } from 'fs/promises';
import path from 'path';

import cheerio from 'cheerio';
import glob from 'tiny-glob';

export default main;

async function main({prefix, pattern, cwd, dry, verbose, report, entries}){
  cwd = path.resolve(cwd);

  if(dry&&verbose) console.log('DRY RUN')
  const targets = Object.fromEntries(entries.split(',').map(string=>string.trim()).map(string=>string.split(':').map(string=>string.trim())));
  if(verbose) console.log(targets);
  
  const files = await glob(pattern, {cwd, absolute:true});
  if(verbose) console.log(`Found ${files.length} matching ${cwd}: ${pattern}.`)

  for (const file of files) {
    await patch({file, prefix, cwd, dry, verbose, report, targets})
  }
}

async function patch({file, prefix, cwd, dry, verbose, report, targets}){
  const html = (await readFile(file)).toString();
  const $ = cheerio.load(html);

  for(const [selector, attribute] of Object.entries(targets)){
    $(selector).each(function (i, elem) {
      const location = $(this).attr(attribute);
      const rewrite = location?.startsWith('/');
      if(dry){
        if(rewrite&&verbose) console.log(`dry ${file}: ${location} -> ${path.join(prefix, location)}`)
        if(rewrite&&report) report.push([path.relative(cwd, file), location, path.join(prefix, location)])
      }else{
        if(rewrite) $(this).attr(attribute, path.join(prefix, location));
        if(rewrite&&report) report.push([path.relative(cwd, file), location, path.join(prefix, location)])
      }
    });
  }
  if(dry){
    if(verbose) console.log(`dry no write: ${file}`);
  }else{
    await writeFile(file, await $.html());
  }

}
