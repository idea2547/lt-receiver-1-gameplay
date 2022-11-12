IR.IR_callbackUser(function (message) {
    if (flag == 1) {
        if (Shoot == 1) {
            radio.sendValue("A", 2)
            X1 = IR.IR_read()
            flag = 0
            Reset = 1
            timeInit = control.millis()
            Shoot = 0
            music.ringTone(466)
            serial.writeLine("Received : " + X1)
        }
    } else {
        basic.clearScreen()
    }
})
function ledpattern () {
    led.plotBrightness(2, 0, 255)
    led.plotBrightness(2, 1, 255)
    led.plotBrightness(2, 3, 255)
    led.plotBrightness(2, 4, 255)
    led.plotBrightness(0, 2, 255)
    led.plotBrightness(1, 1, 255)
    led.plotBrightness(1, 2, 255)
    led.plotBrightness(1, 3, 255)
    led.plotBrightness(3, 1, 255)
    led.plotBrightness(3, 2, 255)
    led.plotBrightness(3, 3, 255)
    led.plotBrightness(4, 2, 255)
}
function ledpatternDisable () {
    led.plotBrightness(2, 0, 0)
    led.plotBrightness(2, 1, 0)
    led.plotBrightness(2, 3, 0)
    led.plotBrightness(2, 4, 0)
    led.plotBrightness(0, 2, 0)
    led.plotBrightness(1, 1, 0)
    led.plotBrightness(1, 2, 0)
    led.plotBrightness(1, 3, 0)
    led.plotBrightness(3, 1, 0)
    led.plotBrightness(3, 2, 0)
    led.plotBrightness(3, 3, 0)
    led.plotBrightness(4, 2, 0)
}
radio.onReceivedValue(function (name, value) {
    if (name == "reset") {
        control.reset()
    }
})
let timeInit = 0
let Reset = 0
let Shoot = 0
let flag = 0
let X1 = 0
music.setVolume(255)
music.ringTone(262)
music.ringTone(330)
music.ringTone(392)
radio.setGroup(1)
let ID = "B"
X1 = 0
flag += 1
Shoot = 0
Reset = 0
timeInit = control.millis()
serial.writeLine("IR Receiver B Online...")
basic.forever(function () {
    if (control.millis() - timeInit >= 50) {
        music.stopAllSounds()
        X1 = 0
        flag = 1
    }
})
basic.forever(function () {
    if (Shoot == 0 && Reset == 0) {
        if (control.millis() - timeInit >= 1000 && control.millis() - timeInit < 2000) {
            ledpattern()
            Shoot = 1
            serial.writeString("ok")
        }
    } else if (Shoot == 1) {
        if (control.millis() - timeInit >= 2000) {
            timeInit = control.millis()
            Shoot = 0
            ledpatternDisable()
        }
    }
})
basic.forever(function () {
    if (Reset == 1) {
        ledpatternDisable()
        if (control.millis() - timeInit >= 100 && control.millis() - timeInit < 200) {
            ledpattern()
        } else if (control.millis() - timeInit >= 200 && control.millis() - timeInit < 300) {
            ledpatternDisable()
        } else if (control.millis() - timeInit >= 300 && control.millis() - timeInit < 400) {
            ledpattern()
        } else if (control.millis() - timeInit >= 400) {
            ledpatternDisable()
            Reset = 0
        }
    }
})
