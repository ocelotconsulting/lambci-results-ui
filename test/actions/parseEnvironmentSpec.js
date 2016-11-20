import parseEnvironment from '../../src/actions/parseEnvironment'

describe('parseEnvironment', () => {
  it('ignores blank lines', () => {
    parseEnvironment('foo=bar\n\nbar=baz').should.eql({
      foo: 'bar',
      bar: 'baz'
    })
  })

  it('ignores line when LHS is empty', () => {
    parseEnvironment('foo=').should.eql({})
  })

  it('ignores line when RHS is empty', () => {
    parseEnvironment(' = foo').should.eql({})
  })
  
  it('includes all of RHS including equal signs', () => {
    parseEnvironment('foo = bar=barbar').should.eql({
      foo: 'bar=barbar'
    })
  })
})
