import { FormBuilder } from './form-builder';

// Initialize the form builder instance
const formBuilder = new FormBuilder('form1', 'My First Form');
formBuilder.loadFormFromLocalStorage();

// Add field button click event
document.getElementById('addFieldButton')!.addEventListener('click', () => {
  const label = (document.getElementById('fieldLabel') as HTMLInputElement).value;
  const type = (document.getElementById('fieldType') as HTMLSelectElement).value as 'text' | 'multiple-choice' | 'checkbox';

  const options = type === 'multiple-choice' || type === 'checkbox'
    ? (prompt('Enter options (comma-separated):') || '').split(',')
    : undefined;

  formBuilder.addField(type, label, options);
  FormBuilder.viewForms();
});
