let Vue;

class KVueRouter {
  constructor(options) {
    this.$options = options;
    console.log("this.$options :>> ", this.$options);
    // 需要创建响应的current属性
    // 利用vue 的工具包的方法来实现
    Vue.util.defineReactive(this, "current", "/");
    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1);
    });
  }
}

// 挂载$router

KVueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 怎么获取根实例中的router选项
  Vue.mixin({
    // 确保根实例的时候执行
    beforeCreate() {
      console.log("this :>> ", this);
      if(this.$options.router) Vue.prototype.$router = this.$options.router;
    }
  });

  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
    }
  });

  Vue.component("router-view", {
    render(h) {
      // 获取path对应的component
      let component = null;

      this.$router.$options.routes.forEach(route => {
        if (route.path === this.$router.current) {
          component = route.component;
        }
      });
      return h(component);
    }
  });
};

export default KVueRouter;
