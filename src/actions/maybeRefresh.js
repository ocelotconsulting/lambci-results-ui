import refreshBuildsLater from './refreshBuildsLater'

export default ({projectId, state, dispatch}) => {
  const {value, paging: {page}} = state.builds
  const selectedProjectId = state.projects.selected.id

  if (value && page === 1 && projectId === selectedProjectId) {
    dispatch(refreshBuildsLater())
  }
}
