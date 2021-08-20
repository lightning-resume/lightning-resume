# :zap: Resume

[![NPM Package](https://img.shields.io/npm/v/lightning-resume.svg?style=flat-square)](https://www.npmjs.org/package/lightning-resume)

Create your resume site in a matter of seconds by using your LinkedIn profile data.

**Some benefits:**

- It is the fastest web to create your resume site
- Stop wasting so much time updating your site after you update your LinkedIn
- Many templates to choose from
- It is completely free!

## How to use

### Basic usage

1. Save your LinkedIn profile data
2. Run a simple command:

```shell
npx lightning-resume --input ~/downloads/my-resume.html --output ~/my-output-dir --template your-template
```

3. Open the `index.html` on your output directory with your browser and see the result for yourself
4. Host it wherever you want

### Wipe cache

Every time a template it used, it's repository is cached at. If you want to wipe that cache, for example, to get a template update, just run:

```shell
npx -p lightning-resume wipe
```

## How to save your LinkedIn profile data

TODO

## Extra configuration

TODO

## FAQ

**There is a weird error that I don't understand**

Try adding the flag `--debug` and see if that helps you understand, if not, please refer to our [Github issues](https://github.com/lightning-resume/lightning-resume/issues)
