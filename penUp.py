import sys
# test the car by uncomment the below section and comment out the above section 
import time
from tracemalloc import stop
from turtle import pd
from urllib.parse import DefragResultBytes
import board
import RPi.GPIO as GPIO

servoPin = 20
GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPin, GPIO.OUT)
p = GPIO.PWM(servoPin, 50) # GPIO 17 for PWM with 50Hz
p.start(2.5) # Initialization

p.ChangeDutyCycle(10)
time.sleep(1)

# except KeyboardInterrupt:
p.stop()
GPIO.cleanup() #free resources on gpio pins 
