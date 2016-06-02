import {Router, createMemoryHistory, match} from 'react-router'
import routes from 'common/routes'
import createStore from 'common/store'
import React from 'react'
import {renderToString} from 'react-dom/server'
import Provider from 'react-redux/lib/components/Provider'
import Helmet from 'react-helmet'
import ssrTemplate from './template'

export default function matchAsyncPrefetch(context, options) {
  const location = context.url

  return new Promise(resolve => {
    match({routes, location}, function(error, redirectLocation, renderProps) {
      if (error) {
        console('error')
        context.status = 500
        context.body = error.message
        resolve(true)
      }

      if (redirectLocation) {
        console('redirect')
        context.status = 302
        const {pathname, search} = redirectLocation
        context.redirect(`${pathname + search}`)
        resolve(true)
      }

      if (renderProps) {
        const store = createStore()
        const fetch = Promise.all(
          renderProps.components
            .filter(c => c && c.fetchData)
            .map(c => store.dispatch(c.fetchData()))
        )
        resolve(fetch.then(() => {
          options.state = JSON.stringify(store.getState())
          options.body = renderToString(
            <Provider store={store} key="provider">
              <Router history={createMemoryHistory()} routes={routes}/>
            </Provider>
          )
          options.head = Helmet.rewind()
          context.status = 200
          context.body = ssrTemplate(options)
        }))
      }

      resolve(true)
    })
  })
}
