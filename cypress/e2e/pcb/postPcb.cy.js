describe('POST /Pcb', () => {
    beforeEach(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
        cy.fixture('createuser').then(function (createuser) {
            this.createuser = createuser
        })
    })

    it('register a new pcb', function () {
        const loginAuth = this.users.authlogin
        const create_pcb = this.createuser.create_pcb

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(create_pcb, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                    })


            })
    })
    it('register duplicate pcb', function () {
        const loginAuth = this.users.authlogin
        const create_pcb = this.createuser.create_pcb

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(create_pcb, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                    })
                cy.postPcb(create_pcb, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('GRN not available')
                    })


            })
    })
    it('register pcb grn required', function () {
        const loginAuth = this.users.authlogin
        const pcbgrn = this.createuser.pcb_grn

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbgrn, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('GRN is required')
                    })


            })
    })
    it('register pcb material required', function () {
        const loginAuth = this.users.authlogin
        const pcbmaterial = this.createuser.pcb_material

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbmaterial, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Material is required')
                    })


            })
    })
    it('register pcb material descr required', function () {
        const loginAuth = this.users.authlogin
        const pcbmaterialdescr = this.createuser.pcb_material_descr

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbmaterialdescr, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Material_descr type is required')
                    })


            })
    })
    it('register pcb material group required', function () {
        const loginAuth = this.users.authlogin
        const pcbmaterialgroup = this.createuser.pcb_material_group

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbmaterialgroup, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Material_group code is required')
                    })


            })
    })
    it('register pcb vendor required', function () {
        const loginAuth = this.users.authlogin
        const pcbvendor = this.createuser.pcb_vendor

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbvendor, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Vendor identifier is required')
                    })


            })
    })
    it('register pcb lotCode required', function () {
        const loginAuth = this.users.authlogin
        const pcblotCode = this.createuser.pcb_lotCode

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcblotCode, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Lot code is required')
                    })


            })
    })
    it('register pcb datecode required', function () {
        const loginAuth = this.users.authlogin
        const pcbdatecode = this.createuser.pcb_datecode

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbdatecode, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Datecode code is required')
                    })


            })
    })
    it('register pcb manufacturer required', function () {
        const loginAuth = this.users.authlogin
        const pcbmanufacturer = this.createuser.pcb_manufacturer

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbmanufacturer, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Manufacturer code is required')
                    })


            })
    })
    it('register pcb original quantity required', function () {
        const loginAuth = this.users.authlogin
        const pcboriginalquant = this.createuser.pcb_original_quant

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcboriginalquant, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('The JSON value could not be converted to System.Decimal. Path: $.original_quantity | LineNumber: 0 | BytePositionInLine: 215.')
                    })


            })
    })
    it('register pcb inv grn', function () {
        const loginAuth = this.users.authlogin
        const pcbinvgrn = this.createuser.pcb_invgrn

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbinvgrn, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('GRN is required')
                    })


            })
    })
    it('register pcb inv material', function () {
        const loginAuth = this.users.authlogin
        const pcbinvmaterial = this.createuser.pcb_invmaterial

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbinvmaterial, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Material is required')
                    })


            })
    })
    it('register pcb inv material descr', function () {
        const loginAuth = this.users.authlogin
        const pcbinvmaterialdescr = this.createuser.pcb_invmaterialdescr

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbinvmaterialdescr, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Material_descr type is required')
                    })


            })
    })
    it('register pcb inv material group', function () {
        const loginAuth = this.users.authlogin
        const pcbinvmaterialgroup = this.createuser.pcb_invmaterialgroup

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbinvmaterialgroup, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Material_group code is required')
                    })


            })
    })
    it('register pcb inv vendor', function () {
        const loginAuth = this.users.authlogin
        const pcbinvvendor = this.createuser.pcb_inv_vendor

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbinvvendor, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Vendor identifier is required')
                    })


            })
    })
    it('register pcb inv lotCode', function () {
        const loginAuth = this.users.authlogin
        const pcbinvlotCode = this.createuser.pcb_inv_lotCode

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbinvlotCode, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Lot code is required')
                    })


            })
    })
    it('register pcb inv datecode', function () {
        const loginAuth = this.users.authlogin
        const pcbinvdatecode = this.createuser.pcb_inv_datecode

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbinvdatecode, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Datecode code is required')
                    })


            })
    })
    it('register pcb inv manufacturer', function () {
        const loginAuth = this.users.authlogin
        const pcbinvmanufacturer = this.createuser.pcb_inv_manufacturer

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbinvmanufacturer, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Manufacturer code is required')
                    })


            })
    })
    it('register pcb inv mpn', function () {
        const loginAuth = this.users.authlogin
        const pcbinvmpn = this.createuser.pcb_inv_mpn

        cy.postLogin(loginAuth)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(pcbinvmpn, token)
                    .then(response => {
                        expect(response.status).to.eq(400)
                        cy.contains('Mpn code is required')
                    })


            })
    })
    it('register a new pcb operator FCT', function () {
        const loginFct = this.users.authfct
        const create_pcb = this.createuser.create_pcb

        cy.postLoginFct(loginFct)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(create_pcb, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })


            })
    })
    it('register a new pcb operator ICT', function () {
        const loginIct = this.users.authict
        const create_pcb = this.createuser.create_pcb

        cy.postLoginIct(loginIct)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(create_pcb, token)
                    .then(response => {
                        expect(response.status).to.eq(403)
                    })


            })
    })
    it('register a new pcb operator PCB', function () {
        const loginPcb = this.users.authpcb
        const create_pcb = this.createuser.create_pcb

        cy.postLoginPcb(loginPcb)
            .then(loginResponse => {
                cy.task('deletePcb', this.createuser.create_pcb.grn);
                const token = loginResponse.body.token;

                cy.postPcb(create_pcb, token)
                    .then(response => {
                        expect(response.status).to.eq(201)
                    })


            })
    })



})