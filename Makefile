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
	git commit -m "$$msg"; \
	npm version $$mmm; \
	git push origin main --follow-tags
clon:
	git pull origin main