/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import Swal from 'sweetalert2'

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(router);
  const options = {
  };
  
  window.Swal = Swal.mixin(options);
}
