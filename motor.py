# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

"""Simple test for using adafruit_motorkit with a DC motor"""
import time
from tracemalloc import stop
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

# except KeyboardInterrupt:
p.stop()
GPIO.cleanup() #free resources on gpio pins 
