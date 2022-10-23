def generate(x):
    data = "["
    for i in range(x):
        a = "{\"name\":\"" + str(i + 1) + "\""
        a += ",\"content\":\"" + str(i + 1) + "\""
        if i == x - 1:
            a += "}"
        else:
            a += "},\n"
        data += a
    data += "]"
    print(data)

generate(100000)