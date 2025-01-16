describe('PUT/ Pcb', () => {
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

    it('edit pcb by id', function () {
        const loginAuth = this.users.authlogin
        const updatepcbid = this.editation.updatepcbid
        const create_pcb = this.createuser.create_pcb

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(create_pcb, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                    })

                cy.getPcb(token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                        expect(response.body.data).to.be.an('array');
                        const putPcb_Id = response.body.data[0].id

                        cy.putPcbId(token, putPcb_Id, updatepcbid)
                            .then(response => {
                                expect(response.status).to.eq(200);
                                expect(response.body.id).to.eq(putPcb_Id)
                            })


                    })
            })
    })
})