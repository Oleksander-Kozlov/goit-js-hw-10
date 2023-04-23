function createList(arr) {
    return arr
      .map(
        ({ flags: { svg, alt }, name: { official } }) =>
          `<li><p><img src="${svg}" alt="${alt} width="35px" height="20px">  ${official}</p></li>`
      )
      .join('');
    
};
export { createList };   

