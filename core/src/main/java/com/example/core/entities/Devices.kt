package com.example.core.entities

import java.util.Date

open class Devices (
    open var id: Int? = null,
    var deviceName: String = "",
    var latitude: Int,
    var longitude: Int,
    var lastSync: Date
        )