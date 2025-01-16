describe('GET /dmi', () => {

    beforeEach(function () {
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })
    it('search a new dmi', function () {
        const createitem = this.createuser.create_item
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;

                cy.postItem(createitem, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                    })
                cy.postDmi(createitem, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                    })
                cy.getDmiavaiable(token)
                    .then(response => {
                        expect(response.status).to.eq(204)
                    })

            })
    })
})