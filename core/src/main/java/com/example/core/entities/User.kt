package com.example.core.entities

open class User (
    open var id: Int? = null,
    var username: String,
    var password: String,
    var gender: Gender
        )