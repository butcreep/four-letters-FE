// assets/images/index.js
import LetterBg1 from "./img/letter/Letter-write-1.svg";
import LetterBg2 from "./img/letter/Letter-write-2.svg";
import LetterBg3 from "./img/letter/Letter-write-3.svg";
import LetterBg4 from "./img/letter/Letter-write-4.svg";
import LetterIcon1 from "./icon/Santa.svg";
import LetterIcon2 from "./icon/Cookie.svg";
import LetterIcon3 from "./icon/Rudolf.svg";
import LetterIcon4 from "./icon/Snowman.svg";
import LetterType01 from "./img/letter/Letter-Preview01.svg";
import LetterType02 from "./img/letter/Letter-Preview02.svg";
import LetterType03 from "./img/letter/Letter-Preview03.svg";
import LetterType04 from "./img/letter/Letter-Preview04.svg";
import StorageOn from "assets/icon/Storage-Box-On.svg";
import HomeOn from "assets/icon/Home-On.svg";
import StorageOff from "assets/icon/Storage-Box-Off.svg";
import HomeOff from "assets/icon/Home-Off.svg";

const images = {
  letterBackgrounds: [LetterBg1, LetterBg2, LetterBg3, LetterBg4],
  letterIcons: [LetterIcon1, LetterIcon2, LetterIcon3, LetterIcon4],
  previewLetters: [
    { id: 0, src: LetterType01 },
    { id: 1, src: LetterType02 },
    { id: 2, src: LetterType03 },
    { id: 3, src: LetterType04 },
  ],
  footerIcons: {
    homeOn: HomeOn,
    homeOff: HomeOff,
    storageOn: StorageOn,
    storageOff: StorageOff,
  },
};

export default images;
