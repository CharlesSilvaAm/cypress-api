describe('PUT /api/items/id', () => {
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
    it('Edit item by id', function () {
        const createitem = this.createuser.create_item
        const loginAuth = this.users.authlogin
        const updateitem = this.editation.updateitem

        cy.postLogin(loginAuth)
        .then(loginResponse => {
          console.log(loginResponse)
          cy.task('deleteItem', this.createuser.create_item.grn)
          .then(() => {
          const token = loginResponse.body.token
          expect(token).not.to.be.empty

          cy.postItem(createitem, token)
          .then(response => {
          expect(response.status).to.eq(201)
          cy.log(JSON.stringify(response.body));
          cy.task('deleteItem', this.editation.updateitem.grn)
          
          const itemId = response.body.id
            
              cy.putItemId(updateitem, `${itemId}`, token)
                .then(response => {
                  expect(response.status).to.eq(200)
                  const user = response.body

                  expect(user).to.have.property('id')
                  expect(user).to.have.property('grn')
                  expect(user).to.have.property('material')
                  expect(user).to.have.property('material_descr')
                  expect(user.grn).to.equal('JV123456789')
                  expect(user.material).to.equal('testeRastreabilidadeAPI')
                    })
                })
            })
        })
    })
})