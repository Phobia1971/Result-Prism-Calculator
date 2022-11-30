import { WordDefenition } from "../../types/types";
import Word from "../word";

export default class WordFetcher {
  private _wordUrl:string = 'https://random-word-api.herokuapp.com/word?length='
  private _definitionUrl:string = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  private _wordLength:number;

  private _wordDefinition:WordDefenition;

  constructor(length:number) {
    this._wordLength = length;
    this._wordDefinition = { word: '', defenition: ''};
    // this._fetchWord();
  }

  
  public get wordDef() : WordDefenition {
    return this._wordDefinition;
  }
  
  public async requestWord():Promise<WordDefenition> {
    const a = await this.fetchWord();
    return a;
  }

  public async fetchWord():Promise<WordDefenition> {

    const url = `${this._wordUrl}${this._wordLength}`;
    const responce = await fetch(url)
    .then(response => response.json())
      .then(data => {
        if(data[0]){ 
          this._wordDefinition.word = data[0];
          
          return this._wordDefinition.word;
        }
      }).catch(e => console.log(e));
      const d = await this._fetchDefinition(responce as string);
      return {word: responce as string, defenition: d};
  }

  private async _fetchDefinition(word:string):Promise<string> {
    const url = `${this._definitionUrl}${word}`;
    const responce = await fetch(url)
    .then(response => response.json())
      .then(data => {
        try {
          this._wordDefinition.defenition = data[0].meanings[0].definitions[0].definition
          // console.log('_fetchDefinition', this._wordDefinition);        
          return this._wordDefinition.defenition;          
        } catch (error) {
          throw new Error("Oeps, no meaning found");
          
        }
      }).catch(e => console.log(e));
    return responce as string;  
  }
}