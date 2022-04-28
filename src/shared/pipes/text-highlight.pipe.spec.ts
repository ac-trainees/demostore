import { TitleCasePipe } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { TextHighlightPipe } from "./text-highlight.pipe";


describe('TextHighlightPipe', () => {
  const pipe = new TextHighlightPipe();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [],
    }).compileComponents();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('do not change the case of text', () => {
    let text = "Ill compress the cross-platform EXE card!"
    let searchQuery = "exe";
    expect(pipe.transform(text, searchQuery)).toEqual("Ill compress the cross-platform <span class=\"highlight\">EXE</span> card!");
  });

  it('wrap a search word in a span tag', () => {
    let text = "Ill compress the cross-platform EXE card!"
    let searchQuery = "card";
    expect(pipe.transform(text, searchQuery)).toEqual("Ill compress the cross-platform EXE <span class=\"highlight\">card</span>!");
  });

});
