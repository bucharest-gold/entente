- Start Date: 2016-03-11

# Summary

Create a node.js client for the Keycloak Admin REST API - http://keycloak.github.io/docs/rest-api/index.html

# Motivation

Currently there is only a java client that helps with the interaction with the admin REST API.  Not everyone is using Java in there backend, so this could be a good fit for a node.js client as many people are starting to use node.

# Detailed design

At a High Level, the node.js client should follow as close as possible the methods and functionality that the current java admin client has, https://github.com/keycloak/keycloak/tree/master/integration/admin-client, while still staying in the style of Javascript of course.

_note: examples here will most likely be sudo code and may not reflect the final API design_

Possible usage to get a list of Realms:

    // Create a config object
    let config = {
        serverUrl: '',
        realm: '',
        username: '',
        password: '',
        clientId: '',
        clientSecret: ''
    };

    // Create a new Keycloak "client instance"
    let keycloak = new Keycloak(config);

    // Get a list of the accessible realms
    keycloak.getRealms().then(function (realms) {
        console.log(realms);
    });


