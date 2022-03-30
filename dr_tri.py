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
    
#     /_\
#farfw()  # position 0 to 1
pdown()
time.sleep(0.5)
forward(0.8)  # 1
#kit.motor1.throttle = -0.7  # turn 120
turndegree(1.15,0.8)
forward(0.8)  # 2
#kit.motor1.throttle = -0.7
turndegree(1.15,0.8)
forward(0.8)
stop()
#kit.motor1.throttle = -0.7  # reposition: facing to right
pup()