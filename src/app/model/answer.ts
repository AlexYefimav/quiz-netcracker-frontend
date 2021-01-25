export class Answer{
  id: string;
  title: string;
  right: boolean;
  question: string;

  constructor() {
  }

  equals(anotherAnswer: Answer): boolean {
    return anotherAnswer.id == this.id
      && anotherAnswer.title == this.title
      && anotherAnswer.right == this.right
      && anotherAnswer.question == this.question;
  }
}

