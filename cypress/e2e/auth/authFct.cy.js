describe('POST /login/operator_FCT', () => {

    beforeEach(function () {
      cy.fixture('users').then(function (users) {
        this.users = users
      })
    })
    it('Authorization user login FCT', function () {
  
      const fctAuth = this.users.authfct
      cy.postLoginFct(fctAuth)
        .then(response => {
          const { register, token } = response.body
          expect(response.status).to.eq(200)
          cy.log(JSON.stringify(response.body))
          expect(token).not.to.be.empty
          expect(register).to.eq(fctAuth.register);  
          const user = response.body
  
          expect(user).to.have.property('token')
          expect(user).to.have.property('name')
          expect(user).to.have.property('register')
          expect(response.body.name).to.equal('operador')
          expect(response.body.register).to.equal('operador')
        })
    })
})
