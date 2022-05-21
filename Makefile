include .env

NPM_BIN := $(shell npm bin)

.PHONY: all
all: \
	api/contentful/client.generated.ts \
	api/bff/server.generated.ts \
	api/bff/client.generated.ts \

api/contentful/schema.graphql:
	@npx get-graphql-schema \
		--header "Authorization=Bearer $(CONTENTFUL_ACCESS_TOKEN)" \
			"https://graphql.contentful.com/content/v1/spaces/$(CONTENTFUL_SPACE_ID)/environments/$(CONTENTFUL_ENVIRONMENT)" \
		> api/contentful/schema.graphql
	@echo Downloaded contentful schema

api/contentful/client.generated.ts: api/contentful/schema.graphql
	@$(NPM_BIN)/graphql-codegen --config api/contentful/codegen.yml

api/bff/server.generated.ts:
	@$(NPM_BIN)/graphql-codegen --config api/bff/codegen-server.yml

api/bff/client.generated.ts:
	@$(NPM_BIN)/graphql-codegen --config api/bff/codegen-client.yml
