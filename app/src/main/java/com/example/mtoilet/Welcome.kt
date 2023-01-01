package com.example.mtoilet

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class Welcome : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_welcome)

        val okButton = findViewById<Button>(R.id.ok_button)
        okButton.setOnClickListener {
            val intent = Intent(this, Tutorial1::class.java)
            startActivity(intent)
        }
        val skipButton = findViewById<Button>(R.id.skip_button)
        skipButton.setOnClickListener {
            val intent = Intent(this, Registration::class.java)
            startActivity(intent)
        }
    }
}