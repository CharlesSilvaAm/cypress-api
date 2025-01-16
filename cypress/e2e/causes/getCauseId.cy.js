describe('GET /Cause id', () => {

    beforeEach(function () {
      cy.fixture('searchusers').then(function (searchusers) {
        this.searchusers = searchusers
      })
    //   cy.fixture('editation').then(function (editation) {
    //     this.editation = editation
    // })
      cy.fixture('users').then(function (users) {
        this.users = users
      })
    })
    it('search a cause id', function () {
        const listCause = this.searchusers.searchcause
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
        .then(loginResponse => {
          console.log(loginResponse);
          const token = loginResponse.body.token;
          expect(token).not.to.be.empty;

          cy.getCause( listCause, token )
          .then(response => {
            expect(response.status).to.eq(200)
              const userList = response.body.data;

            let desiredUser = null;
            for (const user of userList) {
              if (user.description === 'RastreabilidadeApi') {
                desiredUser = user;
                break;
              }
            }
            if (desiredUser) {
              const causeId = desiredUser.id;
            //   cy.task('deleteItem', this.editation.updateitem.material)
              cy.getCauseId(`${causeId}`, token)
              .then(userResponse => {
                expect(userResponse.status).to.eq(200)
                const user = userResponse.body

                expect(user).to.have.property('id')
                expect(user).to.have.property('code')
                expect(user).to.have.property('description')
                expect(user).to.have.property('actionPlan')
                expect(user.description).to.equal('RastreabilidadeApi')
                expect(user.actionPlan).to.equal('PA')
              })
             }
            })
          })
        })
    })
              
