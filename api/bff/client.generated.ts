import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthenticateInput = {
  password: Scalars['String'];
};

export type Authentication = {
  __typename?: 'Authentication';
  token: Scalars['String'];
  visitor: Visitor;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticate: Authentication;
};


export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};

export type Query = {
  __typename?: 'Query';
  visitor: Visitor;
};

export type Visitor = {
  __typename?: 'Visitor';
  label: Scalars['String'];
  username: Scalars['String'];
};

export type AuthenticateMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'Authentication', token: string } };

export type VisitorQueryVariables = Exact<{ [key: string]: never; }>;


export type VisitorQuery = { __typename?: 'Query', visitor: { __typename?: 'Visitor', username: string, label: string } };


export const AuthenticateDocument = gql`
    mutation Authenticate($password: String!) {
  authenticate(input: {password: $password}) {
    token
  }
}
    `;

export function useAuthenticateMutation() {
  return Urql.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument);
};
export const VisitorDocument = gql`
    query Visitor {
  visitor {
    username
    label
  }
}
    `;

export function useVisitorQuery(options?: Omit<Urql.UseQueryArgs<VisitorQueryVariables>, 'query'>) {
  return Urql.useQuery<VisitorQuery>({ query: VisitorDocument, ...options });
};