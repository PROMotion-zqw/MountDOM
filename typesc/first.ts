// // 剩余参数
// function buildName (firstName: string, ...restOfName: string[]) {
//     return firstName + " " + restOfName.join(" ");
// }

// let emp = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
// console.log("emp", emp);

// function f(this: void) {
//     console.log(this);
//     // make sure `this` is unusable in this standalone function
// }
// f()

// this
// interface Card {
//     suit: string;
//     card: number;
// }
// interface Deck {
//     suits: string[];
//     cards: number[];
//     createCardPicker(this: Deck): () => Card;
// }
// let deck: Deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     // NOTE: The function now explicitly specifies that its callee must be of type Deck
//     createCardPicker: function(this: Deck) {
//         return () => {
//             let pickedCard = Math.floor(Math.random() * 52);
//             let pickedSuit = Math.floor(pickedCard / 13);
//             console.log("ccc", this);
            
//             return {suit: this.suits[pickedSuit], card: pickedCard % 13};
//         }
//     }
// }

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();


interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

interface Dog {
    name: string;
}

interface Cat {
    age: number;
}

interface Cloner {
    clone(animal: Dog): Dog;
}
let c: Cloner;

