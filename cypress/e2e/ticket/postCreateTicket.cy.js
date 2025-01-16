describe('POST /Ticket', () => {

    beforeEach(function () {
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })
    it('register a new Ticket', function () {
        const createticket = this.createuser.create_ticket
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postTicket(createticket, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                        cy.log(JSON.stringify(response.body))
                    })
            })
    })
    it('register duplicate Ticket', function () {
        const createticket = this.createuser.create_ticket
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postTicket(createticket, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                    })
                cy.postTicket(createticket, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        expect(response.body.title).to.eq("Causes already registered in the ticket")
                    })
            })
    })
    it('register ticket inv description', function () {
        const ticketinvdescription = this.createuser.ticket_inv_description
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;

                cy.postTicket(ticketinvdescription, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('One or more validation errors occurred.')
                        cy.contains('Description must be at least 10 characters')
                    })
            })
    })
    it('register ticket inv serial', function () {
        const ticketinvserial = this.createuser.ticket_inv_serial
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;

                cy.postTicket(ticketinvserial, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('One or more validation errors occurred.')
                        cy.contains('Serial must be at least 10 characters')
                    })
            })
    })
    it('register ticket inv causes', function () {
        const ticketinvcauses = this.createuser.ticket_inv_causes
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;

                cy.postTicket(ticketinvcauses, token)
                    .then(response => {
                        expect(response.status).to.eq(404)
                        cy.contains('Cause not found')
                    })
            })
    })
    it('register ticket spaces description', function () {
        const espacesdescript = this.createuser.ticket_spaces_descript
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;

                cy.postTicket(espacesdescript, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Description is required')
                        cy.contains('One or more validation errors occurred.')
                    })
            })
    })
    it('register ticket spaces serial', function () {
        const espacesserial = this.createuser.ticket_spaces_serial
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;

                cy.postTicket(espacesserial, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Serial is required')
                        cy.contains('One or more validation errors occurred.')
                    })
            })
    })
    it('register ticket spaces causes', function () {
        const espacescauses = this.createuser.ticket_spaces_causes
        const loginAuth = this.users.authlogin

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;

                cy.postTicket(espacescauses, token)
                    .then(response => {
                        expect(response.status).to.eq(404)
                        cy.contains('Cause not found')
                        
                    })
            })
    })
    it('register a new Ticket operator FCT', function () {
        const createticket = this.createuser.create_ticket
        const loginFct = this.users.authfct

        cy.postLoginFct(loginFct)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postTicket(createticket, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })
    it('register a new Ticket operator ICT', function () {
        const createticket = this.createuser.create_ticket
        const loginIct = this.users.authict

        cy.postLoginIct(loginIct)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postTicket(createticket, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })
    it('register a new Ticket operator PCB', function () {
        const createticket = this.createuser.create_ticket
        const loginPcb = this.users.authpcb

        cy.postLoginPcb(loginPcb)
            .then(loginResponse => {
                console.log(loginResponse)
                cy.task('deleteTicket', this.createuser.create_ticket.serial)
                const token = loginResponse.body.token;
                expect(token).not.to.be.empty;

                cy.postTicket(createticket, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })
            })
    })

})

