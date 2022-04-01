# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT
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

def stop():
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.2)
def pdown():
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.2)
    p.ChangeDutyCycle(5.5)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.2)
def pup():
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.2)
    p.ChangeDutyCycle(10)
def forward(interval):
    kit.motor1.throttle = 0.53
    kit.motor2.throttle = 0.50
    time.sleep(interval)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
def turndegree(degree_interval, back_interval):  # turn right
    pup()
    forward(0.1)
    kit.motor2.throttle = 0.5
    time.sleep(degree_interval)
    stop()
    kit.motor1.throttle = -0.53  # backup
    kit.motor2.throttle = -0.50
    time.sleep(back_interval)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.5)
    stop()

#----- C ------------------------
pdown()
kit.motor1.throttle = 0.55
time.sleep(1.6)
#- - - - - - -
pup()
kit.motor1.throttle = 0.55
time.sleep(0.2)
stop()
time.sleep(0.3)
forward(0.26)
stop()
kit.motor1.throttle = 0.55
time.sleep(0.56)
forward(0.1)
stop()
time.sleep(0.3)
#----- P -------------------
pdown()
kit.motor1.throttle = -0.51
kit.motor2.throttle = -0.5
time.sleep(1.1)
pup()
forward(0.9)
pdown()
kit.motor2.throttle = 0.55
kit.motor1.throttle = 0
time.sleep(1.5)
pup()
stop()
#-------------
kit.motor1.throttle = -0.51
kit.motor2.throttle = -0.5
time.sleep(0.6)
stop()
kit.motor1.throttle = 0
kit.motor2.throttle = 0.55
time.sleep(0.55)
stop()
kit.motor1.throttle =-0.51
kit.motor2.throttle = -0.5
time.sleep(0.32)
kit.motor1.throttle = 0.55
kit.motor2.throttle = 0
time.sleep(0.56)
stop()
time.sleep(0.3)
kit.motor1.throttle = -0.51
kit.motor2.throttle = -0.5
time.sleep(0.52)
stop()
time.sleep(0.3)
#----E------------------------
pdown()
kit.motor1.throttle = -0.53
kit.motor2.throttle = -0.5
time.sleep(0.7)
turndegree(0.6,0.2)
kit.motor1.throttle = -0.51
kit.motor2.throttle = -0.5
time.sleep(0.14)
pdown()
kit.motor1.throttle=0.55
kit.motor2.throttle=0
time.sleep(1.6)
pup()
stop()
#-------------
forward(0.3)
stop()
kit.motor1.throttle = 0.55
time.sleep(0.68)
stop()
kit.motor1.throttle = -0.51
kit.motor2.throttle = -0.5
time.sleep(0.6)
stop()
time.sleep(0.2)
#----n-----------------------
pdown()
forward(0.6)  # 0 to 1
turndegree(0.56,0.61)
pdown()
forward(0.5)  # 2
turndegree(0.56,0.6)
pdown()
forward(0.61)
pup()
stop() 
# except KeyboardInterrupt:
p.stop()
GPIO.cleanup() #free resources on gpio pin
