include .env

NPM_BIN := $(shell npm bin)

.PHONY: schemas/contentful.graphql
schemas/contentful.graphql:
	@npx apollo client:download-schema schemas/contentful.graphql \
  	--header "Authorization: Bearer $(CONTENTFUL_ACCESS_TOKEN)" \
  	--endpoint "https://graphql.contentful.com/content/v1/spaces/$(CONTENTFUL_SPACE_ID)/environments/$(CONTENTFUL_ENVIRONMENT)" \

generated/contentful.tsx: schemas/contentful.graphql
	@$(NPM_BIN)/graphql-codegen --config codegen.yml
