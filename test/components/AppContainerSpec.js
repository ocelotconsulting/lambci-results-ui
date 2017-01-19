import React from 'react'
import {App, mapDispatchToProps} from '../../src/components/AppContainer'
import ProjectsContainer from '../../src/components/ProjectsContainer'
import ConfigContainer from '../../src/components/ConfigContainer'
import BuildsContainer from '../../src/components/BuildsContainer'
import BuildContainer from '../../src/components/BuildContainer'
import {shallow} from 'enzyme'

describe('AppContainer', () => {
  let onProjectSelected, onConfigSelected, onLoadProjects, onLeaveBuildsPage, onBuildSelected

  describe('App', () => {
    beforeEach(() => {
      onProjectSelected = sinon.stub()
      onConfigSelected = sinon.stub()
      onLoadProjects = sinon.stub()
      onLeaveBuildsPage = sinon.stub()
      onBuildSelected = sinon.stub()
    })

    const render = () => shallow(
      <App onProjectSelected={onProjectSelected} onLeaveBuildsPage={onLeaveBuildsPage}
           onConfigSelected={onConfigSelected} onLoadProjects={onLoadProjects} onBuildSelected={onBuildSelected}/>
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
      builds: '/projects/:projectId/builds',
      buildReport: '/projects/:projectId/builds/:buildNum'
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

      addComponentTest(paths.projects, ProjectsContainer)
    })

    describe(`${paths.config} route`, () => {
      it('invokes onConfigSelected on enter', () => {
        const projectId = '42'
        invokeOnEnter(paths.config, {projectId})

        onConfigSelected.should.have.been.calledWithExactly(projectId)
      })

      addComponentTest(paths.config, ConfigContainer)
    })

    describe(`${paths.configBranch} route`, () => {
      it('invokes onConfigSelected on enter', () => {
        const projectId = '42'
        const branch = 'branch'
        invokeOnEnter(paths.configBranch, {projectId, branch})

        onConfigSelected.should.have.been.calledWithExactly(projectId, branch)
      })

      addComponentTest(paths.configBranch, ConfigContainer)
    })

    describe(`${paths.builds} route`, () => {
      it('invokes onProjectSelected on enter', () => {
        const projectId = '42'
        invokeOnEnter(paths.builds, {projectId})

        onProjectSelected.should.have.been.calledWithExactly(projectId)
      })

      it('invokes onLeaveBuildsPage on leave', () => {
        invokeEventHandler(paths.builds, 'onLeave')

        onLeaveBuildsPage.should.have.been.calledWithExactly({params: {}})
      })

      addComponentTest(paths.builds, BuildsContainer)
    })

    describe(`${paths.buildReport} route`, () => {
      it('invokes onBuildSelected on enter', () => {
        const projectId = 'project x'
        const buildNum = '42'
        invokeOnEnter(paths.buildReport, {projectId, buildNum})

        onBuildSelected.should.have.been.calledWithExactly(projectId, buildNum)
      })

      addComponentTest(paths.buildReport, BuildContainer)
    })
  })

  describe('mapDispatchToProps', () => {
    let dispatch, props

    beforeEach(() => {
      dispatch = sinon.stub()
      props = mapDispatchToProps(props)
    })

    it('defines all props', () => {
      Object.keys({onLoadProjects, onConfigSelected, onProjectSelected, onLeaveBuildsPage}).forEach(
        fnName => (typeof props[fnName]).should.equal('function')
      )
    })
  })
})

