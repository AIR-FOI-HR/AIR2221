package com.example.webservice.responses

import com.example.core.entities.User
import com.google.gson.annotations.SerializedName

class UsersResponse {
    @SerializedName("usersArr")
    var usersArr = ArrayList<User>()
}