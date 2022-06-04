include .env

NPM_BIN := $(shell npm bin)

.PHONY: all
all: \
	schemas/contentful/client.generated.ts \
	schemas/bff/server.generated.ts \
	schemas/bff/client.generated.ts \
	lib/$path.ts \

schemas/contentful/schema.graphql:
	@npx get-graphql-schema \
		--header "Authorization=Bearer $(CONTENTFUL_ACCESS_TOKEN)" \
			"https://graphql.contentful.com/content/v1/spaces/$(CONTENTFUL_SPACE_ID)/environments/$(CONTENTFUL_ENVIRONMENT)" \
		> schemas/contentful/schema.graphql
	@echo Downloaded contentful schema

schemas/contentful/client.generated.ts: schemas/contentful/schema.graphql
	@$(NPM_BIN)/graphql-codegen --config schemas/contentful/codegen.yml

schemas/bff/server.generated.ts:
	@$(NPM_BIN)/graphql-codegen --config schemas/bff/codegen-server.yml

schemas/bff/client.generated.ts:
	@$(NPM_BIN)/graphql-codegen --config schemas/bff/codegen-client.yml

lib/$path.ts:
	@$(NPM_BIN)/pathpida --ignorePath .gitignore
