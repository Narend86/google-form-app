// FormBuilder class to manage form fields and their operations
export class FormBuilder {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.idCounter = 0; // Counter to give each field a unique ID
        this.fields = []; // Store the form fields
    }
    // Method to add a new field to the form
    addField(type, label, options) {
        const newField = {
            id: this.idCounter++, // Ensure a unique ID for each field
            label,
            type,
            options,
        };
        this.fields.push(newField); // Add the field to the fields array
        this.saveFormToLocalStorage(); // Save form after adding a new field
        this.renderFormPreview(); // Update the preview
    }
    // Render the form preview based on the fields
    renderFormPreview() {
        const formPreview = document.getElementById('formPreview');
        formPreview.innerHTML = ''; // Clear the current preview
        this.fields.forEach((field) => {
            const fieldDiv = document.createElement('div');
            const fieldLabel = document.createElement('label');
            fieldLabel.innerText = field.label;
            fieldDiv.appendChild(fieldLabel);
            if (field.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                fieldDiv.appendChild(input);
            }
            else if (field.type === 'multiple-choice' && field.options) {
                field.options.forEach(option => {
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = field.label;
                    const label = document.createElement('label');
                    label.innerText = option;
                    fieldDiv.appendChild(input);
                    fieldDiv.appendChild(label);
                });
            }
            else if (field.type === 'checkbox' && field.options) {
                field.options.forEach(option => {
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    const label = document.createElement('label');
                    label.innerText = option;
                    fieldDiv.appendChild(input);
                    fieldDiv.appendChild(label);
                });
            }
            formPreview.appendChild(fieldDiv); // Add the field div to the form preview
        });
    }
    // Save form data in localStorage
    saveFormToLocalStorage() {
        localStorage.setItem(this.id, JSON.stringify(this.fields));
    }
    // Load form data from localStorage
    loadFormFromLocalStorage() {
        const storedForm = localStorage.getItem(this.id);
        if (storedForm) {
            this.fields = JSON.parse(storedForm);
            this.renderFormPreview();
        }
    }
    // Method to view all forms (for managing multiple forms)
    static viewForms() {
        const formList = document.getElementById('formList');
        formList.innerHTML = ''; // Clear the list
        Object.keys(localStorage).forEach(key => {
            const listItem = document.createElement('li');
            listItem.innerText = key;
            formList.appendChild(listItem);
        });
    }
}
// Initialize form builder instance
const formBuilder = new FormBuilder('form1', 'My First Form');
formBuilder.loadFormFromLocalStorage(); // Load form from storage on page load
// Event listener for adding a field
document.getElementById('addFieldButton').addEventListener('click', () => {
    const label = document.getElementById('fieldLabel').value;
    const type = document.getElementById('fieldType').value;
    // Prompt for options if the field is 'multiple-choice' or 'checkbox'
    const options = type === 'multiple-choice' || type === 'checkbox'
        ? (prompt('Enter options (comma-separated):') || '').split(',')
        : undefined;
    formBuilder.addField(type, label, options); // Add the field to the form
    FormBuilder.viewForms(); // Update the form list
});
