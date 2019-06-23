import { Initial } from './uitls/lock_test.js';
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
            children: []
        }
    },
}
// methods.loading(['./assets/index.css'])
const int = new Initial(o)

//初始化 路由导航
if (router.components) {
    o.DOM.div.children[0] = router.components
    int.Create(o.DOM, function() {
        console.log('DOM', o.DOM);
        
    });
    // int.AppendDoc(o.DOM)
}
//监听components的变化
int.watch(router, 'components', (v) => {
    console.log('---components', v, int);
    // document.body.innerHTML = ""
    o.DOM.div.children[0] = v
    int.Create(o.DOM);
    // int.AppendDoc(o.DOM)
})
export default int


