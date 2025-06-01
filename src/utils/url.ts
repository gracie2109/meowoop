export function checkQueryNamePosition(url:string, queryName:string) {
  const queryString = url.split('?')[1];
  if (!queryString) return -1; 

  const params = queryString.split('&');
  
  for (let i = 0; i < params.length; i++) {
    if (params[i].startsWith(queryName)) {
      return i;
    }
  }
  
  return -1;
}