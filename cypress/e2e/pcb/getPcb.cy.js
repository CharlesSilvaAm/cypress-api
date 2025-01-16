describe('GET/ Pcb', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })

    it('search a pcb list', function () {
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                const token = loginResponse.body.token;

                cy.getPcb(token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                        expect(response.body.data).to.be.an('array');
                    })
            })
    })
    it('search a pcb list operator FCT', function () {
        const loginFct = this.users.authfct

        cy.postLoginFct(loginFct)
            .then(loginResponse => {
                const token = loginResponse.body.token;

                cy.getPcb(token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })
    it('search a pcb list operator ICT', function () {
        const loginIct = this.users.authict

        cy.postLoginIct(loginIct)
            .then(loginResponse => {
                const token = loginResponse.body.token;

                cy.getPcb(token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })
    it('search a pcb list operator PCB', function () {
        const loginPcb = this.users.authpcb

        cy.postLoginPcb(loginPcb)
            .then(loginResponse => {
                const token = loginResponse.body.token;

                cy.getPcb(token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                    })
            })
    })
})