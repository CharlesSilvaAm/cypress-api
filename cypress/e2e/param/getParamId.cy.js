describe('GET /param', () => {

    beforeEach(function () {
      cy.fixture('searchusers').then(function (searchusers) {
        this.searchusers = searchusers
      })
      cy.fixture('users').then(function (users) {
        this.users = users
      })
    })
    it('search a param list', function () {
        const listparam = this.searchusers.searchparam
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
        .then(loginResponse => {
          console.log(loginResponse);
          const token = loginResponse.body.token;
          expect(token).not.to.be.empty;

          cy.url().then(url => {
            const newUrl = url.concat('?Process=0');
          cy.getParam( newUrl, listparam, token )
            .then(response => {
              expect(response.status).to.eq(200)
              const userList = response.body.data;

            let desiredUser = null;
            for (const user of userList) {
              if (user.valueLog === 'test-rest-API') {
                desiredUser = user;
                break;
              }
            }
            if (desiredUser) {
              const paramId = desiredUser.id;
            
              cy.getParamId(`${paramId}`, token)
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
             }
            })
          })
        })
    })
  })
              
