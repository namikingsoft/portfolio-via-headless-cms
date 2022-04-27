include .env

NPM_BIN := $(shell npm bin)

.PHONY: all
all: generated/contentful.tsx

.PHONY: generated/contentful.graphql
generated/contentful.graphql:
	@npx apollo client:download-schema generated/contentful.graphql \
  	--header "Authorization: Bearer $(CONTENTFUL_ACCESS_TOKEN)" \
  	--endpoint "https://graphql.contentful.com/content/v1/spaces/$(CONTENTFUL_SPACE_ID)/environments/$(CONTENTFUL_ENVIRONMENT)" \

generated/contentful.tsx: generated/contentful.graphql
	@$(NPM_BIN)/graphql-codegen --config codegen.yml
