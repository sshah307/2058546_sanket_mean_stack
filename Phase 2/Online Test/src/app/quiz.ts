export class Quiz {
  constructor(
    public question: string,
    public correct_answer: string,
    public incorrect_answers: Array<string>
  ) {}
}
