package com.example.mtoilet

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class Tutorial3 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tutorial3)

        val nextTutorial3Button = findViewById<Button>(R.id.nextTutorial3)
        nextTutorial3Button.setOnClickListener {
            val intentNext = Intent(this, Tutorial4::class.java)
            startActivity(intentNext)

            val backTutorial3Button = findViewById<Button>(R.id.backTutorial3)
            backTutorial3Button.setOnClickListener {
                val intentBack = Intent(this, Tutorial2::class.java)
                startActivity(intentBack)
            }
        }
    }
}