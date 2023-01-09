package com.example.mtoilet

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.example.core.entities.User
import com.example.webservice.mToiletWebServiceAPICaller

class Login : AppCompatActivity() {

    var allUsers: MutableList<User> = mutableListOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val loginButton = findViewById<Button>(R.id.login_button)
        loginButton.setOnClickListener {

            var caller: mToiletWebServiceAPICaller = mToiletWebServiceAPICaller()
            caller.getAllUsers()
            allUsers = caller.allUsers

            val intent = Intent(this, Home::class.java)
            startActivity(intent)
        }
    }
}