describe('GET /Item id', () => {

    beforeEach(function () {
      cy.fixture('searchusers').then(function (searchusers) {
        this.searchusers = searchusers
      })
      cy.fixture('editation').then(function (editation) {
        this.editation = editation
    })
      cy.fixture('users').then(function (users) {
        this.users = users
      })
    })
    it('search a item id', function () {
        const listitem = this.searchusers.searchitems
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
        .then(loginResponse => {
          console.log(loginResponse);
          const token = loginResponse.body.token;
          expect(token).not.to.be.empty;

          cy.getItem( listitem, token )
            .then(response => {
              expect(response.status).to.eq(200)
              const userList = response.body.data;

            let desiredUser = null;
            for (const user of userList) {
              if (user.grn === 'Grn123456789') {
                desiredUser = user;
                break;
              }
            }
            if (desiredUser) {
              const itemId = desiredUser.id;
              cy.task('deleteItem', this.editation.updateitem.material)
              cy.getItemId(`${itemId}`, token)
              .then(userResponse => {
                expect(userResponse.status).to.eq(200)
                const user = userResponse.body

                expect(user).to.have.property('id')
                expect(user).to.have.property('grn')
                expect(user).to.have.property('material')
                expect(user).to.have.property('material_descr')
                expect(user.grn).to.equal('Grn123456789')
                expect(user.material).to.equal('testeRastreabilidade')
              })
             }
            })
          })
        })
    })
              
