# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

"""Simple test for using adafruit_motorkit with a DC motor"""
import time
from tracemalloc import stop
from turtle import pd
from urllib.parse import DefragResultBytes
import board
from adafruit_motorkit import MotorKit
import RPi.GPIO as GPIO

servoPin = 20
GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPin, GPIO.OUT)
kit = MotorKit(i2c=board.I2C())


p = GPIO.PWM(servoPin, 50) # GPIO 17 for PWM with 50Hz
p.start(2.5) # Initialization

# COMMENT ON SPEED AND ANGLE:

# ANGLE: Duty Cycle = 10 => 180 degrees
#                     6  => 90 degress
#                     2 => approximately 10 degrees

# SPEED: 1.0 is fastest
#        0   is stop
#        0.25 doesn't seem to move, should try >= 0.3
# Negative means forward, positive means backward


# try:
#   while True:
#lift pen up
p.ChangeDutyCycle(10)
time.sleep(0.5)

#put pen down
p.ChangeDutyCycle(6)
time.sleep(0.5)

#go forward
kit.motor1.throttle = -0.35
kit.motor2.throttle = -0.35
time.sleep(0.5)

#stop
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.5)

#lift pen up
p.ChangeDutyCycle(10)
time.sleep(0.5)

# turn
kit.motor1.throttle = -0.35
kit.motor2.throttle = 0
time.sleep(0.5)

#stop
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.5)

#put pen down
p.ChangeDutyCycle(6)
time.sleep(0.5)
#forward
kit.motor1.throttle = -0.35
kit.motor2.throttle = -0.35
time.sleep(0.5)

#stop
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.5)

#lift pen up
p.ChangeDutyCycle(10)
time.sleep(0.5)


# -------- shape functions by sonya ---- NOT TESTED !!! -----------
def forward():
    kit.motor1.throttle = -0.35
    kit.motor2.throttle = -0.35
    # kit.motor1.throttle = -0.35
    # kit.motor2.throttle = -0.35
    # want to see if adding these two lines would make it move farther than just one set of -0.35

def farfw():  # farther forward
    kit.motor1.throttle = -0.5
    kit.motor2.throttle = -0.5

def pdown():
    p.ChangeDutyCycle(6)

def pup():
    p.ChangeDutyCycle(10)

# idk motor 1 is left or right side ... assume it's on the left
def turn90():  # turn right
    # the goal is to turn 90, without moving the pen from it's originial position on paper
    # assume the pen is down before starting this function
    pup()
    kit.motor1.trottle = -0.3
    kit.motor2.trottle = 0.3
    kit.motor2.trottle = 0.35  # backup
    kit.motor1.trottle = 0.35
    # kit.motor1.trottle = 1.0" moves the motor forwards for one fifth of a second at full speed.
    # hope 0.3 works, but i guess its gonna turn more than i expected..
    pdown()


# assume pen is up before starting any shapes
# assume car is facing right: "car->"
def dr_squ():  # draw square
    # car-> 0__1
    #       |  |
    #       ````
    pdown()
    forward()  # 0 to 1
    turn90()
    forward()  # 2
    turn90()
    forward()  # 3
    turn90()
    forward()  # 4
    turn90()  # reposition: facing to right
    pup()
    farfw()  # position to next empty place


def dr_tri():
    #    0 1
    #     /_\
    farfw()  # position 0 to 1
    kit.motor1.throttle = -0.35  # turn 60??
    pdown()
    forward()  # 1
    kit.motor1.throttle = -0.7  # turn 120
    forward()  # 2
    kit.motor1.throttle = -0.7
    forward()  # 3
    kit.motor1.throttle = -0.7  # reposition: facing to right
    pup()
    farfw()  # position to next empty place


def dr_cir():  # idea 1 go around for a circle
    # "car->" 0  _1_
    #          /     \
    #        4|       |2
    #          \     /
    #           ``3``
    forward()  # position 0 to 1
    pdown()
    kit.motor1.throttle = -0.55
    kit.motor2.throttle = -0.35
    # no idea if this could make a full circle..
    pup()
    forward()  # position to next empty place


def dr_cir2():  # idea 2 self rotation
    #     0    _1_
    #        /  ↑  \
    #      4|← car →|2   car is inside the circle while drawing
    #        \  ↓  /
    #         ``3``
    forward()  # position 0 to 1

    # position to the middle of the is circle
    kit.motor1.throttle = -0.50  # turn 90
    forward()
    kit.motor1.throttle = -1.0  # turn 180

    pdown()
    kit.motor1.throttle = -0.35
    kit.motor2.throttle = 0.35
    # also,, no idea if this could make a full circle..
    pup()
    # back to position 1
    forward()
    kit.motor1.throttle = -0.50  # turn 90 (to right)
    forward()  # position to next empty place


def dr_rec():
    # car-> 0____1
    #       |    |
    #       ``````
    pdown()
    farfw()  # 0 to 1
    turn90()
    forward()  # 2
    turn90()
    farfw()  # 3
    turn90()
    forward()  # 4
    turn90()  # reposition: facing to right
    pup()
    forward()  # position 0 to almost 1
    forward()  # position to next empty place


def dr_heart():
    # idea: two half circle + half triangle
    #   __  __
    #  /  \/  \
    #   \    /
    #     \/
    forward()
    # try circle first


def dr_oral():
    # 0  ___1___
    #   /       \2
    #  4\_______/
    #       3
    forward()  # to 1
    pdown()
    for i in range(5):  # to 2
        kit.motor1.throttle = -(0.35 + 0.1*i)
        kit.motor2.throttle = -0.35
    for i in range(5):  # to 3
        kit.motor1.throttle = -(0.55 - 0.1*i)
        kit.motor2.throttle = -0.35
    for i in range(5):  # to 4
        kit.motor1.throttle = -(0.35 + 0.1*i)
        kit.motor2.throttle = -0.35
    for i in range(5):  # to 1
        kit.motor1.throttle = -(0.55 - 0.1*i)
        kit.motor2.throttle = -0.35
    pup()
    forward()


# testing all shapes:
dr_squ()
time.sleep(0.5)
dr_cir()
time.sleep(0.5)
dr_cir2()
time.sleep(0.5)
dr_tri()
time.sleep(0.5)
dr_rec()
time.sleep(0.5)
dr_heart()  # skipped for now
time.sleep(0.5)
dr_oral()
time.sleep(0.5)


# except KeyboardInterrupt:
p.stop()
GPIO.cleanup() #free resources on gpio pins 
