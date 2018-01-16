import { schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import promise from 'promise'
import 'isomorphic-fetch'

function getNextPageUrl(response) {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }
  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

const API_ROOT = 'https://znv8ery8od.execute-api.us-east-1.amazonaws.com/Beta/'

function postApi(endpoint, schema, body) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, {
    credentials: 'include', //pass cookies, for authentication
    method: 'post',
    headers: { 'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
    body: body
  })
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);
      const nextPageUrl = getNextPageUrl(response)

      return Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl }
      )
    })
    .then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})

    )
}

function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);
      const nextPageUrl = getNextPageUrl(response)

      return Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl }
      )
    })
    .then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})

    )
}

const numberSchema = new schema.Entity('numbers', {
  idAttribute: 'login',
})

const accountSchema = new schema.Entity('accounts', {
  idAttribute: 'name',
})

const marketSchema = new schema.Entity('markets', {
  idAttribute: 'id',
})

const addressSchema = new schema.Entity('addresses', {
  idAttribute: 'name',
})

addressSchema.define({
  owner: accountSchema,
})

numberSchema.define({
  owner: accountSchema,
})

export const fetchAddresses = body => callApi('addresses', addressSchema, body);
