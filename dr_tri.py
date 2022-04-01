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
    time.sleep(0.5)

def pup():
    p.ChangeDutyCycle(10)
    time.sleep(0.5)

def stop():
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(1)
    
def forward(interval):
    kit.motor1.throttle = 0.50 # m1 is right side
    kit.motor2.throttle = 0.50
    time.sleep(interval)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    
def turndegree(degree_interval, back_interval):  # turn right
    # the goal is to turn 90, without moving the pen from it's originial position on paper
    # assume the pen is down before starting this function
    pup()
    forward(0.1)
    kit.motor2.throttle = 0.5
    time.sleep(degree_interval) #0.845 for square?
    stop()
    kit.motor1.throttle = -0.50  # backup
    kit.motor2.throttle = -0.50
    time.sleep(back_interval) #0.75
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.5)
    pdown()
    time.sleep(0.5)
    
def backward(interval):
    kit.motor1.throttle = -0.51
    kit.motor2.throttle = -0.50
    time.sleep(interval)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0

pdown()
forward(0.6)  # 1
pup()
backward(0.35)
turndegree(0.767,0.73)
forward(0.58)  # 2
pup()
backward(0.3)
turndegree(0.775,0.73)
forward(0.55)
stop()

pup()
p.stop()
GPIO.cleanup() #free resources on gpio pins 
