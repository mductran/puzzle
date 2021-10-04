## How to fetch current user profile (use in place of login, as a REST service there is no login/logout API)
```shell
curl --location --request GET 'http://13.213.32.123:8000/user-profile/current' \
 -u username:password
```
Sample response
```json
{
    "id": 14,
    "user": {
        "id": 14,
        "username": "TestAdmin",
        "email": "test@admin.com"
    },
    "balance": 10000000.0,
    "user_type": 1
}
```

## How to fetch all game (wishlist/owned) by a user
eg, for user with id = 1
```shell
curl --location --request GET 'http://13.213.32.123:8000/user-owning-game/?user=1'
```

Sample response
```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 5,
            "created": "2021-09-16T01:40:41.653755Z",
            "user": 1,
            "game": 1,
            "owning_type": 2
        },
        {
            "id": 6,
            "created": "2021-09-16T01:40:56.394167Z",
            "user": 1,
            "game": 2,
            "owning_type": 2
        }
    ]
}
```

## How to fetch request using basic auth

Backend using Basic Auth, so you have to attach username and password to each request

Eg, to fetch all games as a login user

* Using CURL
```shell
curl --location --request GET 'http://13.213.32.123:8000/games/' -u username:password
```

* Using fetch js
```javascript
headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));