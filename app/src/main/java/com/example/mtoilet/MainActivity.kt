package com.example.mtoilet

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.google.android.material.button.MaterialButton

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val goButton = findViewById<Button>(R.id.go)
        goButton.setOnClickListener {
            val intent = Intent(this, Tutorial1::class.java)
            startActivity(intent)
        }
    }
}