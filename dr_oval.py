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
    time.sleep(0.5)
    
def pdown():
    p.ChangeDutyCycle(5.5)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.5)

def pup():
    p.ChangeDutyCycle(10)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.5)
    
def forward(interval):
    kit.motor1.throttle = 0.33 # m1 is right side
    kit.motor2.throttle = 0.33
    time.sleep(0.1)
    kit.motor1.throttle = 0.50 # m1 is right side
    kit.motor2.throttle = 0.50
    time.sleep(interval)
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    
def turndegree(degree_interval, back_interval):  # turn right
    forward(0.15)
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
kit.motor1.throttle = (0.35)
kit.motor2.throttle = (0.8)
time.sleep(0.85)

pup()
kit.motor1.throttle = (-0.35)
kit.motor2.throttle = (-0.8)
time.sleep(0.2)
turndegree(0.6,0.58)
time.sleep(0.2)

pdown()

kit.motor1.throttle = (0.35)
kit.motor2.throttle = (0.8)
time.sleep(0.83)
stop()

pup()

p.stop()
GPIO.cleanup() #free resources on gpio pins 
