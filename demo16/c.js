import React,{Component} from 'react';
import { Route,Link} from 'react-router-dom';
import Loadable from 'react-loadable';
import {RouteWithSubRoutes} from './utils';

const Loading = (props) => {
  return <div>Loadingc...</div>
};

const D = Loadable({
  loader: () => import('./d.js'),
  loading: Loading,
})
const E = Loadable({
    loader: () => import('./e.js'),
    loading: Loading,
  })
// export default class C extends Component{
//   render(){
//     return <div>
//       this is C
//       <Route path="/C/D" component={D}/>
//       <Link to="/C/D">to D</Link>
//       <Link to="/C/E">to E</Link>
//     </div>
//   }
// }
export default ({ routes }) => (
    <div>
      this is C
      <Link to="/C/D">to D</Link>
      <Link to="/C/E">   to E</Link>
      <Route path="/C/D" component={D}/>
        <Route path="/C/E" component={E}/>
      {/* {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)} */}
    </div>
  );
  


