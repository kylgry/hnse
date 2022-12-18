## handshake name system explorer

[hnse.herokuapp.com](https://hnse.herokuapp.com)

this is a basic explorer for the handshake name system. 

details about about handshake can be found at [handshake.org](https://handshake.org).

the app directly queries the [api from a handshake node](https://hsd-dev.org/api-docs/). 

hnse.herokuapp.com currently queries a node running on a rockpro64 in my living room.

users can request information about a name, address, or transaction. name information includes whether the name is reserved and/or registered, and if registered the last transaction associated with it. transaction information will display the addresses, ammounts, and covenants for each input and output. address information will display the current balance, and all associated transactions. 

front end built using reactjs and bootstrap. back end built with nodejs and express. 



