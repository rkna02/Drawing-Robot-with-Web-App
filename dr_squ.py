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

def stop():
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(1)
def pdown():
    p.ChangeDutyCycle(5.5)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(1)
def pup():
    p.ChangeDutyCycle(10)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(1)
def forward(interval):
    kit.motor1.throttle = 0.53 # m1 is right side
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

# car-> 0__1
#       |  |
#       ````
pdown()
forward(0.5)  # 0 to 1
turndegree(0.61,0.6)
pdown()
forward(0.5)  # 2
turndegree(0.61,0.6)
pdown()
forward(0.5)  # 3
turndegree(0.61,0.6)
pdown()
forward(0.5)  # 4
turndegree(0.62,0.6) # reposition: facing to right
pup()

p.stop()
GPIO.cleanup() #free resources on gpio pins 
