export default function Greeting() {
    return greetings[Math.floor(Math.random() * greetings.length)];
}

export const greetings = [
    'Hello',
    'Hi',
    'Hey',
    'Howdy',
    'Hola',
    'Bonjour',
    'Ciao',
    'Hiya',
    'Yo',
    'Sup',
    'Heya',
    'Aloha',
    'G\'day',
    'Salutations',
    'Greetings',
    'What\'s up',
    'How\'s it going'
];