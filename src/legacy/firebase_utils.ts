/* const getUserInfo = async (oAuth2Client: OAuth2Client) => {
    try {
        // Get the user's information from the Google People API
        const people = google.people({
            version: 'v1',
            auth: oAuth2Client
        });
        const { data: person } = await people.people.get({
            resourceName: 'people/me',
            personFields: 'names,emailAddresses,photos'
        });

        return { people, person }
    } catch (error) {
        console.log('error', error)
        return { error }
    }

}

const retrieveUser = async (email: string) => {
    const usersRef = ref(database, '/users');
    const queryRef = query(usersRef, orderByChild('email'), equalTo(email));


    // Find a user with email "john.doe@example.com"
    return await get(queryRef)
        .then((snapshot) => {

            if (snapshot.exists()) {
                const userId = Object.keys(snapshot.val())[0];
                console.log(`User found with ID ${userId}`);
                const val = snapshot.val();

                return snapshot.val()[userId] as User;
                // Do something with the user data...
            } else {
                console.log('User not found');
                return null;

            }
        })
}

const saveUserToDB = async (displayName: string, email: string, photo: string, refreshToken: string) => {
    // Add a new user to the "users" location in the database
    const newUserRef = push(ref(database, 'users'));
    const newUserId = newUserRef.key;

    // Set the user data on the new child node
    const result = await set(newUserRef, {
        displayName,
        email,
        photo,
        createdAt: Date.now(),
        refreshToken: refreshToken,
    }).then(() => {
        console.log('new user saved to DB with ID' + newUserId)
        return {
            newUserId,
            error: null
        };
    }).catch((error) => {
        console.log('error saving user to DB', error);
        return {
            newUserId,
            error
        };
    });

    return {
        newUserId: result.newUserId,
        error: result?.error
    };
}

const updateRefreshToken = async (email: string, refreshToken: string) => {
    const usersRef = ref(database, '/users');
    const queryRef = query(usersRef, orderByChild('email'), equalTo(email));

    // Find a user with that email and update the refresh token
    return await get(queryRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userId = Object.keys(snapshot.val())[0];
                console.log(`User found with ID ${userId}`);
                // Update the user's refresh token
                return update(ref(database, `users/${userId}`), {
                    ['/refreshToken']: refreshToken,
                })
                    .then(() => {
                        console.log('Refresh token updated for user with ID ' + userId)
                        return {
                            userId,
                            error: null
                        }
                    })
                    .catch((error) => {
                        console.log('error updating refresh token for user with ID ' + userId, error);
                        return {
                            userId,
                            error
                        }
                    });
            } else {
                return {
                    userId: null,
                    error: 'User not found'
                };
            }
        })

}
 */