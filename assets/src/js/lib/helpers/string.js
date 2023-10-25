import prepositions from './prepositions';

export function caseize(str, replace = (s) => s, join = ' ') {
  return str
    .replace(/([A-Z]{2,})/, ' $1 ') // abbreviations
    .replace(/[_\-.]/, ' ') // separators
    .replace(/([a-z\d])([A-Z])/g, '$1 $2') // camelCase
    .split(' ')
    .filter((s) => s)
    // exceptions
    .map((s, i) => {
      // skip abbreviations
      if (/([A-Z]{2,})/.test(s)) return s;
      // skip prepositions
      if (prepositions.includes(s)) return s;

      return replace(s, i);
    })
    .join(join);
}

export function humanize(str) {
  return caseize(str, (s) => s.toLowerCase());
}

export function titleize(str) {
  return caseize(str, (s) => {
    const se = s.toLowerCase();

    return se.charAt(0).toUpperCase() + se.slice(1);
  });
}
