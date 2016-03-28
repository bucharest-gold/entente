- Start Date: 2016-03-17

# Summary

@lance idea on #brass-monkey :

http://www.hawkular.org/docs/user/user-guide.html#_clients


### Notes:

#### Hawkular server

1. [Instructions to get up and running](http://www.hawkular.org/docs/user/quick-start.html).
2. We don't need to add the **Hawkular-Tenant** header.
3. On Hawkular server, provide credentials with HTTP Basic auth, and the tenant is selected for you by Accounts.[1]

#### Standalone Hawkular Metrics

1. https://github.com/hawkular/hawkular-metrics.
2. There is no authentication yet, we can select any tenant with the **Hawkular-Tenant** header.[2]

more notes from @tsegismont:

_The client must be able to provide different auth strategies when working with a Metrics server because Metrics is protected differently depending on the deployment type (standalone vs in hawkular server)_

_There is also the special case when you want to impersonate an organization, in this case you can provide a Hawkular-Persona header_[3]

_Hawkular Metrics server embedded into Openshift has its own authentication mechanism_[4]

[1] login + passwd

[2] **Hawkular-Tenant** header

[3] Impersonate an organization with **Hawkular-Persona** header

[4] Hawkular + Openshift own authentication mechanism
