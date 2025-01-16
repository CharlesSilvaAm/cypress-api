describe('POST /item', () => {

    beforeEach(function () {
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })
    it('register a new item', function () {
        const createitem = this.createuser.create_item
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postItem(createitem, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                        cy.log(JSON.stringify(response.body))
                        const user = response.body
                        expect(user).to.have.property('id')
                        expect(user).to.have.property('grn')
                        expect(user).to.have.property('material')
                        expect(user).to.have.property('material_descr')
                        expect(user).to.have.property('material_group')
                        expect(user).to.have.property('vendor')
                        expect(user).to.have.property('lot')
                        expect(user).to.have.property('datecode')
                        expect(user).to.have.property('manufacturer')
                        expect(user).to.have.property('mpn')
                        expect(user).to.have.property('original_quantity')
                        expect(response.body.grn).to.equal('JV123456789')
                        expect(response.body.material).to.equal('testeRastreabilidade')
                    })
            })
    })
    it('register duplicate item', function () {
        const createitem = this.createuser.create_item
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postItem(createitem, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                    })
                cy.postItem(createitem, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        expect(response.body.title).to.eq("Item already exist")
                    })
            })
    })
    it('attempt to register item without grn', function () {
        const loginAuth = this.users.authlogin
        const itemwithoutgrn = this.createuser.item_without_grn

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;

                cy.postItem(itemwithoutgrn, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        // expect(response.body.grn).to.eq('The Grn field is required.')
                    })
            })
    })
    it('attempt to register item without material', function () {
        const loginAuth = this.users.authlogin
        const itemwithoutmaterial = this.createuser.item_without_material

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;

                cy.postItem(itemwithoutmaterial, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                    })
            })
    })
    it('attempt to register item without material group', function () {
        const loginAuth = this.users.authlogin
        const itemwithoutmaterialgroup = this.createuser.item_without_materialgroup

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;

                cy.postItem(itemwithoutmaterialgroup, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                    })
            })
    })
    it('attempt to register item without vendor', function () {
        const loginAuth = this.users.authlogin
        const itemwithoutvendor = this.createuser.item_without_vendor

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;

                cy.postItem(itemwithoutvendor, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                    })
            })
    })
    it('attempt to register item without lot', function () {
        const loginAuth = this.users.authlogin
        const itemwithoutlot = this.createuser.item_without_lot

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;

                cy.postItem(itemwithoutlot, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                    })
            })
    })
    it('register a new item operator FCT', function () {
        const createitem = this.createuser.create_item
        const loginFct = this.users.authfct

        cy.postLoginFct(loginFct)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postItem(createitem, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })
    it('register a new item operator ICT', function () {
        const createitem = this.createuser.create_item
        const loginIct = this.users.authict

        cy.postLoginIct(loginIct)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postItem(createitem, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })
    it('register a new item operator PCB', function () {
        const createitem = this.createuser.create_item
        const loginPcb = this.users.authpcb

        cy.postLoginPcb(loginPcb)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteItem', this.createuser.create_item.grn)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postItem(createitem, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })

})

