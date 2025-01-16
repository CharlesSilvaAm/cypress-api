describe('PUT /api/params/id', () => {
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
    it('Edit param by id', function () {
        const createparam = this.createuser.create_param
        const loginAuth = this.users.authlogin
        const editparam = this.editation.editparam

        cy.postLogin(loginAuth)
        .then(loginResponse => {
          console.log(loginResponse)
          cy.task('deleteParam', this.createuser.create_param.valueLog)
          .then(() => {
          const token = loginResponse.body.token
          expect(token).not.to.be.empty
          

          cy.postParam( createparam, token)
          .then(response => {
            expect(response.status).to.eq(201)
            cy.log(JSON.stringify(response.body))
            const desiredParam = response.body
            const paramId = desiredParam.id

            console.log(paramId)
            
            cy.task('deleteParam', this.editation.editparam.valueLog)
              cy.putParamId(editparam, `${paramId}`, token)
                .then(response => {
                  expect(response.status).to.eq(200)
                  const user = response.body

                  expect(user).to.have.property('id')
                  expect(user).to.have.property('valueLog')
                  expect(user).to.have.property('valueConverted')
                  expect(user).to.have.property('process')
                  expect(response.body.valueLog).to.equal('test-rest-jabil')
                  expect(response.body.valueConverted).to.equal('rest-API-jabil')   
                    })
                })
            })
        })
    })
})

