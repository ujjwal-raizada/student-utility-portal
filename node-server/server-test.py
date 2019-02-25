import requests

r_signup_admin = requests.post("http://localhost:8080/signup", {'username': 'ujjwalrox', 'password': 'ujjwal', 'type': 'admin'})
print(r_signup_admin.text)

r_signup_admin2 = requests.post("http://localhost:8080/signup", {'username': 'ujjwalroxx', 'password': 'ujjwalx', 'type': 'admin'})
print(r_signup_admin2.text)

r_signup_normal = requests.post("http://localhost:8080/signup", {'username': 'ujjwalrox2', 'password': 'ujjwal2', 'type': 'normal'})
print(r_signup_normal.text)


r_post = requests.post("http://localhost:8080/create", {'username': 'ujjwalrox','title': 'hello!', 'text': 'World!'})
print(r_post.text)
r_post2 = requests.post("http://localhost:8080/create", {'username': 'ujjwalroxx','title': 'hello ujjwalroxx!', 'text': 'World!'})
print(r_post2.text)

r_get_notices = requests.get("http://localhost:8080/notices")
print(r_get_notices.text)
