export function storePokemon(payload) {
  let local = JSON.parse(localStorage.getItem('myPokemon'))
  if(local == null){
    localStorage.setItem('myPokemon', JSON.stringify([payload]))
  } else {
    let index = local.findIndex(x => x.id === payload.id);
    if (index !== -1) {
      local[index].myPokemon.push(
        payload.myPokemon[0]
      );
      localStorage.setItem('myPokemon',JSON.stringify(local))
    } else {
      let newData = local.concat(payload);
      localStorage.setItem('myPokemon', JSON.stringify(newData))
    }
  }
}

export function getMyPokemon(payload) {
  return JSON.parse(localStorage.getItem('myPokemon'))
}

export function releaseMyPokemon (payload) {
  let local = JSON.parse(localStorage.getItem('myPokemon'))
  let index = local.findIndex(x => x.id === payload.id);
  let index_cp = local[index].myPokemon.findIndex(x => x.id === payload.id_cp);
  local[index].myPokemon.splice(index_cp, 1);
  if(local[index].myPokemon.length === 0){
    local.splice(index,1);
  }
  if(local.length === 0){
    local = null;
  }
  localStorage.setItem('myPokemon',JSON.stringify(local))
  return local
}