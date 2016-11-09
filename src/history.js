import {browserHistory, hashHistory} from 'react-router'
import cookies from 'js-cookie'

export default cookies.get('lambci-ui-express') ?  browserHistory : hashHistory
