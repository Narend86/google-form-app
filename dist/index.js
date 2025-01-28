import { FormBuilder } from './form-builder';
// Initialize the form builder instance
const formBuilder = new FormBuilder('form1', 'My First Form');
formBuilder.loadFormFromLocalStorage();
// Add field button click event
document.getElementById('addFieldButton').addEventListener('click', () => {
    const label = document.getElementById('fieldLabel').value;
    const type = document.getElementById('fieldType').value;
    const options = type === 'multiple-choice' || type === 'checkbox'
        ? (prompt('Enter options (comma-separated):') || '').split(',')
        : undefined;
    formBuilder.addField(type, label, options);
    FormBuilder.viewForms();
});
