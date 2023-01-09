package com.example.webservice

import android.widget.EditText
import com.example.core.entities.User
import com.example.webservice.responses.UsersResponse
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class mToiletWebServiceAPICaller {
    lateinit var retrofit : Retrofit
    var allUsers: MutableList<User> = mutableListOf()
    val baseUrl : String = "https://air2221.mobilisis.hr/api/"

    init {
        retrofit = Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .client(OkHttpClient())
            .build()
    }

    fun postNewUser(user: User){
        val serviceAPI = retrofit.create(mToiletWebServiceAPI::class.java)
        val call: Call<User?>? = serviceAPI.postNewUser(user)

        call!!.enqueue(object : Callback<User?>{
             override fun onResponse(call: Call<User?>, response: Response<User?>) {
                val response: User? = response.body()
            }

            override fun onFailure(call: Call<User?>, t: Throwable) {

            }
        })
    }

    fun getAllUsers(){
        val serviceAPI = retrofit.create(mToiletWebServiceAPI::class.java)
        val call: Call<UsersResponse> = serviceAPI.getAllUsers()

        call.enqueue(object : Callback<UsersResponse>{
            override fun onResponse(call: Call<UsersResponse>, response: Response<UsersResponse>) {
                if (response.isSuccessful) {
                    val usersResponse = response.body()!!
                    for (u in usersResponse.usersArr){
                        var user: User = User(u.id, u.username, u.password, u.gender)
                        allUsers.add(user)
                    }
                }
            }

            override fun onFailure(call: Call<UsersResponse>, t: Throwable) {

            }
        })
    }
}