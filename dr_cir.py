import sys
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

def pdown():
    p.ChangeDutyCycle(5.5)
def pup():
    p.ChangeDutyCycle(10)
def stop():
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.5)
def forward(interval):
    kit.motor1.throttle = 0.50 # m1 is right side
    kit.motor2.throttle = 0.50
    time.sleep(interval)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0

#forward(0.2)  # position 0 to 1
pdown()
stop()
kit.motor1.throttle = 0.55
time.sleep(2.6)
pup()
stop()
p.stop()
GPIO.cleanup()
