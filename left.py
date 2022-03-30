import sys
# test the car by uncomment the below section and comment out the above section 
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

# the goal is to turn 90, without moving the pen from it's originial position on paper

# forward(0.1)
kit.motor1.throttle = 0.40 # m1 is right side
kit.motor2.throttle = 0.35
time.sleep(0.1)
kit.motor1.throttle = 0
kit.motor2.throttle = 0

kit.motor1.throttle = 0.35
time.sleep(0.845) #0.845
kit.motor2.throttle = 0
time.sleep(1)
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(1)
kit.motor1.throttle = -0.40  # backup
kit.motor2.throttle = -0.35
time.sleep(0.75) #0.75
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.5)
# kit.motor1.trottle = 1.0" moves the motor forwards for one fifth of a second at full speed.
# hope 0.3 works, but i guess its gonna turn more than i expected..
    