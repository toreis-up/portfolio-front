/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import type { App } from 'vue'
import Tres from '@tresjs/core'
import pinia from '../store'
import router from '../router'
import vuetify from './vuetify'

// Types

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(Tres)
}
