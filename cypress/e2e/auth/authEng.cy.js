describe('POST /login', () => {

    beforeEach(function () {
      cy.fixture('users').then(function (users) {
        this.users = users
      })
    })
    it('Authorization user login Eng', function () {
  
      const loginEng = this.users.autheng
      cy.postLogin(loginEng)
        .then(response => {
          const { register, token } = response.body
          expect(response.status).to.eq(200)
          cy.log(JSON.stringify(response.body))
          expect(token).not.to.be.empty
          expect(register).to.eq(loginEng.login);
          const user = response.body
  
          expect(user).to.have.property('token')
          expect(user).to.have.property('name')
          expect(user).to.have.property('register')
          expect(response.body.name).to.equal('eng')
          expect(response.body.login).to.equal('eng')
        })
    })

})