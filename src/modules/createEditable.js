import debounce from "lodash.debounce";

function createEditable(original, callback) {
   const editableForm = document.createElement("form");
   const editableInput = document.createElement("input");

   editableForm.appendChild(editableInput);

   const textElement = original.firstChild;
   const parent = original.parentElement;

   for (const originalClass of original.classList) {
      editableInput.classList.add(originalClass);
   }

   editableInput.value = textElement.innerText;
   editableInput.type = "text";
   editableInput.name = "newValue";
   editableInput.autocomplete = "off";
   editableInput.spellcheck = false;

   const handleEditableFormSubmit = debounce(() => {
      const formData = new FormData(editableForm);
      const newValue = formData.get(editableInput.name);

      callback(newValue);

      if (parent.contains(editableForm)) {
         parent.insertBefore(original, editableForm)
         parent.removeChild(editableForm);
      }
   }, 0);

   editableForm.addEventListener("submit", event => {
      event.preventDefault();

      handleEditableFormSubmit();
   });

   editableInput.addEventListener("focusout", handleEditableFormSubmit);

   parent.insertBefore(editableForm, original)
   parent.removeChild(original);

   editableInput.select();

   return editableInput;
}

export default createEditable;