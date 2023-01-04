package com.example.core.entities

import java.util.Date

open class Events (
    open var id: Int? = null,
    var date: Date,
    var userId: Int,
    var deviceId: Int
        )