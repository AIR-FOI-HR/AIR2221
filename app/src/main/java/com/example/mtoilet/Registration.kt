package com.example.mtoilet

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import com.example.core.entities.Gender
import com.example.core.entities.User
import com.example.webservice.mToiletWebServiceAPICaller

class Registration : AppCompatActivity() {

    lateinit var userName: EditText
    lateinit var password: EditText
    lateinit var gender: String
    lateinit var btnRegister: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_registration)

        userName = findViewById(R.id.username)
        password = findViewById(R.id.password)
        gender = Gender.Male.toString()
        btnRegister = findViewById(R.id.createMyAccount)

        btnRegister.setOnClickListener {
            var mToiletWebServiceAPICaller = mToiletWebServiceAPICaller()
            var newUser = User(null, userName.text.toString(), password.text.toString(), Gender.Male)
            mToiletWebServiceAPICaller.postNewUser(newUser)
        }
    }
}