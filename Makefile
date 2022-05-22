include .env

NPM_BIN := $(shell npm bin)

.PHONY: all
all: \
	contentful/client.generated.ts \
	bff/server.generated.ts \
	bff/client.generated.ts \
	lib/$path.ts \

contentful/schema.graphql:
	@npx get-graphql-schema \
		--header "Authorization=Bearer $(CONTENTFUL_ACCESS_TOKEN)" \
			"https://graphql.contentful.com/content/v1/spaces/$(CONTENTFUL_SPACE_ID)/environments/$(CONTENTFUL_ENVIRONMENT)" \
		> contentful/schema.graphql
	@echo Downloaded contentful schema

contentful/client.generated.ts: contentful/schema.graphql
	@$(NPM_BIN)/graphql-codegen --config contentful/codegen.yml

bff/server.generated.ts:
	@$(NPM_BIN)/graphql-codegen --config bff/codegen-server.yml

bff/client.generated.ts:
	@$(NPM_BIN)/graphql-codegen --config bff/codegen-client.yml

lib/$path.ts:
	@$(NPM_BIN)/pathpida --ignorePath .gitignore
