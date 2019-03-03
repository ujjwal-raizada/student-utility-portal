import requests
import time

backend_url = "http://localhost:5000"
print("Starting Database population Script at: " + backend_url)
time.sleep(0.5)


# Official Signup

r = requests.post(backend_url + "/signup", {'username': 'Crux-Bphc', 'password': 'Crux', 'type': 'official'})
r = requests.post(backend_url + "/signup", {'username': 'SWD', 'password': 'SWD', 'type': 'official'})
r = requests.post(backend_url + "/signup", {'username': 'TD', 'password': 'TD', 'type': 'official'})
r = requests.post(backend_url + "/signup", {'username': 'CSA', 'password': 'CSA', 'type': 'official'})
r = requests.post(backend_url + "/signup", {'username': 'Narasimha-Bolloju', 'password': 'Narasimha-Bolloju', 'type': 'official'})
r = requests.post(backend_url + "/signup", {'username': 'ARC-Bphc', 'password': 'ARC', 'type': 'official'})
r = requests.post(backend_url + "/signup", {'username': 'DesignersAnonymous', 'password': 'da', 'type': 'official'})
r = requests.post(backend_url + "/signup", {'username': 'StudentUnion', 'password': 'suc', 'type': 'official'})
print("Official Accounts Created")

# Student Signup

r = requests.post(backend_url + "/signup", {'username': 'UjjwalRaizada', 'password': 'ujjwal', 'type': 'normal'})
r = requests.post(backend_url + "/signup", {'username': 'PrakharGoenka', 'password': 'prakhar', 'type': 'normal'})
r = requests.post(backend_url + "/signup", {'username': 'SatyamMani', 'password': 'satyam', 'type': 'normal'})
r = requests.post(backend_url + "/signup", {'username': 'PranjalGupta', 'password': 'pranjal', 'type': 'normal'})
r = requests.post(backend_url + "/signup", {'username': 'DakshYashlaha', 'password': 'daksh', 'type': 'normal'})
print("Student Accounts Created")


# Notice Creation

Notice1 = """
We are back with our series of Python workshops.
This session will cover the fundamentals of using the Object-Oriented approach to programming, in the easy to learn environment of Python.
You will gain the ability to understand one of the fundamental principles of programming that is used in nearly all the code that runs our world.
The OOP concepts will enable you to transform the barely useful code that you've written in CS F111 to real-life applications that you see and run everyday.
"""
r = requests.post(backend_url + "/create", {'username': 'Crux-Bphc', 'title': 'Crux OOP With Python Workshop', 'text': Notice1})
print("Notice 1 created!")

Notice2 = """
Hey guys!
Hope the semester is going well so far :3
F1 Studioz in association with DA is bringing you a series of UI/UX workshops.
UI is User Interface for website and apps and UX is User Experience. It's an upcoming field in India and is a very beneficial skill to have.

We'll be starting out with basic concepts of designing and then going into the deeper topics.
F1 Studioz will also be offering internship opportunities to a few people by the end of the series of workshops.
Participants will also get a chance to visit their office in Hyderabad after one of the sessions!
"""
r = requests.post(backend_url + "/create", {'username': 'DesignersAnonymous', 'title': 'DA UI/UX Workshop', 'text': Notice2})
print("Notice 2 created!")


Notice3 = """
SUC brings to you the screening of 2nd Innings of the first ODI International Match of series between INDIA and AUSTRALIA

Come in numbers and show the country our support!!
#BLEEDBLUE
#KANGAROOSFORDINNER

When: Today, 2nd March 2019
Where: NESCAFE LAWNS
Time : 6pm 
"""
r = requests.post(backend_url + "/create", {'username': 'StudentUnion', 'title': 'IND Vs. AUS Match screening', 'text': Notice3})
print("Notice 3 created!")

Notice4 = """
|| Microsoft Codess ||
Codess is back. This is a great opportunity for 2nd year and 3rd year females(graduating in 2021 or 2022) to join the community of female coders and get mentored by Microsoft professionals.
Also, there are fair chances of landing a SUMMER INTERNSHIP with Microsoft.
Don't miss the opportunity and register here asap: https://aka.ms/CodessRegister
"""
r = requests.post(backend_url + "/create", {'username': 'SWD', 'title': 'Microsoft Codess internship', 'text': Notice4})
print("Notice 4 created!")


