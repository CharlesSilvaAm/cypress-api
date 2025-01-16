describe('DELETE /causes', () => {

    beforeEach(function () {
      cy.fixture('createuser').then(function (createuser) {
        this.createuser = createuser
      })
      cy.fixture('users').then(function (users) {
        this.users = users
      })
    })
    it('delete a cause', function () {
        const createcause = this.createuser.create_cause
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
        .then(loginResponse => {
          console.log(loginResponse);
          cy.task('deleteCause', this.createuser.create_cause.description)
          const token = loginResponse.body.token;
          expect(token).not.to.be.empty;

        cy.postCause(createcause, token)
          .then(response => {
          expect(response.status).to.eq(201)
        cy.log(JSON.stringify(response.body));
    
          const causeId = response.body.id
            
        cy.deleteCauseId(`${causeId}`, token)
          .then(userResponse => {
            expect(userResponse.status).to.eq(200)
            const user = userResponse.body

            expect(user).to.have.property('id')
            expect(user).to.have.property('code')
            expect(user).to.have.property('description')
            expect(user).to.have.property('actionPlan')
            expect(user.description).to.equal('TestesApiRastreabilidade')
            expect(user.actionPlan).to.equal('RastreabilidadeTestado')
          })
            
        })
      })
    })   
})