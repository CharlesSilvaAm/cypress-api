describe('POST /login/operator_ICT', () => {

    beforeEach(function () {
      cy.fixture('users').then(function (users) {
        this.users = users
      })
    })
    it('Authorization user login ICT', function () {
  
      const ictAuth = this.users.authict
      cy.postLoginIct(ictAuth)
        .then(response => {
          const { register, token } = response.body
          expect(response.status).to.eq(200)
          cy.log(JSON.stringify(response.body))
          expect(token).not.to.be.empty
          expect(register).to.eq(ictAuth.register);  
          const user = response.body
  
          expect(user).to.have.property('token')
          expect(user).to.have.property('name')
          expect(user).to.have.property('register')
          expect(response.body.name).to.equal('operador_')
          expect(response.body.register).to.equal('operador_')
        })
    })
})
