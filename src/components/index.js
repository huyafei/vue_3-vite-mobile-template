/**
 * @name: index
 * @description: index.js
 * @date: 2022/10/20 9:53
 * @author: yf_hu
 */
const modules = import.meta.glob(["./**/*.vue"], { eager: true });
const prefix = "Ven";

export default function (app) {
  for (let modulesKey in modules) {
    const component = modules[modulesKey].default;
    const componentName = `${prefix}${component.name}`;
    app.component(componentName, component);
  }
}
