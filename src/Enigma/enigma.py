import random

class Rotor1:
    def __init__(self):
        self.alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    
    def move(self):
        last = self.alphabets[0]
        self.alphabets = self.alphabets[1:]
        self.alphabets.append(last)
    
    def randomize(self):
        number = random.randint(0, 50)
        for i in range(number):
            self.move()
    
    def find(self, data):
        return self.alphabets.index(data)
    
    def get(self, val):
        return self.alphabets[val]

class Rotor2(Rotor1):
    def check(self):
        if self.alphabets[0] == 'z':
            return True
        return False

class Rotor3(Rotor1):
    def check(self):
        if self.alphabets[0] == 'c':
            return True
        return False
    
class Reflector(Rotor1):
    def get_back(self, char):
        index = self.alphabets.index(char)
        self.alphabets.reverse()
        temp = self.alphabets[index]
        self.alphabets.reverse()
        return temp, index

class PlungeBorad:
    def get(self, char):
        if char == 'r':
            return 'w'
        if char == 'k':
            return 'a'
        return char

def encrpyt(string):
    pborad = PlungeBorad()
    r1 = Rotor1()
    r2 = Rotor2()
    r3 = Rotor3()
    reflec = Reflector()

    r1.randomize()
    r2.randomize()
    r3.randomize()

    ans = ''

    for char in string:
        r1.move()
        if r2.check():
            r2.move()
        if r3.check():
            r3.move()
        
        c = pborad.get(char)
        index = r1.find(c)
        c = r1.get(index)
        c = r2.get(index)
        c = r3.get(index)
        c, index = reflec.get_back(c)
        c = r3.get(index)
        c = r2.get(index)
        c = r1.get(index)
        c = pborad.get(c)
        ans = ans+c
    
    return ans