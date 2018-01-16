import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

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

const numberSchema = new Schema('numbers', {
  idAttribute: 'login';
})

const accountSchema = new Schema('accounts', {
  idAttribute: 'name';
})

const marketSchema = new Schema('markets', {
  idAttribute: 'id';
})

const addressSchema = new Schema('addresses', {
  idAttribute: 'name';
})

addressSchema.define({
  owner: accountSchema;
})

numberSchema.define({
  owner: accountSchema;
})

export const fetchAddresses = body => callApi('addresses', addressSchema, body);
