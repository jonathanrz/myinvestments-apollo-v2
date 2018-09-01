import gql from "graphql-tag"

export function getQueryKey(query) {
  return query.definitions[0].selectionSet.selections[0].name.value
}

export function parseFields(fields) {
  return fields.reduce((acc, field) => {
    if (typeof field === "string") {
      return `${acc}\n${field}`
    } else if (Array.isArray(field)) {
      return `${acc}\n${field[0]} {${parseFields(field[1])}\n}`
    }
  }, "")
}

function parseDefinitionVariables(variables) {
  return Object.keys(variables)
    .map(key => `$${key}: ${variables[key]}`)
    .join(", ")
}

function parseMappingVariables(variables) {
  return Object.keys(variables)
    .map(key => `${key}: $${key}`)
    .join(", ")
}

export function listQuery(query, fields, customVariables = {}) {
  const variables = {
    ...customVariables,
    page: "Int!",
    pageSize: "Int"
  }

  return gql`
    query ${query}(${parseDefinitionVariables(variables)}) {
      ${query}(${parseMappingVariables(variables)}) {
        totalCount
        edges {
          node {
            ${parseFields(fields)}
          }
        }
      }
    }
  `
}

export function getQuery(query, fields) {
  return gql`
    query ${query}($id: Int!) {
      ${query}(id: $id) {
        ${parseFields(fields)}
      }
    }
  `
}

export function createMutation(mutation, inputType, fields = ["id"]) {
  return gql`
    mutation ${mutation}($input: ${inputType}!) {
      ${mutation}(input: $input) {
        ${parseFields(fields)}
      }
    }
  `
}

export function updateMutation(mutation, inputType, fields = ["id"]) {
  return gql`
    mutation ${mutation}($id: Int!, $input: ${inputType}!) {
      ${mutation}(id: $id, input: $input) {
        ${parseFields(fields)}
      }
    }
  `
}

export function destroyMutation(mutation, fields = ["id"]) {
  return gql`
    mutation ${mutation}($id: Int!) {
      ${mutation}(id: $id) {
        ${parseFields(fields)}
      }
    }
  `
}
