# endir
Command line utility to virtually place all HTML files in a sub directory by prefixing all the absolute paths specified in a, link, img, and script with a user specified prefix.

## Installation

```shell

npm i -g endir;

```

## Usage

```shell
[user@computer tmp]$ endir -h
```

```shell
Usage: endir [options]

Options:
  -V, --version           output the version number
  -v, --verbose           Be verbose.
  -d, --dry               Dryrun, explain changes, but do not write them to disk.
  -l, --list              Prints a verbose JSON report of all changes.
  -e, --entries <list>    Tags attribute pairs to prefix (default: "a:href,link:href,img:src,script:src")
  -r, --root <directory>  Root directory of where to begin operations.
  -g, --glob <pattern>    glob pattern (default: "**/*.{html}")
  -p, --prefix <path>     directory prefix
  -h, --help              display help for command

```

```shell
[user@computer tmp]$ cat bork/root/subdir/sub.html
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My test page</title>
    <link rel="icon" type="image/png" href="/favicon.ico">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
  </head>
  <body>
    <img alt="My test image" src="/images/firefox-icon.png">
    <img alt="My test image" src="boop.png">
    <script src="/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

```shell
[user@computer tmp]$ endir --prefix /repository-name --root bork/root/;
[user@computer tmp]$ cat bork/root/subdir/sub.html;
```

```html
<!DOCTYPE html><html><head>
    <meta charset="utf-8">
    <title>My test page</title>
    <link rel="icon" type="image/png" href="/repository-name/favicon.ico">
    <link rel="stylesheet" href="/repository-name/css/bootstrap.min.css">
  </head>
  <body>
    <img alt="My test image" src="/repository-name/images/firefox-icon.png">
    <img alt="My test image" src="boop.png">
    <script src="/repository-name/js/bootstrap.bundle.min.js"></script>


</body></html>
```
