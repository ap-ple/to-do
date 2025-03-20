
function removeChildren(element) {
   while (element.firstChild) {
      element.removeChild(element.lastChild);
   }
}

export default removeChildren;