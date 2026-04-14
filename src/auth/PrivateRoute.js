import {Route, Link} from 'react-router-dom'
import useToken from './useToken'

export default function  PrivateRoute(props){
    const [token] = useToken();
    if(!token) return <Link to='/login'/>
    return <Route {...props}/>
}