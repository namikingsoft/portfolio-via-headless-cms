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
  logout: Scalars['Boolean'];
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
  input: AuthenticateInput;
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'Authentication', token: string } };

export type GetVisitorQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVisitorQuery = { __typename?: 'Query', visitor: { __typename?: 'Visitor', username: string, label: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };


export const AuthenticateDocument = gql`
    mutation Authenticate($input: AuthenticateInput!) {
  authenticate(input: $input) {
    token
  }
}
    `;

export function useAuthenticateMutation() {
  return Urql.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument);
};
export const GetVisitorDocument = gql`
    query getVisitor {
  visitor {
    username
    label
  }
}
    `;

export function useGetVisitorQuery(options?: Omit<Urql.UseQueryArgs<GetVisitorQueryVariables>, 'query'>) {
  return Urql.useQuery<GetVisitorQuery, GetVisitorQueryVariables>({ query: GetVisitorDocument, ...options });
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};