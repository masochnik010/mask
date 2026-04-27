publish:
	npm publish --dry-run
lint:
	npx eslint .
lint--fix:
	npx eslint . --fix
git:
	@read -p "комит name: " msg; \
	read -p "patch или minor или major: " mmm; \
	git add .; \
	npm version $$mmm; \
	git commit -m "$$msg"; \
	git push --set-upstream origin main
clon:
	git pull origin main