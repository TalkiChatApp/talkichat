class AuthRoutes {
  default = "/"
}

class ContactRoutes {
  default = "/"
  byId="/:id"
}

class ChatRoutes {
  default = "/"
}

class MessageRoutes {
  default = "/"
}

export const authRoutes = new AuthRoutes();
export const contactRoutes = new ContactRoutes();
export const chatRoutes = new ChatRoutes();
export const messageRoutes = new MessageRoutes();
