include .env

NPM_BIN := $(shell npm bin)

.PHONY: all
all: codegen/contentful.generated.ts

codegen/contentful.generated.ts:
	@$(NPM_BIN)/graphql-codegen --require dotenv/config --config codegen/contentful.yml
