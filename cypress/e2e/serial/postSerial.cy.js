// describe('POST /Serial', () => {
//     beforeEach(function () {
//         cy.fixture('users').then(function (users) {
//             this.users = users
//         })
//         cy.fixture('createuser').then(function (createuser) {
//             this.createuser = createuser
//         })
//     })
//     it.skip('register a new serial', function () {
//         const loginAuth = this.users.authlogin
//         const create_pcb = this.createuser.create_pcb



//         cy.postLogin(loginAuth)
//             .then(loginResponse => {
//                 cy.task('deletePcb', this.createuser.create_pcb.grn);
//                 const token = loginResponse.body.token;

//                 cy.postPcb(create_pcb, token)
//                     .then(response => {
//                         expect(response.status).to.eq(201)
//                         const createId_PCB = response.body.id

//                         const createserial = {
//                             pcbId: `${createId_PCB}`,
//                             numeration: '98745632112'
//                         }

//                         cy.postSerial(createserial, token)
//                             .then(response => {
//                                 expect(response.status).to.eq(201)
//                             })


//                     })


//             })
//     })

// })