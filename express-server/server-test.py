import requests

url = 'https://sup-express.herokuapp.com/'

# create user: Student
data = {
    'username': 'f20171398@hyderabad.bits-pilani.ac.in',
    'password': 'fd521580',
    'type': 'Student'
}
r = requests.post(url + 'user/signup', data)
print(r.text)

# create user: Official Source
data = {
    'username': 'president@hyderabad.bits-pilani.ac.in',
    'password': 'president',
    'type': 'Official Source'
}
r = requests.post(url + 'user/signup', data)
print(r.text)

# create tag
data = {
    'tag': 'su-election',
    'username': 'president@hyderabad.bits-pilani.ac.in',
}
r = requests.post(url + 'admin/addtag', data)
print(r.text)

data = {
    'tag': 'temp-tag',
    'username': 'president@hyderabad.bits-pilani.ac.in',
}
r = requests.post(url + 'admin/addtag', data)
print(r.text)

# delete tag
data = {
    'tag': 'temp-tag',
    'username': 'president@hyderabad.bits-pilani.ac.in',
}
r = requests.post(url + 'admin/deletetag', data)
print(r.text)

# create Notice
data = {
    'title': 'Student Union Election',
    'body': 'This is to declare the election for student union 2019',
    'username': 'president@hyderabad.bits-pilani.ac.in',
    'tags': ['president', 'atmos', 'pearl', 'su-election'],
}
r = requests.post(url + 'notice/create', data)
print(r.text)

# subscribe
data = {
    'username': 'f20171398@hyderabad.bits-pilani.ac.in',
    'source': 'president@hyderabad.bits-pilani.ac.in',
}
r = requests.post(url2 + 'notice/subscribe', data)
print(r.text)

# fetch user specific notice
data = {
    'username': 'f20171398@hyderabad.bits-pilani.ac.in',
}
r = requests.post(url + 'notice/usernotice', data)
print(r.text)
