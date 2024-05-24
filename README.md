# Portfolio

This is the eighth project (P8) of the OpenClassrooms web developer training.

## How to start the app

Pre-requisites:

- You must have [`Node.js`](https://nodejs.org/en) installed on your machine.
- You must have the `yarn` package manager installed on your machine. You can install it with `npm` (which comes bundled with Node.js when you install it on your system) by running the following command in your terminal:

```sh
npm install --global yarn
```

Once all pre-requisites are installed on your machine, run the following command at the root of the project in your terminal:

```sh
yarn start
```

## Deploy the app on GitHub Pages

You can visit the staging website at the following URL: https://guigui-payfit.github.io/portfolio.

### From your Linux or MacOS machine (Unix systems)

If you are on a Unix OS, run the following command in your terminal at the root of the project to deploy the app on GitHub Pages:

```sh
yarn deploy
```

### From your Windows machine

If you are on a Windows OS, run the following commands in your terminal at the root of the project to deploy the app on GitHub Pages:

```sh
git fetch --prune
git checkout gh-pages
git rebase origin/main
ng build --output-path docs --base-href https://guigui-payfit.github.io/portfolio/
mv docs/browser/* docs
rm -r docs/browser
git add docs
git commit --amend --no-edit
git push -f
```
