describe('DELETE /param', () => {

    beforeEach(function () {
      cy.fixture('createuser').then(function (createuser) {
        this.createuser = createuser
      })
      cy.fixture('users').then(function (users) {
        this.users = users
      })
    })
    it('delete a param', function () {
        const createparam = this.createuser.create_param
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
        .then(loginResponse => {
          console.log(loginResponse);
          cy.task('deleteParam', this.createuser.create_param.valueLog);
          const token = loginResponse.body.token;
          expect(token).not.to.be.empty;

        cy.postParam( createparam, token)
            .then(response => {
              expect(response.status).to.eq(201)
              cy.log(JSON.stringify(response.body));
    
              const paramId = response.body.id
            
              cy.deleteParamId(`${paramId}`, token)
              .then(userResponse => {
                expect(userResponse.status).to.eq(200)
                const user = userResponse.body

                expect(user).to.have.property('id')
                expect(user).to.have.property('valueLog')
                expect(user).to.have.property('valueConverted')
                expect(user).to.have.property('process')
                expect(user.valueLog).to.equal('test-rest-API')
                expect(user.valueConverted).to.equal('rest-API')
              })
            
            })
          })
        })   
    })