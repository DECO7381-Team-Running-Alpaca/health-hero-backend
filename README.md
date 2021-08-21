#RESTful API

**Endpoints:**

### User

_Fetch all Users_ \
**GET '/users/all'**

_Fetch one User using Username_ \
**GET '/users/:user_name'**
body: {
  user_name: String,
  pass_word: String
}

_Sign up for a user (add a new user)_ \
**POST '/users'** \
body: {
  "user_name": String,
  "password": String,
  "email": String,
  "weight": Number,
  "height": Number
}

_Update information for one User using Username_ \
**PATCH '/users/:user_name'** \
body: {
  "password": String,
  "email": String,
  "weight": Number,
  "height": Number
}

_Delete a User using Username_ \
**DELETE '/users/:user_name'**
body: {
	"user_name": String
}

### Preference

_Fetch all Preferences_ \
**GET '/preferences/all'**

_Fetch one Preference using p_name_ \
**GET '/preferences/:p_name**
body: {
  p_name: String
}

_Add a new preference_ \
**POST '/preferences'** \
body: {
  "p_name": String
}

_Delete a Preference using p_name_ \
**DELETE '/preferences/:p_name'**
body: {
	"p_name": String
}

### Allergy

_Fetch all Allergies_ \
**GET '/allergies/all'**

_Fetch one Allergy using a_name_ \
**GET '/allergies/:a_name**
body: {
  a_name: String
}

_Add a new allergy_ \
**POST '/allergies'** \
body: {
  "a_name": String
}

_Delete a Allergy using a_name_ \
**DELETE '/allergies/:a_name'**
body: {
	"a_name": String
}