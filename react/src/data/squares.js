// Bingo squares. Only SHA-256 hashes of codes ship to the browser.
// Get a hash for a new code with:  npm run hash -- "your code"
//
// TESTING: every square accepts the code "win". Replace texts + hashes
// before the event. Previous placeholder hashes, kept for reference:
//   "zip zap zup" c075f189b6b93decbb1e0d5dd895f50deef1b1750a1a74270f87adbb4b38f9ea
//   "kood1"       92957d4490c427015fd08b9ec769d32620ee11065491897703ba23f9eaa4f712
//   "kood2"       04b4de7d6698bdb8c708ce5f41436e4342e42316798032423c176e6e51e7ee34
//   "kood3"       2b83960e288b71d1951a8e175103e93edf641508fd69a109c8fcbd08a112123e
//   "kood4"       be1e6d9c93dab3e58c42cd77c386bde4f1bbed55fff82e3f90efd3c7a08c2cf4
//   "kood5"       9e52719e6214e71554b26f906fc491b4435a7494fcf81e7f5f1ee905d8b551b8
//   "kood6"       e63a4a674cadd784c8aba6896dbf5699596431ed679d33edf1030bc45a7d73b4
//   "kood7"       6a5f523087582fbd4736acb8068f7375c7e446e0d332d55be53f8d381b298c0f
//   "kood8"       a88b77d0d1d5b2d3405b643c798fe3b1475202a753905e4cbae8be805c5e6f9f
const TEST_HASH = '823a3180dad3c9c3c4dea43ab2baf9f04bac9c3a7711745ff5f702551496d735' // "win"

export const SQUARES = Array.from({ length: 9 }, (_, i) => ({
  id: `task-${i + 1}`,
  title: { et: `Ülesanne ${i + 1}`, en: `Task ${i + 1}` },
  task: {
    et: `Ülesande ${i + 1} kirjeldus tuleb siia.`,
    en: `Description of task ${i + 1} goes here.`,
  },
  hash: TEST_HASH,
}))

export const SQUARE_IDS = SQUARES.map((s) => s.id)
export const SQUARES_BY_ID = Object.fromEntries(SQUARES.map((s) => [s.id, s]))
