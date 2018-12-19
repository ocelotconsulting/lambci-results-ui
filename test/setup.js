import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

process.env.API_URL = '/api'

global.should = chai.should()
global.expect = chai.expect
chai.use(chaiAsPromised)
chai.use(sinonChai)

global.sinon = sinon

if (!global.enzymeConfigured) {
  Enzyme.configure({ adapter: new Adapter() })
  global.enzymeConfigured = true
}
