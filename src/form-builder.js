// FormBuilder class to manage form fields and their operations
var FormBuilder = /** @class */ (function () {
    function FormBuilder(id, name) {
        this.id = id;
        this.name = name;
        this.idCounter = 0; // Counter to give each field a unique ID
        this.fields = []; // Store the form fields
    }
    // Method to add a new field to the form
    FormBuilder.prototype.addField = function (type, label, options) {
        var newField = {
            id: this.idCounter++, // Ensure a unique ID for each field
            label: label,
            type: type,
            options: options,
        };
        this.fields.push(newField); // Add the field to the fields array
        this.saveFormToLocalStorage(); // Save form after adding a new field
        this.renderFormPreview(); // Update the preview
    };
    // Render the form preview based on the fields
    FormBuilder.prototype.renderFormPreview = function () {
        var formPreview = document.getElementById('formPreview');
        formPreview.innerHTML = ''; // Clear the current preview
        this.fields.forEach(function (field) {
            var fieldDiv = document.createElement('div');
            var fieldLabel = document.createElement('label');
            fieldLabel.innerText = field.label;
            fieldDiv.appendChild(fieldLabel);
            if (field.type === 'text') {
                var input = document.createElement('input');
                input.type = 'text';
                fieldDiv.appendChild(input);
            }
            else if (field.type === 'multiple-choice' && field.options) {
                field.options.forEach(function (option) {
                    var input = document.createElement('input');
                    input.type = 'radio';
                    input.name = field.label;
                    var label = document.createElement('label');
                    label.innerText = option;
                    fieldDiv.appendChild(input);
                    fieldDiv.appendChild(label);
                });
            }
            else if (field.type === 'checkbox' && field.options) {
                field.options.forEach(function (option) {
                    var input = document.createElement('input');
                    input.type = 'checkbox';
                    var label = document.createElement('label');
                    label.innerText = option;
                    fieldDiv.appendChild(input);
                    fieldDiv.appendChild(label);
                });
            }
            formPreview.appendChild(fieldDiv); // Add the field div to the form preview
        });
    };
    // Save form data in localStorage
    FormBuilder.prototype.saveFormToLocalStorage = function () {
        localStorage.setItem(this.id, JSON.stringify(this.fields));
    };
    // Load form data from localStorage
    FormBuilder.prototype.loadFormFromLocalStorage = function () {
        var storedForm = localStorage.getItem(this.id);
        if (storedForm) {
            this.fields = JSON.parse(storedForm);
            this.renderFormPreview();
        }
    };
    // Method to view all forms (for managing multiple forms)
    FormBuilder.viewForms = function () {
        var formList = document.getElementById('formList');
        formList.innerHTML = ''; // Clear the list
        Object.keys(localStorage).forEach(function (key) {
            var listItem = document.createElement('li');
            listItem.innerText = key;
            formList.appendChild(listItem);
        });
    };
    return FormBuilder;
}());
// Initialize form builder instance
var formBuilder = new FormBuilder('form1', 'My First Form');
formBuilder.loadFormFromLocalStorage(); // Load form from storage on page load
// Event listener for adding a field
document.getElementById('addFieldButton').addEventListener('click', function () {
    var label = document.getElementById('fieldLabel').value;
    var type = document.getElementById('fieldType').value;
    // Prompt for options if the field is 'multiple-choice' or 'checkbox'
    var options = type === 'multiple-choice' || type === 'checkbox'
        ? (prompt('Enter options (comma-separated):') || '').split(',')
        : undefined;
    formBuilder.addField(type, label, options); // Add the field to the form
    FormBuilder.viewForms(); // Update the form list
    // Show form preview after the first field is added
    var formPreview = document.getElementById('formPreview');
    formPreview.style.display = 'block'; // Make the form preview visible
});
