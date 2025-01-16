describe('PUT /api/causes/id', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
        cy.fixture('editation').then(function (editation) {
            this.editation = editation
        })
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
    })
    it('Edit cause by id', function () {
        const createcause = this.createuser.create_cause
        const loginAuth = this.users.authlogin
        const updatecause = this.editation.updatecause

        cy.postLogin(loginAuth)
        .then(loginResponse => {
          console.log(loginResponse)
          cy.task('deleteCause', this.createuser.create_cause.description)
          .then(() => {
          const token = loginResponse.body.token
          expect(token).not.to.be.empty

          cy.postCause(createcause, token)
          .then(response => {
          expect(response.status).to.eq(201)
          cy.log(JSON.stringify(response.body));
          cy.task('deleteCause', this.editation.updatecause.description)
          
          const causeId = response.body.id
            
              cy.putCauseId(updatecause, `${causeId}`, token)
                .then(response => {
                  expect(response.status).to.eq(200)
                  const user = response.body

                  expect(user).to.have.property('id')
                  expect(user).to.have.property('description')
                  expect(user).to.have.property('actionPlan')
                  expect(user.description).to.equal('TestandoAPIrest')
                  expect(user.actionPlan).to.equal('APIRestTeste')
                    })
                })
            })
        })
    })
})