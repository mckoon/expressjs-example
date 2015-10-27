var userStore = require('../stores/user.js');

module.exports.LinkApp = function (app) {

    app.get(
        '/api/users',
        listUsers
    );

    app.get(
        '/api/users/:id',
        getUser
    );

    app.post(
        '/api/users',
        createUser
    );

    app.put(
        '/api/users/:id',
        updateUser
    );

    app.delete(
        '/api/users/:id',
        deleteUser
    );

    function listUsers(request, response) {
        userStore.getAll(
            function (users) {
                response.json(users);
            }
        );
    }

    function getUser(request, response) {
        userStore.get(
            request.params.id,
            function (user, error) {
                if (error) {
                    return response.sendStatus(400);
                }
                response.json(user);
            }
        );
    }

    function createUser(request, response) {
        if (!request.body) {
            return response.sendStatus(400);
        }
        userStore.save(
            request.body,
            function (user, error) {
                if (error) {
                    return response.sendStatus(400);
                }
                response.json(user);
            }
        );
    }

    function updateUser(request, response) {
        var userChange = request.body,
            userId = request.params.id;

        if (!userChange) {
            return response.sendStatus(400);
        }

        /* Get existing user. */
        userStore.get(
            userId,
            function (user, error) {
                if (error) {
                    return response.sendStatus(400);
                }

                /* Set ID to URL */
                userChange.id = user.id;

                /* Save changes. */
                userStore.save(
                    userChange,
                    function (user, error) {
                        if (error) {
                            return response.sendStatus(400);
                        }
                        response.json(user);
                    }
                );
            }
        );
    }

    function deleteUser(request, response) {
        var userId = request.params.id;

        /* Get existing user. */
        userStore.get(
            userId,
            function (user, error) {
                if (error) {
                    return response.sendStatus(400);
                }

                /* Delete existing user. */
                userStore.delete(
                    user,
                    function (user, error) {
                        if (error) {
                            return response.sendStatus(400);
                        }
                        response.json(user);
                    }
                );
            }
        );
    }

};