import debounce from "lodash.debounce";

function createEditable(original, minLength, callback) {
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

      for (const pair of formData) {
         const key = pair[0];
         const value = pair[1];

         if (key === "newValue") {
            if (value.length >= minLength) {
               callback(value);
               textElement.innerText = value;
            }
         }
      }
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