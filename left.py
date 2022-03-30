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

kit.motor1.throttle = 0.35
time.sleep(0.3) 
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.5)
