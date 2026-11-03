// Règles de sécurité du projet Firebase dédié à la matrice (matrice-competences-vleroy).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = async (name) => readFile(new URL(`../${name}`, import.meta.url), 'utf8');
const text = await read('database.rules.json');
const rules = JSON.parse(text).rules;

test('projet dédié : le fichier ne contient que la branche skillMatrix, tout le reste est fermé', () => {
  assert.deepEqual(Object.keys(rules).sort(), ['.read', '.write', 'skillMatrix']);
  assert.equal(rules['.read'], false);
  assert.equal(rules['.write'], false);
});

test('la branche skillMatrix ne fait référence qu\'à elle-même', () => {
  const json = JSON.stringify(rules.skillMatrix);
  for (const other of ['wheelOfChance', 'movingMotivators', 'rolesGame', 'eventsGame', 'incrementGame', "'room/", "'roti/"]) {
    assert.ok(!json.includes(other), other);
  }
});

test('personne ne s\'inscrit administrateur depuis le site', () => {
  const admins = rules.skillMatrix.admins.$uid;
  assert.equal(admins['.write'], undefined);
  assert.equal(admins['.read'], 'auth != null && auth.uid === $uid');
});

test('firebase.json et .firebaserc publient ce fichier dans le projet de la matrice', async () => {
  assert.deepEqual(JSON.parse(await read('firebase.json')), { database: { rules: 'database.rules.json' } });
  assert.equal(JSON.parse(await read('.firebaserc')).projects.default, 'matrice-competences-vleroy');
});
