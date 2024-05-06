git fetch --prune
git checkout gh-pages
git rebase origin/main
ng build --output-path docs --base-href https://guigui-payfit.github.io/portfolio/
mv docs/browser/* docs
rm -r docs/browser
git add docs
git commit --amend --no-edit
git push -f