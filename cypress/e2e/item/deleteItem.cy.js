describe('DELETE /items', () => {

    beforeEach(function () {
      cy.fixture('createuser').then(function (createuser) {
        this.createuser = createuser
      })
      cy.fixture('users').then(function (users) {
        this.users = users
      })
    })
    it('delete a param', function () {
        const createitem = this.createuser.create_item
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
        .then(loginResponse => {
          console.log(loginResponse);
          cy.task('deleteItem', this.createuser.create_item.grn)
          const token = loginResponse.body.token;
          expect(token).not.to.be.empty;

        cy.postItem(createitem, token)
          .then(response => {
          expect(response.status).to.eq(201)
        cy.log(JSON.stringify(response.body));
    
          const itemId = response.body.id
            
        cy.deleteItemId(`${itemId}`, token)
          .then(userResponse => {
            expect(userResponse.status).to.eq(200)
            const user = userResponse.body

            expect(user).to.have.property('id')
            expect(user).to.have.property('grn')
            expect(user).to.have.property('material')
            expect(user).to.have.property('material_descr')
            expect(user.grn).to.equal('JV123456789')
            expect(user.material).to.equal('testeRastreabilidade')
          })
            
        })
      })
    })   
})