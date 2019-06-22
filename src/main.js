import {Initial} from './uitls/lock_test.js';
import router from './uitls/router.js'
import methods from './uitls/import.js'
let o = {
    DOM: {
        div: {
            css: {
                backgroundColor: '#343a40',
                height: '56px',
                lineHeight: '56px',
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: '0px',
            },
            append_sort: 0,
            children: [
                {
                    h2: {
                        text: 'div'
                    }
                }
            ]
        }
    },
}
const int = new Initial(o)
console.log('main', router.components);
//初始化 路由导航
if(router.components) {
    o.DOM.div.children[0] = router.components
    int.Create(o.DOM);
    int.AppendDoc(o.DOM)
}
//监听components的变化
int.watch(router, 'components', (v) => {
    console.log('---components', v, int);
    o.DOM.div.children[0] = v
    ;(function(d) {
        int.Create(d.DOM);
        int.AppendDoc(d.DOM)
    })(o)
})
export default int


