// Zet de deelnemers van één editie in Firestore.
// Gebruik: node scripts/seedFirestore.mjs
// Herhaalbaar: bestaande deelnemers worden overschreven, verdwenen deelnemers worden verwijderd.
// Rankings van gebruikers blijven onaangetast.

import {readFileSync} from 'node:fs'
import {cert, initializeApp} from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'

// Moet gelijk zijn aan EDITION in utils/edition.ts
const EDITION = '2026'

// [land, landcode voor de vlag, artiest, nummer, terugkerende artiest, aantal overwinningen, genre]
const ROWS = [
  ['Albania', 'AL', 'Alis', 'Nân', false, 0, 'Ballad'],
  ['Armenia', 'AM', 'Simón', 'Paloma Rumba', false, 0, 'Pop'],
  ['Australia', 'AU', 'Delta Goodrem', 'Eclipse', false, 0, 'Ballad'],
  ['Austria', 'AT', 'Cosmó', 'Tanzschein', false, 3, 'Dance'],
  ['Azerbaijan', 'AZ', 'JIVA', 'Just Go', false, 1, 'Pop'],
  ['Belgium', 'BE', 'Essyla', 'Dancing on the Ice', false, 1, 'Pop'],
  ['Bulgaria', 'BG', 'Dara', 'Bangaranga', false, 1, 'Dance'],
  ['Croatia', 'HR', 'LELEK', 'Andromeda', false, 0, 'Folk'],
  ['Cyprus', 'CY', 'Antigoni', 'Jalla', false, 0, 'Pop'],
  ['Czechia', 'CZ', 'Daniel Žižka', 'Crossroads', false, 0, 'Pop'],
  ['Denmark', 'DK', 'Søren Torpegaard Lund', 'Før vi går hjem', false, 3, 'Dance'],
  ['Estonia', 'EE', 'Vanilla Ninja', 'Too Epic To Be True', true, 1, 'Rock'],
  ['Finland', 'FI', 'Linda Lampenius & Pete Parkkonen', 'Liekinheitin', false, 1, 'Pop'],
  ['France', 'FR', 'Monroe', 'Regarde', false, 5, 'Pop'],
  ['Georgia', 'GE', 'Bzikebi', 'On Replay', false, 0, 'Pop'],
  ['Germany', 'DE', 'Sarah Engels', 'Fire', false, 2, 'Pop'],
  ['Greece', 'GR', 'Akylas', 'Ferto', false, 1, 'Pop'],
  ['Israel', 'IL', 'Noam Bettan', 'Michelle', false, 4, 'Pop'],
  ['Italy', 'IT', 'Sal Da Vinci', 'Per sempre sì', false, 3, 'Pop'],
  ['Latvia', 'LV', 'Atvara', 'Ēnā', false, 1, 'Ballad'],
  ['Lithuania', 'LT', 'Lion Ceccah', 'Sólo quiero más', false, 0, 'Alternative'],
  ['Luxembourg', 'LU', 'Eva Marija', 'Mother Nature', false, 5, 'Pop'],
  ['Malta', 'MT', 'Aidan', 'Bella', false, 0, 'Ballad'],
  ['Moldova', 'MD', 'Satoshi', 'Viva, Moldova!', false, 0, 'Hip-hop'],
  ['Montenegro', 'ME', 'Tamara Živković', 'Nova zora', false, 0, 'Dance'],
  ['Norway', 'NO', 'Jonas Lovv', 'Ya ya ya', false, 3, 'Pop'],
  ['Poland', 'PL', 'Alicja', 'Pray', false, 0, 'Pop'],
  ['Portugal', 'PT', 'Bandidos do Cante', 'Rosa', false, 1, 'Folk'],
  ['Romania', 'RO', 'Alexandra Căpitănescu', 'Choke Me', false, 0, 'Rock'],
  ['San Marino', 'SM', 'Senhit', 'Superstar', true, 0, 'Dance'],
  ['Serbia', 'RS', 'LAVINA', 'Kraj mene', false, 1, 'Rock'],
  ['Sweden', 'SE', 'Felicia', 'My System', false, 7, 'Pop'],
  ['Switzerland', 'CH', 'Veronica Fusaro', 'Alice', false, 3, 'Pop'],
  ['Ukraine', 'UA', 'Leléka', 'Ridnym', false, 3, 'Folk'],
  ['United Kingdom', 'GB', 'Look Mum No Computer', 'Eins, Zwei, Drei', false, 5, 'Alternative'],
]

// 'San Marino' -> 'san_marino'
const slug = text =>
  text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')

const participants = ROWS.map(([country, code, artist, song, returning_artist, country_wins, genre]) => ({
  id: slug(country),
  country,
  flag_url: `https://flagsapi.com/${code}/flat/64.png`,
  artist,
  song,
  returning_artist,
  spotify_url: `https://open.spotify.com/search/${encodeURIComponent(`${song} ${artist}`)}`,
  country_wins,
  genre,
}))

const serviceAccount = JSON.parse(
  readFileSync(new URL('./serviceAccountKey.json', import.meta.url), 'utf8'),
)

initializeApp({credential: cert(serviceAccount)})
const db = getFirestore()

const participantsRef = db.collection('editions').doc(EDITION).collection('participants')
const keepIds = new Set(participants.map(p => p.id))
const batch = db.batch()

const existing = await participantsRef.listDocuments()
for (const ref of existing) {
  if (!keepIds.has(ref.id)) batch.delete(ref)
}

for (const {id, ...data} of participants) {
  batch.set(participantsRef.doc(id), data)
}

await batch.commit()
console.log(`Seeded ${participants.length} participants for edition ${EDITION}.`)