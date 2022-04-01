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
    forward(0.05)
    pup()
    kit.motor2.throttle = 0.5
    time.sleep(degree_interval) #0.845 for square?
    stop()
    kit.motor1.throttle = -0.50  # backup
    kit.motor2.throttle = -0.50
    time.sleep(back_interval) #0.75
    kit.motor1.throttle = 0
    kit.motor2.throttle = 0
    time.sleep(0.2)
    pdown()


pdown()
time.sleep(0.2)
kit.motor2.throttle = 0.55
time.sleep(1)
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.2)
pup()
kit.motor2.throttle = -0.55
time.sleep(0.1)
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.2)
#turn
kit.motor1.throttle = -0.55
kit.motor2.throttle = -0.55
time.sleep(0.3)
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.2)
kit.motor1.throttle = 0.55
time.sleep(0.7)
kit.motor1.throttle = -0.55
kit.motor2.throttle = -0.55
time.sleep(0.8)
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.2)
#second half circle
kit.motor2.throttle = 0.55
time.sleep(0.2)
pdown()
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.2)
kit.motor2.throttle = 0.55
time.sleep(1)
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.2)
#straight 1 turn
pup()
kit.motor1.throttle = 0.5
kit.motor2.throttle = 0.5
time.sleep(0.2)
kit.motor1.throttle = 0
kit.motor2.throttle = 0.35
time.sleep(0.4)
#
kit.motor1.throttle = -0.5
kit.motor2.throttle = -0.5
time.sleep(0.54)
pdown()
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.2)
kit.motor1.throttle = 0.5
kit.motor2.throttle = 0.5
time.sleep(0.825)
#second turn
kit.motor1.throttle = 0
kit.motor2.throttle = 0
time.sleep(0.2)
turndegree(0.558,0.7)
time.sleep(0.2)
kit.motor1.throttle = 0.5
kit.motor2.throttle = 0.5
time.sleep(0.88)

pup()
stop()

p.stop()
GPIO.cleanup()
