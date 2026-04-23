publish:
	npm publish --dry-run
lint:
	npx eslint .
lint--fix:
	npx eslint . --fix
git:
	@read -p "комит name " msg; \
	git add .; \
	git commit -m "$$msg"; \
	git push --set-upstream origin main;