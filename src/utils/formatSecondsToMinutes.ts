export function formatSecondsToMinuts(seconds: number){
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');// padStart coloca um 0 na frente
  const secondsMod = String(Math.floor(seconds % 60)).padStart(2, '0');

  return `${minutes}:${secondsMod}`;
}