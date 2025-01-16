// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('postUser', (user, token) => {
    cy.api({
        method: 'POST',
        url: '/api/users',
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
})
Cypress.Commands.add('postLogin', (login) => {
    cy.api({
        url: '/api/login',
        method: 'POST',
        body: { login: login.login, password: login.password },
        failOnStatusCode: false
    }).then(response => { return response })
})
// Cypress.Commands.add('postLoginEng', (loginEng) => {
//     cy.api({
//         url: '/api/login',
//         method: 'POST',
//         body: { login: loginEng.login, password: loginEng.password },
//         failOnStatusCode: false
//     }).then(response => { return response })
// })
Cypress.Commands.add('postLoginFct', (authFct) => {
    cy.api({
        url: '/api/login/operator',
        method: 'POST',
        body: { register: authFct.register, password: authFct.password },
        failOnStatusCode: false
    }).then(response => { return response })
})
Cypress.Commands.add('postLoginIct', (ictAuth) => {
    cy.api({
        url: '/api/login/operator',
        method: 'POST',
        body: { register: ictAuth.register, password: ictAuth.password },
        failOnStatusCode: false
    }).then(response => { return response })
})
Cypress.Commands.add('postLoginPcb', (pcbAuth) => {
    cy.api({
        url: '/api/login/operator',
        method: 'POST',
        body: { register: pcbAuth.register, password: pcbAuth.password },
        failOnStatusCode: false
    }).then(response => { return response })
})
Cypress.Commands.add('getUsers', (searchusers, token) => {
    cy.api({
        url: '/api/users',
        method: 'GET',
        body: searchusers,
         headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getUserId', ( userId, token) => {
    cy.api({
        url: `/api/users/${userId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('putUser', ( edituser, userId, token) => {
    cy.api({
        url: `/api/users/${userId}`,
        method: 'PUT',
        body: edituser,
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('putEnable', ( userId, token) => {
    cy.api({
        url: `/api/users/enable/${userId}`,
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('putDisable', ( userId, token) => {
    cy.api({
        url: `/api/users/disable/${userId}`,
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('postParam', ( createparam, token ) => {
    cy.api({
        url: '/api/params',
        method: 'POST',
        body: createparam,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getParam', ( querystring, listparam, token ) => {
    cy.api({
        url: '/api/params/?Process=0',
        method: 'GET',
        body: listparam,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            URLSearchParams: querystring
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getParamId', ( paramId, token) => {
    cy.api({
        url: `/api/params/${paramId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('putParamId', ( editparam, paramId, token) => {
    cy.api({
        url: `/api/params/${paramId}`,
        method: 'PUT',
        body: editparam,
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('postItem', ( createitem, token ) => {
    cy.api({
        url: '/api/items',
        method: 'POST',
        body: createitem,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getItem', (searchitems, token) => {
    cy.api({
        url: '/api/items',
        method: 'GET',
        body: searchitems,
         headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getItemId', ( itemId, token) => {
    cy.api({
        url: `/api/items/${itemId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('deleteParamId', ( paramId, token) => {
    cy.api({
        url: `/api/params/${paramId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('putItemId', ( updateitem, itemId, token) => {
    cy.api({
        url: `/api/items/${itemId}`,
        method: 'PUT',
        body: updateitem,
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('deleteItemId', ( itemId, token) => {
    cy.api({
        url: `/api/items/${itemId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('postCause', ( createcause, token ) => {
    cy.api({
        url: '/api/causes',
        method: 'POST',
        body: createcause,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getCause', (searchcause, token) => {
    cy.api({
        url: '/api/causes',
        method: 'GET',
        body: searchcause,
         headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getCauseId', ( causeId, token) => {
    cy.api({
        url: `/api/causes/${causeId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('putCauseId', ( updatecause, causeId, token) => {
    cy.api({
        url: `/api/causes/${causeId}`,
        method: 'PUT',
        body: updatecause,
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('deleteCauseId', ( causeId, token) => {
    cy.api({
        url: `/api/causes/${causeId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('postTicket', ( createticket, token ) => {
    cy.api({
        url: '/api/tickets',
        method: 'POST',
        body: createticket,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getTicket', (listTicket, token) => {
    cy.api({
        url: '/api/tickets',
        method: 'GET',
        body: listTicket,
         headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('patchTicket', ( updateticket, token) => {
    cy.api({
        url: '/api/tickets/crd-correction',
        method: 'PATCH',
        body: updateticket,
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('patchTicketId', ( updateticketid, ticket_Id, token) => {
    cy.api({
        url: `/api/tickets/${ticket_Id}/status`,
        method: 'PATCH',
        body: updateticketid,
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('patchTicketSerial', (ticket_Serial, token) => {
    cy.api({
        url: `/api/tickets/${ticket_Serial}/submit`,
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('postPcb', ( create_pcb, token ) => {
    cy.api({
        url: '/api/pcbs',
        method: 'POST',
        body: create_pcb,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getPcb', (token) => {
    cy.api({
        url: '/api/pcbs',
        method: 'GET',
         headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getPcbById', (token, getPcb_Id) => {
    cy.api({
        url: `/api/pcbs/${getPcb_Id}`,
        method: 'GET',
         headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('putPcbId', (token, putPcb_Id, updatepcbid) => {
    cy.api({
        url: `/api/pcbs/${putPcb_Id}`,
        method: 'PUT',
        body: updatepcbid,
         headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('deletePcbId', ( pcbId, token) => {
    cy.api({
        url: `/api/pcbs/${pcbId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getPcbActive', (token) => {
    cy.api({
        url: `api/pcbs/active`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
// Cypress.Commands.add('putPcbactiveId', (token, putPcb_Active) => {
//     cy.api({
//         url: `/api/pcbs/active/${putPcb_Active}`,
//         method: 'PUT',
//         body: 
//          headers: {
//              Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//             },
//             failOnStatusCode: false
//     })
// })
Cypress.Commands.add('postDmi', (createitem, token ) => {
    cy.api({
        url: '/api/dmis',
        method: 'POST',
        body: createitem,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getDmi', (token) => {
    cy.api({
        url: 'api/dmis',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getDmiid', (token, create_Dmi) => {
    cy.api({
        url: `api/dmis/${create_Dmi}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('putDmi', (token, create_Dmi, updatedmi) => {
    cy.api({
        url: `/api/dmis/${create_Dmi}`,
        method: 'PUT',
        body: updatedmi,
         headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getDmiavaiable', (token) => {
    cy.api({
        url: 'api/dmis/avaiable-grn',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getConfig', (token) => {
    cy.api({
        url: 'api/step-config',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('postSerial', (createserial, token ) => {
    cy.api({
        url: '/api/serials',
        method: 'POST',
        body: createserial,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getConfigstep', (searchstep, token) => {
    cy.api({
        url: `api/step-config/${searchstep}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getConfiglist', (token) => {
    cy.api({
        url: 'api/step-config/list/steps',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('postCreateStep', (create_stepconfig, token ) => {
    cy.api({
        url: '/api/step-config/create',
        method: 'POST',
        body: create_stepconfig,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('postCreateGrn', (create_grnallowed, token ) => {
    cy.api({
        url: '/api/grn-allowed',
        method: 'POST',
        body: create_grnallowed,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getAllowed', (searchsteps, token) => {
    cy.api({
        url: `/api/grn-allowed/${searchsteps}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getAllowedStep', (searchmaterial, token) => {
    cy.api({
        url: `/api/grn-allowed/material/${searchmaterial}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('getAllowedListMaterial', (searchlistmaterial, token) => {
    cy.api({
        url: `http://172.16.16.73:3153/api/grn-allowed/list-materials?stepId=${searchlistmaterial}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('patchUpdateMaterial', (updatematerial, token) => {
    cy.api({
        url: '/api/grn-allowed',
        method: 'PATCH',
        body: updatematerial,
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
Cypress.Commands.add('putUpdateMaterials', (searchallowedid , updatematerials, token) => {
    cy.api({
        url: `/api/grn-allowed/${searchallowedid}`,
        method: 'PUT',
        body: updatematerials,
        headers: {
            Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
    })
})
// Cypress.Commands.add('moveVideoToAllureResults', () => {
//     cy.exec('mv cypress/videos/*.mp4 allure-results/');
// });
  
            //   cy.api({
            //     url: '/api/users',
            //     method: 'POST',
            //     body: (user),
            //     headers: {
            //       Authorization: 'Bearer ' + token
            //     },
            //     failOnStatusCode: false
            // }).then(response => {
            //   if (response.status) {
            //     expect(response.status).to.eq(201);
            //   } else {
            //     // Tratar caso a propriedade 'status' não esteja presente na resposta
            //     throw new Error('Failed to retrieve response status');
          //     }