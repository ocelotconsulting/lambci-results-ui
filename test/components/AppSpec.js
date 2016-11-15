import React from 'react'
import {App, mapDispatchToProps} from '../../src/components/App'
import Projects from '../../src/components/Projects'
import ProjectConfig from '../../src/components/ProjectConfig'
import Builds from '../../src/components/Builds'
import {shallow} from 'enzyme'

describe('App', () => {
  let onProjectSelected, onConfigSelected, onLoadProjects, onLeaveBuildPage

  describe('component', () => {
    beforeEach(() => {
      onProjectSelected = sinon.stub()
      onConfigSelected = sinon.stub()
      onLoadProjects = sinon.stub()
      onLeaveBuildPage = sinon.stub()
    })

    const render = () => shallow(
      <App onProjectSelected={onProjectSelected} onLeaveBuildPage={onLeaveBuildPage} onConfigSelected={onConfigSelected}
           onLoadProjects={onLoadProjects}/>
    )

    const findRoute = path => {
      const routes = render().find('Router').children()

      for (let i = 0; i < routes.length; i++) {
        if (routes.at(i).prop('path') === path) return routes.at(i)
      }
      should.fail()
    }

    const invokeEventHandler = (path, eventName, params = {}) => findRoute(path).prop(eventName)({params})

    const invokeOnEnter = (path, params = {}) => invokeEventHandler(path, 'onEnter', params)

    const paths = {
      projects: '/projects',
      config: '/projects/:projectId/config',
      configBranch: '/projects/:projectId/config/:branch',
      builds: '/projects/:projectId/builds'
    }


    const addComponentTest = (path, Component) => {
      it(`renders ${Component.displayName} component`, () => {
        findRoute(path).prop('component').should.equal(Component)
      })
    }

    describe(`${paths.projects} route`, () => {
      it('invokes onLoadProjects  on enter', () => {
        invokeOnEnter(paths.projects)

        onLoadProjects.should.have.been.calledWithExactly({params: {}})
      })

      addComponentTest(paths.projects, Projects)
    })

    describe(`${paths.config} route`, () => {
      it('invokes onConfigSelected on enter', () => {
        const projectId = '42'
        invokeOnEnter(paths.config, {projectId})

        onConfigSelected.should.have.been.calledWithExactly(projectId)
      })

      addComponentTest(paths.config, ProjectConfig)
    })

    describe(`${paths.configBranch} route`, () => {
      it('invokes onConfigSelected on enter', () => {
        const projectId = '42'
        const branch = 'branch'
        invokeOnEnter(paths.configBranch, {projectId, branch})

        onConfigSelected.should.have.been.calledWithExactly(projectId, branch)
      })

      addComponentTest(paths.configBranch, ProjectConfig)
    })

    describe(`${paths.builds} route`, () => {
      it('invokes onProjectSelected on enter', () => {
        const projectId = '42'
        invokeOnEnter(paths.builds, {projectId})

        onProjectSelected.should.have.been.calledWithExactly(projectId)
      })

      it('invokes onLeaveBuildPage on leave', () => {
        invokeEventHandler(paths.builds, 'onLeave')

        onLeaveBuildPage.should.have.been.calledWithExactly({params: {}})
      })

      addComponentTest(paths.builds, Builds)
    })

  })

  describe('mapDispatchToProps', () => {
    let dispatch, props

    beforeEach(() => {
      dispatch = sinon.stub()
      props = mapDispatchToProps(props)
    })

    it('defines all props', () => {
      Object.keys({onLoadProjects, onConfigSelected, onProjectSelected, onLeaveBuildPage}).forEach(
        fnName => (typeof props[fnName]).should.equal('function')
      )
    })
  })
})

