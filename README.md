#Demo RESTful API (Team)

**Endpoint:**

_Default route_ \
**GET '/'**

_Fetch all the teammates_ \
**GET '/teams'**

_Add a new teammate_ \
**POST '/teams'** \
body: {
"name":"xxx",
"id":"xxx"
}

_Update the name of a teammate using id_ \
**PUT '/teams/:id'** \
body: {
"newName":"xxx"
}

_Delete a teammate using id_ \
**DELETE '/teams/:id'**
