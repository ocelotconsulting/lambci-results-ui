import React from 'react'
import T from 'prop-types'

const withPreventDefault = callback =>
  e => {
    e.preventDefault()
    callback()
  }

export const BuildPagerLink = ({ onClick, disabled, children }) =>
  disabled ? (
    <span className='disabled'>{children}</span>
  ) : (
    <a href='#' onClick={withPreventDefault(onClick)}>
      {children}
    </a>
  )

BuildPagerLink.propTypes = {
  disabled: T.bool.isRequired,
  onClick: T.func.isRequired
}

BuildPagerLink.displayName = 'BuildPagerLink'

const BuildPager = ({ page, nextEnabled, previousEnabled, onPrevious, onNext }) => (
  <div className='build-pager'>
    <BuildPagerLink disabled={!previousEnabled} onClick={onPrevious}>
      <i className='fa fa-chevron-left'/>
      {' newer'}
    </BuildPagerLink>
    <span className='page-number'>
      {`page #${page}`}
    </span>
    <BuildPagerLink disabled={!nextEnabled} onClick={onNext}>
      {'older '}
      <i className='fa fa-chevron-right'/>
    </BuildPagerLink>
  </div>
)

BuildPager.displayName = 'BuildPager'

BuildPager.propTypes = {
  page: T.number.isRequired,
  nextEnabled: T.bool.isRequired,
  previousEnabled: T.bool.isRequired,
  onPrevious: T.func.isRequired,
  onNext: T.func.isRequired
}

export default BuildPager
