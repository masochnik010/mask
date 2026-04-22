publish:
	npm publish --dry-run
lint:
	npx eslint .
lint--fix:
	npx eslint . --fix
git:
	git add .
	git commit -m '1'
	git push