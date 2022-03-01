class Chat:
    def __init__(self):
        self.chats = []

    def move(self, message):
        self.chats = self.chats[1:]
        self.chats.append(message)

    def add(self, message):
        if len(self.chats) < 10:
            self.move(message)
            return
        self.chats.append(message)