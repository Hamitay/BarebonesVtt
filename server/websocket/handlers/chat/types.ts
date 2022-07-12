
interface TextMessage {
    message: string,
}

interface RollMessage {
    content: string,
}

type NewTextMessage = {
    content: string,
    type: MessageType,
}

enum MessageType {
    ROLL,
    TEXT
}