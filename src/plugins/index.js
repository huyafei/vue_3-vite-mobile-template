/**
 * @name: index
 * @description: index.js
 * @date: 2022/10/20 9:54
 * @author: yf_hu
 */
const modules = import.meta.glob(["./modules/**/*.js"], { eager: true });

export default function (app) {
  for (let modulesKey in modules) {
    const module = modules[modulesKey];
    const VUE_PLUGIN_NAME = module.default?.VUE_PLUGIN_NAME;
    if (VUE_PLUGIN_NAME) {
      app.config.globalProperties[VUE_PLUGIN_NAME] = module.default;
    }
    if (module.default?.name === "default") {
      module.default(app);
    }
  }
}
