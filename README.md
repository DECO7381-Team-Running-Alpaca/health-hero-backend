#RESTful API

**Endpoints:**

### User

_Sign up_
**Post '/users'**
body: {
  "user_name": String,
  "password": String,
  "email": String,
  "weight": Number,
  "height": Number
}



_Log in_
**POST '/users/login'**
body: {
  user_name: String,
  pass_word: String
}



_Log out current token_
**POST '/users/logout'**
Logged in required



_Log out all tokens_
**POST '/users/logout_all'**
Logged in required



_GET ALL USERS (DEV.)_
**GET '/users/all'**



_Get current user_
**GET '/users/me'**
Logged in required



_UPDATE USER BY USERNAME (DEV.)_
**PATCH '/users/:user_name'**
body: {
  "user_name": String,
  "password": String,
  "email": String,
  "weight": Number,
  "height": Number
}



_Update current user_
**PATCH '/users/me'**
Logged in required
body: {
  "password": String,
  "email": String,
  "weight": Number,
  "height": Number
}



_DELETE USER BY USERNAME (DEV.)_
**DELETE '/users/:user_name'**
body: {
  "user_name": String
}



_Delete current user_
**DELETE '/users/me'**
Logged in required



_Add a preference to current user by p_name_
**POST '/users/preferences/:p_name'**
Logged in required



// TO DO: Following 7 Endpoints

_Remove a preference from current user by p_name_
**DELETE '/users/preferences'/:p_name**
Logged in required



_Get all preferences of current user_
**GET '/users/preferences'**
Logged in required



_Add an allergy to current user by a_name_
**POST '/users/allergies/:a_name'**
Logged in required



_Remove an allergy from current user by a_name_
**DELETE '/users/allergies/:a_name'**
Logged in required



_Get all allergies of current user_
**GET '/users/allergies'**
Logged in required



*Add multiple preferences to current user*
**POST '/users/preferences'**
body: {
  [preference1, preference2, ...]
}



*Add multiple allergies to current user*
**POST '/users/allergies'**
body: {
  [allergy1, allergy2, ...]
}



### Preference (DEV.)

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

### Allergy (DEV.)

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