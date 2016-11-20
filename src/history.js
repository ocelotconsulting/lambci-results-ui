import {browserHistory, hashHistory} from 'react-router'
import cookies from 'js-cookie'

// for simplicity include a mock for server-side code
export default (cookies.get('lambci-ui-express') ?  browserHistory : hashHistory) || {push: () => {}}
