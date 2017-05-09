[![Stories in Ready](https://badge.waffle.io/bucharest-gold/entente.png?label=ready&title=Ready)](https://waffle.io/bucharest-gold/entente)
# Entente
A place for open discussion of Node.js within JBoss Middleware, including
ideas for projects, collaboration, etc.

## Projects

Here are some of the things the group has been working on.

### Middleware NPM Modules

Most of Red Hat's middleware products expose RESTful APIs of some
sort or another. Bucharest Gold has been identifying projects
that need assistance in this area and developing or assisting with
the project’s NPM client modules. We are attempting to promote
consistent code style and build processes across teams for Node.js
based components.

To date, we have created or assisted with the following projects.

* [Keycloak Auth Utils](https://www.npmjs.com/package/keycloak-auth-utils)
* [Keycloak Connect](https://www.npmjs.com/package/keycloak-connect)
* [Keycloak Request Token](https://www.npmjs.com/package/keycloak-request-token)
* [Keycloak Client Registration](https://www.npmjs.com/package/keycloak-client-registration)
* [Keycloak Admin Client](https://www.npmjs.com/package/keycloak-admin-client)
* [Drools KIE Client](https://www.npmjs.com/package/drools-kie-client)
* [API Man Admin Client](https://www.npmjs.com/package/apiman-admin-client)
* [Unified Push Registration Client](https://www.npmjs.com/package/unifiedpush-registration-client)
* [Unified Push Admin Client](https://www.npmjs.com/package/unifiedpush-admin-client)
* [Unified Push Registration Client](https://www.npmjs.com/package/unifiedpush-registration-client)
* [Unified Push Node Sender](https://www.npmjs.com/package/unifiedpush-node-sender)
* [The Infinispan client](https://www.npmjs.com/package/infinispan)

Currently underway is exploration with [Hawkular](http://www.hawkular.org/)’s API,
identifying areas of potential integration beyond a REST client. An initial goal
is to use currently unpublished, but moving towards production, tracing capabilities
in Node.js to feed instrumentation data to Hawkular and exposing it via the
Business Transaction Management API.

This effort will also naturally result in a REST client as well.

A few side projects have grown so far from our internal development needs.

* [Fidelity](https://www.npmjs.com/package/fidelity) - a Promise/A+ compliant module
* [ROI](https://www.npmjs.com/package/roi) - a dependency-free http module
* [Lightbright](https://www.npmjs.com/package/lightbright) - a lightweight module for code tracing
* [Genet](https://www.npmjs.com/package/genet) - a code profiling tool
* [Szero](https://www.npmjs.com/package/szero) - a dependency checker
* [Opossum](https://www.npmjs.com/package/opossum) - a circuit breaker module


### Coordination with RHEL Software Collections

The release cadence for Node.js has increased significantly and shows no sign of slowing.
Node 6.x is current, while Node.js 7.0 is expected in October 2016. The next LTS release,
version 8.0, is expected in April 2017. Software Collections have recently released a
Node 4.x package to some relief, but to remain current, we need to work with RHEL
Software Collections to find a process for regular updates.

### OpenShift Coordination

One goal is “Make OpenShift a great place for Node.js”. Helio has been experimenting
with the CDK, OpenShift 3, and small Node.js projects to identify points of weakness
or difficulty. See: https://github.com/bucharest-gold/entente/issues/8
