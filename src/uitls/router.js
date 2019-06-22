// import {Initial} from './lock_test'
import index from '../components/index.js'
import login from '../components/login.js'
import page from '../components/page.js'
function Router(o) {
    this.enter(o)
    this.before(o);
}

Router.prototype = {
    before: function (o) {
        window.addEventListener('hashchange', (e) => {
            if (!location.hash) {
                location.hash = "#/"
            } else {
                let current = o.filter((v, i) => {
                    return location.hash.slice(1) === v.path
                })
                current.length ? this.components = current[0].components : this.components = { h2: { text: '没有此页面!', css: { color: 'white' } } }
                console.log('components', current);
            }
        })
    },
    enter: function (o) {
        if (!location.hash) {
            location.hash = "#/"
        } else {
            let current = o.filter((v, i) => {
                return location.hash.slice(1) === v.path
            })
            current.length ? this.components = current[0].components : this.components = { h2: { text: '没有此页面!', css: { color: 'white' } } }
        }
    },
    components: null
}

export default new Router(
    [
        { path: '/index', components: index },
        { path: '/', components: index },
        { path: '/index', components: index },
        { path: '/login', components: login },
        { path: '/page', components: page },
    ]
);