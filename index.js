export default class Router {
    constructor(bind, target) {
        this.bind = bind;
        this.target = target || (bind instanceof Document ? bind.body : bind);

        // List of actions to dispatch
        this.actionsList = ['init', 'finalize'];
    }
    on(typeOrTypes, action, listener, options) {
        if (typeof typeOrTypes === 'string') {
            this.bind.addEventListener(`${Router.namespace}.${typeOrTypes}.${action}`, listener, options);
            return this;
        }
        if (typeOrTypes instanceof Array) {
            typeOrTypes.forEach(listener => this.on(listener.type, listener.action, listener.handler, listener.options));
            return this;
        }
        Object.keys(typeOrTypes).forEach((type) => {
            const listener = typeOrTypes[type];
            if ('handler' in listener) {
                this.on(type, listener.action, listener.handler, listener.options);
                return;
            }
            this.on(type, listener);
        });
        return this;
    }
    off(type, listener, options) {
        this.bind.removeEventListener(`${Router.namespace}.${type}`, listener, options);
        return this;
    }
    fire() {
        // Let's class the common init
        this.dispatch('common', 'init')

        // Let's call all the action
        let classList = Array.from(this.target.classList);
        this.actionsList.forEach((action) => {
            classList.forEach((className) => {
                this.dispatch(className, action)
            });
        })

        // Let's class the common finalize
        this.dispatch('common', 'finalize')

        return this;
    }
    ready() {
        if (document.readyState !== 'loading') {
            window.setTimeout(this.fire.bind(this), 0);
            return this;
        }
        document.addEventListener('DOMContentLoaded', this.fire.bind(this));
        return this;
    }
    dispatch(className, action) {
        this.bind.dispatchEvent(new Event(`${Router.namespace}.${className}.${action}`));
        return this;
    }
}

// Set the namespace
// and export an instance
Router.namespace = 'router';
export const router = new Router(document);
