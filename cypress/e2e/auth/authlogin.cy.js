describe('POST /login', () => {

  beforeEach(function () {
    cy.fixture('users').then(function (users) {
      this.users = users
    })
  })
  it('Authorization user login', function () {

    const loginAuth = this.users.authlogin
    cy.postLogin(loginAuth)
      .then(response => {
        const { register, token } = response.body
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
        expect(token).not.to.be.empty
        expect(register).to.eq(loginAuth.login);
        const user = response.body

        expect(user).to.have.property('token')
        expect(user).to.have.property('name')
        expect(user).to.have.property('register')
        expect(response.body.name).to.equal('ti')
        expect(response.body.register).to.equal('ti')
      })
  })
  it('invalid password', function () {
    const loginAuth = this.users.inv_pass
    cy.postLogin(loginAuth)
     .then(response => {
       expect(response.status).to.eq(200)
    cy.log(JSON.stringify(response.body))
    })
})
  it('register not found', function () {
    const loginAuth = this.users.register_404
    cy.postLogin(loginAuth)
      .then(response => {
        expect(response.status).to.eq(404)
      cy.log(JSON.stringify(response.body))
    })
  })
})