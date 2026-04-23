publish:
	npm publish --dry-run
lint:
	npx eslint .
lint--fix:
	npx eslint . --fix
git:
	@read -p "комит name " msg; \
	read -p "patch или minor или major" mmm; \
	npm version "$$mmm"; \
	git add .; \
	git commit -m "$$msg"; \
	git push --set-upstream origin main;