import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import 'sinon-as-promised'

global.should = chai.should()
chai.use(chaiAsPromised)
chai.use(sinonChai)

global.sinon = sinon
global.API_URL = '/api'