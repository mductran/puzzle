from rest_framework.test import APITestCase
from rest_framework import status
import json


class TestLogin(APITestCase):
    user_profile_1 = {
        "user": {
            "username": "user1",
            "password": "Password123!@#",
            "email": "user1@gmail.com"
        },
        "profile": "reg"
    }

    def test_login(self):
        response = self.client.post(
            "/accounts/", data=self.user_profile_1, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post("/login", data={"username": self.user_profile_1["user"]["username"],
                                                    "password": self.user_profile_1["user"]["password"]}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestAccountDetailsPermission(APITestCase):
    user_profile_1 = {
        "user": {
            "username": "user1",
            "password": "Password123!@#",
            "email": "user1@gmail.com"
        },
        "profile": "reg"
    }

    user_profile_2 = {
        "user": {
            "username": "user2",
            "password": "Password123!@#",
            "email": "user2@gmail.com"
        },
        "profile": "reg"
    }

    def test_account_details_permission(self):
        response = self.client.post(
            "/accounts/", data=self.user_profile_1, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = json.loads(response.content.decode("utf-8"))
        user_id_1 = response['id']

        response = self.client.post(
            "/accounts/", data=self.user_profile_2, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = json.loads(response.content.decode("utf-8"))
        user_id_2 = response['id']

        response = self.client.post("/login", data={"username": self.user_profile_1["user"]["username"],
                                                    "password": self.user_profile_1["user"]["password"]}, format="json")
        response = json.loads(response.content.decode('utf-8'))
        access_token = response['access']

        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer {}".format(access_token))
        response = self.client.get(
            "/accounts/{}/".format(user_id_1), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(
            "/accounts/{}/".format(user_id_2, format="json"))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
