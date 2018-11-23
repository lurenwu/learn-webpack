import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;
//错误
//import不支持动态路径，是因为webpack需要先扫一遍js文件，找出里面按需加载的部分，进行按需打包，但不会关心内部的js执行上下文，也就是说，在webpack扫描的时候，js中的变量并不会计算出结果，所以import不支持动态路径
// const LazyLoad = (path)=>{
//     return Loadable({
//       loader: () => import(path),
//       loading: Loading,
//     })
//   }
  
//   const B = LazyLoad('./b.js')
  

const LazyLoad = (loader)=>{
    return Loadable({
      loader,
      loading: Loading,
    })
  }
  const B = LazyLoad(()=>import('./b.js'));
  const C = LazyLoad(()=>import('./c.js'));

export default class A extends Component{
  render(){
    return <div>
      <Router>
        <div>
          <Route path="/B" component={B}/>
          <Route path="/C" component={C}/>
          <Link to="/B">to B</Link><br/>
          <Link to="/C">to C</Link>
        </div>
      </Router>
    </div>
  }
}
ReactDom.render(<A/>,document.querySelector("#btn"))
if (module.hot) {
     module.hot.accept()
}

