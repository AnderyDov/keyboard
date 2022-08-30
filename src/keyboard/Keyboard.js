import React from "react";
import "./keyboard.css";
import { useState, useEffect, useRef } from "react";

const arrAllSymbols = [
  [
    ["ё", "Ё", "`", "~", "°"],
    ["1", "!", "1", "!", "±"],
    ["2", "@", "2", "@", "¼"],
    ["3", "№", "3", "#", "½"],
    ["4", "$", "4", "$", "¾"],
    ["5", "%", "5", "%", "¤"],
    ["6", "^", "6", "^", "¬"],
    ["7", "?", "7", "?", "²"],
    ["8", "*", "8", "*", "³"],
    ["9", "(", "9", "(", "¢"],
    ["0", ")", "0", ")", "€"],
    ["-", "_", "-", "_", "£"],
    ["=", "+", "=", "+", "μ"],
    ["←", "←", "←", "←", "←"],
  ],
  [
    ["@", "@", "@", "@", "@"],
    ["й", "Й", "q", "Q", "~"],
    ["ц", "Ц", "w", "W", "§"],
    ["у", "У", "e", "E", "¶"],
    ["к", "К", "r", "R", ":"],
    ["е", "Е", "t", "T", ";"],
    ["н", "Н", "y", "Y", "'"],
    ["г", "Г", "u", "U", '"'],
    ["ш", "Ш", "i", "I", "«"],
    ["щ", "Щ", "o", "O", "»"],
    ["з", "З", "p", "P", "["],
    ["х", "Х", "[", "{", "]"],
    ["ъ", "Ъ", "]", "}", "{"],
    ["\\", "/", "\\", "|", "}"],
    ['"', '"', '"', '"', '"'],
  ],
  [
    ["Caps", "Caps", "Caps", "Caps", "Caps"],
    ["ф", "Ф", "a", "A", "‘"],
    ["ы", "Ы", "s", "S", "’"],
    ["в", "В", "d", "D", "“"],
    ["а", "А", "f", "F", "”"],
    ["п", "П", "g", "G", "!"],
    ["р", "Р", "h", "H", "?"],
    ["о", "О", "j", "J", "/"],
    ["л", "Л", "k", "K", "|"],
    ["д", "Д", "l", "L", "\\"],
    ["ж", "Ж", ";", ":", "—"],
    ["э", "Э", "'", '"', "♀"],
    ["!", "?", "!", "?", "♂"],
    ["Enter", "Enter", "Enter", "Enter", "Enter"],
  ],
  [
    ["Shift", "Shift", "Shift", "Shift", "Shift"],
    ["я", "Я", "z", "Z", "←"],
    ["ч", "Ч", "x", "X", "→"],
    ["с", "С", "c", "C", "↑"],
    ["м", "М", "v", "V", "↓"],
    ["и", "И", "b", "B", "♠"],
    ["т", "Т", "n", "N", "♥"],
    ["ь", "Ь", "m", "M", "♣"],
    ["б", "Б", ",", "<", "♣"],
    ["ю", "Ю", ".", ">", "§\n          "],
    [",", ";", ":", ";", "₿"],
    [".", ":", "/", "—", "₽"],
    ["Shift", "Shift", "Shift", "Shift", "Shift"],
  ],
  [
    ["en", "EN", "rus", "RUS", "RUS"],
    ["", "", "", "", ""],
    ["Symbols", "Symbols", "Symbols", "Symbols", "Symbols"],
  ],
];

export default function Keyboard() {
  let [text, setText] = useState("");
  let [variant, setVariant] = useState({ caps: false, en: false, symb: false });
  let ind = 0;
  switch (true) {
    case variant.caps === false &&
      variant.en === false &&
      variant.symb === false:
      ind = 0;
      break;
    case variant.caps === true &&
      variant.en === false &&
      variant.symb === false:
      ind = 1;
      break;
    case variant.caps === false &&
      variant.en === true &&
      variant.symb === false:
      ind = 2;
      break;
    case variant.caps === true && variant.en === true && variant.symb === false:
      ind = 3;
      break;
    case variant.caps === false &&
      variant.en === false &&
      variant.symb === true:
      ind = 4;
      break;

    default:
      break;
  }
  let [arr, setArr] = useState(
    [...arrAllSymbols].map((el) => el.map((i) => i[ind]))
  );

  let input = useRef();
  let keyboard = useRef();

  let out = (
    <>
      <div className="wrap">
        <input
          type="text"
          id="input"
          ref={input}
          value={text}
          onInput={(e) => setText(e.target.value)}
          onKeyDown={handlerKeyDown}
          onKeyUp={handlerKeyUp}
        />
      </div>
      <div className="keyboard" ref={keyboard}>
        {[...arr].map((item, i) => {
          return (
            <div className="row" key={i}>
              {item.map((el, k) => {
                let id;
                switch (true) {
                  case i === 0 && k === 13:
                    id = "backspace";
                    break;
                  case i === 2 && k === 0:
                    id = "caps-lock";
                    break;
                  case i === 2 && k === 13:
                    id = "enter";
                    break;
                  case i === 3 && k === 0:
                    id = "shift-left";
                    break;
                  case i === 3 && k === 12:
                    id = "shift-right";
                    break;
                  case i === 4 && k === 0:
                    id = "lang";
                    break;
                  case i === 4 && k === 1:
                    id = "space";
                    break;
                  case i === 4 && k === 2:
                    id = "symbol";
                    break;
                  default:
                    break;
                }
                return (
                  <div className="key" id={id} key={k} onClick={handlerClick}>
                    {el}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );

  useEffect(() => {
    setArr([...arrAllSymbols].map((el) => el.map((i) => i[ind])));
    dragElem(keyboard.current);
  }, [variant, ind]);

  function handlerKeyDown(e) {
    document.querySelectorAll(".key").forEach((item) => {
      if (item.innerHTML === e.key || item.innerHTML.toUpperCase() === e.key) {
        item.classList.add("green");
      }
    });
  }

  function handlerKeyUp(e) {
    document.querySelectorAll(".key").forEach((item) => {
      item.classList.remove("green");
      if (e.key === "Enter") {
        input.current.blur();
        setText("");
      }
    });
  }

  function handlerClick(e) {
    input.current.focus();
    if (e.target.id === "caps-lock") {
      setVariant({ ...variant, caps: !variant.caps, symb: false });
    } else if (e.target.id === "shift-left") {
      setVariant({ ...variant, caps: !variant.caps, symb: false });
    } else if (e.target.id === "shift-right") {
      setVariant({ ...variant, caps: !variant.caps, symb: false });
    } else if (e.target.id === "lang") {
      setVariant({ ...variant, en: !variant.en, symb: false });
    } else if (e.target.id === "symbol") {
      setVariant({ caps: false, en: false, symb: !variant.symb });
    } else if (!e.target.id) {
      setText(text + e.target.innerHTML);
    } else if (e.target.id === "backspace") {
      let temp = text
        .split("")
        .slice(0, text.split("").length - 1)
        .join("");
      setText(temp);
    } else if (e.target.id === "enter") {
      input.current.blur();
      setText("");
    } else if (e.target.id === "space") {
      let temp = text + " ";
      setText(temp);
    }
  }

  return out;
}

function dragElem(elem) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elem.onmousedown = grabElem;

  function grabElem(e) {
    let t = elem.getBoundingClientRect();
    if (
      e.clientX < t.left + t.width - 50 ||
      e.clientY < t.top + t.height - 50
    ) {
      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onmouseup = closeMove;
      document.onmousemove = elemMove;
    }
  }

  function elemMove(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elem.style.left = elem.offsetLeft - pos1 + "px";
    elem.style.top = elem.offsetTop - pos2 + "px";
  }

  function closeMove() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
