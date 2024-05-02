# Portfolio

This is the eighth project (P8) of the OpenClassrooms web developer training.

## How to start the app

Pre-requisites:

- You must have [`Node.js`](https://nodejs.org/en) installed on your machine.
- You must have the `yarn` package manager installed on your machine. You can install it with `npm` (which comes bundled with Node.js when you install it on your system) by running the following command in your terminal:

```shell
npm install --global yarn
```

Once all pre-requisites are installed on your machine, run the following command at the root of the project in your terminal:

```shell
yarn start
```

## Deploy the app on GitHub Pages

Run the following commands in your terminal at the root of the project to deploy the app on GitHub Pages:

```shell
git fetch --prune
git checkout gh-pages
git rebase origin/main
ng build --output-path docs --base-href https://guigui-payfit.github.io/portfolio/
cp docs/browser/* docs
rm -rf docs/browser
git push -f
```
