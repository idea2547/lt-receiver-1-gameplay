"""

Receiver A`

"""

def on_ir_callbackuser(message):
    global X1, flag, Reset, timeInit, Shoot
    if flag == 1:
        if Shoot == 1:
            radio.send_value("A", 3)
            X1 = IR.IR_read()
            flag = 0
            Reset = 1
            timeInit = control.millis()
            Shoot = 0
            music.ring_tone(466)
            serial.write_line("Received : " + str(X1))
    else:
        basic.clear_screen()
IR.IR_callbackUser(on_ir_callbackuser)

timeInit = 0
Reset = 0
Shoot = 0
flag = 0
X1 = 0
music.set_volume(255)
music.ring_tone(262)
music.ring_tone(330)
music.ring_tone(392)
radio.set_group(1)
ID = "B"
X1 = 0
flag += 1
Shoot = 0
Reset = 0
timeInit = control.millis()
serial.write_line("IR Receiver B Online...")

def on_forever():
    global X1, flag
    if control.millis() - timeInit >= 50:
        music.stop_all_sounds()
        X1 = 0
        flag = 1
basic.forever(on_forever)

def on_forever2():
    global Shoot, timeInit
    if Shoot == 0 and Reset == 0:
        if control.millis() - timeInit >= 1000 and control.millis() - timeInit < 2000:
            Shoot = 1
            led.plot_brightness(2, 3, 255)
            serial.write_string("ok")
    elif Shoot == 1:
        if control.millis() - timeInit >= 2000:
            timeInit = control.millis()
            Shoot = 0
            led.plot_brightness(2, 3, 0)
basic.forever(on_forever2)

def on_forever3():
    global Reset
    if Reset == 1:
        led.unplot(0, 0)
        if control.millis() - timeInit >= 100 and control.millis() - timeInit < 200:
            led.plot_brightness(2, 2, 255)
        elif control.millis() - timeInit >= 200 and control.millis() - timeInit < 300:
            led.plot_brightness(2, 2, 0)
        elif control.millis() - timeInit >= 300 and control.millis() - timeInit < 400:
            led.plot_brightness(2, 2, 255)
        elif control.millis() - timeInit >= 400:
            led.plot_brightness(2, 2, 0)
            led.plot_brightness(2, 3, 0)
            Reset = 0
basic.forever(on_forever3)
