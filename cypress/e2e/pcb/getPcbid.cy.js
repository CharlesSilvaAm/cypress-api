describe('GET/ Pcb', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
    })

    it('search a pcb id list', function () {
        const loginAuth = this.users.authlogin
        const create_pcb = this.createuser.create_pcb

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(create_pcb, token)
                    .then(response => {
                        expect(response.status).to.eq(201)

                        cy.getPcb(token)
                            .then(response => {
                                expect(response.status).to.eq(200)
                                expect(response.body.data).to.be.an('array');
                                const getPcb_Id = response.body.data[0].id

                                cy.getPcbById(token, getPcb_Id)
                                    .then(response => {
                                        expect(response.status).to.eq(200);
                                        expect(response.body.id).to.eq(getPcb_Id)
                                    })


                            })

                    })


            })
    })
})