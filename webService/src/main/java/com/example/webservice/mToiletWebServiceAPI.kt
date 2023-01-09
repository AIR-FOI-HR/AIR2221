package com.example.webservice

import com.example.core.entities.User
import com.example.webservice.responses.UsersResponse
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.Call
import retrofit2.http.GET


interface mToiletWebServiceAPI {
    @POST("users")
    fun postNewUser(@Body user: User?) : Call<User?>?

    @GET("users")
    fun getAllUsers() : Call<UsersResponse>
}