import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { webRouter } from './routes/web';
import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';

const api = new OpenAPIHono()
  .basePath('v1')
  .route('/api', webRouter)
  .doc('/spec', {
    openapi: '3.1.0',
    info: {
      title: 'Web API',
      version: '1.0.0',
    },
  })
  .get('ui', swaggerUI({
    url: '/v1/spec',
  }))

const app = new Hono()
  .route('/', api)

const port = 3000
serve({
  fetch: app.fetch,
  port
})
