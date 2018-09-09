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
    query ${query}($uuid: String!) {
      ${query}(uuid: $uuid) {
        ${parseFields(fields)}
      }
    }
  `
}

export function createMutation(mutation, inputType, fields = ["uuid"]) {
  return gql`
    mutation ${mutation}($data: ${inputType}!) {
      ${mutation}(data: $data) {
        ${parseFields(fields)}
      }
    }
  `
}

export function updateMutation(mutation, inputType, fields = ["uuid"]) {
  return gql`
    mutation ${mutation}($uuid: String!, $data: ${inputType}!) {
      ${mutation}(uuid: $uuid, data: $data) {
        ${parseFields(fields)}
      }
    }
  `
}

export function destroyMutation(mutation, fields = ["uuid"]) {
  return gql`
    mutation ${mutation}($uuid: String!) {
      ${mutation}(uuid: $uuid) {
        ${parseFields(fields)}
      }
    }
  `
}
